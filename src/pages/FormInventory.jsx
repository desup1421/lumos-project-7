import React from "react";
import Scanner from "../components/Scanner";
import { useDispatch } from "react-redux";
import { toggleScanner } from "../redux/slices/productSlice";

const FormInventory = () => {
  const dispatch = useDispatch();
  return (
    <div className="pages">
      <section>
				<Scanner />
        <form className="form">
          <header className="section-header form-header">
            <h2>Add Product</h2>
          </header>
					<button 
            onClick={() =>dispatch(toggleScanner())}
            className="btn-scan button"
            type="button"
          >
            <i className="bx bx-scan"></i> Scan
          </button>
          <div>
            <label className="label" htmlFor="productId">
              ID
            </label>
            <input className="input" type="text" id="productId" />
          </div>
          <div>
            <label className="label" htmlFor="productName">
              Name
            </label>
            <input className="input" type="text" id="productName" />
          </div>
          <div>
            <label className="label" htmlFor="productDescription">
              Description
            </label>
            <textarea
              className="input"
              cols="5"
              name="description"
              id="productDescription"
            ></textarea>
          </div>
          <div>
            <label className="label" htmlFor="productPrice">
              Price
            </label>
            <input inputMode="numeric" className="input" type="text" id="productPrice" />
          </div>
          <div>
            <label className="label" htmlFor="productStock">
              Stock
            </label>
            <input inputMode="numeric" className="input" type="text" id="productStock" />
          </div>
          <button type="submit" className="button">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default FormInventory;
