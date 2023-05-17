describe('Caja negra -> login', () => {
    it('Funciona el login', () => {
      cy.visit('http://127.0.0.1:8000/home')
      cy.get('#login').click()
      cy.get('#registro').click()
    })
  })