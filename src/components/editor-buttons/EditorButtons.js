import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";

import Row from "../row/Row";
import ButtonWrap from "../button-wrap/ButtonWrap";
import Column from "../column/Column";
import colors from "../../libs/colors";
import { withRouter } from "react-router-dom";
import { Close } from "@material-ui/icons";

const EditorButtons = ({
  updateMode,
  onDelete,
  onConfirm,
  history,
  onNeedUpdate,
  viewTitle,
  html,
  viewMode = true,
}) => {
  const classes = useStyle();
  const [open, setOpen] = useState({ open: false });
  const [viewer, setViewer] = useState(false);

  const handleClose = (s) => () => {
    s && open.event && open.event();
    setOpen({ show: false });
  };

  return (
    <Column>
      <Row className={classes.buttons}>
        {!updateMode && viewMode && (
          <ButtonWrap
            onClick={() => {
              setViewer(true);
              onNeedUpdate();
            }}
            className={classes.update}
          >
            미리보기
          </ButtonWrap>
        )}

        <ButtonWrap
          onClick={() => {
            setOpen({
              message: (updateMode ? "수정" : "등록") + " 하시겠습니까?",
              show: true,
              event: onConfirm,
            });
          }}
          className={classes.update}
        >
          {updateMode ? "수정" : "등록"}
        </ButtonWrap>

        <ButtonWrap
          outlined
          onClick={() => {
            setOpen({
              message: (updateMode ? "삭제" : "취소") + " 하시겠습니까?",
              show: true,
              event: updateMode ? onDelete : history.goBack,
            });
          }}
          className={classes.cancel}
        >
          {updateMode ? "삭제" : "취소"}
        </ButtonWrap>
      </Row>
      <Dialog open={open.show} onClose={handleClose()}>
        <DialogTitle>{open.message}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose()} color="primary">
            취소
          </Button>
          <Button onClick={handleClose(true)} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={viewer}
        onClose={() => {
          setViewer(false);
        }}
      >
        <DialogContent className={classes.content}>
          <Row className={classes.contentHeader}>
            <span>{viewTitle}</span>
            <Close
              onClick={() => {
                setViewer(false);
              }}
              fontSize={"large"}
              color="inherit"
            />
          </Row>
          <ReactQuill value={html} readOnly={true} theme={"bubble"} />
        </DialogContent>
      </Dialog>
    </Column>
  );
};

const useStyle = makeStyles({
  contentHeader: {
    borderBottom: "1px solid " + colors.border,
    height: 50,
    alignSelf: "stretch",
    alignItems: "center",
    position: "relative",

    justifyContent: "center",
    "& span": {
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& svg": { cursor: "pointer", position: "absolute", right: 0 },
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    "& img": {
      maxWidth: "100%",
    },
  },
  update: {
    color: colors.black,
    marginRight: "16px",
    backgroundColor: colors.primary,
  },
  cancel: {
    color: colors.white,
    backgroundColor: colors.bg1,
  },
  buttons: {
    margin: "20px 0px",
    alignSelf: "flex-end",
  },
});

export default withRouter(EditorButtons);
