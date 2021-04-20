import React, { useEffect, useState } from "react";
import { callAPIHandler } from "../../../core/modules/refreshToken";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddCommentIcon from '@material-ui/icons/AddComment';
import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { LoadingSpinner } from "../../../assets/loading.spinner";
import { Severity } from "./index";

const callCreateCommentAPI = async ({ doctor_username, comment_content }, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "POST", data: { doctor: doctor_username, comment_text: comment_content }, url: "/profile/comment/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const AddComment = ({ doctor_username = "zodoc", remember_me, reload, setMessage }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");
    const [onSubmit, setOnSubmit] = useState(false);
    const [onReload, setOnReload] = useState(false);

    const callAPI = async () => {
        let flag = false;
        try {
            const response = await callCreateCommentAPI({ doctor_username: doctor_username, comment_content: content }, remember_me);
            if (response.status === 201) {
                flag = true;
                setContent("");
            }
        }
        catch (e) {
            flag = false;
        }
        finally {
            setOnReload(flag);
            setMessage(!flag 
                ? {type: Severity.ERROR, text: "Something went wrong while trying to submit your comment!"}
                : {type: Severity.SUCCESS, text: "Comment submitted successfully!"});
        }
    }

    useEffect(() => {
        if (onReload)
            reload();
        setOnReload(false);
    }, [onReload])

    useEffect(() => {

        if (onSubmit) {
            callAPI();
        }
        setIsLoading(false);
        setOnSubmit(false);
    }, [onSubmit])

    return (
        <Card raised style={{ maxWidth: "90%", margin: "auto", marginTop: "1em", marginBottom: "1em" }}>
            <CardContent>
                <Grid container>
                    <Grid item xs={2}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <AddCommentIcon color="primary" fontSize="large" />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="add-comment"
                            label="Write your comment here ..."
                            name="add-comment"
                            multiline
                            value={content}
                            onChange={event => setContent(event.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {!isLoading &&
                                            <IconButton 
                                                disabled={content === ""} 
                                                color="primary"
                                                onClick={() => {setIsLoading(true); setOnSubmit(true);}}>
                                                <SendIcon />
                                            </IconButton>}
                                        {isLoading && <LoadingSpinner withText={false}/>}
                                    </InputAdornment>)
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default connect(state => {
    return {
        remember_me: state.authReducer.authData.remember_me,
    }
}, null)(AddComment);