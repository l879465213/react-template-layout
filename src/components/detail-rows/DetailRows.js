import React from "react";
import Column from "../column/Column";
import Row from "../row/Row";
import { makeStyles } from "@material-ui/core";
import Span from "../span/Span";
import colors from "../../libs/colors";
import InputWrap from "../input-wrap/InputWrap";

const DetailRows = ({ label, data }) => {
  const classes = useStyle();

  const renderComponent = (
    { onBlur, children, type, color, value, props, onChange },
    i
  ) => {
    switch (type) {
      case "render":
        return (
          <Column
            style={{
              padding: "8px 16px",
            }}
          >
            {children}
          </Column>
        );
      case "input":
        return (
          <InputWrap
            className={classes.defa}
            {...props}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
          />
        );
      default:
        return (
          <Span
            style={{ color: color ? color : "black" }}
            className={classes.defa}
          >
            {value}
          </Span>
        );
    }
  };
  return (
    <Column className={classes.root}>
      <Row className={classes.header}>
        <Span>{label}</Span>
      </Row>
      {data &&
        data.map((x, i) => {
          if (!x) {
            return null;
          }
          return (
            <Row
              className={classes.item + " " + x.className}
              key={i.toString()}
            >
              <Row className={classes.labelC}>
                <Span
                  style={{
                    color: x.color ? x.color : "black",
                  }}
                >
                  {x.label}
                </Span>
              </Row>
              <Column className={classes.valueC}>
                {renderComponent(x, i)}
                {Boolean(x.message) && (
                  <Span className={classes.message}>{x.message}</Span>
                )}
              </Column>
            </Row>
          );
        })}
    </Column>
  );
};

const useStyle = makeStyles({
  root: { flex: 1 },
  item: {
    alignItems: "center",
    borderBottom: `1px solid ${colors.border}`,
    alignSelf: "stretch",
  },
  labelC: {
    flex: 1,
    "& span": {
      fontSize: 16,
      padding: "8px 16px",
    },
  },
  valueC: {
    alignItems: "stretch",
    justifyContent: "stretch",
    flex: 5,
  },
  header: {
    backgroundColor: colors.bg2,
    padding: "10px 16px",
    "& span": {
      fontSize: 16,
      color: colors.white,
    },
  },
  message: {
    color: colors.bg2,
    padding: "0px 16px",
    paddingBottom: "4px",
    fontSize: 13,
  },
  defa: {
    fontSize: 16,
    padding: "8px 16px",
  },
});

export default DetailRows;
