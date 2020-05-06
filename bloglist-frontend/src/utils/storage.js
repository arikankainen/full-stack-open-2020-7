const storageKey = 'loggedBlogAppUser'

const saveUser = (user) =>
  localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const removeUser = () =>
  localStorage.removeItem(storageKey)

export default {
  saveUser,
  loadUser,
  removeUser
}