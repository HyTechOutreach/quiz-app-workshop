import { Injectable, signal, computed } from '@angular/core';
import { QuestionData } from '../interfaces/question-data.interface';
import { QuizResult, UserAnswer } from '../interfaces/quiz-result.interface';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {
    private userAnswers = signal<Map<number, string>>(new Map());
    private currentQuestions = signal<QuestionData[]>([]);
    private currentDifficulty = signal<string>('');
    private currentCategory = signal<string>('');

    allQuestionsAnswered = computed(() => {
        const questions = this.currentQuestions();
        const answers = this.userAnswers();
        const totalQuestions = questions.length;

        return totalQuestions > 0 && answers.size === totalQuestions;
    });

    initializeQuiz(questions: QuestionData[], difficulty: string, category: string): void {
        this.currentQuestions.set(questions);
        this.currentDifficulty.set(difficulty);
        this.currentCategory.set(category);
        this.userAnswers.set(new Map());
    }

    setAnswer(questionIndex: number, selectedAnswer: string): void {
        this.userAnswers.update(answers => {
            const newAnswers = new Map(answers);
            newAnswers.set(questionIndex, selectedAnswer);
            return newAnswers;
        });
    }

    getAnswer(questionIndex: number): string | undefined {
        return this.userAnswers().get(questionIndex);
    }

    getResults(): QuizResult {
        const questions = this.currentQuestions();
        const answers = this.userAnswers();

        const userAnswerDetails = this.buildUserAnswerDetails(questions, answers);
        const correctCount = this.calculateCorrectAnswers(userAnswerDetails);
        const score = this.calculateScore(correctCount, questions.length);

        return {
            difficulty: this.currentDifficulty(),
            category: this.currentCategory(),
            totalQuestions: questions.length,
            correctAnswers: correctCount,
            incorrectAnswers: questions.length - correctCount,
            score,
            answers: userAnswerDetails
        };
    }

    private buildUserAnswerDetails(questions: QuestionData[], answers: Map<number, string>): UserAnswer[] {
        return questions.map((question, index) => {
            const selectedAnswer = answers.get(index) || '';
            const isCorrect = selectedAnswer === question.answer;

            return {
                questionIndex: index,
                questionText: question.question,
                selectedAnswer,
                selectedAnswerText: this.getAnswerText(question, selectedAnswer),
                correctAnswer: question.answer,
                correctAnswerText: this.getAnswerText(question, question.answer),
                isCorrect
            };
        });
    }

    private getAnswerText(question: QuestionData, answerKey: string): string {
        if (!answerKey) {
            return '';
        }

        return question.options[answerKey as keyof typeof question.options] || '';
    }

    private calculateCorrectAnswers(userAnswerDetails: UserAnswer[]): number {
        return userAnswerDetails.filter(answer => answer.isCorrect).length;
    }

    private calculateScore(correctCount: number, totalQuestions: number): number {
        return Math.round((correctCount / totalQuestions) * 100);
    }

    resetQuiz(): void {
        this.userAnswers.set(new Map());
        this.currentQuestions.set([]);
        this.currentDifficulty.set('');
        this.currentCategory.set('');
    }
}
