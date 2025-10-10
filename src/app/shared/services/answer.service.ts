import { Injectable, signal, computed } from '@angular/core';
import { QuestionData } from '../interfaces/question-data.interface';
import { QuizResult, UserAnswer } from '../interfaces/quiz-result.interface';
import { DifficultyLevel } from '../constants/quiz.constants';

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

    isMultipleChoice = computed(() => this.currentDifficulty() === DifficultyLevel.MULTIPLE);

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
            const isCorrect = this.isAnswerCorrect(selectedAnswer, question.answer);

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

    private isAnswerCorrect(selectedAnswer: string, correctAnswer: string): boolean {
        const normalizedSelectedAnswer = String(selectedAnswer || '');
        const normalizedCorrectAnswer = String(correctAnswer || '');

        if (this.isMultipleChoice()) {
            return this.compareMultipleChoiceAnswers(normalizedSelectedAnswer, normalizedCorrectAnswer);
        }

        return this.compareSingleChoiceAnswers(normalizedSelectedAnswer, normalizedCorrectAnswer);
    }

    private getAnswerText(question: QuestionData, answerKey: string): string {
        const normalizedAnswerKey = String(answerKey || '');

        if (!normalizedAnswerKey) {
            return '';
        }

        if (this.isMultipleChoice()) {
            return this.buildMultipleChoiceAnswerText(question, normalizedAnswerKey);
        }

        return this.buildSingleChoiceAnswerText(question, normalizedAnswerKey);
    }

    private compareMultipleChoiceAnswers(selectedAnswers: string, correctAnswers: string): boolean {
        const sortedSelectedAnswers = this.parseAndSortAnswers(selectedAnswers);
        const sortedCorrectAnswers = this.parseAndSortAnswers(correctAnswers);

        return sortedSelectedAnswers === sortedCorrectAnswers;
    }

    private compareSingleChoiceAnswers(selectedAnswer: string, correctAnswer: string): boolean {
        return selectedAnswer === correctAnswer;
    }

    private buildMultipleChoiceAnswerText(question: QuestionData, answerKeys: string): string {
        const parsedAnswerKeys = this.parseAnswerKeys(answerKeys);
        const answerTexts = parsedAnswerKeys.map(optionKey =>
            this.getOptionText(question, optionKey)
        );

        return answerTexts.join(', ');
    }

    private buildSingleChoiceAnswerText(question: QuestionData, answerKey: string): string {
        return this.getOptionText(question, answerKey);
    }

    private parseAndSortAnswers(answers: string): string {
        return answers
            .split(',')
            .map(answer => answer.trim())
            .filter(answer => answer !== '')
            .sort()
            .join(',');
    }

    private parseAnswerKeys(answerKeys: string): string[] {
        return answerKeys
            .split(',')
            .map(key => key.trim())
            .filter(key => key !== '');
    }

    private getOptionText(question: QuestionData, optionKey: string): string {
        return question.options[optionKey as keyof typeof question.options] || '';
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
