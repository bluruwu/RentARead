describe('Caja negra -> login', () => {
  it('Funciona el login', () => {
    cy.visit('http://127.0.0.1:8000/home')
    cy.get('#login').click()
    cy.get('#email').type('ana@gmail.com')
    cy.get('#contrasena').type('1111')
    cy.get('#captcha').invoke('css', 'display', 'none')  
    cy.get('#iniciarsesion').click()
    cy.request('http://127.0.0.1:8000/login').then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})