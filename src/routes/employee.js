const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const EmployeeController = require("../controllers/EmployeeController");
const upload = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, EmployeeController.index);
router.post("/show", authenticate, EmployeeController.show);
router.post(
  "/store",
  authenticate,
  upload.single("avatar"),
  EmployeeController.store
);
router.post("/update", authenticate, EmployeeController.update);
router.post("/delete", authenticate, EmployeeController.destroy);

module.exports = router;
