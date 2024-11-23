import React from "react";

const Dashboard = () => {
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
            <p className="card-value">90</p>
            <p className="card-title">Total product</p>
          </div>
          <div className="card">
            <i className="bx bx-line-chart card-icon"></i>
            <p className="card-value">90</p>
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
          <h2>Low Stock Product</h2>
        </header>
        <div className='table-container'>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
              </tr>
              <tr>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
