const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

/*
 BORROW BOOK
*/
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "No copies available",
      });
    }

    const existingBorrow =
      await Borrow.findOne({
        user: req.user._id,
        book: bookId,
        returned: false,
      });

    if (existingBorrow) {
      return res.status(400).json({
        message: "Book already borrowed",
      });
    }

    const borrow =
      await Borrow.create({
        user: req.user._id,
        book: bookId,
      });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
 RETURN BOOK
*/
const returnBook = async (req, res) => {
  try {
    const borrow =
      await Borrow.findById(
        req.params.id
      );

    if (!borrow) {
      return res.status(404).json({
        message:
          "Borrow record not found",
      });
    }

    if (borrow.returned) {
      return res.status(400).json({
        message:
          "Book already returned",
      });
    }

    borrow.returned = true;
    borrow.returnDate = new Date();

    await borrow.save();

    const book =
      await Book.findById(
        borrow.book
      );

    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.status(200).json({
      message:
        "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
 STUDENT HISTORY
*/
const getBorrowHistory = async (
  req,
  res
) => {
  try {
    const history =
      await Borrow.find({
        user: req.user._id,
      })
        .populate("book")
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      history
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

/*
 CURRENTLY BORROWED BOOKS
 FOR MANAGER
*/
const getAllBorrowHistory =
  async (req, res) => {
    try {
      const history =
        await Borrow.find({
          returned: false,
        })
          .populate(
            "book",
            "title author"
          )
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        history
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/*
 CURRENTLY BORROWED BOOKS
 FOR STUDENT
*/
const getMyBooks = async (
  req,
  res
) => {
  try {
    const books =
      await Borrow.find({
        user: req.user._id,
        returned: false,
      })
        .populate("book")
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      books
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getMyBooks,
  getBorrowHistory,
  getAllBorrowHistory,
};