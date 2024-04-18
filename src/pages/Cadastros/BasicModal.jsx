import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import styles from "./Sales.module.css";
import axios from "axios";

export default function BasicModal({ orderId, tracking }) {
  const [open, setOpen] = React.useState(false);
  const [trackingCode, setTrackingCode] = React.useState("");

  const handleTrackingCode = () => {
    if (trackingCode) {
      axios
        .post(`http://localhost:3001/api/add/traking/creditCard/${orderId}`, { trackingCode })
        .then((response) => {
          console.log(response.data.message);
          // Se necessário, atualize o estado ou forneça feedback visual ao usuário
        })
        .catch((error) => {
          console.error("Erro ao adicionar código de rastreamento:", error);
          // Se necessário, forneça feedback visual ao usuário sobre o erro
        });
        axios
        .post(`http://localhost:3001/api/add/traking/boleto/${orderId}`, { trackingCode })
        .then((response) => {
          console.log(response.data.message);
          // Se necessário, atualize o estado ou forneça feedback visual ao usuário
        })
        .catch((error) => {
          console.error("Erro ao adicionar código de rastreamento:", error);
          // Se necessário, forneça feedback visual ao usuário sobre o erro
        });
        axios
        .post(`http://localhost:3001/api/add/traking/pix/${orderId}`, { trackingCode })
        .then((response) => {
          console.log(response.data.message);
          // Se necessário, atualize o estado ou forneça feedback visual ao usuário
        })
        .catch((error) => {
          console.error("Erro ao adicionar código de rastreamento:", error);
          // Se necessário, forneça feedback visual ao usuário sobre o erro
        });
    } else {
      // Se o usuário não fornecer um código de rastreamento
      console.log("Código de rastreamento vazio.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTrackingCode();
    setOpen(false); // Fechar o modal após adicionar o código de rastreamento
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
                placeholder={tracking}
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
