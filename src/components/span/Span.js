import React from "react";
import { makeStyles } from "@material-ui/core";
const Span = ({ className, children, onClick, onSizeChange, style }) => {
  const classes = useStyle();
  return (
    <span
      onClick={onClick}
      ref={(ref) => {
        if (ref && onSizeChange) {
          onSizeChange({
            width: ref.clientWidth,
            height: ref.clientHeight,
          });
        }
      }}
      className={classes.root + " " + className}
      style={style}
    >
      {children}
    </span>
  );
};

const useStyle = makeStyles({
  root: {},
});

export default Span;
