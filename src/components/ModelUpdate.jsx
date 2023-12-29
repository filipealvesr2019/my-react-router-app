// ModelUpdate.js
import React, { useState } from "react";
import "./ModelUpdate.css"; // Import your CSS file for styling

const ModelUpdate = ({ selectedProduct, onCloseForm }) => {
  const [updatedProductName, setUpdatedProductName] = useState(
    selectedProduct.name || ""
  );

  const handleUpdate = async () => {
    // Your logic for updating the product
    // For simplicity, we'll just log the updated product name for now
    console.log(`Updating product with ID ${selectedProduct._id} to ${updatedProductName}`);

    // After updating, close the form
    onCloseForm();
  };

  return (
    <div className="overlay">
      <div className="update-modal">
        <h2>Update Product</h2>
        <form>
          <label>
            Product Name:
            <input
              type="text"
              value={updatedProductName}
              onChange={(e) => setUpdatedProductName(e.target.value)}
            />
          </label>
          {/* Add more input fields as needed for updating other product details */}
          <div style={{ marginTop: "10px" }}>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={onCloseForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelUpdate;
