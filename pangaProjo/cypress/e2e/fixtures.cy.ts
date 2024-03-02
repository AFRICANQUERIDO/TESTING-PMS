describe('Testing login functionality',()=>{

    let data:{email:string, password:string};

    before(()=>{
        cy.fixture('login').then((info)=>{
            data = info
        })
    })

    it('logs in user using fixture data', ()=>{
        cy.visit('/login')

        cy.fixture('login.json').then((data)=>{
            cy.get('[data-cy="email-link"]').type(data.email)
            cy.get('[data-cy="password-link"]').type(data.password)
            cy.get('[data-cy="submit-btn"]').click().then(el=>{
            cy.location('pathname').should('not.equal', '/login')
            cy.location('pathname').should('equal','/dashboard')
            })
        })

    })
})

describe('Sending requests without hitting the backend', ()=>{
    beforeEach(()=>{
        cy.visit('/login')
    })

    it('Post requset handling', ()=>{
        cy.intercept('POST', 'http://localhost:5000/users/login', {
            body:{
                message: "Logged in successfully"
            }
        }).as('RequestToLogin')

        cy.get('[data-cy="submit-btn"]').click()

        cy.wait('@RequestToLogin').then(interception =>{
            expect(interception.request.body).to.exist;
        })
    })
})