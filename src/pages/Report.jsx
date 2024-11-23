import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogs, filterStockIn, filterStockOut } from "../redux/slices/productSlice";

const Report = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);
	
  if (loading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pages">
      <section>
        <header className="section-header">
          <h2>Reports</h2>
        </header>
        <div className="btn-filter-group">
            <button onClick={() => dispatch(fetchLogs())} className="button btn-filter">All</button>
            <button onClick={() => dispatch(filterStockIn())} className="button btn-filter">Stock-in</button>
            <button onClick={() => dispatch(filterStockOut())} className="button btn-filter">Stock-out</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>ID</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.date}</td>
                  <td>{log.product_id}</td>
                  <td>{log.type}</td>
                  <td>{log.quantity}</td>
                  <td>{log.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Report;
