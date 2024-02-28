const router = require("express").Router();

let data = { title: "", content: "" };

router.get("/", (req, res, next) => {
    
    // クエリパラメータを使うときのためのメモ
    let message = req.query.userId
                    ? `<b>${req.query.userId}さん、こんにちは。</b><br>ログイン画面です。<br>The time to log in now.`
                    : "<br>ログイン画面です。<br>The time to log in now.";
    // セッションを利用するときのためのメモ
    message = req.session.userId
                ? message + `<br>前回のログインID: ${req.session.userId}`
                : message;

    const _data = {
        title: "LOG IN",
        content: message
    };

    res.render("login", data.title == "" ? _data : data != _data ? data : _data);
    data = _data;
});

router.post("/post", (req, res, next) => {

    // セッションに値を保存するときのメモ
    req.session.userId = req.body["userId"];

    const _data = {
        title: "LOG IN",
        content: `ID: ${req.body["userId"]} さん<br>パスワード: ${req.body["password"]} が入力されました`
    };

    // res.render("login", _data);
    data = _data;
    res.redirect("/login")
});

module.exports = router;