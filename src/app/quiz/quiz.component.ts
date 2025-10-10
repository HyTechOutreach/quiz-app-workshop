import { Component, signal, computed, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { QuestionComponent } from '../question/question.component';
import { TitleCasePipe } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { QuizState } from '../shared/interfaces/quiz-state.interface';
import { Difficulty } from '../shared/models/difficulty.model';
import { AnswerService } from '../shared/services/answer.service';

@Component({
    selector: 'app-quiz',
    imports: [QuestionComponent, MatButtonModule, TitleCasePipe],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
    private readonly quizService = inject(QuizService);
    private readonly answerService = inject(AnswerService);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);

    currentQuestionIndex = signal(0);
    difficulty = signal<Difficulty>('single');
    category = signal('angular');

    private quizState = signal<QuizState>({ status: 'loading' });
    state = computed(() => this.quizState());

    questions = computed(() =>
        this.quizState().status === 'success' ? this.quizState().data! : []
    );

    currentQuestion = computed(() => {
        const questions = this.questions();
        return questions[this.currentQuestionIndex()] || null;
    });

    isFirstQuestion = computed(() =>
        this.currentQuestionIndex() === 0
    );

    isLastQuestion = computed(() =>
        this.currentQuestionIndex() === this.questions().length - 1
    );

    isCurrentQuestionAnswered = computed(() => {
        const currentIndex = this.currentQuestionIndex();
        const answer = this.answerService.getAnswer(currentIndex);
        return answer && answer.trim() !== '';
    });

    canGoNext = computed(() =>
        !this.isLastQuestion() && this.isCurrentQuestionAnswered()
    );

    canFinishQuiz = computed(() =>
        this.isLastQuestion() && this.isCurrentQuestionAnswered()
    );


    ngOnInit(): void {
        this.loadQuestions();
    }

    previousQuestion(): void {
        if (!this.isFirstQuestion()) {
            this.currentQuestionIndex.update(index => index - 1);
        }
    }

    nextQuestion(): void {
        if (this.canGoNext()) {
            this.currentQuestionIndex.update(index => index + 1);
        }
    }

    loadQuestions(): void {
        this.quizState.set({ status: 'loading' });
        this.quizService.getQuestions(this.difficulty(), this.category())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (questions) => {
                    this.quizState.set({
                        status: 'success',
                        data: questions
                    });
                    this.currentQuestionIndex.set(0);

                    this.answerService.initializeQuiz(questions, this.difficulty(), this.category());
                },
                error: (error) => {
                    console.error('Error loading questions:', error);
                    this.quizState.set({
                        status: 'error',
                        error: 'Nie udało się załadować pytań. Spróbuj ponownie.'
                    });
                }
            });
    }

    finishQuiz(): void {
        this.router.navigate(['/results']);
    }
}
