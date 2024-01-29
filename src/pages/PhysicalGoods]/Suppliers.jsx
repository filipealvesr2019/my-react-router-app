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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [layout, setLayout] = React.useState(undefined);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedTaxpayerIDNumber, setUpdatedTaxpayerIDNumber] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    TaxpayerIDNumber: "",
    email: "",
    phoneNumber: "",
    // Adicione outros campos conforme necessário
  });
  useEffect(() => {
    getSuppliers();
  }, [currentPage, searchTerm]);

  const getSuppliers = async () => {
    try {
      // Se houver um termo de pesquisa, faz uma solicitação de pesquisa separada.
      if (searchTerm) {
        const searchResponse = await axios.get(
          `http://localhost:3001/api/supplier/search?name=${searchTerm}`
        );
        setSuppliers(searchResponse.data);
        setTotalPages(1); // Resultados de pesquisa única, então apenas uma página.
      } else {
        // Se não houver termo de pesquisa, faz uma solicitação normal de paginação.
        const paginationResponse = await axios.get(
          `http://localhost:3001/api/supplier?page=${currentPage}&limit=${itemsPerPage}`
        );
        setSuppliers(paginationResponse.data.suppliers);
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

  const handleDelete = async (supplierId) => {
    try {
      // Fecha o diálogo de confirmação
      setShowConfirmation(false);

      // Faça uma solicitação para excluir o fornecedor pelo ID.
      await axios.delete(`http://localhost:3001/api/supplier/${supplierId}`);

      // Atualize a lista de fornecedores após a exclusão.
      getSuppliers();
    } catch (error) {
      console.error("Erro ao excluir fornecedor", error);
      setError("Erro ao excluir fornecedor. Por favor, tente novamente.");
    }
  };

  const handleConfirmDelete = () => {
    // Chama a função de exclusão apenas se houver um fornecedor para excluir
    if (supplierToDelete) {
      handleDelete(supplierToDelete);
    }
  };

  const handleOpenConfirmation = (supplierId) => {
    // Define o fornecedor a ser excluído e mostra o diálogo de confirmação
    setSupplierToDelete(supplierId);
    setShowConfirmation(true);
  };

  const handleEdit = async (supplierId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/supplier/${supplierId}`,
        {
          // Passe todos os dados atualizados do fornecedor
          name: updatedName,
          TaxpayerIDNumber: updatedTaxpayerIDNumber,
          email: updatedEmail,
          phoneNumber: updatedPhoneNumber,
        }
      );

      // Atualize a lista de fornecedores após a edição.
      getSuppliers(response.data);
      // Feche o modal de edição, se aplicável
      setLayout(undefined);
    } catch (error) {
      console.error("Erro ao editar fornecedor", error);
      setError("Erro ao editar fornecedor. Por favor, tente novamente.");
    }
  };

  // Adicione uma função para carregar os dados do fornecedor no formulário de edição
  const loadEditingSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setUpdatedName(supplier.name);
    setUpdatedTaxpayerIDNumber(supplier.TaxpayerIDNumber);
    setUpdatedPhoneNumber(supplier.phoneNumber);
    setUpdatedEmail(supplier.email);
  };

  // Novo estado para armazenar os detalhes do novo fornecedor

  const handleAddSupplier = async () => {
    try {
      setSaveButtonClicked(true);

      // Validar se o campo "Nome do Cliente" não está vazio antes de enviar a solicitação.
      if (newSupplier.name.trim() === "") {
        setIsNameEmpty(true); // Define o estado para true se estiver vazio
        console.error("O campo 'Nome do Cliente' não pode ficar vazio.");
        return;
      }
      // Faça uma solicitação para adicionar o novo fornecedor.
      await axios.post("http://localhost:3001/api/supplier", newSupplier);

      // Atualize a lista de fornecedores após a adição.
      getSuppliers();
      setNewSupplier({
        name: "",
        TaxpayerIDNumber: "",
        email: "",
        phoneNumber: "",
      });
      // Feche o modal de adição
      setModalType(null);
      setSaveButtonClicked(false); // Redefina saveButtonClicked para false

      // Limpe o estado do novo fornecedor após a adição.
    } catch (error) {
      console.error("Erro ao adicionar fornecedor", error);
      setError("Erro ao adicionar fornecedor. Por favor, tente novamente.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const tabsData = [
    { label: "Cadastro" },
    { label: "Dados Adicionais" },
    { label: "Endereços" },
    { label: "Configurações Avançadas" },
  ];

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          position: "relative",
          width: "60vw",
          marginTop: "2rem",
          marginBottom: "5rem",
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar por nome"
          style={{
            width: "60dvw", // Altera para 100% para centralizar
            paddingRight: "2rem", // Adiciona espaço à direita para o ícone
            margin: "0 auto",
          }}
        />

        <React.Fragment>
          <Stack direction="row" spacing={1} style={{ marginTop: "2rem" }}>
            <Button
              onClick={() => {
                setNewSupplier({
                  name: "",
                  phone: "",
                  email: "",
                  TaxpayerIDNumber: "",
                });
                setModalType("create"); // Defina o tipo do modal como 'create'
              }}
              style={{
                position: "absolute",
                right: "-180px",
                width: "11dvw",
                height: "7dvh",
                fontSize: "1.1rem",
              }}
            >
              Novo Cliente
            </Button>
          </Stack>

          <Modal
            open={modalType === "create"}
            onClose={() => setModalType(null)}
          >
            <ModalDialog
              layout={layout}
              style={{
                width: "90dvw",
                height: "85dvh",
              }}
            >
              <ModalClose />
              <DialogContent
                style={{
                  marginTop: "1rem",
                }}
              >
                <div>
                  <Box display="flex">
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      orientation="vertical"
                      variant="scrollable"
                      textColor="primary"
                    >
                      {tabsData.map((tab, index) => (
                        <Tab
                          key={index}
                          label={capitalizeFirstLetter(tab.label)}
                          style={{
                            ...tabStyle,
                            ...(tabValue === index ? activeTabStyle : {}),
                          }}
                        />
                      ))}
                    </Tabs>

                    <TabPanel
                      value={tabValue}
                      index={0}
                      style={{
                        marginTop: "5rem",
                      }}
                    >
                      {/* Conteúdo da primeira aba (Informações do Fornecedor) */}
                      <Box
                        p={3}
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={16}
                      >
                        <div>
                          <Typography variant="h6">Nome</Typography>
                          <input
                            value={newSupplier.name}
                            onChange={(e) =>
                              setNewSupplier({
                                ...newSupplier,
                                name: e.target.value,
                              })
                            }
                            placeholder="nome do cliente"
                            style={{
                              width: "30dvw",
                              border:
                                saveButtonClicked && isNameEmpty
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                            }}
                            onBlur={() =>
                              setIsNameEmpty(newSupplier.name.trim() === "")
                            }
                          />
                        </div>

                        <div>
                          <Typography variant="h6">CPF/CNPJ</Typography>
                          <input
                            value={newSupplier.TaxpayerIDNumber}
                            onChange={(e) =>
                              setNewSupplier({
                                ...newSupplier,
                                TaxpayerIDNumber: e.target.value,
                              })
                            }
                            placeholder="CPF/CNPJ"
                          />
                        </div>

                        {/* Adicione mais colunas conforme necessário */}
                      </Box>

                      {/* Segunda fileira */}
                      <Box
                        p={3}
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={16}
                      >
                        <div>
                          <Typography variant="h6">Telefone</Typography>
                          <input
                            value={newSupplier.phoneNumber}
                            onChange={(e) =>
                              setNewSupplier({
                                ...newSupplier,
                                phoneNumber: e.target.value,
                              })
                            }
                            placeholder="(85) 999.999.999"
                            style={{
                              width: "30dvw",
                            }}
                          />
                        </div>

                        <div>
                          <Typography variant="h6">Email</Typography>
                          <input
                            value={newSupplier.email}
                            onChange={(e) =>
                              setNewSupplier({
                                ...newSupplier,
                                email: e.target.value,
                              })
                            }
                            placeholder="Email"
                          />
                        </div>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSupplier}
                        style={{
                          backgroundColor: "#0B6BCB",
                          color: "#ffffff",
                          width: "15vw",
                          height: "7dvh",
                          fontSize: "1.1rem",
                          right: "20px",
                          bottom: "20px",
                          position: "absolute",
                        }}
                      >
                        Salvar
                      </Button>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                      {/* Conteúdo da segunda aba (Outras Configurações) */}
                      <Box p={3}>
                        <Typography variant="h6">
                          Outras Configurações
                        </Typography>
                        {/* Conteúdo específico da segunda aba */}
                      </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                      {/* Conteúdo da terceira aba (Detalhes de Contato) */}
                      <Box p={3}>
                        <Typography variant="h6">
                          Detalhes de Contato
                        </Typography>
                        {/* Conteúdo específico da terceira aba */}
                      </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                      {/* Conteúdo da quarta aba (Configurações Avançadas) */}
                      <Box p={3}>
                        <Typography variant="h6">
                          Configurações Avançadas
                        </Typography>
                        {/* Conteúdo específico da quarta aba */}
                      </Box>
                    </TabPanel>
                  </Box>
                </div>
              </DialogContent>
            </ModalDialog>
          </Modal>
        </React.Fragment>
      </div>
      <table
        style={{
          margin: "0 auto",
          width: "90dvw",
          marginTop: "-1rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                color: "#14337c",
                width: "30dvw",
              }}
            >
              Nome
            </th>
            <th style={{ width: "15dvw" }}>Telefone</th>
            <th style={{ width: "40dvw" }}>E-mail</th>
            <th style={{ width: "20dvw" }}>CPF/CNPJ</th>
            <th style={{ width: "10dvw" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.phoneNumber}</td>
              <td>{supplier.email}</td>
              <td>{supplier.TaxpayerIDNumber}</td>
              <td>
                <div
                  style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}
                >
                  <React.Fragment>
                    <Stack direction="row" spacing={1}>
                      <EditIcon
                        onClick={() => {
                          loadEditingSupplier(supplier);
                          setLayout("fullscreen");
                        }}
                        style={{
                          cursor:"pointer"
                        }}
                      />
                    </Stack>
                    <Modal open={!!layout} onClose={() => setLayout(undefined)}>
                      <ModalDialog layout={layout}>
                        <ModalClose />
                        <DialogTitle>Infomaçoes do cliente</DialogTitle>
                        <DialogContent>
                          <Box display="flex">
                            <Tabs
                              value={tabValue}
                              onChange={handleTabChange}
                              orientation="vertical"
                              variant="scrollable"
                              textColor="primary"
                            >
                              {tabsData.map((tab, index) => (
                                <Tab
                                  key={index}
                                  label={capitalizeFirstLetter(tab.label)}
                                  style={{
                                    ...tabStyle,
                                    ...(tabValue === index
                                      ? activeTabStyle
                                      : {}),
                                  }}
                                />
                              ))}
                            </Tabs>

                            <TabPanel
                              value={tabValue}
                              index={0}
                              style={{
                                marginTop: "5rem",
                              }}
                            >
                              {/* Conteúdo da primeira aba (Informações do Fornecedor) */}
                              <Box
                                p={3}
                                display="grid"
                                gridTemplateColumns="1fr 1fr"
                                gap={16}
                              >
                                <div>
                                  <Typography variant="h6">Nome</Typography>
                                  <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) =>
                                      setUpdatedName(e.target.value)
                                    }
                                    placeholder="Nome"
                                    style={{
                                      width: "30vw",
                                    }}
                                  />
                                </div>

                                <div>
                                  <Typography variant="h6">CPF/CNPJ</Typography>
                                  <input
                                    type="text"
                                    value={updatedTaxpayerIDNumber}
                                    onChange={(e) =>
                                      setUpdatedTaxpayerIDNumber(e.target.value)
                                    }
                                    placeholder="CPF/CNPJ"
                                  />
                                </div>

                                {/* Adicione mais colunas conforme necessário */}
                              </Box>

                              {/* Segunda fileira */}
                              <Box
                                p={3}
                                display="grid"
                                gridTemplateColumns="1fr 1fr"
                                gap={16}
                              >
                                <div>
                                  <Typography variant="h6">Telefone</Typography>
                                  <input
                                    type="text"
                                    value={updatedPhoneNumber}
                                    onChange={(e) =>
                                      setUpdatedPhoneNumber(e.target.value)
                                    }
                                    placeholder="Telefone"
                                    style={{
                                      width: "30vw",
                                    }}
                                  />
                                </div>

                                <div>
                                  <Typography variant="h6">Email</Typography>
                                  <input
                                    type="text"
                                    value={updatedEmail}
                                    onChange={(e) =>
                                      setUpdatedEmail(e.target.value)
                                    }
                                    placeholder="Email"
                                  />
                                </div>
                              </Box>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEdit(editingSupplier._id)}
                                style={{
                                  backgroundColor: "#0B6BCB",
                                  color: "#ffffff",
                                  width: "15vw",
                                  height: "7dvh",
                                  fontSize: "1.1rem",
                                  right: "20px",
                                  bottom: "20px",
                                  position: "absolute",
                                }}
                              >
                                Salvar
                              </Button>
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                              {/* Conteúdo da segunda aba (Outras Configurações) */}
                              <Box p={3}>
                                <Typography variant="h6">
                                  Outras Configurações
                                </Typography>
                                {/* Conteúdo específico da segunda aba */}
                              </Box>
                            </TabPanel>

                            <TabPanel value={tabValue} index={2}>
                              {/* Conteúdo da terceira aba (Detalhes de Contato) */}
                              <Box p={3}>
                                <Typography variant="h6">
                                  Detalhes de Contato
                                </Typography>
                                {/* Conteúdo específico da terceira aba */}
                              </Box>
                            </TabPanel>

                            <TabPanel value={tabValue} index={3}>
                              {/* Conteúdo da quarta aba (Configurações Avançadas) */}
                              <Box p={3}>
                                <Typography variant="h6">
                                  Configurações Avançadas
                                </Typography>
                                {/* Conteúdo específico da quarta aba */}
                              </Box>
                            </TabPanel>
                          </Box>
                        </DialogContent>
                      </ModalDialog>
                    </Modal>
                  </React.Fragment>

                  <DeleteIcon
                    onClick={() => handleOpenConfirmation(supplier._id)}
                    style={{
                      cursor:"pointer"
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        {/* Renderize a navegação de página usando o componente MUI Pagination */}
        <Stack spacing={1}>
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
            Tem certeza de que deseja excluir este Cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const tabStyle = {
  fontFamily: "Poppins, sans-serif",
  textTransform: "none", // Manter o texto como fornecido
  fontWeight: 300, // Peso da fonte leve
  fontSize: "1rem",
};

const activeTabStyle = {
  fontWeight: 500, // Peso da fonte mais forte para a aba ativa
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
export default Suppliers