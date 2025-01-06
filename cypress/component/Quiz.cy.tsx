// Import the Quiz component
import Quiz from '../../client/src/components/Quiz'; // Adjust path based on your project structure

let seededQuestions; // Global variable for fixture data

describe('Quiz Component', () => {
  before(() => {
    // Load questions from the fixture file
    cy.fixture('pythonQuestions.json').then((questions) => {
      seededQuestions = questions; // Assign fixture data
    });
  });

  beforeEach(() => {
    // Intercept and mock the API call with the fixture data
    cy.intercept('GET', '/api/questions/random', { fixture: 'pythonQuestions.json' }).as('getQuestions');
  });

  it('renders the Start Quiz button initially', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz and displays a valid question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Ensure mock response is used

    // Verify the displayed question exists in the seeded data
    cy.get('[data-cy="question"]').should(($question) => {
      const displayedQuestion = $question.text();
      const questionExists = seededQuestions.some((q) => q.question === displayedQuestion);
      expect(questionExists).to.be.true; // Assertion based on fixture data
    });
  });

  it('allows answering questions and tracks progress correctly', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Wait for mocked questions

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy="answer"]').first().click(); // Simulate choosing the first answer
      cy.wait(500); // Simulate user delay between clicks
    }

    // Verify quiz completion
    cy.get('[data-cy="quiz-completed"]').should('be.visible');
  });

  it('handles quiz completion and restart correctly', () => {
    cy.mount(<Quiz />);

    // Start the quiz
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Wait for the mocked response

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy="answer"]').first().click();
      cy.wait(500); // Simulate user delay between clicks
    }

    // Verify completion
    cy.get('[data-cy="quiz-completed"]').should('be.visible');
    cy.contains('Take New Quiz').click();

    // Verify a new quiz starts
    cy.wait('@getQuestions'); // Ensure a new set of questions is fetched
    cy.get('[data-cy="question"]').should('be.visible'); // Check that the new quiz begins
    cy.get('[data-cy="quiz-completed"]').should('not.exist'); // Ensure quiz-completed state is reset
  });

  it('displays the correct answers for each question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Wait for mocked questions

    seededQuestions.forEach((question, index) => {
      // Verify the question
      cy.get('[data-cy="question"]').should('contain', question.question);

      // Verify answers are displayed
      question.answers.forEach((answer) => {
        cy.get('div.alert').should('contain', answer.text); // Assuming answers are in alert divs
      });

      // Click an answer to transition to the next question
      cy.get('[data-cy="answer"]').first().click();
      if (index < 9) cy.wait(500); // Prevent excessive waits on the last question
    });

    // Ensure the quiz completes at the end
    cy.get('[data-cy="quiz-completed"]').should('be.visible');
  });
});
