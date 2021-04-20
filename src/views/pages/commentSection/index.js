import React, { useEffect, useState } from "react";
import { CommentFragment } from "./CommentFragment";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { callAPIHandler } from "../../../core/modules/refreshToken";
import { connect } from "react-redux";

const limit = 5;

const callGetCommentsAPI = async ({ doctor_username, page }, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "POST", data: { doctor_username: doctor_username }, params: {page: page}, url: "/profile/comments/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const CommentSection = ({ remember_me }) => {

    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [onSendReq, setOnSendReq] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [pageCounts, setPageCounts] = useState(1);
    const [params, setParams] = useState({page: 1});
    
    const callAPI = async () => {
        try {
            const response = await callGetCommentsAPI( {doctor_username: "zodoc", page: params.page}, remember_me )
            console.log(response);
            setCount(response.payload.count);
            setPageCounts(Math.ceil(response.payload.count / limit));
            setComments(response.payload.results.reverse());
            if (response.status === 200) {
                setMessage("Success");
            }
        }
        catch {
            setMessage("Failure");
        }
        finally {
            setIsLoading(false);
            setOnSendReq(false);
        }
    }

    useEffect(() => {
        if (onSendReq)
            callAPI();
    }, [onSendReq])

    return (
        <Container>
            <Box>
                <CommentFragment 
                    comments={comments} 
                    reload={(page) => {setOnSendReq(true); setIsLoading(true); setParams({page: page});}} 
                    show={!isLoading}
                    page={params.page}
                    pageCount={pageCounts}
                    count={count}/>
            </Box>
        </Container>


    );
}

export default connect(state => {
    return {
        remember_me: state.authReducer.authData.remember_me,
    }
}, null)(CommentSection);