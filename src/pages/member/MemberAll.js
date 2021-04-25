import React, { useEffect, useRef, useState } from "react";
import ListLayout from "../../layouts/list/ListLayout";

import { apiUrl } from "../../libs/consts";
import { requestFile, requestGet, requestPost } from "../../services/network";
import { replaceQuery, defaultQuery, formatTime } from "../../services/utils";
import queryString from "query-string";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { saveAs } from "file-saver";
import moment from "moment"

const MemberAll = ({ history, location }) => {
  const [open, setOpen] = React.useState(false);
  const [maxUserId, setMaxUserId] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = React.useState({
    data: [],
    dataLength: 0,
  });

  const excelUploadRef = useRef();

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
        console.log(error);
      });
  };

  const handleExcelDownload = () => {
    Object.keys(query).map((key) => {
      if (query[key] && query[key].includes("all")) {
        query[key] = "all";
      }
    });
    requestGet({ url: apiUrl + "/admins/usersexcel", query })
      .then((x) => {
        const unit8arr = new Buffer.from(x.data);
        saveAs(new Blob([unit8arr]), "회원.xlsx");
      })
      .catch((e) => {
        alert(e.message || e);
      });
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        alert("xlsx파일만 업로드 가능합니다.");
        return;
      }
      const form = new FormData();
      form.append("file", file);
      requestFile({ url: apiUrl + "/admins/users", form: form })
        .then((x) => {
          alert("등록 되었습니다.");
          fetch(query);
        })
        .catch((e) => {
          alert(e.message || e);
        });
      e.target.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={excelUploadRef}
        onChange={handleExcelUpload}
        style={{ display: "none" }}
      />
      <ListLayout
        // fetchData={fetchData}
        {...data}
        onInitQuery={initQuery}
        searchData={searchData}
        history={history}
        location={location}
        columns={columns}
        excelUploadBtn={() => {
          requestGet(
            {
              url: apiUrl + "/admins/lastuserid",
            },
            query
          )
            .then(({ userId }) => {
              setMaxUserId(userId);
              setOpen(true);
            })
            .catch((e) => {
              alert(e.message || e);
            });
        }}
        excelDownloadBtn={handleExcelDownload}
        onSearch={fetch}
        pagination={true}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"엑셀 업로드"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            엑셀 다운로드 양식과 동일한 양식으로 업로드되는지 확인해주세요.
            <br />
            회원 ID {maxUserId + 1}부터 시작해주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button
            onClick={() => {
              handleClose();
              excelUploadRef.current.click();
            }}
            color="primary"
            autoFocus
          >
            업로드
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberAll;
