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

const Comment = ({ commentInfo, reload, remember_me }) => {

    const { comment_text, created, id, patient } = commentInfo;

    const [current_date] = useState(new Date());
    const [created_date] = useState({
        year: created.split("T")[0].split("-")[0],
        month: created.split("T")[0].split("-")[1],
        day: created.split("T")[0].split("-")[2]
    })

    const [onReload, setOnReload] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [editedContent, setEditedContent] = useState(comment_text);
    const [isPendingEdit, setIsPendingEdit] = useState(false);

    useEffect(() => {
        if (onReload) {
            reload();
        }
        setOnReload(false);
    }, [onReload])

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
            const response = await callDeleteCommentAPI({ id }, remember_me);
            if (response.status === 204) {
                setOnReload(true);
            }
        }
        catch {
            console.log("Error while trying to delete comment");
        }
    }

    const callEditAPI = async () => {
        try {
            const response = await callUpdateCommentAPI({ id: id, comment_text: editedContent }, remember_me);
            if (response.status === 200) {
                // set SpecificReload -> true
            }
        }
        catch {
            console.log("Error while trying to edit comment");
        }
    }

    const callGetSpecificAPI = async () => {
        try {
            const response = await callGetSpecificCommentAPI({ id }, remember_me);
            if (response.status === 200) {
                // show new comment
            }
        }
        catch {
            // reload whole page or just do nothing
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
                        {patient.user.username}
                    </Typography>
                    <Typography variant="caption" color={"textSecondary"}>
                        {!isToday(current_date, created_date) ? months[Number(created_date.month) - 1] + " " + created_date.day + day_postfix(created_date.day)
                            + ((Number(created_date.year) === current_date.getFullYear() ? "" : ", " + created_date.year)) :
                            "Today"}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {!onEdit && <Typography variant={"body2"} color={"textPrimary"}>
                        {comment_text}
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
                                                // onClick={() => {setIsLoading(true); setOnSubmit(true);}}
                                                >
                                                <SendIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="secondary"
                                                onClick={() => {setOnEdit(false); setEditedContent(comment_text)}}>
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