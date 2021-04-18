import React, { useEffect, useState } from "react";
import { CommentFragment } from "./CommentFragment";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { callAPIHandler } from "../../../core/modules/refreshToken";
import { connect } from "react-redux";
import { LoadingSpinner } from "../../../assets/loading.spinner";

const callGetCommentsAPI = async ({ doctor_username }, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "GET", data: { doctor_username: doctor_username }, url: "/profile/comments/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const CommentSection = ({ remember_me }) => {
    const comments = [
        { info: { user: "ali", content: "bad doctor", time: "3 days ago" } },
        { info: { user: "hasan", content: "good doctor", time: "10 months ago" } },
    ]

    const [message, setMessage] = useState("");

    useEffect(() => {
        const callAPI = async () => {
            try {
                const response = await callGetCommentsAPI( {doctor_username: "zodoc"}, remember_me )
                if (response.status === 200) {
                    setMessage("Success");
                    console.log(response);
                }
            }
            catch {
                setMessage("Failure");
            }
        }
        callAPI();
    }, [])

    return (
        <Container>
            <Box>
                <CommentFragment comments={comments} />
            </Box>
        </Container>


    );
}

export default connect(state => {
    return {
        remember_me: state.authReducer.authData.remember_me,
    }
}, null)(CommentSection);