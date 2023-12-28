import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SketchPicker } from "react-color";

const UpdateProductForm = ({ productInfo, onUpdate, onCancel }) => {
  const [updatedProductInfo, setUpdatedProductInfo] = useState({ ...productInfo });

  const handleUpdate = () => {
    onUpdate(updatedProductInfo);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={updatedProductInfo.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            type="number"
            name="price"
            value={updatedProductInfo.price}
            onChange={handleInputChange}
          />
        </Grid>
        {/* Add other input fields for the product information */}
        {/* ... */}
      </Grid>
      <Button
        style={{
          backgroundColor: "#14337C",
          color: "white",
          border: "none",
          padding: ".5rem",
          borderRadius: "1rem",
          width: "8dvw",
          fontFamily: "poppins",
          fontWeight: 500,
          cursor: "pointer",
          fontSize: ".8rem",
          marginRight: "1rem",
        }}
        onClick={handleUpdate}
      >
        Update Product
      </Button>
      <Button
        style={{
          backgroundColor: "#FF0000",
          color: "white",
          border: "none",
          padding: ".5rem",
          borderRadius: "1rem",
          width: "8dvw",
          fontFamily: "poppins",
          fontWeight: 500,
          cursor: "pointer",
          fontSize: ".8rem",
        }}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </form>
  );
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setOpen(true);
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleUpdateProduct = (updatedProductInfo) => {
    // Replace the following log with your actual API request logic for updating the product
    console.log("Updated Product Info:", updatedProductInfo);

    setOpen(false);
    setEditingProduct(null);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => handleEdit(productInfo)} // Pass the productInfo to edit
      >
        Editar<EditIcon />
      </Button>

      <Modal open={open} onClose={handleCancelEdit}>
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose />
          <Typography
            component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Edit Product
          </Typography>

          {editingProduct && (
            <UpdateProductForm
              productInfo={editingProduct}
              onUpdate={handleUpdateProduct}
              onCancel={handleCancelEdit}
            />
          )}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
