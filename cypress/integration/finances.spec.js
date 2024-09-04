/// <reference types="cypress" />

import {format, prepareLocalStorage } from '../support/utils'

context('Dev Finances Agilizei', () => {

   beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/', {
        onBeforeLoad: (win) => {
            prepareLocalStorage(win)
        }
    })

    })

    it('Cadastrar entradas', () => {
        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(12) //atributo
        cy.get('[type=date]').type('2024-03-17') //atributo
        cy.get('button').contains('Salvar').click() //valor contido
        cy.get('#data-table tbody tr').should('have.length', 3)
    });

    it('Cadastrar saídas', () => {
        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(-12) //atributo
        cy.get('[type=date]').type('2024-03-17') //atributo
        cy.get('button').contains('Salvar').click() //valor contido
        cy.get('#data-table tbody tr').should('have.length', 3)
    });

    it('Remover entradas e saidas', () => {
        //estratégia 1: 
        cy.get('td.description')
         .contains("Mesada")
         .parent()
         .find('img[onclick*=remove]')    
         .click()

         //estratégia 2:
         cy.get('td.description')
         .contains("Suco Kapo")
         .siblings()
         .children('img[onclick*=remove]')
         .click()

         cy.get('#data-table tbody tr').should('have.length', 0)
    });

    it('Validar saldo com diversas transações', () => {
        //entrada
        cy.get('#transaction .button').click() 
        cy.get('#description').type('Mesada') 
        cy.get('[name=amount]').type(12) 
        cy.get('[type=date]').type('2024-03-17') 
        cy.get('button').contains('Salvar').click() 
        //saida
        cy.get('#transaction .button').click() 
        cy.get('#description').type('Remédio')
        cy.get('[name=amount]').type(-12) 
        cy.get('[type=date]').type('2024-03-17') 
        cy.get('button').contains('Salvar').click() 
  
        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')                          //pega elemento linha de tabela>corpo>linha 
            .each(($el, index, $list) => {                      //navega em cada linha da lista e executa uma ação  

              cy.get($el).find('td.income, td.expense')          //ação executada: busca dados das linhas da tabela  
                .invoke('text')                                 //invoca função text do javascript 
                .then(text => {                                 //passa o valor (text) para um contexto onde é possíve acessar
                   if(text.includes('-')){                      //formata valores de text de entradas e saídas 
                    expenses = expenses + format(text)
                   } else {
                    incomes = incomes + format(text)
                   }

                   cy.log(`entradas`, incomes)
                   cy.log(`saidas`, expenses)
                })                                          
        })  

        cy.get('#totalDisplay')                                 //mesma finalidade da função anterior porém com o valor total     
        .invoke('text')
        .then(text => {
            cy.log(`valor total`, format(text))
        
            let formattedTotalDisplay = format(text)         
            let expectedTotal = incomes + expenses     

            expect(formattedTotalDisplay).to.eq(expectedTotal)  //verifica se o valor total formatado é o mesmo que o valor real 
        })
        
    });
});