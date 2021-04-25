import React, { useRef, useEffect } from "react";
import Column from "../column/Column";
import { makeStyles } from "@material-ui/core";
import colors from "../../libs/colors";
import { Close, CloseOutlined, CloseSharp } from "@material-ui/icons";
import X from "../../assets/image/x.png";

const ImageWrap = ({ src, className }) => {
  const classes = useStyle();
  return (
    <Column className={`${classes.root} ${className}`}>
    
          <img
            alt="ig"
            src={src || X}
            style={{
              objectFit: src ? "contain" : "stretch",
            }}
            className={classes.image}
          />
      
    </Column>
  );
};
const useStyle = makeStyles({
  root: {
    overflow: "hidden",
    position: "relative",
    border: `1px solid ${colors.border}`,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageWrap;
