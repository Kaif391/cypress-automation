import { Login_SELECTORS } from '../../support/selectors/login/loginPage';
import 'cypress-wait-until';
const email = Cypress.env('email');
const password = Cypress.env('password');
describe("add group", () => {
    it("test1", () => {
        cy.visit(
            "/"
        );
        // cy.waitUntil(() =>
        //     cy.get(Login_SELECTORS.EMAIL_INPUT).then($el => Cypress.dom.isVisible($el)),
        //     {
        //         timeout: 10000,
        //         interval: 500,
        //         errorMsg: 'Email input never became visible',
        //     }
        // );
        cy.get(Login_SELECTORS.EMAIL_INPUT).type(email);
        cy.get(Login_SELECTORS.PASSWORD_INPUT).type(password);
        cy.get(Login_SELECTORS.LOGIN_BUTTON).click();

        cy.contains("Users", { timeout: 20000 }).should('be.visible').click();
        cy.wait(10000)
        cy.get('button[role="tab"]').contains('Groups').click();
        cy.wait(2000)
        cy.contains('button', 'Add a group').click();

        cy.wait(2000)
        cy.get('input#name')
            .clear()
            .type('test234');
        cy.get('input#address')
            .clear()
            .type('abc def');
        cy.wait(2000);
        cy.contains('button', 'Confirm')
            .should('not.be.disabled')
            .click();

    })
})