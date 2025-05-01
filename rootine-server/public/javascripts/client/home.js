/* サイドバーの開閉を行うボタンの設定 */
document.getElementById("openMenu")?.addEventListener("click", function() {
    this.classList.toggle("active");
    document.getElementById("sideBar")?.classList.toggle("active");
});

/* アプリパレットのアイコンの設定 */
// 複数のアプリアイコンを取得したあと、配列に変換して扱いやすくする
[...document.getElementsByClassName("app-button")]?.map(target => {
    // ボタンが押されるとクラスを付与（白くなる）
    target.addEventListener("pointerdown", () => {
        target.classList.add("active");
        target.firstElementChild?.classList.add("active");
    });
    // ボタンが離されると一定時間後クラスを除去（もとに戻る）
    target.addEventListener("pointerup", () => {
        openModal();
        setTimeout(() => {
            target.classList.remove("active");
            target.firstElementChild?.classList.remove("active");
        }, 100);
    });
});

/* モーダルウィンドウの設定 */
const modalArea = document.getElementById("modalArea");

modalArea.addEventListener("click", function(event) {
    if (event.target.closest(`.${this.firstElementChild.className}`) === null) {
        closeModal();
    }
});

const openModal = () => {
    modalArea.classList.add("active");
};

const closeModal = () => {
    modalArea.classList.remove("active");
}

/* ライブラリ：Tom Select の設定 */
// このJSより先にCDNでソースファイルを読み込んでおく
new TomSelect("#selectItems", {
    plugins: ["remove_button"],
    create: false,
    closeAfterSelect: false,
    hidePlaceholder: true
    /* fetchでDBから商品リストを取得する
    options: [
        { value: "option1", text: "Option 1" }
    ]
    */
});