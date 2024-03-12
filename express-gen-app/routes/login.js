const router = require("express").Router();
const mongoose = require("mongoose");
const setting = require("../public/javascripts/setting").setting;

/**
 * ステータスによってログインページに表示するHTMLタグを作る
 * @param {string} message ログインステータスに関連したメッセージ
 * @returns HTMLタグ (class="logInMessage")
 */
function generateTag(message) {
    return `<div class=\"logInMessage\"><p>${message}</p></div>`;
}

router.get("/", (req, res, next) => {
    if (req.session.isLogegdIn) {
        return res.redirect(`/${req.session.userId}`);
    }
    // login.ejsに データ を渡す
    res.render("login", { messageArea: "", _userId: "" });
});

// form からデータをPOSTで受け取る
router.post("/", (req, res, next) => {
    // DBに接続
    mongoose.connect(setting.db.url);
    let db = mongoose.connection;
    
    // ステータスを出力
    db.on("error", () => console.error.bind("Failed to connect DB"));
    // db.once("open", () => console.log("Succeeded to connect DB"));

    // アカウントを検索
    if (req.body.userId && req.body.password) {
        // ユーザーIDに該当するものを検索
        let target = setting.db.models.Account.findOne({ userId: req.body.userId });
        target.then((result, error) => {
                // 該当しなかった場合
                if (!result) {
                    // IDが見つからなかった旨のメッセージを添付して再描画
                    return res.render("login", {
                        messageArea: generateTag("IDが見つかりませんでした。"),
                        _userId: ""
                    });
                }
                // 該当した場合
                else if (result && !error) {
                    if (result.password === req.body.password) {
                        // req.session.isLogegdIn = true;
                        req.session.userId = req.body.userId;
                        return res.redirect(`/${req.body.userId}`);
                    }
                    else {
                        // パスワードに誤りがある旨のメッセージを添付して再描画
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
    // IDやパスワードが未入力または不正の場合
    else if (!req.body.userId || !req.body.password) {
        return res.render("login", {
            messageArea: generateTag("IDとパスワードを正しく入力しているか確認してください。"),
            _userId: ""
        });
    }
});


module.exports = router;