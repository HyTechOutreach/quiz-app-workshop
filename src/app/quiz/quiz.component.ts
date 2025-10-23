import { Component, computed, inject, signal } from '@angular/core';
import { QuestionData } from '../interfaces/question-data';
import { QuestionComponent } from '../question/question.component';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../services/quiz.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'app-quiz',
    imports: [QuestionComponent, MatButtonModule, MatProgressSpinnerModule],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    private readonly quizService = inject(QuizService);
    private readonly router = inject(Router);

    questions = toSignal(this.quizService.getQuestions(), { initialValue: [] });

    answers = signal<Map<string, string>>(new Map());

    isLoading = computed(() => this.questions().length === 0);

    currentQuestionIndex = signal(0);

    currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);

    currentAnswer = computed(() => this.answers().get(this.currentQuestion().id));

    isFirstQuestion = computed(() => this.currentQuestionIndex() === 0);

    isLastQuestion = computed(() => this.currentQuestionIndex() === this.questions().length - 1);

    canProceedToNextQuestion = computed(() => {
        return !this.isLastQuestion() && !this.currentAnswer();
    });

    previousQuestion(): void {
        this.currentQuestionIndex.update((index) => index - 1);
    }

    nextQuestion(): void {
        this.currentQuestionIndex.update((index) => index + 1);
    }

    onAnswerSelected(answer: string): void {
        this.answers.update((answersMap) => {
            const newMap = new Map(answersMap);
            newMap.set(this.currentQuestion().id, answer);
            return newMap;
        });
    }

    finishQuiz(): void {
        this.quizService.saveAnswers(this.answers());
        this.router.navigate(['/results']);
    }
}
