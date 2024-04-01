/**
 * ターゲットのHTML要素にクラスを与えてアニメーションさせる
 * @param { Element[] } targets アニメーションさせる要素
 */
function giveAnimation(targets) {
    // ターゲットの画面上部からの高さが表示ウィンドウの高さを下回ったら表示されていることになる
    targets.filter(target => target.getBoundingClientRect().top <= window.innerHeight)
           .map(target => target.classList.add("active"));
  }

  // 処理しやすいようにスプレッド構文で予め配列にしておく
  let targets = [
    ...document.getElementsByClassName("left-object caption"),
    ...document.getElementsByClassName("right-object caption"),
    ...document.getElementsByClassName("left-object phrase"),
    ...document.getElementsByClassName("right-object phrase")
  ];

  // ページロード時とスクロール時で要素が見えているか確認して発火させる
  window.addEventListener("load", () => giveAnimation(targets));
  window.addEventListener("scroll", () => giveAnimation(targets));