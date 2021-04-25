import { FormControlLabel } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ListLayout from "../../layouts/list/ListLayout";

import { apiUrl } from "../../libs/consts";
import { requestGet } from "../../services/network";
import { replaceQuery, defaultQuery, formatTime } from "../../services/utils";
import queryString from "query-string";
import { saveAs } from "file-saver";
import moment from "moment"

const MemberDeleted = ({ history, location }) => {
  const [data, setData] = React.useState({
    data: [],
    dataLength: 0,
  });

  const query = queryString.parse(location.search);
  const thisYear = moment().format("YYYY")

  const initQuery = (didmount) => {
    replaceQuery(
      history,
      location,
      defaultQuery({
        search: "all",
        target: "email",
        value: "",
        gender: "all,M,F",
      }),
      didmount
    );
  };

  const searchData = [
    {
      data: [
        { label: "이름", value: "name" },
        { label: "아이디", value: "email" },
      ],
      key: "target",
      key2: "value" /* search parameter */,
      label: "선택",
      type: "menu-input",
    },
    {
      data: [
        { label: "All", value: "all", isAll: true },
        { label: "M", value: "M" },
        { label: "F", value: "F" },
      ],
      key: "gender",
      label: "Gender",
      type: "checkbox",
    },
    {
      data: [
        { label: "start", value: "1920" },
        { label: "end", value: parseInt(thisYear) },
      ],
      key: "joindate",
      key2: "value",
      label: "Join date",
      type: "range-date",
      disabled: query.search === "all",
    },
  ];

  const columns = [
    { field: "no", headerName: "No", width: 70 },
    { field: "signedAt", headerName: "Join date", width: 200 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "email", headerName: "ID", width: 150 },
  ];

  const fetch = (query) => {
    Object.keys(query).map((key) => {
      if (query[key] && query[key].includes("all")) {
        query[key] = "all";
      }
    });
    query.signed = 0;
    requestGet({ url: apiUrl + "/admins/getmemberlist", query })
      .then((data) => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].createdAt =
              data.rows[i].createdAt &&
              formatTime(data.rows[i].createdAt, "YYYY-MM-DD HH:mm:ss");
            data.rows[i].updatedAt =
              data.rows[i].updatedAt &&
              formatTime(data.rows[i].updatedAt, "YYYY-MM-DD HH:mm:ss");
            data.rows[i].signedAt =
              data.rows[i].signedAt &&
              formatTime(data.rows[i].signedAt, "YYYY-MM-DD HH:mm:ss");
          }
        }
        setData({
          data: data.rows.map((x, i) => {
            x.no =
              data.maxCount -
              (parseInt(query.page) - 1) * parseInt(query.limit) -
              i;
            return x;
          }),
          dataLength: data.maxCount,
        });
      })
      .catch((error) => {
        initQuery(true);
      });
  };

  const handleExcelDownload = () => {
    Object.keys(query).map((key) => {
      if (query[key] && query[key].includes("all")) {
        query[key] = "all";
      }
    });
    query.signed = 0;
    requestGet({ url: apiUrl + "/admins/deletedusersexcel", query })
      .then((x) => {
        const unit8arr = new Buffer.from(x.data);
        saveAs(new Blob([unit8arr]), "탈퇴회원.xlsx");
      })
      .catch((e) => {
        alert(e.message || e);
      });
  };

  return (
    <ListLayout
      // fetchData={fetchData}
      {...data}
      onInitQuery={initQuery}
      searchData={searchData}
      history={history}
      location={location}
      columns={columns}
      //excelUploadBtn={true}
      excelDownloadBtn={handleExcelDownload}
      onSearch={fetch}
      pagination={true}
    />
  );
};

export default MemberDeleted;
