import { Login_SELECTORS } from "../../support/selectors/login/loginPage";
const email = Cypress.env('email');
const password = Cypress.env('password');
const apiUrl = Cypress.env('apiUrl')

describe("login", () => {
    it("Test1", () => {
      cy.visit(
       apiUrl
      );
      cy.get(Login_SELECTORS.EMAIL_INPUT).type(email);
      cy.get(Login_SELECTORS.PASSWORD_INPUT).type(password);
      cy.get(Login_SELECTORS.LOGIN_BUTTON).click();
  
  
      // Step 2: Wait for the dropdown to appear and be visible
    });
  });
  