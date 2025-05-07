import { ADD_VEHICLE_SELECTORS } from "../../support/selectors/addVehicle/addVehicle";
import { BID_SELECTORS } from "../../support/selectors/bids/bid";
import { Login_SELECTORS } from "../../support/selectors/login/loginPage";
const email = Cypress.env('email');
const password = Cypress.env('password');
const apiUrl = Cypress.env('apiUrl')
const pin = Cypress.env('pin')
describe("bidAppraisal", () => {
    it("test1", () => {
      cy.visit(
        apiUrl
      );
      cy.get(Login_SELECTORS.EMAIL_INPUT).type(email);
      cy.get(Login_SELECTORS.PASSWORD_INPUT).type(password);
      cy.get(Login_SELECTORS.LOGIN_BUTTON).click();
        cy.wait(10000)
        cy.get(BID_SELECTORS.PRIMARY_BG_BUTTON).eq(1).click();
        cy.contains('p', BID_SELECTORS.AMOUNT_TEXT_PLACEHOLDER)       
            .parent()                             
            .find(ADD_VEHICLE_SELECTORS.INPUT)                       
            .type(BID_SELECTORS.AMOUNT);   
            cy.get(BID_SELECTORS.PIN_PLACEHOLDER).then(($el) => {
                if ($el.length) {
                  cy.wrap($el).type(pin);
                  cy.log('enter pin.');
                } else {
                  cy.log('PIN field not found');
                }
              });
              cy.contains(ADD_VEHICLE_SELECTORS.BUTTON, BID_SELECTORS.PLACE_BID).click();
                  

    })
})