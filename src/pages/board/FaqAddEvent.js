import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, TextField, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import Column from "../../components/column/Column";
import Span from "../../components/span/Span";
import Row from "../../components/row/Row";
import ButtonWrap from "../../components/button-wrap/ButtonWrap"

import { getInnerTitle, getFaqTypeArr } from "../../libs/bulkData";
import { colors } from "../../libs/colors";

import { apiUrl } from "../../libs/consts";
import { requestPost } from "../../services/network";
import { /* useSelector, */ useDispatch } from "react-redux";
import { handleError } from "../../redux/error/ErrorActions";


const FaqAddEvent = ({location, history}) => {
  const classes = useStyle();
  const [inputTitle, setInputTitle] = React.useState("")
  const [inputContent, setInputContent] = React.useState("")
  const [inputContentLength, setInputContentLength] = React.useState(0)

  const [anchorFaqTypeEl, setAnchorFaqTypeEl] = React.useState(false);
  const [inputFaqLabel, setInputFaqLabel] = React.useState("선택")
  const [inputFaqType, setInputFaqType] = React.useState("")
  const dispatch = useDispatch();

  return (
    <React.Fragment>

      <div style={{ margin:"0 0 15px", fontWeight:"600", fontSize:"18px"}}>{getInnerTitle(location.pathname).label}</div>
      {/* noticeTitle, noticeImgTitle, noticeContent */}
      <Column className={classes.root} style={{marginTop:"30px"}}>

        <div className={classes.container} id="addEvent">
          <Column>
            <Row className={classes.tableRow}>
              <Row style={{height:"100%", width:"50%"}}>
                <div className={classes.leftColumnDiv1}>
                  구분
                </div>
                <div className={classes.rightColumnDiv}>
                  <div className={classes.rightColumnDiv}>
                    <Column 
                      className={classes.labelD} 
                      onClick={
                        (e) => {
                          setAnchorFaqTypeEl(e.currentTarget)}
                        }
                      style={{cursor:"pointer", paddingLeft:"10px"}}
                    >    
                      <Row style={{ border: "1px solid #b3b3b3", marginRight: "11px", marginTop: "4px", position:"relative", lineHeight: "1.9", paddingLeft: "10px" }}>
                        <Span style={{height:"30px"}}>{ inputFaqLabel }</Span><ArrowDropDown style={{ left: "80%", position: "absolute", top: "3px" }} />
                      </Row> 
                    </Column>
                    <Menu
                      anchorEl={anchorFaqTypeEl}
                      keepMounted
                      open={Boolean(anchorFaqTypeEl)}
                      onClose={() => setAnchorFaqTypeEl(false)}
                      getContentAnchorEl={null}
                    >
                      {
                        getFaqTypeArr.map((xd, i) => {
                          return(
                            <MenuItem
                              key={i.toString()}
                              onClick={() => {
                                setAnchorFaqTypeEl(false);
                                setInputFaqLabel(xd.label);
                                setInputFaqType(xd.value);
                              }}
                            >
                              {xd.label}
                            </MenuItem>
                          )}
                        )
                      }
                    </Menu>
                  </div>
                </div>
              </Row>
            </Row>

            <Row className={classes.contentTableRow2} style={{height:"100%important"}}>
              <Row style={{height:"100%", width:"100%"}}>
                <div className={classes.leftColumnDiv4}>
                  제목
                </div>
                <div className={classes.rightColumnDiv}>
                  <div id="faqEvent2" style={{ backgroundColor:"white", display:"flex"}}>
                    <form noValidate autoComplete="off" className={classes.fullForm} style={{ width: "100%", margin: "auto"}}>
                      <TextField 
                        style={{ minHeight:"60px", width:"100%"}}
                        defaultValue={inputTitle}
                        multiline
                        rowsMax={1}
                        onKeyDown={(e) =>  {
                          // if(e.key === "Enter") e.preventDefault()
                        }}  
                        onChange={(e)=>{
                          setInputTitle(e.target.value)
                        }}
                      />
                    </form>
                  </div>
                </div>
              </Row>
            </Row>

            <Row className={classes.contentTableRow} style={{height:"100%important"}}>
              <Row style={{height:"100%", width:"100%"}}>
                <div className={classes.leftColumnDiv3}>
                  내용
                </div>
                <div className={classes.rightColumnDiv}>
                  <div id="addEvent2" style={{ backgroundColor:"white", display:"flex"}}>
                    <form noValidate autoComplete="off" className={classes.fullForm} style={{ width: "100%", margin: "auto"}}>
                      <TextField 
                        style={{ minHeight:"180px", width:"100%"}}
                        multiline
                        rowsMax={4}
                        defaultValue={inputContent}
                        onKeyDown={(e) =>  {
                          // if(e.key === "Enter") e.preventDefault()
                        }}  
                        onChange={(e)=>{
                          setInputContent(e.target.value)
                          setInputContentLength(e.target.value.length)

                        }}
                      />
                    </form>
                  </div>
                  <span style={{float:"right", paddingRight:"10px"}}>({inputContentLength} / 15000)</span>

                </div>
              </Row>
            </Row>
            
          </Column>
    
        </div>
      
        <Row className={classes.buttons}>
          <ButtonWrap
            onClick={() => {
              requestPost({
                url: apiUrl + "/admins/addfaq",
                body: {
                  title: inputTitle,
                  description: inputContent,
                  type: inputFaqType
                },
              })
              .then((x) => {
                history.goBack();
              })
              .catch((e) => {
                history.goBack()
                dispatch(
                  handleError({
                    error: e,
                  })
                )
              })
            }}
            className={classes.init}
          >
            등록
          </ButtonWrap>
          <ButtonWrap
            onClick={() => {
              history.goBack()
            }}
            className={classes.cancel}
          >
            취소
          </ButtonWrap>
        </Row>
      </Column>
    </React.Fragment>
  )


}


