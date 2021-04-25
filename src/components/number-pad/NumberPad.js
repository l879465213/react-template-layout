import React, { useState } from "react";
import Row from "../row/Row";
import { InputBase, makeStyles } from "@material-ui/core";
import Column from "../column/Column";
import colors from "../../libs/colors";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

export const numberPadTypes = {
  year: "year",
  month: "month",
  day: "day",
  hour: "hour",
  minute: "minute",
  second: "second",
};
const NumberPad = ({ value, onChange, type }) => {
  const classes = useStyle();

  const handleChange = (a) => {
    let v;
    if (a === "up") {
      v = parseInt(value) + 1;
      switch (type) {
        case numberPadTypes.year:
          if (v > 2100) {
            return;
          }
          break
        case numberPadTypes.month:
          if (v > 12) {
            return;
          }
          break
        case numberPadTypes.day:
          if (v > 31) {
            return;
          }
          break
        case numberPadTypes.hour:
          if (v > 23) {
            return;
          }
          break
        case numberPadTypes.minute:
          if (v > 59) {
            return;
          }
          break
        case numberPadTypes.second:
          if (v > 59) {
            return;
          }
          break
      }
    } else {
      v = parseInt(value) - 1;
      if (v < 0) {
        return;
      }
    }
    if (v !== undefined) {
      onChange(v);
    }
  };
  return (
    <Row className={classes.root}>
      <InputBase
        value={value}
        onChange={(e) =>
          !isNaN(e.target.value) &&
          parseInt(e.target.value) >= 0 &&
          onChange(e.target.value)
        }
        inputProps={{ className: classes.ib }}
      />
      <Column className={classes.pa}>
        <Column onClick={() => handleChange("up")} className={classes.item}>
          <ArrowDropUp />
        </Column>
        <Column onClick={() => handleChange("down")} className={classes.item}>
          <ArrowDropDown />
        </Column>
      </Column>
    </Row>
  );
};

const useStyle = makeStyles({
  root: {
    border: `1px solid ${colors.border}`,
  },
  ib: {
    height: "auto !important",
    minHeight: "auto !important",
    padding: "5px 5px !important",
    textAlign: "center",
  },
  pa: {
    alignSelf: "stretch",
  },
  item: {
    flex: 1,
    maxHeight: 20,
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    "& svg": {},
  },
});

export default NumberPad;
