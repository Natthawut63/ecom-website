import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, updateProduct } from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Core i3",
  description: "desc",
  price: 24590,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const category = useEcomStore((state) => state.categories);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log(res);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`Product Updated: ${res.data.title} success!!!`, { autoClose: 1000 });
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Product Information</h1>

        <div className="space-y-4">
        <p>Product Title :</p>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            name="title"
          />
         <p>description :</p>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            name="description"
          />
          <p>Price :</p>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            name="price"
          />
          <p>Quantity :</p>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            name="quantity"
          />
          <p>Category :</p>
          <select
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="categoryId"
            onChange={handleChange}
            value={form.categoryId}
          >
            <option value="" disabled>Please Select a Category</option>
            {category.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="border-gray-300 my-6" />
        
        {/* Upload File Component */}
        <Uploadfile form={form} setForm={setForm} />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default FormEditProduct;
