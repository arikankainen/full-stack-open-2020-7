import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'

const BlogInfo = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <form onSubmit = {handleAddComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogInfo