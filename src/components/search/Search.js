import React, { useEffect } from "react";
import {
  makeStyles,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
  Input,
  Slider,
  Grid,
  FormControl,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  /* KeyboardTimePicker,*/ KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Column from "../column/Column";
import { colors } from "../../libs/colors";
import Span from "../span/Span";
import Row from "../row/Row";
import ButtonWrap from "../button-wrap/ButtonWrap";
import { ArrowDropDown, CheckBox } from "@material-ui/icons";
import { queryStrToObj, formatTime, replaceQuery } from "../../services/utils";
import moment from "moment"

const thisYear = moment().format("YYYY")

const followersMarks = [
  {
    value: 1920,
    label: "1920",
  },
  {
    value: thisYear,
    label: String(thisYear),
  },
];

const Search = ({
  onChange,
  queryData,
  searchData,
  onInitQuery,
  history,
  location,
  excelUploadBtn,
  excelDownloadBtn,
  programAddBtn,
  addBtn,
  onSearch,
}) => {
  const query = queryStrToObj(location.search);
  useEffect(() => {
    if (query.page && parseInt(query.page) > 0 && onSearch) {
      onSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.limit]);

  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputWrapType, setInputWrapType] = React.useState(
    // location.pathname === "/log" ? "아이디" : "선택"
    "선택"
  );
  const [dobValue, setDobValue] = React.useState([1920, parseInt(thisYear)]);

  const handleDobChange = (event, newValue) => {
    setDobValue(newValue);
  };

  const renderValueComponent = ({
    type,
    key,
    key2,
    data,
    disabled,
    placeholder,
    trigger,
    component,
    children,
    label,
  }) => {
    switch (type) {
      case "checkbox":
        return (
          <Row className={classes.valueC}>
            <Grid container className={key === "country" ? classes.checkboxHeight : ""}>
              {data.map((xc, i) => {
                return (
                  <FormControlLabel
                    className={classes.checkboxWidth}
                    key={i.toString()}
                    control={
                      <Checkbox
                        checked={
                          (queryData[key] || "")
                            .split(",")
                            .includes(
                              xc.value
                            ) /**
                          xc
                          .isAll(
                            /* ? (
                                (queryData[key]
                                  ? queryData[key].split(",").sort().toString()
                                  : "") || ""
                              ).includes(
                                data
                                  .map((x) => x.value)
                                  .sort()
                                  .toString()
                              )
                            :  queryData[
                              key
                            ] || ""
                          )
                          .split(",")
                          .includes(xc.value)*/
                        }
                        key={i.toString()}
                        onChange={(e) => {
                          let existValueArr = (queryData[key] || "").split(",");
                          let checked = e.target.checked;
                          if (xc.isAll) {
                            if (checked) {
                              onChange(key, data.map((x) => x.value).join(","));
                            } else {
                              onChange(key, "");
                            }
                          } else {
                            if (checked) {
                              onChange(key, queryData[key] + "," + xc.value);
                            } else {
                              onChange(
                                key,
                                existValueArr
                                  .filter((x) => x !== xc.value)
                                  .join(",")
                              );
                            }
                          }
                        }}
                      />
                    }
                    label={xc.label}
                  />
                );
              })}
            </Grid>
          </Row>
        );
      case "range-slider":
        return (
          <Row className={classes.valueC}>
            <div style={{ width: "400px", paddingLeft: "15px" }}>
              <Slider
                // value={Boolean(queryData[x.label]) || dobValue}
                value={
                  queryData[data.label]
                    ? [
                        Number(queryData[data.label].split(",")[0]),
                        Number(queryData[data.label].split(",")[1]),
                      ]
                    : dobValue
                }
                onChange={(e, newValue) => {
                  handleDobChange(e, newValue);
                  onChange(label.toLowerCase(), newValue);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                marks={followersMarks}
                min={data[0].value}
                max={data[1].value}
              />
            </div>
          </Row>
        );
      case "range-date":
        return (
          <Row className={classes.valueC}>
            <div style={{ width: "100%" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="flex-start" style={{ height: "37px" }}>
                  {component && component}
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    id="date-picker-inline"
                    label=""
                    format="yyyy-MM-dd"
                    value={
                      queryData[data[0].label]
                        ? queryData[data[0].label]
                        : formatTime("agoWeek", "YYYY-MM-DD")
                    }
                    onChange={(e, date) => {
                      onChange(data[0].label, date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <span
                    style={{
                      lineHeight: "1.7",
                      fontSize: "18px",
                      marginRight: "15px",
                    }}
                  >
                    ~
                  </span>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    id="date-picker-inline2"
                    label=""
                    format="yyyy-MM-dd"
                    value={
                      queryData[data[1].label]
                        ? queryData[data[1].label]
                        : formatTime("init", "YYYY-MM-DD")
                    }
                    onChange={(e, date) => {
                      onChange(data[1].label, date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </Row>
        );
      case "menu-input":
        return (
          <React.Fragment>
            <Row className={classes.valueC} style={{ paddingLeft: "0" }}>
              <form
                noValidate
                autoComplete="off"
                style={{ width: "100%", marginRight: "10px" }}
              >
                <Input
                  value={queryData[key2] ? queryData[key2] : ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  onChange={(e) => {
                    onChange(key2, e.target.value);
                  }}
                />
              </form>
            </Row>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {data.map((xd, i) => {
                return (
                  <MenuItem
                    key={i.toString()}
                    onClick={() => {
                      setAnchorEl(null);
                      setInputWrapType(xd.label);
                      onChange(key, xd.value);
                    }}
                  >
                    {xd.label}
                  </MenuItem>
                );
              })}
            </Menu>
          </React.Fragment>
        );

      case "text-input":
        return (
          <React.Fragment>
            <Row style={{ width: "100%" }}>
              <div
                className={classes.leftColumnDiv1}
                style={{ width: "151px", margin: "auto 0" }}
              >
                {data[0].label}
              </div>
              <div
                className={classes.rightColumnDiv}
                style={{
                  width: "calc(100% - 150px)",
                  backgroundColor: "white",
                  display: "flex",
                  paddingRight: "10px",
                }}
              >
                <form
                  noValidate
                  autoComplete="off"
                  className={classes.fullForm}
                  style={{ width: "100%", margin: "auto" }}
                >
                  <Input
                    value={query[key2]}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                    onChange={(e) => {
                      onChange(key2, e.target.value);
                    }}
                  />
                </form>
              </div>
            </Row>
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Column className={classes.root}>
        {searchData &&
          searchData.map((x, i) => {
            return (
              <Row key={i.toString()} className={classes.item}>
                {x.type === "menu-input" ? (
                  <Column
                    className={classes.labelC}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    style={{ cursor: "pointer", margin: "auto" }}
                  >
                    <Row
                      style={{
                        border: "1px solid #bcbcbc",
                        padding: "7.5px",
                        position: "relative",
                        backgroundColor: "white",
                      }}
                    >
                      <Span>{inputWrapType}</Span>
                      <ArrowDropDown
                        style={{
                          left: "6rem",
                          position: "absolute",
                          top: "6px",
                        }}
                      />
                    </Row>
                  </Column>
                ) : x.type === "text-input" ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <Column className={classes.labelC}>
                    {Boolean(x.label) && <Span>{x.label}</Span>}
                  </Column>
                )}
                {renderValueComponent(x)}
              </Row>
            );
          })}
      </Column>

      <Row
        className={
          location.pathname === "/member"
            ? classes.buttons
            : classes.buttonsHaveMargin
        }
        style={{
          margin: "0",
          justifyContent: "center",
          backgroundColor: "#ececec",
        }}
      >
        <ButtonWrap
          onClick={() => {
            if (parseInt(query.page) !== 1) {
              replaceQuery(history, location, {
                page: 1,
              });
            } else {
              onSearch(query);
            }
          }}
          className={classes.search}
        >
          조회
        </ButtonWrap>
        <ButtonWrap
          onClick={() => {
            onInitQuery && onInitQuery();
          }}
          className={classes.init}
        >
          초기화
        </ButtonWrap>
      </Row>
      <Row style={{ margin: "0", justifyContent: "space-between" }}>
        {excelUploadBtn && (
          <ButtonWrap
            onClick={excelUploadBtn}
            className={classes.excelUploadButton}
          >
            Excel 업로드
          </ButtonWrap>
        )}
        {excelDownloadBtn && (
          <ButtonWrap
            onClick={excelDownloadBtn}
            className={classes.excelDownloadButton}
          >
            Excel 다운로드
          </ButtonWrap>
        )}
        {programAddBtn && (
          <ButtonWrap
            onClick={programAddBtn}
            className={classes.programAddButton}
          >
            programAddBtn
          </ButtonWrap>
        )}
      </Row>
      <Row style={{ margin: "0", justifyContent: "flex-end" }}>
        {addBtn && (
          <ButtonWrap
            onClick={() => {
              history.push(`${location.pathname}/add`);
            }}
            className={classes.addButton}
          >
            등록
          </ButtonWrap>
        )}
      </Row>
    </div>
  );
};

const useStyle = makeStyles({
  buttons: {
    alignSelf: "flex-end",
    alignItems: "center",
    margin: "20px 0px",
  },
  buttonsHaveMargin: {
    alignSelf: "flex-end",
    alignItems: "center",
    margin: "30px 0px!important",
    backgroundColor: "white!important",
  },
  search: {
    color: colors.black,
    marginRight: "16px",
    backgroundColor: colors.primary,
  },
  init: {
    backgroundColor: colors.bg1,
    color: colors.white,
  },
  root: {
    alignSelf: "stretch",
    alignItems: "stretch",
    borderBottom: "1px solid #bcbcbc",
    // marginBottom: "20px"
  },
  item: {
    padding: "0 10px",
    minHeight: "50px",
    alignSelf: "stretch",
    border: "1px solid #bcbcbc",
    borderBottomStyle: "none",
    zIndex: "1",
    backgroundColor: "#d4d4d4",
    fontWeight: "600",
    paddingRight: 0,
  },
  labelC: {
    width: "140px",
    minWidth: "100px",
    maxWidth: "200px",
    "& span": {
      fontSize: "16px",
    },
    margin: "auto",
  },
  menuInputI: {
    flex: 1,
  },
  menuInputM: {
    width: "10%",
    marginRight: "16px",
  },
  valueC: {
    flex: 1,
    paddingLeft: "10px",
    marginLeft: "10px",
    alignItems: "center",
    // height:"51px",
    backgroundColor: "white",
  },
  valueCC: {
    flex: 1,
    alignItems: "stretch",
  },
  dateRangeInputWrap: {
    flex: 1,
  },
  dateRangeCenter: {
    alignSelf: "center",
    color: colors.bg1,
    margin: "0px 20px",
    fontSize: 16,
  },
  dateRangeInput: { flex: 1 },
  dateRangePlaceholder: {
    flex: 1,
    alignSelf: "center",
    marginLeft: 20,
    color: colors.bg2,
    fontSize: 16,
  },
  menu: {
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  checkboxWidth: {
    width: "12rem",
  },
  checkboxHeight: {
    overflow: "auto",
    height:"8rem"
  },
  excelUploadButton: {
    backgroundColor: "gray",
    color: "white",
    textTransform: "inherit",
  },
  excelDownloadButton: {
    marginLeft: "165px",
    position: "absolute",
    backgroundColor: "gray",
    color: "white",
    textTransform: "inherit",
  },
  programAddButton: {
    backgroundColor: "gray",
    color: "white",
    textTransform: "inherit",
    minWidth: "130px!important",
  },
  addButton: {
    backgroundColor: "black",
    color: "white",
    textTransform: "inherit",
    minWidth: "80px!important",
  },
  leftColumnDiv1: {
    width: "30%",
    backgroundColor: "#d4d4d4",
    // paddingLeft:"15px",
    fontWeight: "600",
  },
  leftColumnDiv2: {
    width: "40%",
    backgroundColor: "#d4d4d4",
    paddingLeft: "15px",
    fontWeight: "600",
  },
});

export default Search;
