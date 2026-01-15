import React, { useState, useEffect } from "react";
import { createCategory, removeCategory } from "../../shop/api/Category";
import useEconStore from "../../../app/store/ecom-store";
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
    if (!name)
      return toast.error("Please fill in the category name", {
        autoClose: 1000,
      });
    try {
      const res = await createCategory(token, { name });
      setName("");
      toast.success(`Category Added ${res.data.name} success !`, {
        autoClose: 1000,
      });
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Category Deleted ${res.data.name} success !`, {
        autoClose: 1000,
      });
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center font-bold text-2xl text-gray-800 mb-6">
        Category Management
      </h1>

      <form className="my-4 flex justify-center gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Category Name"
          value={name}
        />
        <button className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 transition duration-200">
          Add Category
        </button>
      </form>
      <hr className="my-4" />

      <table className="w-full text-center">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border px-4 py-3 text-sm font-semibold text-gray-700">
              Category Name
            </th>
            <th className="border px-4 py-3 text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">
                <button
                  className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-200"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormCategory;
