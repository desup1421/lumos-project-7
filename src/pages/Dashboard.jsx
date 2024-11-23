import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, highDemand } from "../redux/slices/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalProduct, highestDemand, soldProduct } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(highDemand());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="dashboard pages">
      <section>
        <header className="section-header">
          <h2>Dashboard</h2>
          <p>This is the dashboard page.</p>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <i className="bx bx-package card-icon"></i>
            <p className="card-value">{totalProduct}</p>
            <p className="card-title">Total product</p>
          </div>
          <div className="card">
            <i className="bx bx-line-chart card-icon"></i>
            <p className="card-value">{soldProduct}</p>
            <p className="card-title">Number of sales</p>
          </div>
          <div className="card">
            <i className="bx bx-dollar card-icon"></i>
            <p className="card-value">90</p>
            <p className="card-title">Total sales amount</p>
          </div>
        </div>
      </section>

      <section>
        <header className="section-header">
          <h2>High Demand Product</h2>
        </header>
        <div className='table-container'>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Demand</th>
              </tr>
            </thead>
            <tbody>
              {highestDemand.map((product) => (
                <tr key={product[0]}>
                  <td>{product[0]}</td>
                  <td>{product[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
