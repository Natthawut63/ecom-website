import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const category = useEcomStore((state) => state.categories);

  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: null,
    quantity: null,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    setForm({
      ...form, //key : value
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      console.log(res);
      toast.success(`Product Added ${res.data.title} success !` , {autoClose: 1000});
      setForm(initialState);
      getProduct(100);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete the product?")) {
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success(`Product Deleted ${res.data.title} success !`, {autoClose: 1000});
        getProduct(100);
        setForm(initialState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-2 bg-white shadow-lg rounded-md w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold text-center">Manage Product</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleChange}
            placeholder="ชื่อสินค้า"
            name="title"
            required
          />
          <input
            type="text"
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={handleChange}
            placeholder="คำบรรยายสินค้า"
            name="description"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="number"
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.price}
            onChange={handleChange}
            placeholder="ราคา"
            name="price"
            required
          />
          <input
            type="number"
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.quantity}
            onChange={handleChange}
            placeholder="จำนวนสินค้า"
            name="quantity"
            required
          />
        </div>

        <select
          required
          className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          name="categoryId"
          onChange={handleChange}
          value={form.categoryId}
        >
          <option value="" disabled>
            {" "}
            เลือกหมวดหมู่สินค้า
          </option>
          {category.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* upload file */}
        <Uploadfile form={form} setForm={setForm} />

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add Product
          </button>
        </div>
        <hr className="my-6" />

        <table className="min-w-full table-auto mt-6">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">price</th>
              <th className="px-4 py-2 text-left">Count</th>
              <th className="px-4 py-2 text-left">SellCount</th>
              <th className="px-4 py-2 text-left">DateUpdate</th>
              <th className="px-4 py-2 text-left">Manage</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <th className="px-4 py-2">{index + 1}</th>
                <td className="px-4 py-2">
                  {item.images.length > 0 ? (
                    <img
                      className="w-24 h-24 rounded-lg shadow-md"
                      src={item.images[0].url}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{formatNumber(item.price)}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.sold}</td>
                <td className="px-4 py-2">{dateFormat(item.updatedAt)}</td>
                <td className="px-4 py-2 flex justify-center items-center gap-3">
                  <p className="bg-yellow-500 text-white px-4 py-2 rounded-md text-center hover:bg-yellow-600">
                    <Link to={"/admin/product/" + item.id}>edit</Link>
                  </p>
                  <p
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-center hover:bg-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
