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
import styled from 'styled-components'

const Page = styled.div`
  margin: var(--default-margin);
`
const Navigation = styled.div`
  padding: 5px;
  background: #292929;
`
const NavigationLink = styled(Link)`
  padding: 10px;
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
const H1 = styled.h1`
  margin-bottom: var(--default-margin);
  padding: 20px;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  color: var(--accent-color-1);
  background: #333;
`
const LoggedUser = styled.span`
  padding: 10px;
  color: var(--default-text-color);
`
const LoginButton = styled.button`
  padding: 2px 5px;
  margin-top: 5px;
  background: var(--accent-color-1);
  border: none;
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
const BlogsContainer = styled.div`
  margin-top: var(--default-margin);
`

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
      <Page>
        <H1>login to application</H1>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            <div>username</div>
            <Input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <div>password</div>
            <Input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <LoginButton id='login'>login</LoginButton>
        </form>
      </Page>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Navigation>
        <NavigationLink to="/">blogs</NavigationLink>
        <NavigationLink to="/users">users</NavigationLink>
        <LoggedUser>
          {login.name} logged in <Button onClick={handleLogout}>logout</Button>
        </LoggedUser>
        <Notification notification={notification} />
      </Navigation>

      <Page>
        <H1>blog app</H1>

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
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            <BlogsContainer>
              {blogs.sort(byLikes).map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </BlogsContainer>
          </Route>
        </Switch>
      </Page>
    </div>
  )
}

export default App