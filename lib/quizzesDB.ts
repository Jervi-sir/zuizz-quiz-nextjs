export const topics = [
  {
    id: 1,
    name: 'Geography',
    icon: "assets/images/topics/icon-history.svg",
    questions: [
      {
        id: 1,
        type: 'choose_correct',
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 2,
      },
      {
        id: 2,
        type: 'choose_multiple',
        question: 'Which of these are programming languages?',
        options: ['Python', 'HTML', 'CSS', 'JavaScript'],
        correctAnswers: [0, 3],
      },
      // {
      //   id: 3,
      //   type: 'order_answers',
      //   question: 'Arrange the planets in order from the Sun.',
      //   options: ['Mars', 'Venus', 'Earth', 'Mercury'],
      //   correctOrder: [3, 1, 2, 0],
      // },
      // {
      //   id: 4,
      //   type: 'fill_gap',
      //   question: 'The largest planet in our solar system is _____',
      //   correctAnswer: 'Jupiter',
      // },
    ],
  },
  {
    id: 2,
    name: 'Programming',
    icon: "assets/images/topics/icon-islamic.svg",
    questions: [
      {
        id: 1,
        type: 'choose_correct',
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 2,
      },
      {
        id: 2,
        type: 'choose_multiple',
        question: 'Which of these are programming languages?',
        options: ['Python', 'HTML', 'CSS', 'JavaScript'],
        correctAnswers: [0, 3],
      },
      {
        id: 3,
        type: 'order_answers',
        question: 'Arrange the planets in order from the Sun.',
        options: ['Mars', 'Venus', 'Earth', 'Mercury'],
        correctOrder: [3, 1, 2, 0],
      },
      {
        id: 4,
        type: 'fill_gap',
        question: 'The largest planet in our solar system is _____',
        correctAnswer: 'Jupiter',
      },
    ],
  },
];

