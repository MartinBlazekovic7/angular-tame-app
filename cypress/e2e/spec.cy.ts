describe('Prijava', () => {
  before(() => {
    cy.visit('http://localhost:4200/login');
  });
  it('Korisnik posjeti stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/login');
  });
  it('Korisnik unosi podatke', () => {
    cy.get(':nth-child(1) > .form-control').type('jtovernic');
    cy.get(':nth-child(2) > .form-control').type('jan1234');
  });
  it('Korisnik pritišće LOGIN gumb', () => {
    cy.get('.btn').click({ force: true });
  });
  it('Provjeriti da li je korisnik prebačen na HOME stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/home');
  });
  it('Provjeriti da li se učitala navigacijska traka', () => {
    cy.get('.navbar').should('be.visible');
  });
  it('Provjeriti da li se učitao meni', () => {
    cy.get('.navbar-menu').should('be.visible');
  });
});
describe('Navigacija', () => {
  it('Korisnik pritišće na SEARCH opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="search"] > p').click({ force: true });
  });
  it('Provjeriti da li je korisnik prebačen na SEARCH stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/search');
  });
  it('Korisnik pritišće na PROFILE opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="profile"] > p').click({ force: true });
  });
  it('Provjeriti da li je korisnik prebačen na PROFILE stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/profile');
  });
  it('Korisnik pritišće na SETTINGS opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="settings"] > p').click({ force: true });
  });
  it('Provjeriti da li je korisnik prebačen na SETTINGS stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/settings');
  });
  it('Korisnik pritišće na HOME opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="home"] > p').click({ force: true });
  });
  it('Provjeriti da li je korisnik prebačen na HOME stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/home');
  });
});
describe('Pregled naslovnice', () => {
  it('Provjeriti glavni naslov naslovnice', () => {
    cy.get('h4').should('have.text', 'Posts by people you follow');
  });
  it('Provjeriti da li je učitana prva objava', () => {
    cy.get(':nth-child(1) > .post-main > .post-desc').should('be.visible');
  });
  it('Provjeriti da li je učitan sadržaj prve objave', () => {
    cy.get(':nth-child(1) > .post-main > .post-desc > .post-text').should(
      'be.visible'
    );
  });
  it('Korisnik pritišće na objavu da pregleda komentare', () => {
    cy.get(':nth-child(2) > .post-interacts > :nth-child(2)').click();
  });
  it('Provjera da su prikazani komentari', () => {
    cy.get('.post-comments > :nth-child(1) > p').should('be.visible');
    cy.get('.close-button').click({ force: true });
  });
});
describe('Pregled profila i pisanje objave', () => {
  it('Korisnik pritišće na PROFILE opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="profile"] > p').click({ force: true });
  });
  it('Provjeriti da li se prikaže ime korisnika', () => {
    cy.get('.image-part > h2').should('be.visible');
    cy.get('.image-part > h2').should('have.text', 'Jan Tovernić');
  });
  it('Provjeriti da li se prikažu statistike korisnika', () => {
    cy.get('.col').should('be.visible');
  });
  it('Korisnik objavljuje novu objavu', () => {
    cy.get('.btn').click({ force: true });
    cy.get('#inputText').type('Ovo je nova objava!');
    cy.get('form.ng-valid > .btn-tame-custom').click({ force: true });
  });
  it('Provjeriti da li se prikazala nova objava', () => {
    cy.get(':nth-child(2) > .post-main > .post-desc > .post-text').should(
      'have.text',
      'Ovo je nova objava!'
    );
  });
});
describe('Pretraživanje osobe', () => {
  it('Korisnik pritišće na SEARCH opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="search"] > p').click({ force: true });
  });
  it('Provjeriti da li se prikaže polje za unos imena korisnika', () => {
    cy.get('#search-term').should('be.visible');
  });
  it('Korisnik upisuje ime i pritišće ENTER', () => {
    cy.get('#search-term').type('mislav{enter}');
  });
  it('Provjeriti da li se prikazala lista rezultata', () => {
    cy.get('.search-result').should('be.visible');
  });
  it('Korisnik ulazi u profil osobe', () => {
    cy.get('.username').click({ force: true });
  });
});
describe('Praćenje osobe', () => {
  it('Provjeriti da se korisnik nalazi na profilu drugog korisnika', () => {
    cy.url().should('include', 'http://localhost:4200/profile/mwinkler');
  });
  it('Provjeriti da ga trenutni korisnik ne prati', () => {
    cy.get('.btn').should('have.text', ' FOLLOW ');
  });
  it('Korisnik pritišće FOLLOW gumb', () => {
    cy.get('.btn').click({ force: true });
  });
  it('Provjeriti da korisnik sada prati drugog korisnika', () => {
    cy.get('.col > :nth-child(2) > p').click({ force: true });
    cy.get('[ng-reflect-router-link="../../profile/jtovernic"]').should(
      'be.visible'
    );
    cy.get('.close-button').click({ force: true });
    cy.get('.btn').click({ force: true });
  });
});
describe('Promjena korisničkih podataka', () => {
  it('Korisnik pritišće na SETTINGS opciju u meniju', () => {
    cy.get('[ng-reflect-router-link="settings"] > p').click({ force: true });
  });
  it('Provjeriti da li se prikazala opcija EDIT YOUR INFORMATION', () => {
    cy.get('.settings > :nth-child(1)').should('be.visible');
    cy.get('.settings > :nth-child(1)').should(
      'have.text',
      'Edit your information'
    );
  });
  it('Korisnik pritišće EDIT YOUR INFORMATION gumb', () => {
    cy.get('.settings > :nth-child(1)').click({ force: true });
  });
  it('Provjeriti da li se pojavio prozor s formom za promjenu informacija', () => {
    cy.get('form.ng-untouched').should('be.visible');
  });
  it('Korisnik mijenja ime', () => {
    cy.get('#first-name').type('ko');
    cy.get('.btn-tame-custom').click({ force: true });
  });
  it('Provjera na PROFILE stranice da li je ime promijenjeno', () => {
    cy.get('[ng-reflect-router-link="profile"] > p').click({ force: true });
    cy.get('.image-part > h2').should('have.text', 'Janko Tovernić');
  });
  it('Povratak na SETTINGS stranicu i odjava iz aplikacije', () => {
    cy.get('[ng-reflect-router-link="settings"] > p').click({ force: true });
    cy.get('.log-out').click({ force: true });
  });
});
describe('Prijava kao administrator', () => {
  it('Korisnik unosi podatke', () => {
    cy.get(':nth-child(1) > .form-control').type('admin');
    cy.get(':nth-child(2) > .form-control').type('admin');
  });
  it('Korisnik pritišće LOGIN gumb', () => {
    cy.get('.btn').click({ force: true });
  });
  it('Provjeriti da li je korisnik prebačen na ADMIN-DASHBOARD stranicu', () => {
    cy.url().should('include', 'http://localhost:4200/admin-dashboard');
  });
  it('Provjeriti da li se učitala tablica sa svim korisnicima', () => {
    cy.get('.container').should('be.visible');
  });
  it('Administrator briše korisnika TEST PROFILE', () => {
    cy.get(':nth-child(5) > :nth-child(6) > .btn').click({ force: true });
  });
  it('Povratak na SETTINGS stranicu i odjava iz aplikacije', () => {
    cy.get('[ng-reflect-router-link="settings"] > p').click({ force: true });
    cy.get('.log-out').click({ force: true });
  });
});
