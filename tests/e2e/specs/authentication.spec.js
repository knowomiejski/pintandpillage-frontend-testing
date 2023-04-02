// https://docs.cypress.io/api/table-of-contents

describe('Authentication', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should not register when the username is not provided', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#email').type("teste2e@example.com")
    cy.get('#password').type("Test12345!")
    cy.get('#repeatPassword').type("Test12345!")
    cy.get('#register-btn').click()

    cy.get('.v-toast-error').contains('Username is required')
  })

  it('should not register when the email is not provided', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#password').type("Test12345!")
    cy.get('#repeatPassword').type("Test12345!")
    cy.get('#register-btn').click()

    cy.get('.v-toast-error').contains('Email is required')
  })

  it('should not register when the password is not provided', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#email').type("teste2e@example.com")
    cy.get('#repeatPassword').type("Test12345!")
    cy.get('#register-btn').click()

    cy.get('.v-toast-error').contains('Password is required')
  })

  it('should not register when the password is too short', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#email').type("teste2e@example.com")
    cy.get('#password').type("Test")
    cy.get('#repeatPassword').type("Test")
    cy.get('#register-btn').click()

    cy.get('.v-toast-error').contains('Password must have at least')
  })

  it('should not register when the repeat password is not provided', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#email').type("teste2e@example.com")
    cy.get('#password').type("Test12345!")
    cy.get('#register-btn').click()

    cy.get('.v-toast-error').contains('Password confirmation is required')
  })

  it('should not register when the password and repeat password don\'t match', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#email').type("teste2e@example.com")
    cy.get('#password').type("Test12345!")
    cy.get('#repeatPassword').type("Test12345!!")
    cy.get('#register-btn').click()

    cy.get('.v-toast-error').contains('The passwords don\'t match')
  })


  // WITH BACKEND CALLS
  it('should register when the registration form is filled in correctly', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#email').type("teste2e@example.com")
    cy.get('#password').type("Test12345!")
    cy.get('#repeatPassword').type("Test12345!")
    cy.get('#register-btn').click()

    cy.wait(500)
    cy.url().should('include', '/login')
    cy.get('.v-toast-success').contains('Account successfully created, please login')
  })


  it('should not register when the username is in use', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('#redirect-to-register').click()
    cy.url().should('include', '/register')

    cy.get('#username').type("TestE2EUser")
    cy.get('#email').type("teste2e2@example.com")
    cy.get('#password').type("Test12345!")
    cy.get('#repeatPassword').type("Test12345!")
    cy.get('#register-btn').click()

    cy.wait(500)
    cy.url().should('include', '/register')
    cy.get('.v-toast-error').contains('Username is already taken')
  })    
    
  it('should not log in when the username is wrong', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('[data-test="username"]').type("wrongemail@mail.com")
    cy.get('[data-test="password"]').type("SecureTest123!")

    cy.get('[data-test="login-btn"]').click()
    cy.get('.v-toast-error').contains('Invalid credentials')
  })
    
  it('should display incompatible browser when launched on edge', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('uncompatibleBrowser').contains('We are detecting that you are currently not using a compatible browser for this application.')
  })
    
  it('should not log in when the password is wrong', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('[data-test="username"]').type("test1@mail.com")
    cy.get('[data-test="password"]').type("WrongPassword123!")

    cy.get('[data-test="login-btn"]').click()
    cy.get('.v-toast-error').contains('Invalid credentials')
  })

  it('should log in when the correct username and password are provided', () => {
    cy.get('#nav-login-btn').click()
    cy.url().should('include', '/login')

    cy.get('[data-test="username"]').type("test1@mail.com")
    cy.get('[data-test="password"]').type("SecureTest123!")

    cy.get('[data-test="login-btn"]').click()
  })
})
