import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Comment from "./comment";
import AddComment from "./AddComment";
import { LoadingSpinner } from "../../../assets/loading.spinner";
import { Pagination } from "../../../core/modules/pagination";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography"
import { Severity } from ".";
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";

const CommentFragment = ({ comments, reload, show, page, pageCount, count, setMessage, isdoctor, username }) => {
    const [msgType, setMsgType] = useState({type: ""});
    const [onChangePage, setOnChangePage] = useState(false);

    useEffect(() => {
        if (show) {
            setOnChangePage(false);
        }
    }, [show])

    return (
        <>
        <Paper minWidth="100%" borderRadius="7px 7px 0 0" maxWidth="100%" elevation={0} style={{backgroundColor: "inherit", zIndex: 1}}>
            {!isdoctor &&
            <Box position="sticky" left="0%" top="0%" zIndex={2}>
                <AddComment doctor_username={username} setMessage={(msg) => {setMessage(msg); setMsgType(msg.type)}} reload={() => reload(page)} />
            </Box>}
            <Box style={{marginTop: "1em", marginBottom: "1em"}}>
            {!onChangePage && comments.map((comment, index) => {
                return (
                    <Box key={"Box-comment-" + comment.id}>
                    <Card 
                        key={"card-" + comment.id} 
                        style={{wordBreak: "break-word", minWidth: "95%", maxWidth: "95%" , marginRight: "1em", marginLeft: "1em", borderRadius: (index === 0 ? (comments.length === 1 ? "7px" : "7px 7px 0 0") :
                        (index === comments.length - 1 ? "0 0 7px 7px" : "0")) }}
                        >
                        <>
                        <CardContent>
                            <Comment setMessage={(msg) => {setMessage(msg); setMsgType(msg.type);}} commentInfo={comment} reload={() => reload(count % 5 !== 1 ? page : (page !== 1 ? page - 1 : 1))}/>
                        </CardContent>
                        {index !== comments.length - 1 && <Divider/>}
                        </>
                    </Card>
                    </Box>
                )
            })}
            </Box>
            {!show && <LoadingSpinner />}
            {count === 0 && msgType !== Severity.ERROR && !isdoctor &&
                <Typography
                    style={{ margin: "auto", padding: "0.5em 0", marginTop: "1em", backgroundColor: "inherit", marginRight: "1em", marginLeft: "1em" }}>
                    Be the first to comment.
                </Typography>}
            {count === 0 && msgType !== Severity.ERROR && isdoctor &&
                <Typography
                    style={{ margin: "auto", padding: "0.5em 0", marginTop: "1em", backgroundColor: "inherit", marginRight: "1em", marginLeft: "1em" }}>
                    No comments so far.
                </Typography>}
        </Paper>
        <Box 
                style={{ minWidth: "100%", maxWidth: "100%", padding: "1em 0", position: "sticky", bottom: "0%", left: "0%", zIndex: 0 }}>
            <Pagination
                pageCount={pageCount}
                page={page}
                onBackwardPage={() => {reload(page - 1); setOnChangePage(true);}}
                onForwardPage={() => {reload(page + 1); setOnChangePage(true);}}
                onForwardLastPage={() => {reload(pageCount); setOnChangePage(true);}}
                onBackwardFirstPage={() => {reload(1); setOnChangePage(true);}} />
        </Box>
        </>
    );
}

export default connect(state => {
    return {
        isdoctor: state.authReducer.isdoctor,
    }
}, null)(CommentFragment)