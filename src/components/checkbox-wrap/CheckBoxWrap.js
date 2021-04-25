import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";

import colors from "../../libs/colors";

const CheckBoxWrap = withStyles({
  root: {
    color: colors.primary,
    "&$checked": {
      color: colors.primary,
    },
  },
  checked: {},
})((props) => {
  const { onChange, value } = props;
  return (
    <Checkbox
      {...props}
      color="default"
      {...(value !== undefined && {
        checked: value,
      })}
  
      onChange={(e) => {
        const checked = e.target.checked;
        onChange && onChange(checked);
      }}
    />
  );
});
export default CheckBoxWrap;
