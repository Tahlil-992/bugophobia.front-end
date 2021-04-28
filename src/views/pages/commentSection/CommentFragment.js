import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React, { useState } from "react";
import Comment from "./comment";
import AddComment from "./AddComment";
import { LoadingSpinner } from "../../../assets/loading.spinner";
import { Pagination } from "../../../core/modules/pagination";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography"
import { Severity } from ".";
// import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";

const CommentFragment = ({ comments, reload, show, page, pageCount, count, setMessage, isdoctor, username }) => {
    // const [curComments, setCurComments] = useState(comments);
    const [msgType, setMsgType] = useState({type: ""});
    const [direction, setDirection] = useState("right");
    const [onSlide, setOnSlide] = useState(true);

    // useEffect(() => {
    //     // if (direction !== "") {
    //     //     setOnSlide(true);
    //     // }
    //     if (direction === "left") {
    //         setCurComments(comments);
    //     }
    //     else {
    //         setCurComments(comments);
    //     }
    //     // console.log("A:" + direction);
    //     setDirection("");
    //     // console.log("B:" + direction);
    // }, [direction]);

    return (
        <Paper minWidth="100%" borderRadius="7px 7px 0 0" maxWidth="100%" elevation={3} style={{backgroundColor: "rgb(0,163,128, 0.8)"}}>
            {show && comments.map((comment, index) => {
                return (
                    <Box key={"Box-comment-" + comment.id} padding={index == 0 ? "1em 0 0 0" : "0}"}>
                    {/* <Slide key={"slide-A-" + comment.id} direction={direction === "left" ? "left" : "right"} in={onSlide} exit={!onSlide} mountOnEnter unmountOnExit timeout={{enter: 1000, exit: 10000}}> */}
                    <Card 
                        key={"card-" + comment.id} 
                        style={{ minWidth: "95%", maxWidth: "95%" , marginRight: "1em", marginLeft: "1em", borderRadius: (index == 0 ? (comments.length === 1 ? "7px" : "7px 7px 0 0") :
                        (index == comments.length - 1 ? "0 0 7px 7px" : "0")) }}
                        >
                        <>
                        <CardContent>
                            <Comment setMessage={(msg) => {setMessage(msg); setMsgType(msg.type);}} commentInfo={comment} reload={() => reload(page)}/>
                        </CardContent>
                        {index !== comments.length - 1 && <Divider/>}
                        </>
                    </Card>
                    
                    {/* </Slide> */}

                    {/* <Slide key={"slide-B-" + comment.id} direction={direction === "left" ? "left" : "right"} in={!onSlide} exit={onSlide} mountOnEnter unmountOnExit timeout={{enter: 1000, exit: 10000}}>
                    <Card 
                        // key={"card-" + comment.id} 
                        style={{ maxWidth: "90%", margin: "auto", borderRadius: (index == 0 ? (comments.length === 1 ? "7px" : "7px 7px 0 0") :
                        (index == comments.length - 1 ? "0 0 7px 7px" : "0")) }}
                        >
                        <>
                        <CardContent>
                            <Comment setMessage={(msg) => {setMessage(msg); setMsgType(msg.type);}} commentInfo={comment} reload={() => reload(page)}/>
                        </CardContent>
                        {index !== comments.length - 1 && <Divider/>}
                        </>
                    </Card>
                    
                    </Slide> */}
                    </Box>
                )
            })}
            {/* {show && curComments.map(comment => {
                return (
                    <Slide direction={direction} in={!onSlide} exit={onSlide} mountOnEnter unmountOnExit timeout={{enter: 6000, exit: 10000}}>
                    <Card key={comment.id} raised style={{ maxWidth: "90%", margin: "auto", marginTop: "1em" }}>
                        <CardContent>
                            <Comment setMessage={(msg) => {setMessage(msg); setMsgType(msg.type);}} commentInfo={comment} reload={() => reload(page)}/>
                        </CardContent>
                    </Card>
                    </Slide>
                )
            })} */}
            {!show && <LoadingSpinner />}
            {count === 0 && msgType !== Severity.ERROR &&
                <Typography
                    style={{ margin: "auto", padding: "0.5em 0", marginTop: "1em", backgroundColor: "rgb(0,163,128, 0.8)", marginRight: "1em", marginLeft: "1em" }}>
                    Be the first to comment
                </Typography>}
            <Box 
                style={{ minWidth: "100%", maxWidth: "100%", position: "sticky", bottom: "0%", left: "0%", backgroundColor: "rgb(224,224,224, 0.4)" }}>
            {!isdoctor && 
            <AddComment doctor_username={username} setMessage={(msg) => {setMessage(msg); setMsgType(msg.type)}} reload={() => reload(page)} />}
            <Pagination
                pageCount={pageCount}
                page={page}
                onBackwardPage={() => {setDirection("left"); setOnSlide(true); reload(page - 1);}}
                onForwardPage={() => {setDirection("right"); setOnSlide(true);reload(page + 1);}}
                onForwardLastPage={() => {setDirection("right"); setOnSlide(true); reload(pageCount);}}
                onBackwardFirstPage={() => {setDirection("left"); setOnSlide(true); reload(1);}} />
            </Box>
        </Paper>
    );
}

export default connect(state => {
    return {
        isdoctor: state.authReducer.isdoctor,
    }
}, null)(CommentFragment)