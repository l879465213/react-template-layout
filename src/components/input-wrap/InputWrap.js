import React, { useState, useEffect } from "react";
import { TextField, makeStyles } from "@material-ui/core";
import colors from "../../libs/colors";

const InputWrap = ({
  className,
  value,
  placeholder,
  disabled,
  onChange,
  multiline,
  maxLength,
  onBlur,
}) => {
  const classes = useStyle();
  const [t, setT] = useState("");

  useEffect(() => {
    if (value) {
      setT(value);
    } else {
      setT("");
    }
  }, [value]);
  return (
    <TextField
      disabled={disabled}
      className={classes.root + " " + className}
      variant="outlined"
      InputProps={{
        classes: {
          root:
            classes.cssOutlinedInput + " " + (multiline && classes.multiline),
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
          input: classes.input,
        },
        inputMode: "numeric",
      }}
      placeholder={placeholder}
      multiline={multiline}
      value={t}
      onBlur={() => {
        if (onBlur) {
          onBlur(t);
        }
      }}
      onChange={(e) => {
        if (maxLength && e.target.value.length > maxLength) {
          return;
        }
        setT(e.target.value);
        
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    />
  );
};

const useStyle = makeStyles({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${colors.border} !important`,
  },
  input: {
    paddingTop: "10px !important",
    maxHeight: 200,
    color: "#000",
    overflowY: "auto",
    paddingBottom: "10px !important",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${colors.primary} !important`,
    },
  },
  root: {},

  cssFocused: {},
  multiline: {
    minHeight: 150,
  },
});

export default InputWrap;
