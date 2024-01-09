import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import ModelProducts from "./components/ModelProducts"
import Pagination from "@mui/material/Pagination";
import styles from "./EmployeePage.module.css";

const EmployeePage = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    size: "",
    category: "",
    subcategory: "",
    variations: [
      {
        color: "", // Assuming color is a string
        urls: [], // Make sure this is an array
      },
    ],
  });

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/products?page=${currentPage}&keyword=${searchTerm}`
      );


      const totalProducts = response.data.productsCount;
      const validItemsPerPage =
        Number.isFinite(itemsPerPage) && itemsPerPage > 0;

      if (Number.isFinite(totalProducts) && validItemsPerPage) {
        setTotalPages(Math.ceil(totalProducts / itemsPerPage));
      } else {
        console.error("TotalProducts or ItemsPerPage is not a valid number");
      }

      setProducts(response.data.products);
    } catch (error) {
      console.error("Erro ao obter produtos", error);
      setError("Erro ao obter produtos. Por favor, tente novamente.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          height: "12vh",
          backgroundColor: "#2196F3",
        }}
      >
        <h1
          style={{ fontSize: "1.3rem", color: "white", marginLeft: "1.5rem" }}
        >
          Painel Administrativo
        </h1>
      </div>
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar por produto..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            margin: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "50vw",
          }}
        />
      </div>

      <div className={styles.Model}>
        <ModelProducts />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
          position: "relative",
        }}
      >
        <main style={{ position: "sticky" }}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className={styles.h1Container}>
            <h1 style={{ fontSize: "1.5rem", color: "#2A337C" }}>
              Cadastro de produtos
            </h1>
          </div>

          <div>
            <table style={{ margin: "0 auto", width: "50vw" }}>
              <thead>
                <tr>
                  <th>Produtos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr className={styles.td} key={product._id}>
                    <td className={styles.td}>{product.name}</td>
                    <td>
                      {/* Actions removed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                count={isNaN(totalPages) ? 1 : totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                style={{
                  marginBottom: "1rem",
                  position: "sticky",
                  bottom: "0",
                  zIndex: "1",
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default EmployeePage;
