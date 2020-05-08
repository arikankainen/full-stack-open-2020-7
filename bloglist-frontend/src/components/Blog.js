import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin: 10px 0px;
  padding: 10px;
  background: #333;
`
const BlogLink = styled(Link)`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: var(--accent-color-2);
  text-decoration: none;

  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-2-lighter);
  }
`
const BlogAuthor = styled.div`
  font-size: 14px;
`
const By = styled.span`
  color: #888;
`

const Blog = ({ blog }) => {
  return (
    <Container>
      <BlogLink to={`/blogs/${blog.id}`}>{blog.title}</BlogLink>
      <BlogAuthor><By>by</By> {blog.author}</BlogAuthor>
    </Container>
  )
}

export default Blog