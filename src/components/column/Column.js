import React from "react";
import { makeStyles } from "@material-ui/core";
const Column = ({ className, children, onClick, innerRef, style }) => {
  const classes = useStyle();
  return (
    <div
      style={style}
      onClick={onClick}
      ref={innerRef}
      className={classes.root + " " + className}
    >
      {children}
    </div>
  );
};

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

export default Column;
