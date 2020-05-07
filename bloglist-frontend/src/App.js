import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, loadUser } from './reducers/loginReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const blogFormRef = React.createRef()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    axios
      .get('/api/users')
      .then(response => {
        setUsers(response.data)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blog))
  }

  /*
  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(blogToRemove))
    }
  }
  */

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if ( !login ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const styleMenu = {
    backgroundColor: 'rgb(220, 220, 220)',
    padding: 5,
  }

  const styleLink = {
    padding: 10,
  }

  const styleUser = {
    padding: 10,
    paddingLeft: 20,
  }

  return (
    <div>
      <div style={styleMenu}>
        <Link style={styleLink} to="/">blogs</Link>
        <Link style={styleLink} to="/users">users</Link>
        <span style={styleUser}>
          {login.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      </div>
      <h2>blog app</h2>

      <Notification notification={notification} />

      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo blog={blog} />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App