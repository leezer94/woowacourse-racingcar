import { ERROR_MESSAGE } from '../../src/js/common/constants/constants.js';

describe('RacingCar Game', () => {
  const BASE_URL = 'http://127.0.0.1:5500/javascript-racingcar/';
  const VALID_CAR_NAMES = '123,234,345';
  const VALID_RACING_COUNT = 3;
  const milliseconds = 1000;

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('should initialize display when page is loaded', () => {
    cy.get('#game-process-section').should('have.attr', 'hidden');
    cy.get('#game-result-section').should('have.attr', 'hidden');
  });

  it('should alert error message when submitted car name length is over 5 letters', () => {
    const invalidCarName = ['WEST', 'BROCKHAMPTON'];

    cy.submitCarNames(invalidCarName.join(','));
    cy.checkAlertMessage(ERROR_MESSAGE.CAR_NAME.LENGTH_OVER_5);
  });

  it('should alert error message when car name is not submitted, submitted car name length is less than 1 letter or blank', () => {
    const invalidCarName = ' ';

    cy.submitCarNames(invalidCarName);
    cy.checkAlertMessage(ERROR_MESSAGE.CAR_NAME.EMPTY);
  });

  it('should alert error message when car name is not submitted, submitted car name includes blank', () => {
    const invalidCarName = 'BR CK';

    cy.submitCarNames(invalidCarName);
    cy.checkAlertMessage(ERROR_MESSAGE.CAR_NAME.INCLUDE_BLANK);
  });

  it('should show racing count input when valid car name(s) is(are) submitted', () => {
    cy.submitCarNames(VALID_CAR_NAMES);
    cy.get('#racing-count-input').should('be.visible');
  });

  it('should alert error message when invalid racing count number is submitted', () => {
    const count = 0;

    cy.submitCarNames(VALID_CAR_NAMES);
    cy.submitRacingCount(count);
    cy.checkAlertMessage(ERROR_MESSAGE.RACING_COUNT.MIN_MAX);
  });

  it('should decide racing winner the show winners after 2 second', () => {
    const carName = '일번마';
    cy.submitCarNames(carName);
    cy.submitRacingCount(VALID_RACING_COUNT);
    cy.clock();
    cy.tick(VALID_RACING_COUNT * milliseconds + 2000);
    cy.tick(2000);
    cy.checkAlertMessage(`축하합니다! 최종 우승자 : ${carName} 🏆 입니다. `);
  });

  it('should reset display when game reset button is clicked', () => {
    cy.submitCarNames(VALID_CAR_NAMES);
    cy.submitRacingCount(VALID_RACING_COUNT);
    cy.get('#game-restart-button').click();
    cy.get('#game-process-section').should('have.attr', 'hidden');
    cy.get('#game-result-section').should('have.attr', 'hidden');
  });
});
