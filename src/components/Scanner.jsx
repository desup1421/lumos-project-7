import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleScanner } from "../redux/slices/productSlice";

const Scanner = () => {
  const dispatch = useDispatch();
  const {isScan} = useSelector((state) => state.products);
  const location = useLocation();
  console.log(location.pathname);
  const [data, setData] = useState("Not Found");

  return (
    <div className={`scanner-container ${!isScan && 'close' }`}>
      <div className="btn-container">
        <button onClick={()=> dispatch(toggleScanner())} className="modal-button">
          <i className="bx bx-x"></i>
        </button>
      </div>
      <div className="scanner">
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) setData(result);
            else setData("Not Found 2");
          }}
          constraints={{
            facingMode: 'environment', // Gunakan kamera belakang
            width: 580, // Resolusi lebar
            height: 500, // Resolusi tinggi
            advanced: [{ focusMode: "continuous" }],
          }}
          
        />
        <p>{data}</p>
      </div>
    </div>
  );
};

export default Scanner;
