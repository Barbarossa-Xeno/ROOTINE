const router = require("express").Router();
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";
const Order = mongoose.model("order", { itemName: String, count: Number });
let db = mongoose.connection;

function connectDB() {
    mongoose.connect(url);
    db = mongoose.connection;
    db.on("error", () => console.error.bind("Failed to connect DB"));
    db.once("open", () => console.log("Succeeded to connect DB"));
    return db;
}

router.get("/", (req, res, next) => {
    connectDB();

    // すべてを参照するときは、空のオブジェクト
    Order.find({}).then((result, err) => {
        if (err) {
            console.log(err);
        }
        if (result != null) {
            res.render("form", {message: "", orders: result});
        }
    });
});

router.post("/", (req, res, next) => {
    connectDB();
    
    if (req.body.itemName || req.body.count) {
        let order = new Order({itemName: req.body.itemName, count: req.body.count });
        order.save().then((result => console.log(result)));
    }

    Order.find({}).then((result, err) => {
        res.render("form", { message: "注文情報を登録しました。", orders: result});
    });
    
});

module.exports = router;