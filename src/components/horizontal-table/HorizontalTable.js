import { CircularProgress, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward, ArrowLeft } from "@material-ui/icons";
import React, { useRef, useState } from "react";

export default function HorizontalTable({
  data,
  label1 = "-",
  label2 = "-",
  columns,
}) {
  const listRef = useRef();
  const classes = useStyle();
  const [width, setWidth] = useState(0);

  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => {
          listRef.current.scrollLeft = listRef.current.scrollLef - width || 0;
        }}
      >
        <ArrowBack />
      </IconButton>

      {data.length ? (
        <div ref={listRef} className={classes.list}>
          <div className={classes.headers}>
            {[{ label: "-" }, ...data].map((x, i) => {
              return (
                <div
                  className={classes.label}
                  ref={(ref) => {
                    if (ref && !width) {
                      setWidth(ref.offsetWidth);
                    }
                  }}
                  key={i.toString()}
                >
                  {x.label}
                </div>
              );
            })}
          </div>

          {columns &&
            width &&
            columns.map((x, i) => {
              return (
                <div className={classes.rows}>
                  {[{ first: x }, ...data].map((z, i) => {
                    return (
                      <div className={classes.row} key={i.toString()}>
                        {i === 0 ? x : z[x]}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          {!columns && width && (
            <div className={classes.rows}>
              {[{ first: label1 }, ...data].map((x, i) => {
                return (
                  <div className={classes.row} key={i.toString()}>
                    {x.first}
                  </div>
                );
              })}
            </div>
          )}
          {!columns && width && (
            <div className={classes.rows}>
              {[{ last: label2 }, ...data].map((x, i) => {
                return (
                  <div className={classes.row} key={i.toString()}>
                    {x.last}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" style={{ color: "gray" }} />
        </div>
      )}
      <IconButton
        onClick={() => {
          listRef.current.scrollLeft = listRef.current.scrollLef + width;
        }}
      >
        <ArrowForward />
      </IconButton>
    </div>
  );
}

const useStyle = makeStyles({
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    marginTop: "100px",
    padding: "20px",
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: "30em",
    margin: "0px 16px",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflowX: "auto",
  },
  label: {
    fontSize: "13px",
    color: "#000",
    boxSizing: "border-box",
    padding: "20px 10px",

    minWidth: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1px",
    backgroundColor: "rgb(180,180,180)",
  },
  headers: {
    display: "flex",
    flexDirection: "row",
  },
  rows: {
    display: "flex",
    flexDirection: "row",
    marginTop: "1px",
  },
  row: {
    border: "1px solid rgb(240,240,240)",
    fontSize: "13px",
    color: "#000",
    boxSizing: "border-box",
    padding: "20px 10px",

    minWidth: "150px",
    marginRight: "1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
