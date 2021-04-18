import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import { Comment } from "./comment";
import AddComment from "./AddComment";
import Paper from "@material-ui/core/Paper"

export const CommentFragment = ({ comments }) => {
    return (
        <Paper style={{maxWidth:"70%", margin:"auto", padding:"1em 0", marginTop:"1em", backgroundColor:"lightblue"}} variant="outlined">
        {comments.map(comment => {
            return (
                <Card raised style={{maxWidth:"90%", margin:"auto", marginTop:"1em" }}>
                    
                    <CardContent>
                        <Comment commentInfo={comment.info}/>
                    </CardContent>
                </Card>    
            )
        })}
        <AddComment setResult={(msg) => alert(msg)}/>
        </Paper>
    );
}