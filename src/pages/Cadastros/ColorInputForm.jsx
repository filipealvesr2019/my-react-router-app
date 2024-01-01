import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ColorInputForm = () => {
  const [color, setColor] = useState("");
  const [urls, setUrls] = useState([]);
  const [isColorAdded, setIsColorAdded] = useState(false);

  const handleAddUrl = () => {
    // You may want to add additional validation for URLs
    setUrls([...urls, ""]);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can now use 'color' and 'urls' in your logic
    console.log("Color:", color);
    console.log("URLs:", urls);

    // Reset the form
    setColor("");
    setUrls([]);
    setIsColorAdded(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Cor (Português)"
        variant="outlined"
        fullWidth
        name="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        onClick={() => setIsColorAdded(false)}
        InputProps={{
          style: { marginTop: "10px" },
        }}
      />
      {isColorAdded && (
        <div>
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "0.5rem", whiteSpace: "nowrap" }}>
              Cor adicionada:
            </div>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: color,
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <span style={{ whiteSpace: "nowrap", marginTop: "0.5rem" }}>
            Número de URLs adicionadas: {urls.length}
          </span>
        </div>
      )}
      {urls.map((url, index) => (
        <TextField
          key={index}
          label={`URL ${index + 1}`}
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => handleUrlChange(index, e.target.value)}
          InputProps={{
            style: { marginTop: "10px" },
          }}
        />
      ))}
      <Button
        onClick={handleAddUrl}
        style={{
          backgroundColor: "#14337C",
          color: "white",
          border: "none",
          padding: ".5rem",
          borderRadius: "1rem",
          width: "15vw",
          marginTop: "1.3rem",
        }}
      >
        Adicionar URL
      </Button>
      <Button
        type="submit"
        style={{
          backgroundColor: "#14337C",
          color: "white",
          border: "none",
          padding: ".5rem",
          borderRadius: "1rem",
          width: "8vw",
          marginTop: ".4rem",
        }}
      >
        Enviar
      </Button>
    </form>
  );
};

export default ColorInputForm;
