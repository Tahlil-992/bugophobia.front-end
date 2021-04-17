import React from "react";
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

const callCreateCommentAPI = async ({ doctor_username, comment_content }, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "POST", data: { doctor: doctor_username, comment_text: comment_content }, url: "/profile/comment/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

export const AddComment = ({ doctor_username = "" }) => {

    return (
        <Card raised style={{ maxWidth: "90%", margin: "auto", marginTop: "1em", marginBottom: "1em" }}>
            <CardContent>
                <Grid container>
                    <Grid item xs={2}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <AddCommentIcon color="primary" fontSize="large"/>
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="primary">
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}