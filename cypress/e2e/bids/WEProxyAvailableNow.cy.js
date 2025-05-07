import { ADD_VEHICLE_SELECTORS } from "../../support/selectors/addVehicle/addVehicle";
import { BID_SELECTORS } from "../../support/selectors/bids/bid";
import { Login_SELECTORS } from "../../support/selectors/login/loginPage";

const email = Cypress.env('email');
const password = Cypress.env('password');
describe('bidAvailableNow', () => {
    it("test1", () => {
        cy.visit(
            "/"
        );
        cy.get(Login_SELECTORS.EMAIL_INPUT).type(email);
        cy.get(Login_SELECTORS.PASSWORD_INPUT).type(password);
        cy.get(Login_SELECTORS.LOGIN_BUTTON).click();
        cy.contains('Available Now', { timeout: 20000 }).should('be.visible').click();
        cy.wait(5000)
        cy.contains('button', 'Proxy').click();
        cy.get('input[type="text"]')
            .click()
            .clear()
            .type('1000')
            .blur();

    })
})