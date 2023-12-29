import * as React from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import UpdateProductForm from "./ProductUpload";

export default function LayoutModalDialog() {
  const [layout, setLayout] = React.useState(undefined);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("fullscreen");
          }}
          style={{ gap: ".5rem", fontSize: "1rem" }}
        >
          <img src="https://i.ibb.co/NscSwW4/edit.png" alt="" />{" "}
          <span>Editar</span>
        </Button>
      </Stack>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog
          layout={layout}
          style={{
            display: "flex",
            jutifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalClose />
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogContent>
            <div>
              <UpdateProductForm />
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
