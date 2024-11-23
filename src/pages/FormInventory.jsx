import React, { useState, useEffect } from "react";
import Scanner from "../components/Scanner";
import { useSelector, useDispatch } from "react-redux";
import { toggleScanner, getData, updateProduct, addProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const FormInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId, data, loading, isAddData, isSuccess } = useSelector((state) => state.products);
  const [formData, setFormData] = useState(
    {
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isAddData) {
      dispatch(addProduct(formData));
    } else {
      dispatch(updateProduct(formData));
    }
  }

  useEffect(() => {
    if (productId) {
      dispatch(getData(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (data?.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data,
      }));
    }
  }, [data]);

  useEffect(() => {
    if(isSuccess) {
      navigate('/inventory');
    }
  },[isSuccess, navigate]);

  if(loading) {
    return(
      <p>Loading...</p>
    )
  }

  return (
    <div className="pages">
      <section>
        <Scanner />
        <form onSubmit={handleSubmit} className="form">
          <header className="section-header form-header">
            <h2>{isAddData ? 'Add Product' : 'Edit Product'}</h2>
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
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="productName">
              Name
            </label>
            <input
              className="input"
              type="text"
              id="productName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="productDescription">
              Description
            </label>
            <textarea
              className="input"
              cols="5"
              id="productDescription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label className="label" htmlFor="productPrice">
              Price
            </label>
            <input
              inputMode="numeric"
              className="input"
              type="text"
              id="productPrice"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="productStock">
              Stock
            </label>
            <input
              inputMode="numeric"
              className="input"
              type="text"
              id="productStock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormInventory;
