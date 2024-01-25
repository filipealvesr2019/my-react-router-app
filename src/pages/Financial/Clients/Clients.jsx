import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/joy";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getVendors();
  }, [currentPage, searchTerm]);

  const getVendors = async () => {
    try {
      // Se houver um termo de pesquisa, faz uma solicitação de pesquisa separada.
      if (searchTerm) {
        const searchResponse = await axios.get(
          `http://localhost:3001/api/vendor/search?name=${searchTerm}`
        );
        setVendors(searchResponse.data);
        setTotalPages(1); // Resultados de pesquisa única, então apenas uma página.
      } else {
        // Se não houver termo de pesquisa, faz uma solicitação normal de paginação.
        const paginationResponse = await axios.get(
          `http://localhost:3001/api/vendor?page=${currentPage}&limit=${itemsPerPage}`
        );
        setVendors(paginationResponse.data.vendors);
        setTotalPages(paginationResponse.data.totalPages);
      }
    } catch (error) {
      console.error("Erro ao obter fornecedores", error);
      setError("Erro ao obter fornecedores. Por favor, tente novamente.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div>{/* Renderize a lista de fornecedores */}</div>
      <table>
        <thead>
          <tr>
            <th
              style={{
                color: "#14337C",
              }}
            >
              Nome
            </th>
            <th
              style={{
                color: "#14337C",
              }}
            >
              Telefone
            </th>
            <th
              style={{
                color: "#14337C",
              }}
            >
              E-mail
            </th>
            <th
              style={{
                color: "#14337C",
              }}
            >
              CPF/CNPJ
            </th>
            <th style={{ width: "25vw", color: "#14337C" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {" "}
              {vendors.map((vendor) => (
                <div key={vendor._id}>{vendor.name}</div>
              ))}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}>
                <button className="buttonUpdate">
                  <img src="https://i.ibb.co/5R1QnT7/edit-1.png" alt="" />
                  Editar
                </button>
                <Button
                  variant="outlined"
                  color="danger"
                  style={{ height: "7vh", marginTop: ".2rem" }}
                >
                  Excluir
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        {/* Renderize a navegação de página usando o componente MUI Pagination */}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>

      <div>
        {/* Renderize a caixa de pesquisa */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar por nome"
        />
        <button onClick={() => setCurrentPage(1)}>Pesquisar</button>
      </div>

      {error && <div>{error}</div>}
    </div>
  );
};

export default VendorList;
