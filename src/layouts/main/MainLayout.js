import React from "react";
import { withRouter, Link } from "react-router-dom";
import Column from "../../components/column/Column";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Drawer,
  FormControl,
} from "@material-ui/core";
import { colors } from "../../libs/colors";
import Span from "../../components/span/Span";
import { drawerRoutes, getMainDepth, getSubDepth } from "../../libs/bulkData";
import Row from "../../components/row/Row";
import ButtonWrap from "../../components/button-wrap/ButtonWrap";
import Logo from "../../assets/image/logo.png";
import moment from "moment-timezone"
import { userSignOut } from "../../redux/user/UserActions";

const MainLayout = ({ history, location, children }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const userReducer = useSelector((x) => x.user, []);
  return (
    <React.Fragment>
      <Column className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <img
              onClick={() => history.push("/")}
              alt=""
              src={Logo}
              style={{
                width: "100px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
            <span style={{ color: "black" }}>
              최근접속일시: {userReducer.signedAt ? moment(userReducer.signedAt).format("YYYY-MM-DD HH:mm:ss") : ""}
            </span>
            <FormControl className={classes.formControl}>
              <span
                style={{
                  color: "black",
                  lineHeight: 2,
                  fontWeight: "600",
                  textAlign: "right",
                }}
              >
                {userReducer.name ? userReducer.name : "관리자"} <span style={{ fontWeight: "500" }}>님</span>
              </span>
            </FormControl>
            <ButtonWrap
              className={classes.logout}
              onClick={() => {
                dispatch(userSignOut(history));
              }}
            >
              로그아웃
            </ButtonWrap>
          </Toolbar>
          <div className={classes.subToolbar}>
            <Link
              to={getMainDepth(location.pathname).path}
              className={classes.linkDepth}
              style={{ lineHeight: "3", color: "white" }}
            >
              {getMainDepth(location.pathname).label}
            </Link>
          </div>
        </AppBar>
        {
          //drawer
        }
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <Column className={classes.drawerContainer}>
            <span
              key="i"
              style={{
                paddingLeft: "24px",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "5px",
                color: "white",
              }}
            >
              관리메뉴
            </span>
            {drawerRoutes.map((x, i) => {
              const { path, items, label } = x;
              const ds = String(location.pathname).startsWith(path);
              let accessAble = false;
              // if (
              //   permission.filter(
              //     (x) => x.checked && x.value === path.replace("/", "")
              //   )[0]
              // ) {
              //   accessAble = true;
              // }
              return (
                <Column
                  key={i.toString()}
                  className={`${classes.drawerItem} ${
                    ds && classes.drawerItemSelected
                  }`}
                >
                  <Span
                    onClick={() => {
                      // if (
                      //   !path.includes(permission[i].value) ||
                      //   !permission[i].checked
                      // ) {
                      //   alert("접근 권한이 없습니다.");
                      //   return;
                      // }
                      if (path === "/statistics") {
                        var openNewWindow = window.open("about:blank");
                        openNewWindow.location.href =
                          "";

                        return;
                      }
                      if (items && items.length > 0) {
                        history.push(items[0].path);
                      } else if (path) {
                        if (location.pathname.startsWith(path)) {
                          return;
                        }
                        history.push(path);
                      }
                    }}
                    className={`${classes.drawerLabel} ${
                      ds && classes.drawerLabelSelected
                    } ${accessAble ? classes.drawerLabelAccessAble : ""}`}
                  >
                    └ {label}
                  </Span>
                  {ds &&
                    items &&
                    items.map((y, z) => {
                      const is = String(location.pathname).startsWith(y.path);
                      let childAccessAble = false;
                      // if (
                      //   permission[i].items &&
                      //   permission[i].items.filter(
                      //     (x) => x.checked && x.value === y.path.split("/").pop()
                      //   ).length > 0
                      // ) {
                      //   childAccessAble = true;
                      // }
                      return (
                        <Span
                          onClick={() => {
                            // if (permission[i].items) {
                            //   if (
                            //     permission[i].items
                            //       .filter((x) => x.checked)
                            //       .map(
                            //         (x) =>
                            //           "/" + permission[i].value + "/" + x.value
                            //       )
                            //       .filter((x) => y.path === x).length < 1
                            //   ) {
                            //     alert("접근 권한이 없습니다.");
                            //     return;
                            //   }
                            // }
                            if (y.path && !is) {
                              history.push(y.path);
                            }
                          }}
                          className={`${classes.drawerMenuItem} ${
                            is && classes.drawerMenuItemSelected
                          } ${
                            childAccessAble
                              ? classes.drawerMenuItemAccessAble
                              : ""
                          }`}
                          key={z.toString()}
                        >
                          {y.label}
                        </Span>
                      );
                    })}
                </Column>
              );
            })}
          </Column>
        </Drawer>
        {
          //drawer
        }
        <Column className={classes.content}>
          <Toolbar />
          <Row className={classes.labelBar}>
            <Link
              to={getSubDepth(location.pathname).path}
              className={classes.linkDepth}
            >
              {getSubDepth(location.pathname).label}
            </Link>
          </Row>
          <Column className={classes.main}>{children}</Column>
        </Column>
      </Column>
      {/* <div>{children}</div> */}
    </React.Fragment>
  );
};

const drawerWidth = 240;
const useStyle = makeStyles((theme) => ({
  root: { flex: 1 },
  title: {
    color: colors.black,
    fontSize: 24,
  },
  labelBar: {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.border}`,
    padding: "2px 20px",
    marginTop: "40px",
    "& span": {
      color: colors.black,
      fontSize: 20,
    },
  },
  appBar: {
    backgroundColor: colors.white,
    zIndex: theme.zIndex.drawer + 1,
  },
  subAppBar: {
    position: "fixed",
    top: "64px",
  },
  subToolbar: {
    position: "fixed",
    top: "64px",
    backgroundColor: "gray",
    width: "100%",
    height: "40px",
    padding: "0 0 0 24px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    backgroundColor: colors.bg1,
    overflow: "auto",
    flex: 1,
    paddingTop: "20px",
    marginTop: "40px",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#fff",
    minWidth: "1024px",
    paddingLeft: drawerWidth,
    flex: 1,
  },
  main: {
    padding: theme.spacing(3),
    flex: 1,
  },
  drawerLabel: {
    fontSize: 16,
    color: colors.textBorder,
    cursor: "pointer",
  },
  drawerItem: {
    padding: "8px 20px",
  },
  drawerItemSelected: {
    // padding: "20px",
  },
  drawerLabelSelected: {
    color: colors.white + " !important",
    // fontSize: `18px !important`,
    fontWeight: "bold",
  },
  drawerLabelAccessAble: {
    fontWeight: "bold",
    color: colors.textBorder2,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logout: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  drawerMenuItem: {
    padding: "6px 20px",
    fontSize: 15,
    cursor: "pointer",
    color: colors.textBorder,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  drawerMenuItemSelected: {
    color: colors.white + " !important",
    fontSize: 15,
    fontWeight: "bold",
  },
  drawerMenuItemAccessAble: {
    fontWeight: "bold",
    color: colors.textBorder2,
  },
  linkDepth: {
    textDecoration: "none",
    fontSize: "14px",
    lineHeight: "2.2",
    color: "rgb(39,166,248)",
  },
  formControl: {
    width: "120px",
    position: "fixed",
    right: "25%",
    top: "2%",
  },
  selectEmpty: {
    width: "120px",
    position: "fixed",
    right: "25%",
  },
}));

export default withRouter(MainLayout);
