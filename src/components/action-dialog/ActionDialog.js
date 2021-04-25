import { Button, Dialog, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import colors from "../../libs/colors";
import consts from "../../libs/consts";
import { requestGet } from "../../services/network";
import Column from "../column/Column";
import Row from "../row/Row";
import Search from "../search/Search";
import Tables from "../tables/Tables";

const ActionDialog = ({ onClose, match, history, location, onChange }) => {
  const classes = useStyle();
  const [bannerSearched, setBannerSearched] = useState(false);
  const [query, setQuery] = useState({
    page: "1",
    limit: "10",
    target: "title",
    value: "",
    actionType: "notice", //['','notice','event','theme'],
  });

  const [data, setData] = useState({
    data: [],
    dataLength: 0,
  });

  const fetch = () => {
    requestGet({
      url: consts.apiUrl + "/notifications/actions",
      query: {
        ...query,
        target: query.actionType === "theme" ? "name" : "title",
      },
    })
      .catch((e) => {
        onClose();
        alert(e.message || e);
      })
      .then((data) => {
        if (query.actionType === "theme") {
          setBannerSearched(true);
        } else {
          setBannerSearched(false);
        }
        setData({ data: data.results, dataLength: data.maxCount });
      });
  };

  useEffect(() => {
    fetch();
  }, [query.page]);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="lg">
      <Column className={classes.root}>
        <Row className={classes.contentHeader}>
          <span>{"게시글 찾기"}</span>
          <Close onClick={onClose} fontSize={"large"} color="inherit" />
        </Row>

        <Search
          state={query}
          location={location}
          onChange={(obj) => {
            setQuery({ ...query, ...obj });
          }}
          match={match}
          onInitQuery={() => {
            setQuery({
              page: "1",
              limit: "1",
              target: "title",
              value: "",
              actionType: "", //['','notice','event'],
              actionId: "",
            });
          }}
          history={history}
          onSearch={fetch}
          data={[
            {
              type: "radio",
              label: "게시글",
              key: "actionType",
              data: [
                { label: "공지사항", value: "notice" },
                { label: "이벤트", value: "event" },
                { label: "배너", value: "theme" },
              ],
            },

            {
              type: "menu-input",
              label: "검색어",
              key: "target",
              key2: "value",
              data: [{ label: "제목", value: "title" }],
            },
          ]}
        />

        <Tables
          location={location}
          state={query}
          match={match}
          history={history}
          sortable={false}
          columns={
            bannerSearched
              ? [
                  { label: "등록일자", key: "createdAt", type: "date" },
                  {
                    label: "제목",
                    key: "name",
                  },
                  {
                    label: "선택하기",
                    render: (x) => {
                      return (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            onChange({
                              type: query.actionType,
                              id: x.themeId,
                              title: x.name,
                            });
                          }}
                        >
                          선택하기
                        </Button>
                      );
                    },
                  },
                ]
              : [
                  { label: "등록일자", key: "createdAt", type: "date" },
                  {
                    label: "제목",
                    key: "title",
                  },
                  { label: "예약 시간", key: "settingTime", type: "date-time" },
                  { label: "작성자", key: "name" },
                  {
                    label: "선택하기",
                    render: (x) => {
                      return (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            onChange({
                              type: query.actionType,
                              id: x.eventId || x.noticeId,
                              title: x.title,
                            });
                          }}
                        >
                          선택하기
                        </Button>
                      );
                    },
                  },
                ]
          }
          numbering
          dataLength={data.dataLength}
          renderData={data.data}
        />
      </Column>
    </Dialog>
  );
};

const useStyle = makeStyles({
  root: {
    flex: 1,
    padding: "16px",
  },
  contentHeader: {
    borderBottom: "1px solid " + colors.border,
    height: 50,
    alignSelf: "stretch",
    alignItems: "center",
    position: "relative",

    justifyContent: "center",
    "& span": {
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& svg": { cursor: "pointer", position: "absolute", right: 0 },
  },
});

export default withRouter(ActionDialog);
