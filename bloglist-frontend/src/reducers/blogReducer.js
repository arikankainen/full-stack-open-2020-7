import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'ADD_BLOG': {
      return [...state, action.data]
    }
    case 'REMOVE_BLOG': {
      return state.filter(
        blog => blog.id !== action.data.id
      )
    }
    case 'LIKE_BLOG': {
      const updatedBlog = action.data
      return state.map(
        blog => blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    }
    case 'ADD_COMMENT': {
      const updatedBlog = action.data
      return state.map(
        blog => blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    }
    default: {
      return state
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)

      dispatch(setNotification({
        message: `${newBlog.title} by ${newBlog.author} created`,
        type: 'success',
      }, 5))

      dispatch({
        type: 'ADD_BLOG',
        data: newBlog,
      })
    } catch (exception) {
      dispatch(setNotification({
        message: 'failed to create new blog',
        type: 'error',
      }, 5))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })

    dispatch({
      type: 'LIKE_BLOG',
      data: {
        ...blog,
        likes: blog.likes + 1,
      }
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const comments = [...blog.comments, comment]

    await blogService.update({
      ...blog,
      comments,
      user: blog.user.id,
    })

    dispatch({
      type: 'ADD_COMMENT',
      data: {
        ...blog,
        comments,
      }
    })
  }
}

export default blogReducer