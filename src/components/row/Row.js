import React from "react";
import { makeStyles } from "@material-ui/core";
const Row = ({ className, children, onClick, style }) => {
  const classes = useStyle();
  return (
    <div
      className={classes.root + " " + className}
      onClick={onClick}
      style={style}
    >
      {children}{" "}
    </div>
  );
};

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Row;
