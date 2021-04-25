import React /*useEffect*/ from "react";
// import Pagination from "@material-ui/lab/Pagination";
import Pagination from "../pagination/Pagination";
import { DataGrid } from "@material-ui/data-grid";

import { makeStyles, FormControl, NativeSelect } from "@material-ui/core";
import { replaceQuery /*formatTime*/ } from "../../services/utils";

const Tables = ({
  renderData,
  dataLength,
  queryData,
  location,
  history,
  columns,
  disabled,
  tableName,
  pagination,
}) => {
  const classes = useStyles();
  const handleRowSelection = (e) => {
    if (disabled) {
      return;
    } else {
      history.push(`${location.pathname}/detail`, e);
    }
  };
  const handleChange = (event) => {
    replaceQuery(history, location, {
      limit: event.target.value,
      page: 1,
    });
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {tableName ? (
          <div style={{ lineHeight: "2", fontSize: "18px", fontWeight: "600" }}>
            {tableName}
          </div>
        ) : (
          <div style={{ lineHeight: "2", fontSize: "18px", fontWeight: "600" }}>
            총 {dataLength}개
          </div>
        )}
        <div>
          <FormControl className={classes.formControl}>
            <NativeSelect
              defaultValue={15}
              onChange={(e) => handleChange(e)}
              name="pageSize"
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "pageSize" }}
            >
              <option value="15">15개씩 보기</option>
              <option value="30">30개씩 보기</option>
              <option value="45">45개씩 보기</option>
            </NativeSelect>
          </FormControl>
        </div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={renderData}
          columns={columns.map((x) => ({
            ...x,
            sortable: false,
          }))}
          pageSize={Number(queryData.limit)}
          onRowSelected={handleRowSelection}
        />
      </div>

      {queryData.page && pagination && (
        <Pagination
          className={classes.pagination}
          dataLength={dataLength}
          limit={queryData.limit}
        />
      )}
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  formControl: {
    width: "160px",
    paddingLeft: "10px!important",
  },
  pagination: {
    margin: "0",
  },
});

export default Tables;