const useStyle = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    overflowY: "auto",
    justifyContent: "space-between",
  },
  container: {
    border: "1px solid #b3b3b3",
    borderBottom: "0px"
  },
  tableRow: {
    borderBottom: "1px solid #b3b3b3",
    alignItems: "center",
    minHeight: "39px",
    lineHeight: "2.3"
  },
  contentTableRow: {
    borderBottom: "1px solid #b3b3b3",
    alignItems: "center",
    height: "100%",
    minHeight: "127px",
    lineHeight: "2.3"
  },
  contentTableRow2: {
    borderBottom: "1px solid #b3b3b3",
    alignItems: "center",
    height: "100%",
    minHeight: "60px",
    lineHeight: "2.3"
  },
  leftTalbeDiv: {
    width: "40%",
    height: "100%",
  },
  rightTableDiv: {
    width: "60%",
    height: "100%"
  },
  leftColumnDiv1: {
    width: "189px",
    minWidth:"189px",
    maxWidth:"189px",
    backgroundColor: "#d4d4d4",
    paddingLeft:"15px",
    fontWeight:"600",
    alignItems: "center",
    display: "flex",
    minHeight: "39px"
  },
  leftColumnDiv2: {
    width: "189px",
    minWidth:"189px",
    maxWidth:"189px",
    backgroundColor: "#d4d4d4",
    paddingLeft:"15px",
    fontWeight:"600",
    alignItems: "center",
    display: "flex",
    minHeight: "78px"
  },
  leftColumnDiv3: {
    width: "189px",
    minWidth:"189px",
    maxWidth:"189px",
    backgroundColor: "#d4d4d4",
    paddingLeft:"15px",
    fontWeight:"600",
    alignItems: "center",
    display: "flex",
    minHeight: "127px"
  },
  leftColumnDiv4: {
    width: "189px",
    minWidth:"189px",
    maxWidth:"189px",
    backgroundColor: "#d4d4d4",
    paddingLeft:"15px",
    fontWeight:"600",
    alignItems: "center",
    display: "flex",
    minHeight: "60px"
  },
  rightColumnDiv: {
    width: "100%",
    // paddingLeft:"15px",
  },
  commnetColumnDiv: {
    width: "100%",
    paddingLeft:"15px",
  },
  labelD: {
    width: "60%",
    minWidth: "100px",
    maxWidth: "200px",
    "& span": {
      fontSize: "16px",
    },
  },
  cancel: {
    color: colors.black,
    marginRight: "16px",
    backgroundColor: colors.white,
  },
  init: {
    backgroundColor: colors.bg1,
    color: colors.white,
  },
  buttons: {
    width:"28%",
    justifyContent:"space-between",
    alignItems: "center",
    margin: "30px auto",
  },
  input: {
    display: 'none',
  },
})

export default withRouter(FaqAddEvent);
