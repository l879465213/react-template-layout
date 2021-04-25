import React, { useEffect } from "react";
import ListLayout from "../../layouts/list/ListLayout";

import { apiUrl } from "../../libs/consts";
import { requestGet } from "../../services/network";
import { replaceQuery, defaultQuery, formatTime } from "../../services/utils";
import { saveAs } from "file-saver";
import queryString from "query-string";

const Notice = ({ location, history }) => {
  const [data, setData] = React.useState({
    data: [],
    dataLength: 0,
  });
  const query = queryString.parse(location.search);

  const initQuery = (didmount) => {
    replaceQuery(
      history,
      location,
      defaultQuery({
        target: "title",
        value: "",
        start: formatTime("agoWeek", "YYYY-MM-DD"),
        end: formatTime("init", "YYYY-MM-DD"),
      }),
      didmount
    );
  };
  useEffect(() => {
    initQuery(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchData = [
    {
      data: [{ label: "제목", value: "title" }],
      key: "target",
      key2: "value" /* search parameter */,
      label: "선택",
      type: "text-input",
    },
    {
      data: [
        { label: "start", value: "1950" },
        { label: "end", value: "2000" },
      ],
      key: "joindate",
      key2: "value",
      label: "등록일",
      type: "range-date",
    },
  ];

  const columns = [
    { field: "no", headerName: "No", width: 100 },
    { field: "title", headerName: "제목", width: 400 },
    { field: "createdAt", headerName: "등록일", width: 400 },
    { field: "updatedAt", headerName: "수정일", width: 400 },
  ];



  const fetch = (query) => {
    requestGet({ url: apiUrl + "/admins/getnoticelist", query })
      .then((data) => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].createdAt = formatTime(
              data.rows[i].createdAt,
              "YYYY-MM-DD HH:mm:ss"
            );
            data.rows[i].updatedAt = formatTime(
              data.rows[i].updatedAt,
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
        // dispatch(handleError({ error }));
      });
  };

  const handleExcelDownload = () => {
    requestGet({ url: apiUrl + "/admins/noticesexcel", query })
      .then((x) => {
        const unit8arr = new Buffer.from(x.data);
        saveAs(new Blob([unit8arr]), "공지사항.xlsx");
      })
      .catch((e) => {
        alert(e.message || e);
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
      addBtn={true}
      pagination={true}
      onSearch={fetch}
    />
  );
};

export default Notice;
