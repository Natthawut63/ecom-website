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
    price: 0,
    quantity: 0,
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
      toast.success(`Product Added ${res.data.title} success!!!`);
      setForm(initialState);
      getProduct(100);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("คุณต้องการลบสินค้าหรือไม่")) {
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success(`Product Deleted ${res.data.title} success!!!`);
        getProduct(100);
        setForm(initialState);
      }
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

        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover-translate-y-1 hover:duration-200">
          เพิ่มสินค้า
        </button>
        <hr />
        <br />
        <table className="table w-full border ">
          <thead>
            <tr className="bg-gray-200 boder">
              <th scope="col">No.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">price</th>
              <th scope="col">Count</th>
              <th scope="col">SellCount</th>
              <th scope="col">DateUpdate</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {item.images.length > 0 ? (
                    <img
                      className="w-24 h-24 rounded-lg shadow-md"
                      src={item.images[0].url}
                    />
                  ) : (
                    <div
                      className="w-24 h-24 bg-gray-200 rounded-md 
                                                    flex items-center justify-center shadow-sm"
                    >
                      No Image
                    </div>
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{formatNumber(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{item.sold}</td>
                <td>{dateFormat(item.updatedAt)}</td>
                <td className="flex gap-2">
                  <p
                    className="bg-yellow-500 rounded-md p-1 shadow-md text-center
                  hover:scale-105 hover-translate-y-1 hover:duration-200"
                  >
                    <Link to={"/admin/product/" + item.id}>edit</Link>
                  </p>
                  <p
                    className="bg-red-500 rounded-md p-1 shadow-md text-center 
                    hover:scale-105 hover-translate-y-1 hover:duration-200"
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
