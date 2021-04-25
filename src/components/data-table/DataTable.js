import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { labelSkeleton } from "../../libs/bulkData";
import { IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const DataTable = ({ memberData, type, query, data = [] }) => {
  const classes = useStyles();
  const transformData = labelSkeleton(query);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        {[{}, ...data].map((x, i) => {
          return (
            <div key={i.toString()} className={classes.firstColumn}>
              {i === 0 ? "-" : x.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    margin: "10px auto",
    alignSelf: "stretch",
    backgroundColor: "#000",
    display: "flex",
    minWidth: "300%",
    padding: "16px 0px",
    overflow: "scroll",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    minWidth: "100%",
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  firstColumn: {
    marginRight: "2px",
    boxSizing: "border-box",
    minWidth: "120px !important",
    minHeight: "50px",
    backgroundColor: "gray",
    textAlign: "center",
    color: "#fff",
    lineHeight: "3",
  },
  column: {
    width: "100%",
    height: "50px",
    backgroundColor: "#d4d4d4",
    textAlign: "center",
    lineHeight: "3",
  },
});

export default DataTable;
