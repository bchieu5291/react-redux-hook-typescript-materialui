import React, { useContext } from 'react'
import playIcon from 'assets/play-btn.svg'
import editIcon from 'assets/pencil.svg'
import deleteIcon from 'assets/trash.svg'
import { Button } from '@material-ui/core'
import { Post } from 'reducers/postReducer'
import { PostContext } from 'contexts/PostContext'
import { News } from 'reducers/newsReducer'
import { NewsContext } from 'contexts/NewsContext'

const ActionButtons = (post: Post | News) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)
    const { deleteNews, findNews, setShowUpdateNewsModal } = useContext(NewsContext)

    const choosePost = (postId: string) => {
        if (isPost(post)) {
            findPost(postId)
            setShowUpdatePostModal(true)
        } else {
            findNews(postId)
            setShowUpdateNewsModal(true)
        }
    }

    const handleDelete = (postId: string) => {
        if (isPost(post)) {
            deletePost(post._id)
        } else {
            deleteNews(postId)
        }
    }

    const isPost = (item: Post | News): item is Post => {
        return (item as Post).status !== undefined
    }

    let chooseButton = null
    if (isPost(post)) {
        chooseButton = (
            <>
                <Button className='post-button' href={post.url} target='_blank'>
                    <img src={playIcon} alt='play' width='32' height='32' />
                </Button>
            </>
        )
    }

    return (
        <>
            {chooseButton}
            <Button className='post-button' onClick={choosePost.bind(this, post._id)}>
                <img src={editIcon} alt='edit' width='24' height='24' />
            </Button>
            <Button className='post-button' onClick={handleDelete.bind(this, post._id)}>
                <img src={deleteIcon} alt='delete' width='24' height='24' />
            </Button>
        </>
    )
}

export default ActionButtons
