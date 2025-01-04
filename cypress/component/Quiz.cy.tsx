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

  it('renders the Start Quiz button initially', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz and displays a valid question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Verify the displayed question exists in the seeded data
    cy.get('h2').then(($h2) => {
      const displayedQuestion = $h2.text();
      const questionExists = seededQuestions.some((q) => q.question === displayedQuestion);
      expect(questionExists).to.be.true;
    });
  });

  it('allows clicking on the correct numbered button', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Get the displayed question
    cy.get('h2').then(($h2) => {
      const displayedQuestion = $h2.text();
      const currentQuestion = seededQuestions.find((q) => q.question === displayedQuestion);

      // Ensure the question was found
      expect(currentQuestion).to.exist;

      // Find the index of the correct answer
      const correctAnswerIndex = currentQuestion.answers.findIndex((a) => a.isCorrect);

      // Click the correct button
      cy.get('button').contains(correctAnswerIndex + 1).click();

      // Verify the question changes
      cy.get('h2').should(($nextH2) => {
        const nextQuestion = $nextH2.text();
        expect(nextQuestion).to.not.equal(displayedQuestion); // Ensure it's a new question
      });
    });
  });

  it('displays answers and transitions correctly after clicking a button', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Get the displayed question
    cy.get('h2').then(($h2) => {
      const displayedQuestion = $h2.text();
      const currentQuestion = seededQuestions.find((q) => q.question === displayedQuestion);

      // Ensure the question was found
      expect(currentQuestion).to.exist;

      // Verify that the answers for the current question are displayed
      currentQuestion.answers.forEach((answer) => {
        cy.get('div.alert').should('contain', answer.text); // Assuming answers are in alert divs
      });

      // Find the index of the correct answer
      const correctAnswerIndex = currentQuestion.answers.findIndex((a) => a.isCorrect);

      // Click the correct button
      cy.get('button').contains(correctAnswerIndex + 1).click();

      // Verify the question changes
      cy.get('h2').should(($nextH2) => {
        const nextQuestion = $nextH2.text();
        expect(nextQuestion).to.not.equal(displayedQuestion); // Ensure it's a new question
      });

      // Verify the answers for the new question are displayed
      cy.get('h2').then(($nextH2) => {
        const nextQuestion = $nextH2.text();
        const nextQuestionData = seededQuestions.find((q) => q.question === nextQuestion);

        // Ensure the next question exists
        expect(nextQuestionData).to.exist;

        nextQuestionData.answers.forEach((answer) => {
          cy.get('div.alert').should('contain', answer.text); // Check if each answer is displayed
        });
      });
    });
  });
});





