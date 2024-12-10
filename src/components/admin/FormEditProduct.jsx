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
    console.log(e.target.value, e.target.name);
    setForm({
      ...form, //key : value
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token,id, form);
      console.log(res);
      toast.success(`Product Added ${res.data.title} success!!!`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          name="description"
        />
        <input
          type="number"
          className="border"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          name="price"
        />
        <input
          type="number"
          className="border"
          value={form.quantity}
          onChange={handleChange}
          placeholder="quantity"
          name="quantity"
        />
        <select
          required
          className="border"
          name="categoryId"
          onChange={handleChange}
          value={form.categoryId}
        >
          <option value="" disabled>
            {" "}
            Please Select
          </option>
          {category.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
        {/* upload file */}
        <Uploadfile form={form} setForm={setForm} />

        <button className="bg-blue-500">เเก้ไขสินค้า</button>
        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
