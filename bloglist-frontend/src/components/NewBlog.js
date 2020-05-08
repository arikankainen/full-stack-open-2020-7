import React, { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  background: #333;
  border: 1px solid #666;
  padding: 2px;
  color: var(--default-text-color);
  margin-bottom: 5px;
`
const H2 = styled.h2`
  margin-top: var(--default-margin);
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  color: var(--accent-color-1);
`
const Button = styled.button`
  padding: 2px 5px;
  margin: 0px 5px;
  background: var(--accent-color-1);
  border: none;
`

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <H2>create new</H2>
      <form onSubmit={handleNewBlog}>
        <div>
          <div>author</div>
          <Input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <div>title</div>
          <Input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <div>url</div>
          <Input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id="create">create</Button>
      </form>
    </div>
  )
}

export default NewBlog