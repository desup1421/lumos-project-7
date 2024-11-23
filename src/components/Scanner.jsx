import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useSelector, useDispatch } from "react-redux";
import { toggleScanner, getData } from "../redux/slices/productSlice";

const Scanner = () => {
  const dispatch = useDispatch();
  const { isScan } = useSelector((state) => state.products);

  return (
    <div className={`scanner-container ${!isScan && 'close' }`}>
      <div className="btn-container">
        <button onClick={()=> dispatch(toggleScanner())} className="modal-button">
          <i className="bx bx-x"></i>
        </button>
      </div>
      {/* <div>
        <button className="button" onClick={() => dispatch(getData('9786237100072a'))}>click</button>
      </div> */}
      <div className="scanner">
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) dispatch(getData(result.text));
          }}
          constraints={{
            facingMode: 'environment', // Use back camera
            advanced: [{ focusMode: "continuous" }],
          }}
          
        />
      </div>
    </div>
  );
};

export default Scanner;
