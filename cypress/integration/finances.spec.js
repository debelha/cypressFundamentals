/// <reference types="cypress" />

context('Dev Finances Agilizei', () => {

   beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/')
    cy.get('#data-table tbody tr').should('have.length', 0)
    })

    it('Cadastrar entradas', () => {
        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(12) //atributo
        cy.get('[type=date]').type('2024-03-17') //atributo
        cy.get('button').contains('Salvar').click() //valor contido
        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Cadastrar saídas', () => {
        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(-12) //atributo
        cy.get('[type=date]').type('2024-03-17') //atributo
        cy.get('button').contains('Salvar').click() //valor contido
        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Remover entradas e saidas', () => {
        const entrada = 'Mesada'
        const saida = "KinderOvo"

        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type(entrada) //id
        cy.get('[name=amount]').type(100) //atributo
        cy.get('[type=date]').type('2024-03-17') //atributo
        cy.get('button').contains('Salvar').click() //valor contido
        cy.get('#data-table tbody tr').should('have.length', 1)

        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type(saida) //id
        cy.get('[name=amount]').type(-35) //atributo
        cy.get('[type=date]').type('2024-03-17') //atributo
        cy.get('button').contains('Salvar').click() //valor contido
        cy.get('#data-table tbody tr').should('have.length', 2)

        //estratégia 1: 
        cy.get('td.description')
         .contains(entrada)
         .parent()
         .find('img[onclick*=remove]')    
         .click()

         //estratégia 2:
         cy.get('td.description')
         .contains(saida)
         .siblings()
         .children('img[onclick*=remove]')
         .click()

         cy.get('#data-table tbody tr').should('have.length', 0)
    });
});