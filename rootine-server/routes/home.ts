import express from "express"
const router = express.Router();

router.get("/", (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.render("home", { userId: req.session.id });
    }
    res.redirect("index");
});

router.get("/:userId", (req, res, next) => {
    if (req.session.userId === req.params.userId) {
        res.render("home", { userId: req.params.userId });
    }
    else {
        res.redirect("login");
    }
});

export default router;