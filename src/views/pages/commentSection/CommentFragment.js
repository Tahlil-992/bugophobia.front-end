import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import { Comment } from "./comment";
import AddComment from "./AddComment";
import Paper from "@material-ui/core/Paper";
import { LoadingSpinner } from "../../../assets/loading.spinner";
import { Pagination } from "../../../core/modules/pagination";

export const CommentFragment = ({ comments, reload, show, count, page }) => {
    return (
        <Paper style={{maxWidth:"70%", margin:"auto", padding:"1em 0", marginTop:"1em", backgroundColor:"lightblue"}} variant="outlined">
        {show && comments.map(comment => {
            return (
                <Card raised style={{maxWidth:"90%", margin:"auto", marginTop:"1em" }}>
                    
                    <CardContent>
                        <Comment commentInfo={comment}/>
                    </CardContent>
                </Card>    
            )
        })}
        {!show && <LoadingSpinner/>}
        <AddComment reload={() => reload()}/>
        <Pagination count={count} page={page} onBackwardPage={() => ({})} onForwardPage={() => ({})}/>
        </Paper>
    );
}