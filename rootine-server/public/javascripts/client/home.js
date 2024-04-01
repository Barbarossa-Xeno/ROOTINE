// サイドバーの開閉を行うボタンの設定
document.getElementById("openMenu")?.addEventListener("click", function() {
    this.classList.toggle("active");
    document.getElementById("sideBar")?.classList.toggle("active");
});