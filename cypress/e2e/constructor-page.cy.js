describe('Constructor page functionality', () => {
  let droppedIngredients = [];

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:3000');
  });

  it('should open Constructor page by default', () => {
    cy.get(`[data-cy='mainPageTitle']`).contains('Соберите бургер');
  });

  describe('Constructor works as supposed', () => {
    beforeEach(() => {
      cy.get(`[data-cy='ingredientItem']`).as('ingredients');
      cy.get('@ingredients').first().as('bun');
      cy.get('@ingredients').eq(2).as('sauce');
      cy.get('@ingredients').last().as('main');
      cy.get(`[data-cy='dropZone']`).as('dropZone');
      cy.get(`[data-cy='orderBtn']`).as('orderBtn');
    });

    it('ingredients available', () => {
      cy.get('@ingredients').should('have.length', 15);
      cy.get('@bun').contains('Краторная булка N-200i');
      cy.get('@sauce').contains('Соус Spicy-X');
      cy.get('@main').contains('Сыр с астероидной плесенью');
    });

    it('ingredients draggable', () => {
      // Call the custom login command with email and password
      cy.login('fastorius@bk.ru', 'zxc123');

      const ingredientsToDrop = ['@bun', '@sauce', '@main'];

      ingredientsToDrop.forEach((ingredient) => {
        cy.get(ingredient).as('ingredient');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@dropZone').trigger('dragenter');
        cy.get('@dropZone').trigger('drop');
        droppedIngredients.push(ingredient);
      });
    });

    it('order created correctly', () => {
      // Call the custom login command with email and password
      cy.login('fastorius@bk.ru', 'zxc123');

      droppedIngredients.forEach((ingredient) => {
        cy.get(ingredient).as('ingredient');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@dropZone').trigger('dragenter');
        cy.get('@dropZone').trigger('drop');
      });

      cy.get('@orderBtn').click();
      cy.contains('Идет оформление заказа...');

      cy.wait(15000); // waiting 15.5 seconds to get response

      cy.contains('Ваш заказ начали готовить');
    });
  });
});
