import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEconStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEconStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useEconStore((state) => state.categories);
  const getCategory = useEconStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []); //block infinite loop

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Please fill in the category name");
    try {
      const res = await createCategory(token, { name });
      toast.success(`Category Added ${res.data.name} success!!!`);
      getCategory(token);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Category Deleted ${res.data.name} success!!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500">Add Category</button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            <span>{item.name}</span>
            <button
              className="bg-red-500"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
        <li>Cate</li>
      </ul>
    </div>
  );
};

export default FormCategory;
