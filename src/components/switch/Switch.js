import React, { useState } from "react";
import Row from "../row/Row";
import Span from "../span/Span";
import { makeStyles } from "@material-ui/core";
import colors from "../../libs/colors";

const Switch = ({ state, onChange, disabled }) => {
  const classes = useStyle();

  return (
    <Row
      onClick={() => !disabled && onChange(state === "on" ? "off" : "on")}
      className={classes.root}
      style={{
        cursor: disabled ? "normal" : "pointer",
      }}
    >
      <Span
        className={
          classes.item +
          " " +
          (state === "on" && (disabled ? classes.itemsD : classes.items))
        }
      >
        ON
      </Span>
      <Span
        className={
          classes.item +
          " " +
          (state === "off" && (disabled ? classes.itemsD : classes.items))
        }
      >
        OFF
      </Span>
    </Row>
  );
};

const useStyle = makeStyles({
  root: {
    borderRadius: "30px",
    border: `1px solid ${colors.border}`,
    alignItems: "stretch",
  },
  item: {
    fontSize: 14,
    flex: 1,
    padding: "2px 10px",
    zIndex: 1,
  },
  items: {
    color: colors.white,
    borderRadius: "30px",
    backgroundColor: colors.primary,
    border: `1px solid ${colors.primary}`,
    zIndex: 2,
  },
  itemsD: {
    border: `1px solid rgba(0, 0, 0, 0.26)`,
    color: colors.white,
    borderRadius: "30px",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
});

export default Switch;
