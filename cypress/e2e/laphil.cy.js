import testData from "../fixtures/test-data.js";
import laphilPage from "../support/laphil-page.js";

describe('Test task for Allo', function () {

    before(() => {
        cy.clearAllCookies();
        cy.visit('/');
    })

    it.only('Buy 2 tickets', () => {
        laphilPage
            .selectEvent('Jamie Cullum')
            .verifyAmountPlace('2')
            .verifyActiveSection()
            // .selectPlace('Terrace')
            // .clickActionButtonByNamePage('Continue')
            // .clickActionButtonByNamePage('Confirm seats')
            // .clickSkip()
    })

    it('Select 1 events', () => {
        laphilPage
            .selectEvent('Jamie Cullum')
            .verifyAmountPlace('1')
            .selectPlace('Terrace')
            .clickActionButtonByNamePage('Continue')
            .clickActionButtonByNamePage('Confirm seats')
            .clickSkip()

    })

})