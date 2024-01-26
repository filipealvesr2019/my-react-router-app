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

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import SearchIcon from '@mui/icons-material/Search';
const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [layout, setLayout] = React.useState(undefined);
  const [updatedName, setUpdatedName] = useState("");
  const [editingVendor, setEditingVendor] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);


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
      console.error("Erro ao excluir fornecedor", error);
      setError("Erro ao excluir fornecedor. Por favor, tente novamente.");
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

  const handleEdit = async (vendorId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/vendor/${vendorId}`,
        {
          // Passe os dados atualizados do fornecedor
          name: updatedName,
        }
      );

      // Atualize a lista de fornecedores após a edição.
      getVendors(response.data);
      // Feche o modal de edição, se aplicável
      setLayout(undefined);
    } catch (error) {
      console.error("Erro ao editar fornecedor", error);
      setError("Erro ao editar fornecedor. Por favor, tente novamente.");
    }
  };

 

  // Adicione uma função para carregar os dados do fornecedor no formulário de edição
  const loadEditingVendor = (vendor) => {
    setEditingVendor(vendor);
    setUpdatedName(vendor.name);
  };
  return (
    <div>
      <div style={{ margin: '0 auto', position: 'relative', width: '60vw', marginTop:"2rem" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pesquisar por nome"
        style={{
          width: '100%', // Altera para 100% para centralizar
          paddingRight: '2rem', // Adiciona espaço à direita para o ícone
        }}
      />
    </div>
      <table style={{
        margin:"0 auto",
        width:"80dvw",
        marginTop:"3rem"

      }}>
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
                <div
                  style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}
                >
                  <React.Fragment>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="neutral"
                        onClick={() => {
                          loadEditingVendor(vendor);
                          setLayout("fullscreen");
                        }}
                      >
                        <img src="https://i.ibb.co/5R1QnT7/edit-1.png" alt="" />
                        Editar
                      </Button>
                    </Stack>
                    <Modal open={!!layout} onClose={() => setLayout(undefined)}>
                      <ModalDialog layout={layout}>
                        <ModalClose />
                        <DialogTitle>Modal Dialog</DialogTitle>
                        <DialogContent>
                          <div>
                            <input
                              type="text"
                              value={updatedName}
                              onChange={(e) => setUpdatedName(e.target.value)}
                              placeholder="Nome"
                            />
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleEdit(editingVendor._id)}
                            >
                              Confirmar Edição
                            </Button>
                          </div>
                        </DialogContent>
                      </ModalDialog>
                    </Modal>
                  </React.Fragment>

                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ height: "7vh", marginTop: ".2rem" }}
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
      <div style={{
        marginTop:"2rem"
      }}>
        {/* Renderize a navegação de página usando o componente MUI Pagination */}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
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
