import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, getData } from "../redux/slices/productSlice";
import { useNavigate } from "react-router";

const Inventory = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    dispatch(getData(id));
    navigate("/inventory/update");
  };

  const handleDelete = (id) => {
    dispatch(getData(id));
    navigate("/inventory/delete");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="inventory pages">
      <section>
        <header className="section-header">
          <h2>Product List</h2>
        </header>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button onClick={()=> handleEdit(product.id)} className="button btn-warning"><i className="bx bx-pencil"></i></button>
                    <button onClick={() => handleDelete(product.id)} className="button btn-danger"><i className="bx bx-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Inventory;
