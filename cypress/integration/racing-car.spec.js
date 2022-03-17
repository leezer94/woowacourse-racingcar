/// <reference types="cypress" />

describe('racingcar', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/javascript-racingcar/');
  });
  const carNames = ['WEST', 'EAST', 'NORTH', 'SOUTH'];

  it('should initialize display when page is loaded', () => {
    cy.get('#racing-count-input').should('have.attr', 'disabled');
    cy.get('#winner').should('contain', '🏆 최종 우승자:  🏆');
  });

  // car name related

  it('should be able to display car names when button is clicked', () => {
    cy.get('#car-name-input').type(carNames.join(','));
    cy.get('#car-name-submit').click();
    cy.get('.racing-car')
      .should('be.visible')
      .should('contain', 'WEST')
      .should('contain', 'EAST')
      .should('contain', 'NORTH')
      .should('contain', 'SOUTH');
  });

  it('should not pass the validator when length of the car name is over 5 charactors', () => {
    cy.get('#car-name-input').type('nameWithOverCharacters');
    cy.get('#car-name-submit').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contain('5 자 이하의 자동차 이름을 입력해 주십시요.');
      return false;
    });
  });

  it('should not pass the validator when car name includes empty sapce', () => {
    cy.get('#car-name-input').type('this, name, is, made, with,empty,space');
    cy.get('#car-name-submit').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contain('자동차 이름은 공백을 포함해서는 안됩니다.');
    });
  });

  it('should not pass the validator when car name is not submitted', () => {
    cy.get('#car-name-submit').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contain('자동차 이름을 입력해 주십시오.');
    });
  });

  it('should clear car name input when right input value is submitted', () => {
    cy.get('#car-name-input').type(carNames.join(','));
    cy.get('#car-name-submit').click();
    cy.get('#car-name-input').should('contain', '');
  });

  it('should clear car name input when input does not pass the validator', () => {
    cy.get('#car-name-input').type('oneTwoThreeFourFive');
    cy.get('#car-name-submit').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contain('5 자 이하의 자동차 이름을 입력해 주십시요.');
      return false;
    });
    cy.get('#car-name-input').should('contain', '');
  });

  it('should contain abled attribute when validate car name(s) is(are) submitted', () => {
    cy.get('#car-name-input').type(carNames.join(','));
    cy.get('#car-name-submit').click();
    cy.get('#car-name-input').should('contain', '');
    cy.get('.racing-car')
      .should('be.visible')
      .should('contain', 'WEST')
      .should('contain', 'EAST')
      .should('contain', 'NORTH')
      .should('contain', 'SOUTH');
    cy.get('#car-name-input').should('have.attr', 'disabled');
  });

  // racing count related

  it('should remove disabled attribute when validate car name(s) is(are) submitted', () => {
    cy.get('#car-name-input').type(carNames.join(','));
    cy.get('#car-name-submit').click();
    cy.get('#car-name-input').should('contain', '');
    cy.get('.racing-car')
      .should('be.visible')
      .should('contain', 'WEST')
      .should('contain', 'EAST')
      .should('contain', 'NORTH')
      .should('contain', 'SOUTH');
    cy.get('#racing-count-input').should('not.have.attr', 'disabled');
  });

  it('should print game progress when validate racing count is submitted ', () => {
    cy.get('#car-name-input').type(carNames.join(','));
    cy.get('#car-name-submit').click();
    cy.get('#car-name-input').should('contain', '');
    cy.get('.racing-car')
      .should('be.visible')
      .should('contain', 'WEST')
      .should('contain', 'EAST')
      .should('contain', 'NORTH')
      .should('contain', 'SOUTH');
    cy.get('#racing-count-input').type(3);
    cy.get('#racing-count-submit').click();
    cy.get('.racing-car').should('contain', '⬇️️');
  });
});
