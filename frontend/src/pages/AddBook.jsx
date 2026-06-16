import { useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import api from "../services/api";

const AddBook = () => {
  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      isbn: "",
      category: "",
      totalCopies: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await api.post(
          "/books",
          formData
        );

        alert(
          "Book Added Successfully"
        );

        setFormData({
          title: "",
          author: "",
          isbn: "",
          category: "",
          totalCopies: "",
        });
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

return (
  <DashboardLayout>

    <h1>➕ Add New Book</h1>

    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >

      <input
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
      />

      <input
        name="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        name="totalCopies"
        type="number"
        placeholder="Copies"
        value={formData.totalCopies}
        onChange={handleChange}
      />

      <button type="submit">
        Add Book
      </button>

    </form>

  </DashboardLayout>
);

};

export default AddBook;