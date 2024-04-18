import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import styles from "./Sales.module.css";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button  color="primary"
    variant="solid" onClick={() => setOpen(true)}  className={styles.button}>
      adicionar codigo
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
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
            <form action="">
                 
                <input type="text" placeholder='codigo e.x PC123456789BR'/>
                <button className={styles.button}>adicionar</button>
            </form>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}