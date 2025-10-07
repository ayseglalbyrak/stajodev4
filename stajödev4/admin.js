$(document).ready(function () {
  // Haberleri yükleme fonksiyonu
  function loadNews() {
    $("#haberler tbody").empty(); // tabloyu temizle

    $.ajax({
      url:
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent("http://www.milliyet.com.tr/rss/rssNew/gundemRss.xml"),
      method: "GET",
      dataType: "json",
      success: function (data) {
        let count = 1;
        data.items.forEach(function (item) {
          // Eğer resim yoksa placeholder kullan
          let imgUrl =
            item.enclosure && item.enclosure.link
              ? item.enclosure.link
              : "https://via.placeholder.com/80x80?text=No+Image";

          let row = `
            <tr data-link="${item.link}">
              <td>${count++}</td>
              <td><img src="${imgUrl}" width="80" height="80"></td>
              <td>${item.title}</td>
              <td>
                <button class="btn-sil">Sil</button>
              </td>
            </tr>
          `;
          $("#haberler tbody").append(row);
        });
      },
      error: function () {
        alert("Haberler yüklenirken hata oluştu!");
      },
    });
  }

  // Sayfa açıldığında otomatik yükle
  loadNews();

  // Yenile butonu
  $("#yenile").on("click", function () {
    loadNews();
  });

  // Çift tıklayınca haberi yeni sekmede aç
  $(document).on("dblclick", "#haberler tbody tr", function () {
    let link = $(this).attr("data-link");
    window.open(link, "_blank");
  });

  // Sil butonu
  $(document).on("click", ".btn-sil", function (e) {
    e.stopPropagation(); // çift tıklamayı tetiklemesin
    if (confirm("Bu haberi silmek istediğinize emin misiniz?")) {
      $(this).closest("tr").remove();
    }
  });
});
