const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.redirect("index");
});

router.get("/:userId", (req, res, next) => {
    res.render("home", { userId: req.params.userId });
});

module.exports = router;