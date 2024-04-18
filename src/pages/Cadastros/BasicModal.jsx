import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import styles from "./Sales.module.css";
import axios from "axios";


export default function BasicModal({ orderId }) {
    const [open, setOpen] = React.useState(false);
    const [trackingCode, setTrackingCode] = React.useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          await axios.post(`http://localhost:3001/api/tracking/code/${orderId}`, {
            trackingCode: trackingCode,
          });
          
          // Limpa o campo do código de rastreamento após o envio bem-sucedido
          setTrackingCode("");
      
          // Fecha o modal após adicionar o código de rastreamento
          setOpen(false);
        } catch (error) {
          console.error("Erro ao adicionar código de rastreamento:", error);
        }
      };
      
      return (
        <React.Fragment>
          <Button
            color="primary"
            variant="solid"
            onClick={() => setOpen(true)}
            className={styles.button}
          >
            adicionar codigo
          </Button>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                adicionar codigo de rastreio
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Código de rastreamento, por exemplo PC123456789BR"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                  />
                  <button type="submit" className={styles.button}>
                    Adicionar
                  </button>
                </form>
              </Typography>
            </Sheet>
          </Modal>
        </React.Fragment>
      );
      
}
