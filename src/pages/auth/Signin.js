import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Column from "../../components/column/Column";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Logo from "../../assets/image/logo.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { colors } from "../../libs/colors";
import { /* useSelector, */ useDispatch } from "react-redux";
import { handleError } from "../../redux/error/ErrorActions";
import { requestPost } from "../../services/network";
import { apiUrl } from "../../libs/consts";
import { userInit } from "../../redux/user/UserActions";
import { setItem } from "../../services/utils";

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const signIn = async () => {
    try {
      if (!username || !password) {
        setOpen(true);
        return;
      }
      const { token } = await requestPost({
        url: apiUrl + "/admins/signin",
        body: {
          username,
          password,
        },
      });
      setItem("token", token);
      dispatch(userInit(token));
    } catch (error) {
      setOpen(true);
      dispatch(handleError({ error, open: false }));
    }
  };

  return (
    <Column className={classes.root}>
      <CssBaseline />
      <div className={classes.paper} id="loginColumn">
        <img alt="logo" src={Logo} className={classes.logo} />
        <Column className={classes.form} noValidate>
          <TextField
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: "numeric",
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            color="primary"
            className={classes.input}
            label="아이디"
          />
          <TextField
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: "numeric",
            }}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            onKeyDown={(e) => {
              if (e.nativeEvent.key === "Enter") {
                // signIn();
              }
            }}
            color="primary"
            className={classes.input}
            label="비밀번호"
          />

          <Button
            onClick={signIn}
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
          >
            로그인
          </Button>
        </Column>
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>관리자 계정 정보가 올바르지 않습니다.</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Column>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "30%",
    objectFit: "contain",
    marginBottom: "50px",
  },
  input: {
    margin: theme.spacing(1, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "stretch",
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: colors.primary,
    fontSize: 16,
    color: "#fff",
    margin: theme.spacing(3, 0, 2),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${colors.border} !important`,
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${colors.primary} !important`,
    },
  },

  cssFocused: {},
}));

export default SignIn;
