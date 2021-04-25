import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { dialogClose } from "../../redux/dialog/DialogActions";

const DialogMessage = ({}) => {
  const { messageDialog } = useSelector((s) => s.dialog, []);

  const dispatch = useDispatch();
  return (
    <Dialog
      open={messageDialog.open}
      onClose={() => {
        dispatch(dialogClose());
      }}
    >
      <DialogTitle>{messageDialog.message}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            messageDialog.onClick && messageDialog.onClick();
            dispatch(dialogClose());
          }}
          color="primary"
          autoFocus
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMessage;
