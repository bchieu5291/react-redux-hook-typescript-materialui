import React, { useContext } from 'react'
import playIcon from 'assets/play-btn.svg'
import editIcon from 'assets/pencil.svg'
import deleteIcon from 'assets/trash.svg'
import { Button } from '@material-ui/core'
import { Post } from 'reducers/postReducer'
import { PostContext } from 'contexts/PostContext'
import { News } from 'reducers/newsReducer'
import { NewsContext } from 'contexts/NewsContext'
import { IBook } from 'reducers/bookReducer'
import { BookContext } from 'contexts/BookContext'

const ActionButtons = (post: Post | News | IBook) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)
    const { deleteNews, findNews, setShowUpdateNewsModal } = useContext(NewsContext)
    const { deleteBook, findBook, setShowUpdateBookModal } = useContext(BookContext)

    const choosePost = (postId: string) => {
        // console.log(post)
        if (isPost(post)) {
            findPost(postId)
            setShowUpdatePostModal(true)
        } else if (isBook(post)) {
            findBook(postId)
            setShowUpdateBookModal(true)
        } else {
            findNews(postId)
            setShowUpdateNewsModal(true)
        }
    }

    const handleDelete = (postId: string) => {
        // console.log(post)
        if (isPost(post)) {
            deletePost(post._id)
        } else if (isBook(post)) {
            deleteBook(postId)
        } else {
            deleteNews(postId)
        }
    }

    const isPost = (item: Post | News | IBook): item is Post => {
        return (item as Post).status !== undefined
    }

    const isBook = (item: Post | News | IBook): item is IBook => {
        return (item as IBook).type === 'book'
    }

    let chooseButton = null
    if (isPost(post) || isBook(post)) {
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
