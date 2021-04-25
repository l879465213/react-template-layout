import React from "react";
import { Button } from "@material-ui/core";

const ButtonWrap = ({ className, disabled, onClick, children, outlined }) => {
  return (
    <Button
      title={children}
      disabled={disabled}
      onClick={onClick}
      style={{ minWidth: "150px", padding: "5px 6px" }}
      className={className}
      color="default"
      variant={outlined ? "outlined" : "contained"}
    >
      {children}
    </Button>
  );
};

export default ButtonWrap;
