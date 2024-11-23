import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Scanner from "../components/Scanner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  toggleScanner,
  getData,
  deleteProduct,
} from "../redux/slices/productSlice";

const FormDelete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId, data, loading } = useSelector((state) => state.products);
  const [formData, setFormData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getData(formData));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(data.id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        navigate("/inventory");
      }
    });
  }

  useEffect(() => {
    if (productId) {
      dispatch(getData(productId));
    }
  }, [productId, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pages">
      <section>
        <Scanner />
        <form onSubmit={handleSubmit} className="form">
          <header className="section-header form-header">
            <h2>Search product to delete</h2>
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
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            Search
          </button>
        </form>
      </section>
      {data.id && !data.name && (
        <div className="text-center">Product not found</div>
      )}
      {data.name && (
        <section>
          <header className="section-header">
            <h2>Product List</h2>
          </header>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.stock}</td>
                  <td>
                    <button 
                        onClick={handleDelete}
                        className="button btn-danger"
                        disabled={loading}
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default FormDelete;
