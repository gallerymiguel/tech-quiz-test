describe('Complete Quiz Functionality', () => {
  beforeEach(() => {
    // Mock the response with 10 questions from the server
    cy.intercept('GET', '/api/questions/random', { fixture: 'pythonQuestions.json' }).as('getQuestions');
    cy.visit('/quiz');
  });

  it('should complete the entire quiz by answering 10 questions and restart correctly', () => {
    cy.contains('button', 'Start Quiz').click();
    cy.wait('@getQuestions');

    let questionCount = 0;

    const answerQuestion = () => {
      // Check if the quiz is completed
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy="quiz-completed"]').length > 0) {
          cy.get('[data-cy="quiz-completed"]').should('be.visible');
          return; // Exit the function if quiz is completed
        }

        // Proceed with answering the next question
        cy.get('[data-cy="question"]').should('be.visible');
        cy.get('[data-cy="answer"]').first().click();
        questionCount++;

        // Wait briefly for the next question to load
        cy.wait(500);

        if (questionCount < 10) {
          answerQuestion(); // Recursively handle the next question
        } else {
          // Ensure quiz completion message appears after the last question
          cy.get('[data-cy="quiz-completed"]').should('be.visible');
        }
      });
    };

    answerQuestion();

    // Verify restart functionality
    cy.contains('button', 'Take New Quiz').click();
    cy.wait('@getQuestions');
    cy.get('[data-cy="question"]').should('be.visible'); // Check the quiz restarts
    cy.get('[data-cy="quiz-completed"]').should('not.exist'); // Ensure completion message is gone
  });
});
