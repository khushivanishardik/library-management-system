import api from "./api";

export const getBooks = async () => {
  const res = await api.get("/books");
  return res.data;
};

export const getManagerStats =
  async () => {

    const { data } =
      await api.get(
        "/books/manager-stats"
      );

    return data;
  };