import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import { Comment } from "./comment";
import AddComment from "./AddComment";
import Paper from "@material-ui/core/Paper";
import { LoadingSpinner } from "../../../assets/loading.spinner";
import { Pagination } from "../../../core/modules/pagination";
import { Typography } from "@material-ui/core";

export const CommentFragment = ({ comments, reload, show, page, pageCount, count }) => {
    return (
        <Paper style={{ maxWidth: "70%", margin: "auto", padding: "1em 0", marginTop: "1em", backgroundColor: "lightblue" }} variant="outlined">
            {show && comments.map(comment => {
                return (
                    <Card key={comment.id} raised style={{ maxWidth: "90%", margin: "auto", marginTop: "1em" }}>
                        <CardContent>
                            <Comment commentInfo={comment} />
                        </CardContent>
                    </Card>
                )
            })}
            {!show && <LoadingSpinner />}
            {count === 0 &&
                <Typography
                    style={{ maxWidth: "90%", margin: "auto", padding: "0.5em 0", marginTop: "1em", backgroundColor: "lightblue" }}>
                    Be the first to comment
                </Typography>}
            <AddComment reload={(page) => reload(page)} />
            <Pagination
                pageCount={pageCount}
                page={page}
                onBackwardPage={() => reload(page - 1)}
                onForwardPage={() => reload(page + 1)}
                onForwardLastPage={() => reload(pageCount)}
                onBackwardFirstPage={() => reload(1)} />
        </Paper>
    );
}