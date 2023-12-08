describe('template spec', () => {
  it('Si los daton correctos, lleva a la página principal', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(1000)
    cy.get('[data-cy="inputUserEmail"]').type("diego@gmail.com")
    cy.get('[data-cy="inputUserPassword"]').type("diego23")
    cy.get('[data-cy="loginButton"]').click();
    cy.location("pathname").should("include", "");
    cy.contains('h1', 'Dashboard')
    cy.wait(1500);
  })
  it('Si los datosson incorrectos, devuelve a login', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(1000)
    cy.get('[data-cy="inputUserEmail"]').type("paco@gmail.com")
    cy.get('[data-cy="inputUserPassword"]').type("paco24")
    cy.get('[data-cy="loginButton"]').click();
    cy.location("pathname").should("include", "/");
    cy.wait(1500);
  })
});
it("Si intento navegar a la página principal u otra, me lleva a login ", () => {
  cy.visit("http://localhost:5173/");
  cy.wait(1000);
  cy.location("pathname").should("include", "/login");
});
