import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import { Comment } from "./comment";

export const CommentFragment = ({ comments }) => {
    return (
        <>
        {comments.map(comment => {
            return (
                <Card>
                    <CardContent>
                        <Comment commentInfo={comment.info}/>
                    </CardContent>
                </Card>    
            )
        })}
        </>
    );
}