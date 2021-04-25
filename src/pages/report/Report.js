// import { format } from 'date-fns';
import React, { useEffect } from "react";
import ListLayout from "../../layouts/list/ListLayout";

import { apiUrl } from "../../libs/consts";
import { requestGet } from "../../services/network";
import { replaceQuery, defaultQuery, formatTime } from "../../services/utils";
import { saveAs } from "file-saver";
import queryString from "query-string";

const Report = ({ location, history }) => {
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
        target: "name",
        value: "",
        reason: "all,A/F,A/C,O",
        state: "all,W,N,D",
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
      data: [{ label: "이름", value: "name" }],
      key: "target",
      key2: "value" /* search parameter */,
      label: "선택",
      type: "text-input",
    },
    {
      data: [
        // { label: "전체", value: "", isAll: true },
        { label: "All", value: "all", isAll: true },
        { label: "광고/사기", value: "A/F" },
        { label: "욕설/비방", value: "A/C" },
        { label: "기타", value: "O" },
      ],
      key: "reason",
      label: "신고 사유",
      type: "checkbox",
    },
    {
      data: [
        // { label: "전체", value: "", isAll: true },
        { label: "All", value: "all", isAll: true },
        { label: "대기중", value: "W" },
        { label: "정상", value: "N" },
        { label: "삭제", value: "D" },
      ],
      key: "state",
      label: "조치 여부",
      type: "checkbox",
    },
    {
      data: [
        { label: "start", value: "1950" },
        { label: "end", value: "2000" },
      ],
      key: "joindate",
      key2: "value",
      label: "신고접수일",
      type: "range-date",
    },
  ];

  const columns = [
    { field: "no", headerName: "No", width: 100 },
    { field: "reportedEmail", headerName: "신고 채팅/사용자", width: 200 },
    { field: "reporterEmail", headerName: "신고자", width: 200 },
    { field: "createdAt", headerName: "신고접수일", width: 200 },
    { field: "reasonType", headerName: "신고 사유", width: 200 },
    { field: "state", headerName: "조치 여부", width: 200 },
    { field: "statedAt", headerName: "조치일", width: 200 },
  ];

  const fetch = (query) => {
    Object.keys(query).map((key) => {
      if (query[key] && query[key].includes("all")) {
        query[key] = "all";
      }
    });
    requestGet({ url: apiUrl + "/admins/getreportlist", query })
      .then((data) => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].createdAt = formatTime(
              data.rows[i].createdAt,
              "YYYY-MM-DD HH:mm:ss"
            );
            data.rows[i].statedAt = formatTime(
              data.rows[i].statedAt,
              "YYYY-MM-DD HH:mm:ss"
            );
            data.rows[i].state =
              data.rows[i].state === "W"
                ? "대기중"
                : data.rows[i].state === "N"
                ? "정상"
                : "삭제";
            data.rows[i].reasonType =
              data.rows[i].reasonType === "A/F"
                ? "광고/사기"
                : data.rows[i].reasonType === "A/C"
                ? "욕설/비방"
                : "기타";
            data.rows[i].statedAt = data.rows[i].statedAt
              ? data.rows[i].statedAt
              : "-";
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
    requestGet({ url: apiUrl + "/admins/reportsexcel", query })
      .then((x) => {
        const unit8arr = new Buffer.from(x.data);
        saveAs(new Blob([unit8arr]), "신고.xlsx");
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
      // excelDownloadBtn={false}
      excelDownloadBtn={handleExcelDownload}
      programAddBtn={false}
      onSearch={fetch}
      pagination={true}
    />
  );
};

export default Report;
