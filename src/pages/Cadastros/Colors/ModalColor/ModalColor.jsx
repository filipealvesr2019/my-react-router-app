import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl ,
    FormLabel ,
    Input 
  } from '@chakra-ui/react'
  import React, { useState, useEffect } from "react";
  import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useConfig } from '../../../../context/ConfigContext';
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 export default  function InitialFocus({colorId}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
    const { apiUrl } = useConfig();
    const token = Cookies.get("token");

    const handleDeleteColor = async (colorId) => {
        const token = Cookies.get("token"); // Obtenha o token do cookie
        const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
    
        try {
          const response = await axios.delete(`${apiUrl}/api/admin/colors/${colorId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Credentials: credentials,
            },
          });
    
          if (response.data.success) {
            toast.success("Cor excluída com sucesso!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            getColors(); // Atualize a lista de cores
          } else {
            toast.error(response.data.message || "Erro ao excluir a cor", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } catch (error) {
          console.error("Erro ao excluir a cor:", error);
       
        }
      };
    
  console.log(colorId)
    return (
      <>
            <ToastContainer position="top-right" autoClose={5000} />

        <DeleteIcon onClick={onOpen}></DeleteIcon>
     
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Excluir Cor</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              Tem certeza que quer excluir essa cor?
  
            </ModalBody>
  
            <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleDeleteColor(colorId)}>
              Salvar
            </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }