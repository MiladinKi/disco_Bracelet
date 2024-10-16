import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export default function Modal ({onCloseModal}){
    const[open, setOpen] = React.useState(false);

    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = (closeModal) =>{
        onCloseModal(closeModal);
    };

    return (
        <div>
     
          <Dialog
            open={true}
            onClose={()=>{handleClose(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete waiter"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure  want to delete this waiter?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=> {handleClose(true)}}>Yes</Button>
              <Button onClick={()=> {handleClose(false)}}>No</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}