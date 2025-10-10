export interface UserAnswer {
    questionIndex: number;
    questionText: string;
    selectedAnswer: string;
    selectedAnswerText: string;
    correctAnswer: string;
    correctAnswerText: string;
    isCorrect: boolean;
}

export interface QuizResult {
    difficulty: string;
    category: string;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
    answers: UserAnswer[];
}
