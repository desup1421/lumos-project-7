import React, { useState, useEffect } from "react";
import Scanner from "../components/Scanner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleScanner,
  getData,
  stockOut,
  stockIn,
} from "../redux/slices/productSlice";
import { useLocation } from "react-router";

const FormInventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const { productId, data, loading, isSuccess } = useSelector(
    (state) => state.products
  );
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    note: "",
    date: "",
    type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (path === "out") {
      dispatch(stockOut(formData));
    } else {
      dispatch(stockIn(formData));
    }
  };

  useEffect(() => {
    if (path === "out" || path === "in") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: new Date().toLocaleDateString("en-CA"),
        type: path === "out" ? "stock_out" : "stock_in",
      }));
    }
  }, [path]);

  useEffect(() => {
    if (productId) {
      dispatch(getData(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (data?.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        product_id: data.id,
      }));  
    } else {
      setFormData({
        product_id: "",
        quantity: "",
        note: "",
        date: new Date().toLocaleDateString("en-CA"),
        type: path === "out" ? "stock_out" : "stock_in",
      });
    }
  }, [data, path]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/inventory");
    }
  }, [isSuccess, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pages">
      <section>
        <Scanner />
        <form onSubmit={handleSubmit} className="form">
          <header className="section-header form-header">
            <h2>{`Stock-${path} Form`}</h2>
          </header>
          <button
            onClick={() => dispatch(toggleScanner())}
            className="btn-scan button"
            type="button"
          >
            <i className="bx bx-scan"></i> Scan
          </button>
          <div>
            <label className="label" htmlFor="productId">
              ID
            </label>
            <input
              className="input"
              type="text"
              id="productId"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              inputMode="numeric"
              className="input"
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="note">
              Note
            </label>
            <textarea
              className="input"
              cols="5"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormInventory;
