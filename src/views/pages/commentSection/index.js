import React from "react";
import { CommentFragment } from "./CommentFragment";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { callAPIHandler } from "../../../core/modules/refreshToken";

const callGetCommentsAPI = async ({ doctor_username }, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "GET", data: { doctor_username: doctor_username }, url: "/profile/comments" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

export const CommentSection = () => {
    const comments = [
        { info: { user: "ali", content: "bad doctor", time: "3 days ago" } },
        { info: { user: "hasan", content: "good doctor", time: "10 months ago" } },
    ]

    return (
        <Container>
            <Box>
                <CommentFragment comments={comments} />
            </Box>
        </Container>


    );
}