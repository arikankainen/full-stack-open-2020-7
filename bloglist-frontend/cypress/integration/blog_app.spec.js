describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const admin = {
      name: 'Administrator',
      username: 'admin',
      password: '123456'
    }
    const user = {
      name: 'Normal user',
      username: 'user',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', admin)
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('admin')
      cy.get('input[name="Password"]').type('123456')
      cy.get('#login-button').click()
      cy.contains('Administrator logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('admin')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in as "admin"', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123456' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('TestTitle')
      cy.get('input[name="author"]').type('TestAuthor')
      cy.get('input[name="url"]').type('https://testurl.com')
      cy.get('#blog-create').click()
      cy.get('.success')
        .should('contain', 'a new blog TestTitle by TestAuthor added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blog-title').contains('TestTitle')
      cy.get('.blog-author').contains('TestAuthor')
    })

    describe('When one blog already created', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl', likes: 0 })
      })

      it('it can be liked', function() {
        cy.get('.blog-view').click()
        cy.get('.blog-likes').contains('likes 0')
        cy.get('.blog-like').click()
        cy.get('.blog-likes').contains('likes 1')
      })

      it('it can be deleted by the user who created it', function() {
        cy.get('.blog-view').click()
        cy.get('.blog-delete').click()
        cy.get('.blog-title').should('not.exist')
      })

      it('it cannot be deleted by another user', function() {
        cy.login({ username: 'user', password: '123456' })
        cy.get('.blog-view').click()
        cy.get('.blog-delete').should('not.exist')
      })
    })

    describe('When several blogs already created', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'TestTitle1', author: 'TestAuthor1', url: 'TestUrl1', likes: 3 })
        cy.createBlog({ title: 'TestTitle2', author: 'TestAuthor2', url: 'TestUrl2', likes: 15 })
        cy.createBlog({ title: 'TestTitle3', author: 'TestAuthor3', url: 'TestUrl3', likes: 201 })
        cy.createBlog({ title: 'TestTitle4', author: 'TestAuthor4', url: 'TestUrl4', likes: 7 })
        cy.createBlog({ title: 'TestTitle5', author: 'TestAuthor5', url: 'TestUrl5', likes: 32 })
        cy.createBlog({ title: 'TestTitle6', author: 'TestAuthor6', url: 'TestUrl6', likes: 401 })
        cy.createBlog({ title: 'TestTitle7', author: 'TestAuthor7', url: 'TestUrl7', likes: 23 })
        cy.createBlog({ title: 'TestTitle8', author: 'TestAuthor8', url: 'TestUrl8', likes: 1 })
        cy.createBlog({ title: 'TestTitle9', author: 'TestAuthor9', url: 'TestUrl9', likes: 55 })
      })

      it('they are sorted descending order by likes', function() {
        cy.get('.blog-view').click({ multiple: true })

        cy.get('.blog-likes-number')
          .then(elements => {
            const likeList = [...elements].map(element => Number(element.textContent))
            const result = !!likeList.reduce((prev, cur) => prev !== false && cur <= prev && cur)
            cy.wrap(result).should('to.be.true')
          })
      })
    })
  })
})