import React, { useEffect } from "react";
import ListLayout from "../../layouts/list/ListLayout";
// import axios from 'axios';
import { apiUrl } from "../../libs/consts";
import { requestGet } from "../../services/network";
import { replaceQuery, defaultQuery, formatTime } from "../../services/utils";
import { saveAs } from "file-saver";
import queryString from "query-string";

const Log = ({ history, location }) => {
  let query = queryString.parse(location.search);
  const [data, setData] = React.useState({
    data: [],
    dataLength: 0,
  });
  const initQuery = (didmount) => {
    replaceQuery(
      history,
      location,
      defaultQuery({
        target: "email",
        value: "",
      }),
      didmount
    );
  };

  useEffect(() => {
    initQuery(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExcelDownload = () => {

    requestGet({ url: apiUrl + "/admins/logexcel", query })
      .then((x) => {
        const unit8arr = new Buffer.from(x.data);
        saveAs(new Blob([unit8arr]), "로그.xlsx");
      })
      .catch((e) => {
        alert(e.message || e);
      });
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
  ];

  const columns = [
    { field: "no", headerName: "No", width: 100 },
    { field: "email", headerName: "ID", width: 300 },
    { field: "opener", headerName: "최근 열람한 사용자", width: 300 },
    { field: "count", headerName: "총 열람 횟수", width: 300 },
    { field: "lastOpendAt", headerName: "최근 열람 일시", width: 300 },
  ];

  const fetch = (query) => {
    requestGet({ url: apiUrl + "/admins/getloglist", query })
      .then((data) => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].lastOpendAt = formatTime(
              data.rows[i].lastOpendAt,
              "YYYY-MM-DD HH:mm:ss"
            );
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
        console.log(error);
        initQuery(true);
      });
  };

  return (
    <ListLayout
      {...data}
      onInitQuery={initQuery}
      searchData={searchData}
      history={history}
      location={location}
      columns={columns}
      excelUploadBtn={false}
      excelDownloadBtn={handleExcelDownload}
      programAddBtn={false}
      onSearch={fetch}
      pagination={true}
    />
  );
};

export default Log;
