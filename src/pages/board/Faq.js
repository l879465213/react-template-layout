import React, { useEffect } from "react";
import ListLayout from "../../layouts/list/ListLayout";

import { apiUrl } from "../../libs/consts";
import { requestGet } from "../../services/network";
import { replaceQuery, defaultQuery, formatTime } from "../../services/utils";
import queryString from "query-string";
import { saveAs } from "file-saver";

const Faq = ({ location, history }) => {
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
        type: "all,auth,friend,chat,find,more",
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
        // { label: "전체", value: "", isAll: true },
        { label: "All", value: "all", isAll: true },
        { label: "가입/변경/탈퇴", value: "auth" },
        { label: "친구 목록", value: "friend" },
        { label: "채팅", value: "chat" },
        { label: "더보기", value: "more" },
      ],
      key: "type",
      label: "구분",
      type: "checkbox",
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
    { field: "typeLabel", headerName: "구분", width: 200 },
    { field: "title", headerName: "제목", width: 400 },
    { field: "createdAt", headerName: "등록일", width: 300 },
    { field: "updatedAt", headerName: "수정일", width: 300 },
  ];

  const fetch = (query) => {
    Object.keys(query).map((key) => {
      if (query[key] && query[key].includes("all")) {
        query[key] = "all";
      }
    });
    requestGet({ url: apiUrl + "/admins/getfaqlist", query })
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
            if (data.rows[i].type === "auth") {
              data.rows[i].typeLabel = "가입/변경/탈퇴";
            } else if (data.rows[i].type === "friend") {
              data.rows[i].typeLabel = "친구 목록";
            } else if (data.rows[i].type === "chat") {
              data.rows[i].typeLabel = "채팅";
            } else if (data.rows[i].type === "more") {
              data.rows[i].typeLabel = "더보기";
            }
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
    requestGet({ url: apiUrl + "/admins/faqsexcel", query })
      .then((x) => {
        const unit8arr = new Buffer.from(x.data);
        saveAs(new Blob([unit8arr]), "FAQ.xlsx");
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

export default Faq;
