import { Button, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import colors from "../../libs/colors";
import consts from "../../libs/consts";
import { renderFileSelector } from "../../services/utils";
import Row from "../row/Row";
import Span from "../span/Span";

const ImageSelector = ({ onChange, name, path }) => {
  const inputRef = useRef();
  const classes = useStyle();
  return (
    <Row className={classes.root}>
      {renderFileSelector(inputRef, onChange)}
      <Row className={classes.isw}>
        <Button
          onClick={() => inputRef.current.click()}
          variant="contained"
          color="default"
          style={{
            backgroundColor: colors.bg1,
            color: colors.white,
            boxShadow: "none",
          }}
        >
          파일 선택
        </Button>
        <Span className={classes.isi}>{name ? "" : "선택된 파일 없음"}</Span>
      </Row>
      {path ? (
        <img
          alt="path"
          src={consts.fileApiUrl + "/" + path}
          className={classes.image}
        />
      ) : (
        <Span className={classes.isn}>{name}</Span>
      )}
    </Row>
  );
};

const useStyle = makeStyles({
  root: { flex: 1, alignSelf: "center" },
  image: {
    height: 200,
    flex: 1,
    objectFit: "contain",
    backgroundColor: colors.border,
  },
  m: {
    flex: 2,
    marginRight: "30px",
  },
  m2m: {
    flex: 1,
  },
  m2: {
    flex: 3,
    alignItems: "center",
  },
  ml: {
    padding: "0px 16px",
    fontSize: 16,
    minWidth: 100,
    maxWidth: 200,
  },
  isn: {
    borderRadius: 4,
    marginLeft: 16,
    padding: "8px 16px",
    fontSize: 16,
    flex: 1,
    border: `1px solid ${colors.border}`,
  },
  isw: {
    flex: 1,
  },
  isi: {
    borderRadius: 4,
    padding: "8px 16px",
    fontSize: 16,
    flex: 1,

    border: `1px solid ${colors.border}`,
    color: colors.textBorder,
  },
});

export default ImageSelector;
