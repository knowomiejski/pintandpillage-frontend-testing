describe('Building', () => {

    beforeEach(() => {
        cy.wait(1000)
        cy.visit('/login')
        cy.wait(500)
        // cy.get('#nav-login-btn').click()
        // cy.url().should('include', '/login')

        cy.get('[data-test="username"]').type("teste2e@example.com")
        cy.get('[data-test="password"]').type("Test12345!")

        cy.get('[data-test="login-btn"]').click()
        cy.wait(1000)
    })

    it('should open building modal when a building tile is clicked', () => {
        cy.get('[data-test="tutorialModalContinueButton"]').click()
        cy.get('[data-test="tutorialModalLetsDoThisButton"]').click()
        cy.get('[data-test="closeBaseButton"]').click()
        cy.get('[data-test="BuildingTile0"]').click()
        cy.get('[data-test="constructionModalTestId"]').contains('Building List')
        cy.get('#modalButton').click()
        cy.get('[data-test="settings-btn"]').click()
        cy.get('[data-test="logout-btn"]').click()
        cy.wait(500)
    })

    it('should build house when building tile with buildable house is clicked', () => {
        cy.get('[data-test="BuildingTile2"]').first().click()
        cy.get('#buildingButtonTestHouse').first().click()
        cy.get('[data-test="settings-btn"]').click()
        cy.get('[data-test="logout-btn"]').click()
        cy.wait(500)
    })
})
