import React from "react";
import { CommentFragment } from "./CommentFragment";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export const CommentSection = () => {
    const comments = [
        {info: {user: "ali", content: "bad doctor", time: "3 days ago"}},
        {info: {user: "hasan", content: "good doctor", time: "10 months ago"}},
    ]

    return (
        <Container>
            <Box>
                <CommentFragment comments={comments}/>
            </Box>
        </Container>

        
    );
}