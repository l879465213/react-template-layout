import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, Input, TextField, Button } from "@material-ui/core";
import Column from "../../components/column/Column";
import Row from "../../components/row/Row";
import ButtonWrap from "../../components/button-wrap/ButtonWrap"

import { getInnerTitle } from "../../libs/bulkData";
import { colors } from "../../libs/colors";

import { apiUrl } from "../../libs/consts";
import { requestFile } from "../../services/network";
import { /* useSelector, */ useDispatch } from "react-redux";
import { handleError } from "../../redux/error/ErrorActions";

const NoticeAddEvent = ({location, history}) => {
  const classes = useStyle();
  const [inputTitle, setInputTitle] = React.useState("")
  const [inputImgTitle, setInputImgTitle] = React.useState("")
  const [inputContent, setInputContent] = React.useState("")
  const [inputContentLength, setInputContentLength] = React.useState(0)
  
  const [selectedFile, setSelectedFile] = React.useState()
  const [blobUrl, setBlobUrl] = React.useState()
  const dispatch = useDispatch();


  const onFileChange = e => { 
    if(selectedFile){
      window.URL.revokeObjectURL(blobUrl)
    }
    const windowURL = window.URL.createObjectURL(e.target.files[0])
    setSelectedFile(e.target.files[0])
    setInputImgTitle(e.target.files[0].name)
    setBlobUrl(windowURL)
    e.target.value=null
  }; 

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
                  제목
                </div>
                <div className={classes.rightColumnDiv}>
                  <div style={{ backgroundColor:"white", display:"flex", paddingRight:"10px"}}>
                    <form noValidate autoComplete="off" className={classes.fullForm} style={{ width: "100%", margin: "auto"}}>
                      <Input 
                        defaultValue={inputTitle}
                        onKeyDown={(e) =>  {
                          if(e.key === "Enter") e.preventDefault()
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

            <Row className={classes.tableRow}>

              <Row style={{height:"100%", width:"100%"}}>
                <div className={classes.leftColumnDiv2}>
                  이미지
                </div>
                <div className={classes.rightColumnDiv} style={{display:"inline-flex", width:"100%"}}>
                  <div style={{ backgroundColor:"white", display:"block", paddingRight:"10px", width:"30%"}}>
                    <form noValidate autoComplete="off" className={classes.fullForm} style={{ width: "100%"}}>
                      <Input 
                        value={inputImgTitle ? inputImgTitle : ""}
                        onKeyDown={(e) =>  {
                          if(e.key === "Enter") e.preventDefault()
                        }}  
                        disabled={true}
                      />
                    </form>
                    {inputImgTitle && <img src={blobUrl} alt="" style={{padding:"10px", width:"150px", height:"100px"}} />}

                  </div>
                  <div style={{width:"10%"}}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      onChange={(e) => onFileChange(e)}
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="default" component="span" style={{ height: "30px", marginBottom: "3px"}}>
                        찾아보기
                      </Button>
                    </label>

                  </div>
                  <div>
                    <span>* 수량제한 : 1개<br/>* 확장자명은 jpg, jpeg, png 형태만 가능합니다.</span>
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
              const formData = new FormData();
              if(selectedFile){
                formData.append('file', selectedFile);
              }
              formData.append('title', inputTitle);
              formData.append('description', inputContent);
              window.URL.revokeObjectURL(blobUrl)
              requestFile({
                url: apiUrl + "/admins/addnotice",
                form: formData,
                headers:{
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((x) => {
                history.goBack();
              })
              .catch((e) => {
                // alert(e)
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

export default withRouter(NoticeAddEvent);
