import React, { useState } from "react";
import Column from "../column/Column";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@material-ui/icons";
import { closeImage } from "../../redux/image/ImageActions";
import ImageWrap from "../image-wrap/ImageWrap";
import Row from "../row/Row";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import colors from "../../libs/colors";

export default function ImageView({}) {
  const classes = useStyle();
  const { src, open } = useSelector((s) => s.image, []);
  const [viewLayout, setViewLayout] = useState();
  const dispatch = useDispatch();
  if (!open) {
    return null;
  }

  const handleViewRef = (ref) => {
    if (
      ref &&
      (!viewLayout || (viewLayout && viewLayout.width !== ref.clientWidth))
    ) {
      setViewLayout({
        width: ref.clientWidth,
        height: ref.clientWidth,
        maxHeight: ref.clientWidth,
      });
    }
  };
  return (
    <Column
      onClick={() => {
        dispatch(closeImage());
      }}
      className={classes.root}
    >
      <Column
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={viewLayout}
        innerRef={handleViewRef}
        className={classes.view}
      >
        <Row className={classes.header}>
          <Close
            onClick={() => {
              dispatch(closeImage());
            }}
            fontSize="large"
            color="inherit"
          />
        </Row>

        <Column className={classes.main}>
          <TransformWrapper>
            <TransformComponent>
              <ImageWrap src={src} className={classes.image} />
            </TransformComponent>
          </TransformWrapper>
        </Column>
      </Column>
    </Column>
  );
}

const useStyle = makeStyles({
  view: {
    backgroundColor: colors.white,
    width: "50%",
    maxWidth: "50%",

    cursor: "default !important",
  },

  icon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(245,245,245)",
    borderTop: "1px solid " + colors.border,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    height: "100%",
  },
  header: {
    padding: "5px 0px",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    "& svg": {
      cursor: "pointer",
    },
  },
  root: {
    zIndex: 1300,
    cursor: "pointer",
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.3)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      objectFit: "contain",
    },
  },
});
