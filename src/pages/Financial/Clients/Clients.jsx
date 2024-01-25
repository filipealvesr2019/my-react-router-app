import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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


  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  // ... (restante do código)

  const handleDelete = async (vendorId) => {
    try {
      // Fecha o diálogo de confirmação
      setShowConfirmation(false);

      // Faça uma solicitação para excluir o fornecedor pelo ID.
      await axios.delete(`http://localhost:3001/api/vendor/${vendorId}`);

      // Atualize a lista de fornecedores após a exclusão.
      getVendors();
    } catch (error) {
      console.error('Erro ao excluir fornecedor', error);
      setError('Erro ao excluir fornecedor. Por favor, tente novamente.');
    }
  };

  const handleConfirmDelete = () => {
    // Chama a função de exclusão apenas se houver um fornecedor para excluir
    if (vendorToDelete) {
      handleDelete(vendorToDelete);
    }
  };

  const handleOpenConfirmation = (vendorId) => {
    // Define o fornecedor a ser excluído e mostra o diálogo de confirmação
    setVendorToDelete(vendorId);
    setShowConfirmation(true);
  };

  return (
    <div>
      <div>{/* Renderize a lista de fornecedores */}</div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>CPF/CNPJ</th>
            <th style={{ width: "25vw" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.name}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.email}</td>
              <td>{vendor.cpfCnpj}</td>
              <td>
                <div style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}>
                  <button className="buttonUpdate">
                    <img src="https://i.ibb.co/5R1QnT7/edit-1.png" alt="" />
                    Editar
                  </button>
                  <Button
                variant="outlined"
                color="secondary"
                style={{ height: '7vh', marginTop: '.2rem' }}
                onClick={() => handleOpenConfirmation(vendor._id)}
              >
                Excluir
              </Button>
                </div>
              </td>
            </tr>
          ))}
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
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este fornecedor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VendorList;
