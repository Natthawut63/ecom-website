import React, { useState, useEffect } from "react";
import { createCategory, removeCategory } from "../../shop/api/Category";
import useEconStore from "../../../app/store/ecom-store";
import { toast } from "react-toastify";
import { Plus, Trash2, Layers } from "lucide-react";

const FormCategory = () => {
  const token = useEconStore((state) => state.token);
  const [name, setName] = useState("");
  const categories = useEconStore((state) => state.categories);
  const getCategory = useEconStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name)
      return toast.error("Please enter a category name", { autoClose: 1000 });
    try {
      const res = await createCategory(token, { name });
      setName("");
      toast.success(`Category "${res.data.name}" added!`, { autoClose: 1000 });
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await removeCategory(token, id);
      toast.success(`Category "${res.data.name}" deleted!`, { autoClose: 1000 });
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
        <p className="text-gray-500 mt-1">Manage product categories</p>
      </div>

      {/* Add Category Form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <div className="flex-1 relative">
            <Layers className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              type="text"
              placeholder="Enter category name"
              value={name}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Layers className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Layers className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No categories yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCategory;
