import 'cypress-file-upload';
import { Login_SELECTORS } from '../../support/selectors/login/loginPage';
import { ADD_VEHICLE_SELECTORS } from '../../support/selectors/addVehicle/addVehicle';
// import download from "../fixtures/download.jpeg"
// import download1 from "../fixtures/download.jpeg"
const email = Cypress.env('email');
const password = Cypress.env('password');
const apiUrl = Cypress.env('apiUrl');
// console.log(password,"passw");


describe("addVehicle", () => {
    it("Test1", () => {

        cy.fixture('vehicleData.json').then((data) => {

            cy.visit(
                "/"
            );
            cy.get(Login_SELECTORS.EMAIL_INPUT).type(email);
            cy.get(Login_SELECTORS.PASSWORD_INPUT).type(password);
            cy.get(Login_SELECTORS.LOGIN_BUTTON).click();

            cy.contains(ADD_VEHICLE_SELECTORS.ADD_BUTTON, { timeout: 20000 }).should('be.visible').click();


            cy.get(ADD_VEHICLE_SELECTORS.VIN_INPUT).type(data.vin);
            cy.wait(5000);
            cy.get(ADD_VEHICLE_SELECTORS.VALIDATE_BUTTON).click();

            cy.get(ADD_VEHICLE_SELECTORS.EXTERIOR_COLOR).click();
            cy.contains(data.color).click();

            cy.get(ADD_VEHICLE_SELECTORS.INTERIOR_COLOR).click();
            cy.contains(data.interiorColor).click();

            cy.get(ADD_VEHICLE_SELECTORS.NUMBER_OF_SEATS).type(data.nbseats);
            cy.get(ADD_VEHICLE_SELECTORS.TRANSMISSION_BUTTON).click();
            cy.contains(data.transmission).click();

            cy.get(ADD_VEHICLE_SELECTORS.ENGINE).type(data.engine);
            cy.get(ADD_VEHICLE_SELECTORS.FUEL_BUTTON).click();
            cy.contains(data.fuel).click();

            cy.get(ADD_VEHICLE_SELECTORS.ODOMETER).type(data.odometer);
            cy.get(ADD_VEHICLE_SELECTORS.TPMS_BUTTON).click();
            cy.contains(data.tpms).click();

            cy.get(ADD_VEHICLE_SELECTORS.DRIVETRAIN_BUTTON).click();
            cy.contains(data.drivetrain).click();

            cy.get(ADD_VEHICLE_SELECTORS.BODY_TYPE).click();
            cy.contains(data.bodyType).click();

            cy.get(ADD_VEHICLE_SELECTORS.STEERING_POSITION).click();
            cy.contains(data.steeringPosition).click();

            cy.get(ADD_VEHICLE_SELECTORS.FEATURES).check();

            // cy.contains(ADD_VEHICLE_SELECTORS_SELECTORS_SELECTORS.ROLE_TAB, data.exteriorDamages).click();
            cy.get(ADD_VEHICLE_SELECTORS.EXTERIOR_DAMAGE).find(ADD_VEHICLE_SELECTORS.ROLE_TAB).contains(data.soldAsIs).click();
            cy.get(ADD_VEHICLE_SELECTORS.INTERIOR_DAMAGE).find(ADD_VEHICLE_SELECTORS.ROLE_TAB).contains(data.soldAsIs).click();
            cy.get(ADD_VEHICLE_SELECTORS.STRUCTURAL_DAMAGES).find(ADD_VEHICLE_SELECTORS.ROLE_TAB).contains(data.soldAsIs).click();
            cy.get(ADD_VEHICLE_SELECTORS.MECHANICAL_DAMAGES).find(ADD_VEHICLE_SELECTORS.ROLE_TAB).contains(data.soldAsIs).click();

            // const positions = ['Left Front', 'Left Rear', 'Right Front', 'Right Rear'];
            ADD_VEHICLE_SELECTORS.TIRES_POSTITION.forEach(pos => {
                cy.contains('button', pos).click();
                cy.contains('div', data.tiresCondition).click();
            });

            for (let i = 0; i < 10; i++) {
                cy.get(ADD_VEHICLE_SELECTORS.DROPZONE)
                    .attachFile(data.image, { subjectType: 'drag-n-drop' });
            }

            cy.contains(ADD_VEHICLE_SELECTORS.LABEL, data.history).click();

            cy.get(ADD_VEHICLE_SELECTORS.LAW_BRANDING).within(() => {
                cy.contains(ADD_VEHICLE_SELECTORS.BUTTON, 'Select the title status').click();
                cy.contains('div', data.titleStatus).click();
            });

            cy.get(ADD_VEHICLE_SELECTORS.SOLD_AD_IS).within(() => {
                cy.contains('div', data.soldAsIs).click();
            });

            cy.get(ADD_VEHICLE_SELECTORS.ALTERATION).within(() => {
                cy.contains('div', data.alterations).click();
            });

            cy.get(ADD_VEHICLE_SELECTORS.NB_KEYS).type(data.nbKeys);

            cy.get(ADD_VEHICLE_SELECTORS.BUTTON).filter(`:contains(${ADD_VEHICLE_SELECTORS.AUCTION_TYPE})`).click();
            cy.then(() => {
                if (data.auctionType === "Appraisal") {
                    cy.contains(/^Appraisal$/).should('be.visible').click();
                } else {
                    cy.contains(ADD_VEHICLE_SELECTORS.AVAILABLE_NOW)
                        .click()
                    cy.get(ADD_VEHICLE_SELECTORS.RESERVE).type(data.reserve);
                }
            });
            cy.wait(10000)
            cy.get(ADD_VEHICLE_SELECTORS.PRIMARY_BUTTON)
                .contains(ADD_VEHICLE_SELECTORS.SAVE)
                .click();


        });


        // cy.wait(60000)


    });
});
