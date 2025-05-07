import { Login_SELECTORS } from '../../support/selectors/login/loginPage';
const email = Cypress.env('email');
const password = Cypress.env('password');
describe("add user", () => {
    it("test1", () => {
        cy.visit(
            "/"
        );
        cy.get(Login_SELECTORS.EMAIL_INPUT).type(email);
        cy.get(Login_SELECTORS.PASSWORD_INPUT).type(password);
        cy.get(Login_SELECTORS.LOGIN_BUTTON).click();

        cy.contains("Users", { timeout: 20000 }).should('be.visible').click();
        cy.wait(10000)
        cy.contains('button', 'Add user').click();
        cy.get('input#password')
            .type('yourPasswordHere');
        cy.get('input#fName')
            .type('John');
        cy.get('input#lName')
            .type('John');
        cy.get('input#email')
            .type('John@gmail.com');
        cy.get('input#phone')
            .type('987654');
        cy.get('input#nip')
            .type('1234');
        cy.get('#lang button').click();
        cy.contains('p', 'En - English').click();
        cy.wait(2000)
        cy.get('input#company')
            .type('com');
        cy.get('input#street')
            .type('abc def');
        cy.get('input#city')
            .type('abc def');

        cy.get('#country button').click();
        cy.contains('p', 'CA - Canada').click();


        cy.get('#states button').click();
        cy.wait(2000)
        // cy.get('div.absolute').should('be.visible');

        // Now, click the specific option "AK - Alaska"
        cy.contains('p', 'AB - Alberta').click();
        cy.contains('button', 'Override Tax').click();
        cy.contains('p', 'AB - Alberta').click();
        cy.get('input#postalCode')
            .type('abc def');

        cy.contains('button', 'Delivery zone').click();
        cy.contains('p', 'Brandon').click();
        cy.contains('button', 'Province').click();
        cy.contains('p', 'AB - Alberta').click();
        cy.contains('button', 'Declaration Rating').click();
        cy.contains('p', '1').click();
        cy.contains('button', 'Representative').click();
        cy.contains('p', 'None').click();
        cy.contains('button', 'Choose a group').click();
        cy.contains('p', 'NONE').click();
        cy.get('input#commission')
            .type('12');
        cy.get('input#transportFee')
            .type('12');
        cy.wait(3000)
        cy.contains('button', 'Add user').click();

    })
})