import React from "react";
import Column from "../../components/column/Column";
import Tables from "../../components/tables/Tables";
import Search from "../../components/search/Search";

import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import queryString from "query-string";

import { getInnerTitle } from "../../libs/bulkData";

const ListLayout = ({
  data,
  dataLength,
  searchData,
  history,
  location,
  columns,
  excelUploadBtn,
  onInitQuery,
  excelDownloadBtn,
  programAddBtn,
  addBtn,
  onSearch,
  pagination,
}) => {
  const classes = useStyle();
  let query = queryString.parse(location.search);

  const handleReplaceQuery = (key, data) => {
    history.replace({
      pathname: location.pathname,
      search: "?" + queryString.stringify({ ...query, [key]: data }),
    });
  };

  return (
    <Column className={classes.root}>
      <div style={{ margin: "0 0 15px", fontWeight: "600", fontSize: "18px" }}>
        {getInnerTitle(location.pathname).label}
      </div>
      <Search
        onChange={handleReplaceQuery}
        queryData={query}
        searchData={searchData}
        onInitQuery={onInitQuery}
        history={history}
        location={location}
        excelUploadBtn={excelUploadBtn}
        excelDownloadBtn={excelDownloadBtn}
        programAddBtn={programAddBtn}
        addBtn={addBtn}
        onSearch={onSearch}
      />
      <Tables
        queryData={query}
        history={history}
        location={location}
        dataLength={dataLength}
        renderData={data}
        columns={columns}
        pagination={pagination}
      />
    </Column>
  );
};

const useStyle = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    overflowY: "auto",
    justifyContent: "space-between",
  },
  pagination: {
    margin: "36px 0px",
  },
});

export default withRouter(ListLayout);
