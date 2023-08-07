import testData from "../fixtures/test-data";

class LaphilPage {

    visitURL(url) {
        cy.visit(url);
        return this;
    }

    verifyPageIsOpened(url) {
        cy.wait(1500).url().should('include', url);
        return this;
    }

    chooseZone() {
        cy.get([id = "Terrace"]).click()
        return this
    }

    selectEvent(perfomance) {
        cy.get(`.performance-card a[class*="buy"][title*="${perfomance}"]`).click({ force: true });
        return this
    }

    verifyActiveSection() {
        cy.get('.has-zones').then((zones) => {
            const availableZonesCount = zones.length;
            cy.log(`Total available ticket zones: ${availableZonesCount}`);
            cy.get('.has-zones').each((zone) => {
                const zoneId = zone.attr('id');
                cy.log(`Available zone: ${zoneId}`);
                cy.get(`#${zoneId}`).click();
                this.clickActionButtonByNamePage('Continue');

                this.chooseAnotherPriceIfModalIsVisible(zoneId);

                cy.wait(4000);

                const sections = testData.sections;
                let sectionId;

                for(let section in sections) {
                    if(section === zoneId) {
                        switch(section) {
                            case 'Front_Orch':
                                sectionId = sections.Front_Orch;
                                break;
                            case 'Orchestra': 
                                sectionId = sections.Orchestra;
                                break;
                            case 'Orch_East':
                                sectionId = sections.Orch_East;
                                break;
                            case 'Orch_West':
                                sectionId = sections.Orch_West;
                                break;
                            case 'Terrace':
                                sectionId = sections.Terrace;
                                break;
                            case 'Terrace_East':
                                sectionId = sections.Terrace_East;
                                break;
                            case 'Balcony':
                                sectionId = sections.Balcony;
                                break;
                            case 'Orch_View':
                                sectionId = sections.Orch_View;
                                break;
                            case 'Organ':
                                sectionId = sections.Organ;
                                break;
                        }
                        cy.get(`#${sectionId}`).should('be.visible');
                    }
                }
                cy.get('.syos-back-button button').click();
                cy.get('.syos-modal .syos-button:not(.syos-button__cancel)').click();
            });
        });
    }

    verifyAmountPlace(number) {
        cy.get('[type="number"]').then($input => {
            const currentValue = parseInt($input.val(), 10);
            cy.log(currentValue)
            if (number != currentValue) {
                cy.get('[class*=decrement]').click();
            }
            // cy.get('[type="number"]').should('have.value',number);
        });
        return this
    }

    selectPlace(zone) {
        cy.get(`[id=${zone}]`).should('exist')
            .should('have.class', 'has-zones').click()
        return this
    }

    verifyElementContainsText(element, text) {
        cy.containsVisible(element, text);
        return this
    }

    verifyPageText(action, textArray) {
        for (const text of textArray) {
            switch (action) {
                case 'have':
                    this.verifyElementContainsText('body', text);
                    break;
                case 'notHave':
                    cy.getVisible('body').should('not.contain', text);
                    break;
            }
        }
        return this;
    }

    waitPageLoad() {
        this.verifyPageText('notHave', ['Loading']);
        return this;
    }

    clickActionButtonByNamePage(name) {
        cy.contains('button', name).click({ force: true });
        // this.waitPageLoad();
        return this;
    }

    clickSkip() {
        cy.get('#targetDonationSkip').click()
        return this
    }
    
    chooseAnotherPriceIfModalIsVisible(zoneId) {
        cy.wait(2000).get("body").then($body => {
            if ($body.find('.syos-modal').length > 0) {
                cy.get('.syos-modal').then($element => {
                  if ($element.is(':visible')) {
                    cy.get($element).find('.syos-modal__close').click();
                  }
                });
                cy.get('.syos-level-selector-price-types__item:not(.not-available):not(.selected) .zone')
                    .contains(zoneId)
                    .click();
                this.clickActionButtonByNamePage('Continue');
            }
        });
    }
}
export default new LaphilPage();
