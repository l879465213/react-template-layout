import React, { useState, useEffect } from "react";
import Column from "../column/Column";
import Row from "../row/Row";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import Span from "../span/Span";
import { ArrowDropDown } from "@material-ui/icons";
import colors from "../../libs/colors";

const MenuWrap = ({ className, classNameMenu, data, value, onChange }) => {
  const classes = useStyle();
  const [label, setLabel] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [tb, setTb] = useState("");

  useEffect(() => {
    if ((tb || value) && data && data.length > 0) {
      setLabel(
        data[data.findIndex((x, i) => i === tb || x.value === value)]?.label
      );
    } else if (data && data.length > 0) {
      setLabel(data[0].label);
    }
  }, [value, tb, data]);

  return (
    <Column className={`${classes.root} ${className}`}>
      <Row
        className={`${classes.menu} ${classNameMenu}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Span>{label}</Span>
        <ArrowDropDown />
      </Row>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {data &&
          data.map((x, i) => (
            <MenuItem
              key={i.toString()}
              onClick={() => {
                setAnchorEl(null);
                setTb(i);
                onChange && onChange(x.value);
              }}
            >
              {x.label}
            </MenuItem>
          ))}
      </Menu>
    </Column>
  );
};

const useStyle = makeStyles({
  root: {
    alignSelf: "stretch",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid " + colors.border,
    minWidth: "150px",
  },
  menu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
});

export default MenuWrap;
