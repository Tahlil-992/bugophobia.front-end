import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { callAPIHandler } from "../../../core/modules/refreshToken";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import { LoadingSpinner } from "../../../assets/loading.spinner";
import ClearIcon from '@material-ui/icons/Clear';
import { Severity } from '.';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const callUpdateCommentAPI = async ({ id, comment_text }, isRemembered) => {
    try {
        const Response = await callAPIHandler({ method: "PUT", data: { comment_text: comment_text }, url: `/profile/comment/update_delete/${id}/` }, true, isRemembered);
        return Response;
    }
    catch (e) {
        throw e;
    }
}

const callGetSpecificCommentAPI = async ({ id }, isRemembered) => {
    try {
        const Response = await callAPIHandler({ method: "GET", url: `/profile/comment/update_delete/${id}/` }, true, isRemembered);
        return Response;
    }
    catch (e) {
        throw e;
    }
}

const callDeleteCommentAPI = async ({ id }, isRemembered) => {
    try {
        const Response = await callAPIHandler({ method: "DELETE", url:`/profile/comment/update_delete/${id}/` }, true, isRemembered);
        return Response;
    }
    catch (e) {
        throw e;
    }
}

const Comment = ({ commentInfo, reload, remember_me, setMessage }) => {

    // const { comment_text, created, id, patient } = commentInfo;

    const [commentProps, setCommentProps] = useState(
        { comment_text: commentInfo.comment_text,
        created: commentInfo.created,
        id: commentInfo.id, 
        patient: commentInfo.patient });
    const [current_date] = useState(new Date());
    const [created_date] = useState({
        year: commentProps.created.split("T")[0].split("-")[0],
        month: commentProps.created.split("T")[0].split("-")[1],
        day: commentProps.created.split("T")[0].split("-")[2]
    })
    const [onReload, setOnReload] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [editedContent, setEditedContent] = useState(commentProps.comment_text);
    const [isPendingEdit, setIsPendingEdit] = useState(false);
    const [onGetEditedComment, setOnGetEditedComment] = useState(false);

    useEffect(() => {
        if (onReload) {
            reload();
        }
        setOnReload(false);
    }, [onReload])
    
    useEffect(() => {
        if (isPendingEdit) {
            callEditAPI();
        }
    }, [isPendingEdit])

    useEffect(() => {
        if (onGetEditedComment) {
            callGetSpecificAPI();
        }
    }, [onGetEditedComment])

    const day_postfix = (day) => {
        switch (day) {
            case "1":
                return "st";
            case "2":
                return "nd";
            case "3":
                return "rd";
            default:
                return "th";
        }
    }

    const isToday = (current, created) => {
        if (Number(created.year) === current.getFullYear()
            && Number(created.month) === current.getMonth() + 1
            && Number(created.day) === current.getDate())
            return true;
        return false;
    }

    const callDeleteAPI = async () => {
        try {
            const response = await callDeleteCommentAPI({ id: commentProps.id }, remember_me);
            if (response.status === 204) {
                setOnReload(true);
                setMessage({type: Severity.SUCCESS, text: "Comment deleted successfully!"});
            }
        }
        catch {
            setMessage({type: Severity.ERROR, text: "Something went wrong while trying to delete your comment!"});
            console.log("Error while trying to delete comment");
        }
    }

    const callEditAPI = async () => {
        let pend = true;
        let onGet = false;
        try {
            const response = await callUpdateCommentAPI({ id: commentProps.id, comment_text: editedContent }, remember_me);
            if (response.status === 200) {
                pend = false;
                onGet = true;
            }
        }
        catch {
            pend = false;
            onGet = false;
            console.log("Error while trying to edit comment");
        }
        finally {
            setOnGetEditedComment(onGet);
            setIsPendingEdit(pend);
        }
    }

    const callGetSpecificAPI = async () => {
        let pend = true;
        let onGet = true;
        let content = null;
        try {
            const response = await callGetSpecificCommentAPI({ id: commentProps.id }, remember_me);
            if (response.status === 200) {
                pend = false;
                onGet = false;
                content = response.payload.comment_text;
            }
        }
        catch {
            pend = false;
            onGet = false;
            setMessage({type: Severity.ERROR, text: "Something went wrong while trying to edit your comment!"});
            // reload whole page or just do nothing
        }
        finally {
            setIsPendingEdit(pend);
            setOnGetEditedComment(onGet);
            setCommentProps({ ...commentProps, comment_text: content || commentProps.comment_text});
            setEditedContent(content || commentProps.comment_text);
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} md={2}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <AccountCircleIcon color="primary" fontSize="large" />
                </Box>
            </Grid>
            <Grid item xs={12} md={10}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"} color="secondary">
                        {commentProps.patient.user.username}
                    </Typography>
                    <Typography variant="caption" color={"textSecondary"}>
                        {!isToday(current_date, created_date) ? months[Number(created_date.month) - 1] + " " + created_date.day + day_postfix(created_date.day)
                            + ((Number(created_date.year) === current_date.getFullYear() ? "" : ", " + created_date.year)) :
                            "Today"}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {!onEdit && <Typography variant={"body2"} color={"textPrimary"}>
                        {commentProps.comment_text}
                    </Typography>}
                    {onEdit &&
                        <TextField
                            margin={"1em 0 0 0"}
                            variant={"filled"}
                            required
                            fullWidth
                            name="EditComment"
                            label="Edit your comment"
                            id="EditComment"
                            value={editedContent}
                            style={{backgroundColor: "#eeeeee"}}
                            onChange={event => setEditedContent(event.target.value)}
                            type={"text"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {!isPendingEdit &&
                                        <>
                                            <IconButton 
                                                disabled={editedContent === ""} 
                                                color="primary"
                                                onClick={() => {setIsPendingEdit(true); setOnEdit(false);}}
                                                >
                                                <SendIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="secondary"
                                                onClick={() => {setOnEdit(false); setEditedContent(commentProps.comment_text)}}>
                                                <ClearIcon />
                                            </IconButton>
                                        </>}
                                        {isPendingEdit && <LoadingSpinner withText={false}/>}
                                    </InputAdornment>)
                            }}
                        />}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {!onEdit && <IconButton>
                            <EditIcon onClick={() => setOnEdit(true)} color="primary" />
                        </IconButton>}
                        <IconButton disabled={onEdit} onClick={async() => {await callDeleteAPI();}}>
                            <DeleteIcon color={onEdit ? "disabled" : "secondary"} />
                        </IconButton>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default connect(state => {
    return {
        remember_me: state.authReducer.authData.remember_me,
    }
}, null)(Comment);