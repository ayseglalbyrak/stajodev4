// login.js

$(document).ready(function() {
  $("#loginForm").submit(function(e) {
    e.preventDefault();
    let user = $("#username").val();
    let pass = $("#password").val();

    if (user === "admin" && pass === "123") {
      alert("Doğru giriş yapıyorsunuz...");
      setTimeout(function() {
        window.location.href = "admin.html";
      }, 3500);
    } else {
      alert("Hatalı giriş yaptınız!");
    }
  });
});
