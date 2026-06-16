const express = require("express");

const router =
  express.Router();

const {
  borrowBook,
  returnBook,
  getMyBooks,
  getBorrowHistory,
  getAllBorrowHistory,
} = require(
  "../controllers/borrowController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/*
 Borrow Book
*/
router.post(
  "/",
  protect,
  borrowBook
);

/*
 Return Book
*/
router.put(
  "/return/:id",
  protect,
  returnBook
);

/*
 My Books
*/
router.get(
  "/my-books",
  protect,
  getMyBooks
);

/*
 History
*/
router.get(
  "/history",
  protect,
  getBorrowHistory
);

router.get(
  "/all-history",
  protect,
  getAllBorrowHistory
);

module.exports = router;