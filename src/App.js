import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/main/MainLayout";
import { CircularProgress } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { userInit } from "./redux/user/UserActions";
import { getItem } from "./services/utils";

const Main = lazy(() => import("./pages/Main"));
const SignIn = lazy(() => import("./pages/auth/Signin"));
const Member = lazy(() => import("./pages/member/Member"));
const MemberAll = lazy(() => import("./pages/member/MemberAll"));
const MemberDeleted = lazy(() => import("./pages/member/MemberDeleted"));
const MemberDetail = lazy(() => import("./pages/member/MemberDetail"));
const Log = lazy(() => import("./pages/log/Log"));
const LogDetail = lazy(() => import("./pages/log/LogDetail"));
const Faq = lazy(() => import("./pages/board/Faq"));
const FaqDetail = lazy(() => import("./pages/board/FaqDetail"));
const FaqAddEvent = lazy(() => import("./pages/board/FaqAddEvent"));
const Notice = lazy(() => import("./pages/board/Notice"));
const NoticeDetail = lazy(() => import("./pages/board/NoticeDetail"));
const NoticeAddEvent = lazy(() => import("./pages/board/NoticeAddEvent"));
const Report = lazy(() => import("./pages/report/Report"));
const ReportDetail = lazy(() => import("./pages/report/ReportDetail"));

const NotAuthorized = lazy(() => import("./pages/misc/NotAuthorized"));
const Error404 = lazy(() => import("./pages/misc/Error404"));

// get Auth

const App = (props) => {
  const userReducer = useSelector((x) => x.user, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInit(getItem("token")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userReducer.signed) {
    return (
      <Router>
        <Suspense
          fallback={
            <div style={{ position: "absolute", top: "45%", left: "52%" }}>
              <CircularProgress disableShrink />
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route component={NotAuthorized} />
            <Route component={Error404} />
          </Switch>
        </Suspense>
      </Router>
    );
  } else {
    return (
      <Router>
        <MainLayout>
          <Suspense
            fallback={
              <div style={{ position: "absolute", top: "45%", left: "52%" }}>
                <CircularProgress disableShrink />
              </div>
            }
          >
            <Switch>
              <Route exact path="/" component={Main} />

              <Route exact path="/member" component={Member} />
              <Route exact path="/allmember" component={MemberAll} />
              <Route exact path="/delmember" component={MemberDeleted} />
              <Route path="/delmember/detail" component={MemberDetail} />
              <Route path="/member/detail" component={MemberDetail} />
              <Route path="/allmember/detail" component={MemberDetail} />

              <Route exact path="/log" component={Log} />
              <Route path="/log/detail" component={LogDetail} />

              <Route exact path="/report" component={Report} />
              <Route path="/report/detail" component={ReportDetail} />

              <Route exact path="/board/notice" component={Notice} />
              <Route path="/board/notice/detail" component={NoticeDetail} />
              <Route path="/board/notice/add" component={NoticeAddEvent} />

              <Route exact path="/board/faq" component={Faq} />
              <Route path="/board/faq/detail" component={FaqDetail} />
              <Route path="/board/faq/add" component={FaqAddEvent} />

              <Route exact path="/alumni/collegian" component={Collegian} />
              <Route path="/alumni/organ" component={Organ} />
              <Route path="/alumni/continent" component={Continent} />

              <Route component={Error404} />
            </Switch>
          </Suspense>
        </MainLayout>
      </Router>
    );
  }
};

export default App;
