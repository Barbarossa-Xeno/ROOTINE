const router = require("express").Router();
const mongoose = require("mongoose");
const setting = require("../public/javascripts/setting").setting;

/*
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
*/

/**
 * ステータスによってログインページに表示するHTMLタグを作る
 * @param {string} message ログインステータスに関連したメッセージ
 * @returns HTMLタグ (class="logInMessage")
 */
function generateTag(message) {
    return `<div class=\"logInMessage\"><p>${message}</p></div>`;
}

router.get("/", (req, res, next) => {
    // login.ejsに message を渡す
    res.render("login", { messageArea: "", _userId: "" });
});

router.post("/", (req, res, next) => {
    mongoose.connect(setting.db.url);
    let db = mongoose.connection;
    
    // ステータスを出力
    db.on("error", () => console.error.bind("Failed to connect DB"));
    db.once("open", () => console.log("Succeeded to connect DB"));

    // アカウントを検索
    if (req.body.userId && req.body.password) {
        // ユーザーIDに該当するものを検索
        let target = setting.db.models.Account.findOne({ userId: req.body.userId });
        target.then((result, error) => {
                // 該当しなかった場合
                if (!result) {
                    // IDが見つからなかった旨のメッセージを添付して再読込
                    return res.render("login", {
                        messageArea: generateTag("IDが見つかりませんでした。"),
                        _userId: ""
                    });
                }
                // 該当した場合
                else if (result && !error) {
                    if (result.password === req.body.password) {
                        return res.redirect("/?test=100");
                    }
                    else {
                        // パスワードに誤りがある旨のメッセージを添付して再読込
                        return res.render("login", {
                            messageArea: generateTag("パスワードが間違っています。"),
                            _userId: req.body.userId
                        });
                    }
                }
                // 何らかのエラーが発生した場合
                else {
                    return res.render("login", {
                        messageArea: generateTag("エラーが発生しました。時間をおいてやり直してください。"),
                        _userId: ""
                    });
                }
            });
    }
    else if (!req.body.userId || !req.body.password) {
        return res.render("login", {
            messageArea: generateTag("IDとパスワードを正しく入力しているか確認してください。"),
            _userId: ""
        });
    }
});


module.exports = router;