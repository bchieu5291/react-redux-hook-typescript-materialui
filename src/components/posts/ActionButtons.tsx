import React, { useContext } from "react";
import playIcon from "assets/play-btn.svg";
import editIcon from "assets/pencil.svg";
import deleteIcon from "assets/trash.svg";
import { Button } from "@material-ui/core";
import { Post } from "reducers/postReducer";
import { PostContext } from "contexts/PostContext";

const ActionButtons = (post: Post) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext);

    const choosePost = (postId: string) => {
        findPost(postId);
        setShowUpdatePostModal(true);
    };

    return (
        <>
            <Button className="post-button" href={post.url} target="_blank">
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button className="post-button" onClick={choosePost.bind(this, post._id)}>
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button className="post-button" onClick={deletePost.bind(this, post._id)}>
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </>
    );
};

export default ActionButtons;
