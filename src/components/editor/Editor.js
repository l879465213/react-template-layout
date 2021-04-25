import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Column from "../column/Column";
import { Button, makeStyles } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Span from "../span/Span";
import { requestGet } from "../../services/network";
import consts from "../../libs/consts";

export default forwardRef(function EditorWrap(
  { input, html, onHtmlChange, htmlPath },
  cref
) {
  const classes = useStyle();
  const ref = useRef();
  const [maxWidth, setMaxWidth] = useState();
  const [maxHeight, setMaxHeight] = useState();
  const [v, setV] = useState("");

  useImperativeHandle(cref, () => ({
    getHtml: () => {
      return v;
    },
  }));
  useEffect(() => {
    if (ref.current) {
      setMaxHeight(ref.current.offsetHeight);
      setMaxWidth(ref.current.clientWidth);
    }
  }, [ref.current, ref.current?.clientWidth, ref.current?.clientHeight]);

  useEffect(() => {
    if (html !== undefined) {
      setV(html);
    }
  }, [html]);
  useEffect(() => {
    if (htmlPath) {
      requestGet({ url: consts.fileApiUrl + "/" + htmlPath })
        .then((data) => {
          onHtmlChange(data);
        })
        .catch((e) => {
          alert("HTML 불러오기 실패했습니다.");
        });
    }
  }, [htmlPath]);
  return (
    <Column className={classes.root}>
      <Column
        innerRef={ref}
        style={
          Boolean(maxWidth) && Boolean(maxHeight)
            ? { width: maxWidth, height: maxHeight }
            : { flex: 1 }
        }
      >
        {Boolean(maxWidth) && Boolean(maxHeight) && (
          <ReactQuill
            onBlur={() => {
              onHtmlChange && onHtmlChange(v);
            }}
            readOnly={input}
            style={{
              maxWidth: `${maxWidth}px`,
              maxHeight: `${maxHeight}px`,
              width: `${maxWidth}px`,
              flex: 1,
              //  height: `${maxHeight}px`,
            }}
            theme={input ? "bubble" : "snow"}
            value={v}
            modules={{
              toolbar: [
                [{ size: ["small", false, "large", "huge"] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "underline"],
                ["link", "image"],
              ],
            }}
            onChange={(e) => {
              if (e.includes("'")) {
                setV(e.replace("'", ""));
                alert(" ' 문자는 사용 불가능합니다.");
              } else {
                setV(e);
              }
            }}
          />
        )}
      </Column>
    </Column>
  );
});

const useStyle = makeStyles({
  button: {
    margin: "16px 8px",
    padding: "10px 75px",
  },
  root: {
    paddingRight: "50%",
    borderRadius: "5px",
    flex: 1,
    margin: "30px 0px",
    alignSelf: "stretch",
  },
});
