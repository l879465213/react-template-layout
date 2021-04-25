import React, { useState, useEffect, useRef } from "react";
import Row from "../row/Row";
import { withRouter } from "react-router-dom";
import { queryStrToObj, replaceQuery } from "../../services/utils";
import Span from "../span/Span";
import { makeStyles } from "@material-ui/core";
import {
  LastPage,
  ChevronRight,
  ChevronLeft,
  FirstPage,
} from "@material-ui/icons";
import { colors } from "../../libs/colors";
const Pagination = ({ dataLength, limit, location, history, className }) => {
  const classes = useStyles();
  const [renderPages, setRenderPages] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const query = queryStrToObj(location.search); //uery.page
  
  let interval = useRef(10).current;
  useEffect(() => {
    const a = dataLength / limit;
    setMaxPage(Math.ceil(a));
  }, [dataLength, limit]);

  useEffect(() => {
    const chap = Math.ceil(parseInt(query.page) / interval);
    const startPage = interval * chap - interval + 1;
    setStartPage(startPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPage, query.page]);

  useEffect(() => {
    if (startPage < 1) {
      return;
    }

    let interval = 10;

    if (startPage + interval > maxPage) {
      interval = maxPage - startPage + 1;
    }
    const n = [];
    for (let i = startPage; i < startPage + interval; i++) {
      n.push({ page: i });
    }

    setRenderPages([...n]);
  }, [startPage, maxPage]);

  if (!query.page) {
    return null;
  }

  return (
    <Row className={classes.root + " " + className}>
      <FirstPage
        className={classes.icon}
        onClick={() => {
          if (query.page === "!") {
            return;
          }
          replaceQuery(history, location, {
            page: 1,
          });
        }}
      />
      <ChevronLeft
        className={classes.icon}
        onClick={() => {
          if (query.page <= startPage) {
            return;
          }
          replaceQuery(history, location, {
            page: Number(query.page) - 1,
          });
          
        }}
      />
      {renderPages.map(({ page }, i) => (
        <Span
          className={`${classes.page} ${
            String(page) === query.page && classes.pageS
          }`}
          onClick={() => {
            replaceQuery(history, location, {
              page,
            });
          }}
          key={i.toString()}
        >
          {page}
        </Span>
      ))}

      <ChevronRight
        className={classes.icon}
        onClick={() => {
          if (query.page >= maxPage) {
            return;
          }
          replaceQuery(history, location, {
            page: Number(query.page) + 1,
          });
        }}
      />
      <LastPage
        className={classes.icon}
        onClick={() => {
          if (query.page === String(maxPage)) {
            return;
          }
          replaceQuery(history, location, {
            page: maxPage,
          });
        }}
      />
    </Row>
  );
};

const useStyles = makeStyles({
  page: {
    fontSize: 16,
    cursor: "pointer",
    padding: "16px",
  },
  pageS: { color: colors.primary },
  root: { overflowX: "auto", alignItems: "center", alignSelf: "center" },
  icon: {
    cursor: "pointer",
  },
});

export default withRouter(Pagination);
