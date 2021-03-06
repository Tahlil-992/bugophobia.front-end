import React, { useEffect, useState } from "react";
import CommentFragment from "./CommentFragment";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { callAPIHandler } from "../../../core/modules/refreshToken";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const limit = 5;

export const Severity = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}
const callGetCommentsAPI = async ({ doctor_username, page }, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "POST", data: { doctor_username: doctor_username }, params: { page: page }, url: "/profile/comments/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const SUCCESS_COLOR = "#1e4620";
const SUCCESS_BACKGROUND = "#c2fcc2";
const ERROR_COLOR = "#611a15";
const ERROR_BACKGROUND = "#f9a099";

const CommentSection = ({ remember_me, username }) => {

    console.log("USER => " + username);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [comments, setComments] = useState([]);
    const [onSendReq, setOnSendReq] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [pageCounts, setPageCounts] = useState(1);
    const [params, setParams] = useState({ page: 1 });
    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        setOnSendReq(true);
    }, [username])

    useEffect(() => {
        console.log("[MESSAGE] => " + message.text)
        if (message.text !== "") {
            setOpenSnackBar(true);
        }
    }, [message])

    const callAPI = async () => {
        try {
            const response = await callGetCommentsAPI({ doctor_username: username, page: params.page }, remember_me)
            console.log(response);
            setCount(response.payload.count);
            setPageCounts(Math.ceil(response.payload.count !== 0 ? response.payload.count / limit : 1));
            setComments(response.payload.results.reverse());
            if (response.status === 200) {
                if (message.text !== "")
                    setMessage({ text: message.text, type: Severity.SUCCESS });
            }
        }
        catch {
            setMessage({ text: "Could not load the comments!", type: Severity.ERROR });
        }
        finally {
            setIsLoading(false);
            setOnSendReq(false);
        }
    }

    const handleClose = () => {
        // console.log("MESSAGE = " + message.text);
        // console.log("TYPE = " + message.type);
        setOpenSnackBar(false);
    }

    useEffect(() => {
        if(!openSnackBar) {
            setMessage({type: "", text: ""});
        }
    }, [openSnackBar])

    useEffect(() => {
        if (onSendReq) {
            callAPI();
        }
    }, [onSendReq])

    return (
        <Container style={{padding: "0"}}>
            <Box minWidth="100%" maxWidth="100%">
                <CommentFragment
                    comments={comments}
                    reload={(page) => { setOnSendReq(true); setIsLoading(true); setParams({ page: page }); }}
                    show={!isLoading}
                    page={params.page}
                    pageCount={pageCounts}
                    count={count} 
                    setMessage={(msg) => {setMessage(msg);}}
                    username={username}/>
            </Box>
            {openSnackBar && <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleClose}
                resumeHideDuration={0}
            >
                <Paper style={{
                    backgroundColor: message.type === Severity.SUCCESS ? SUCCESS_BACKGROUND : ERROR_BACKGROUND
                    , borderRadius: "7px"
                }} elevation={3}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        px={"1em"} py={"1em"}>
                        {message.type === Severity.ERROR && <ErrorOutlineIcon style={{
                            color: message.type === Severity.SUCCESS ? SUCCESS_COLOR : ERROR_COLOR
                            , marginRight: "0.5em"
                        }} />}
                        {message.type === Severity.SUCCESS && <CheckCircleIcon />}
                        <Box>
                            <Typography style={{ color: message.type === Severity.SUCCESS ? SUCCESS_COLOR : ERROR_COLOR }} display="block">{message.text}</Typography>
                        </Box>
                        <IconButton anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClick={handleClose}>
                            <CloseIcon style={{ color: message.type === Severity.SUCCESS ? SUCCESS_COLOR : ERROR_COLOR }} />
                        </IconButton>
                    </Box>
                </Paper>
            </Snackbar>}
        </Container>


    );
}

export default connect(state => {
    return {
        remember_me: state.authReducer.authData.remember_me,
    }
}, null)(CommentSection);