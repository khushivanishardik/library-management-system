const express = require("express");

const admin = require(
  "../middleware/adminMiddleware"
);

const router = express.Router();

const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getManagerStats,
} = require("../controllers/bookController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/", getBooks);

router.get(
  "/manager-stats",
  protect,
  getManagerStats
);

router.get("/:id", getBookById);



router.post("/", protect, admin, addBook);

router.put("/:id", protect, admin , updateBook);

router.delete("/:id", protect, admin, deleteBook);

module.exports = router;