// NovoClienteModal.jsx
import React, { useState } from 'react';
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const NovoClienteModal = ({ open, onClose, onAdd }) => {
  const [newVendor, setNewVendor] = useState({
    name: '',
    phone: '',
    email: '',
    cpfCnpj: '',
  });

  const handleAddVendor = () => {
    // Adicione a lógica para adicionar o fornecedor aqui
    onAdd(newVendor);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog layout="fullscreen">
        <ModalClose />
        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        <DialogContent>
          <div>
            <input
              type="text"
              value={newVendor.name}
              onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
              placeholder="Nome do novo fornecedor"
            />
            {/* Outros campos... */}
            <button onClick={handleAddVendor}>Adicionar Fornecedor</button>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default NovoClienteModal;
