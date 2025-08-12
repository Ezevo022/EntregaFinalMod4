const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/logout", (req, res, next) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
