const { Router } = require("express");
const router = Router();

const {
  insertUser,
  getUsers,
  getUsersByID,
  updateUserByID,
  deleteUserByID,
} = require("../controllers/index.users");

// main navigation
router.get("/", function (req, res) {
  res.render("pages/index");
});

router.get("/insert", function (req, res) {
  res.render("pages/insert", { inserted: null, error: null });
});

router.get("/list", getUsers);

router.get("/listbyid", function (req, res) {
  res.render("pages/listbyid", {
    table: [{}],
    found: null,
  });
});

router.get("/update", function (req, res) {
  res.render("pages/update");
});

router.get("/delete", function (req, res) {
  res.render("pages/delete", { deleted: null, error: null });
});

//post functions
router.post("/listbyid", getUsersByID);

router.post("/update", updateUserByID);

router.post("/insert", insertUser);

//delete functions
router.delete("/delete/:id", deleteUserByID);

module.exports = router;
