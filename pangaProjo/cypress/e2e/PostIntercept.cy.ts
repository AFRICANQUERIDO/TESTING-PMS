describe('Testing sigup functionality using fixtures', () => {

    it('registers a user', () => {
        cy.visit('/register')
        cy.fixture('register.json').then((regDetails) => {
            cy.get('[data-cy="name-input"]').type(regDetails.name)  
            cy.get('[data-cy="email-input"]').type(regDetails.email) 
            cy.get('[data-cy="phone_number-input"]').type(regDetails.phone_number)  
            cy.get('[data-cy="password-input"]').type(regDetails.password) 
            cy.get('[data-cy="create-account-link"]').click().then(el => {
                cy.visit('/login')
                cy.location('pathname').should('not.equal', '/register')
                cy.location('pathname').should('equal', '/login')
            })
        })
    })
})


describe('Sending requests to register user without hitting the backend', () => {
    beforeEach(() => {
        cy.visit('/register')
    })
    cy.intercept('POST', 'http://localhost:5000/users/signup', {
        body: {
            message: "User registered successfully"
        }
    }).as('RegisterRequest');

    it('Post request handling', () => {

        cy.get('.form-submit').click();

        cy.wait('@RegisterRequest', { requestTimeout: 10000 }).then(interception => {
            console.log('Intercepted request:', interception.request);
            console.log('Intercepted response:', interception.response);
            expect(interception.request.body).to.exist;
        });

    })
})



describe('Testing login functionality', () => {

    let data: { email: string, password: string };

    before(() => {
        cy.fixture('login').then((info) => {
            data = info
        })
    })

    it('logs in user using fixture data', () => {
        cy.visit('/login')

        cy.fixture('login.json').then((data) => {
            cy.get('[data-cy="email-link"]').type(data.email)
            cy.get('[data-cy="password-link"]').type(data.password)
            cy.get('[data-cy="submit-btn"]').click().then(el => {
                cy.visit('/dashboard')
                cy.location('pathname').should('not.equal', '/login')
                cy.location('pathname').should('equal', '/dashboard')
            })
        })

    })
})

describe('Sending login requests without hitting the backend', () => {
    beforeEach(() => {
         cy.visit('/login')
        cy.intercept('POST', 'http://localhost:5000/users/login', {
            body: {
                message: "Logged in successfully"
            }
        }).as('RequestToLogin');
    })

    it('Sending login requests without hitting the backend', () => {

        cy.get('[data-cy="submit-btn"]').click();

        cy.wait('@RequestToLogin', { requestTimeout: 5000 }).then(interception => {
            console.log('Intercepted request:', interception.request);
            console.log('Intercepted response:', interception.response);
            expect(interception.request.body).to.exist;
        });

    })
})