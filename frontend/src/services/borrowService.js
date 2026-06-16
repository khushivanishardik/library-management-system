import api from "./api";

export const borrowBook = async (
  bookId
) => {
  const { data } =
    await api.post(
      "/borrow",
      { bookId }
    );

  return data;
};

export const getMyBooks =
  async () => {
    const { data } =
      await api.get(
        "/borrow/my-books"
      );

    return data;
  };

export const returnBook =
  async (borrowId) => {
    const { data } =
      await api.put(
        `/borrow/return/${borrowId}`
      );

    return data;
  };

export const getBorrowHistory =
  async () => {
    const { data } =
      await api.get(
        "/borrow/history"
      );

    return data;
  };

export const getAllBorrowHistory =
  async () => {
    const { data } =
      await api.get(
        "/borrow/all-history"
      );

    return data;
  };