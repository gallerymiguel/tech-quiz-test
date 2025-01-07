
## Tech Quiz

### Description
The Tech Quiz application is an interactive platform designed to test users' knowledge in Python programming. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this application offers a focused quiz experience with questions ranging from basic syntax to more advanced programming concepts in Python, providing real-time feedback and results.

### Technologies Used
- **MongoDB**: NoSQL database for storing quiz questions and user data.
- **Express.js**: Backend framework used to handle HTTP requests.
- **React.js**: Frontend library used to build the user interface.
- **Node.js**: JavaScript runtime environment that executes JavaScript code server-side.
- **Cypress**: Testing framework used for end-to-end and component testing.

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tech-quiz.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd tech-quiz
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the application**:
   ```bash
   npm start
   ```

### Usage
After starting the application with `npm start`, open your web browser and navigate to `http://localhost:3000` to access the Tech Quiz platform. Choose a quiz to start and follow the on-screen instructions to answer the questions.

### Features
- **Interactive Quiz Interface**: Users can select answers and receive instant feedback.
- **Score Tracking**: Scores are calculated and displayed at the end of each quiz.
- **Dynamic Question Pool**: Questions are randomly selected from a database to ensure a unique quiz experience each time.

### Testing
To run the Cypress end-to-end and component tests, use the following command:
```bash
npm run cypress
```
These tests help ensure that the quiz components function correctly and that the user interactions produce the expected outcomes.

### License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
