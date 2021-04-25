import React from "react";
import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import colors from "../../libs/colors";

const Radios = ({ data, value, onChange, disabled }) => {
  return (
    <FormControl disabled={disabled} component="fieldset">
      <RadioGroup
        value={value || ""}
        onChange={(v) => {
          onChange && onChange(v.target.value);
        }}
        row
      >
        {data &&
          data.map((x, i) => (
            <FormControlLabel
              key={i.toString()}
              value={x.value || ""}
              control={
                <Radio color="default" style={{ color: colors.primary }} />
              }
              label={x.label}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radios;
