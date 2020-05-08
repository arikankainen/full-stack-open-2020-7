import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'
import styled from 'styled-components'

const H2 = styled.h2`
  margin-top: var(--default-margin);
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  color: var(--accent-color-1);
`
const LinkContainer = styled.div`
  margin-bottom: 10px;
`
const BlogLink = styled.a`
  padding-bottom: 10px;
  font-size: 14px;
  color: var(--accent-color-2);
  text-decoration: none;

  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-2-lighter);
  }
`
const By = styled.span`
  color: #888;
`
const Button = styled.button`
  padding: 2px 5px;
  margin: 0px 5px;
  background: var(--accent-color-1);
  border: none;
`
const Input = styled.input`
  background: #333;
  border: 1px solid #666;
  padding: 2px;
  color: var(--default-text-color);
`
const Ul = styled.ul`
  margin-top: var(--default-margin);
`
const Li = styled.li`
  list-style-type: none;
  font-style: italic;
`

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
      <H2>{blog.title} <By>by</By> {blog.author}</H2>
      <LinkContainer>
        <BlogLink href={blog.url}>{blog.url}</BlogLink>
      </LinkContainer>
      <div>
        {blog.likes} likes
        <Button onClick={handleLike}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>

      <H2>comments</H2>
      <form onSubmit = {handleAddComment}>
        <Input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button>add comment</Button>
      </form>
      <Ul>
        {blog.comments.map((comment, index) =>
          <Li key={index}>{comment}</Li>
        )}
      </Ul>
    </div>
  )
}

export default BlogInfo