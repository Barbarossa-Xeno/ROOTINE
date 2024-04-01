import express from "express"
import mongoose from "mongoose";
import { setting } from "../public/typescripts/util/setting"

const router = express.Router();

router.get("/", (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect(`/${req.session.userId}`);
    }
    // login.ejsに データ を渡す
    res.render("login", { message: null });
});

// form からデータをPOSTで受け取る
router.post("/", async (req, res, next) => {
    // DBに接続
    mongoose.connect(setting.db.url);
    let db = mongoose.connection;
    
    // ステータスを出力
    db.on("error", () => console.error.bind("Failed to connect DB"));
    // db.once("open", () => console.log("Succeeded to connect DB"));

    // アカウントを検索
    if (req.body.userId && req.body.password) {
        // ユーザーIDに該当するものを検索
        // lean() は元々のMongooseドキュメントからJSオブジェクトに整形したものを返す
        let result = await setting.db.models.Account.findOne({ userId: req.body.userId }).lean();
        // 該当しなかった場合
        if (result == null) {
            return res.render("login", {
                message: "IDが見つかりませんでした。"
            });
        }
        // 該当した場合
        else {
            if (result.password === req.body.password) {
                req.session.isLoggedIn = true;
                req.session.userId = req.body.userId;
                return res.redirect(`/${req.body.userId}`);
            }
            // IDは該当したがパスワードが誤っていた場合
            else {
            // パスワードに誤りがある旨のメッセージを添付して再描画
                return res.render("login", {
                    message: "パスワードが間違っています。"
                });
            }
       }
    }
    // IDやパスワードが未入力または不正の場合
    else if (!req.body.userId || !req.body.password) {
        return res.render("login", {
            message: "IDとパスワードを正しく入力しているか確認してください。"
        });
    }
});


export default router;