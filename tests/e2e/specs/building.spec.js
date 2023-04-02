describe('Building', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('#nav-login-btn').click()
        cy.url().should('include', '/login')
    
        cy.get('[data-test="username"]').type("test1@mail.com")
        cy.get('[data-test="password"]').type("SecureTest123!")
    
        cy.get('[data-test="login-btn"]').click()
        cy.wait(500)
    })

    // afterEach(() => {
    //     cy.get('[data-test="settings-btn"]').click()
    //     cy.get('[data-test="logout-btn"]').click()
    //     cy.wait(500)
    // })

    it('should open building modal when a building tile is clicked', () => {
        cy.get('[data-test="BuildingTile0"]').click()
        cy.get('[data-test="constructionModalTestId"]').contains('Building List')
        cy.get('#modalButton').click()
        cy.get('[data-test="settings-btn"]').click()
        cy.get('[data-test="logout-btn"]').click()
        cy.wait(500)
    })
    
    it('should build house when building tile with buildible house is clicked', () => {
        cy.get('[data-test="BuildingTile2"]').first().click()
        cy.get('#buildingButtonTestHouse').first().click()
        cy.get('[data-test="settings-btn"]').click()
        cy.get('[data-test="logout-btn"]').click()
        cy.wait(500)
    })
})