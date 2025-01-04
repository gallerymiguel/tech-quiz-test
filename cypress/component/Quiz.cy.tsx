import Quiz from '../../client/src/components/Quiz';

describe('Quiz', () => {
  it('renders', () => {
    cy.mount(<Quiz />);
  });
});