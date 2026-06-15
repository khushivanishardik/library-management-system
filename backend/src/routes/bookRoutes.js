const express = require("express");

const router = express.Router();

const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", protect, addBook);

router.put("/:id", protect, updateBook);

router.delete("/:id", protect, deleteBook);

module.exports = router;