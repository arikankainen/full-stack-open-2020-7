import React from 'react'
import styled from 'styled-components'

const H2 = styled.h2`
  margin-top: var(--default-margin);
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  color: var(--accent-color-1);
`
const Username = styled.span`
  font-style: italic;
`
const Li = styled.li`
  list-style-type: none;
  font-style: italic;
`

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <H2>{user.name}</H2>
      <div>alias <Username>{user.username}</Username></div>
      <H2>added blogs</H2>
      <ul>
        {user.blogs.map(blog =>
          <Li key={blog.id}>{blog.title}</Li>
        )}
      </ul>
    </div>
  )
}

export default User