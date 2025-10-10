import { Component, signal, computed, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuestionComponent } from '../question/question.component';
import { TitleCasePipe } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { QuizState } from '../shared/interfaces/quiz-state.interface';
import { Difficulty } from '../shared/models/difficulty.model';
import { AnswerService } from '../shared/services/answer.service';

@Component({
    selector: 'app-all-questions-quiz',
    imports: [QuestionComponent, MatButtonModule, MatProgressBarModule, TitleCasePipe],
    templateUrl: './all-questions-quiz.component.html',
    styleUrl: './all-questions-quiz.component.scss'
})
export class AllQuestionsQuizComponent implements OnInit {
    private readonly quizService = inject(QuizService);
    private readonly answerService = inject(AnswerService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    private quizState = signal<QuizState>({ status: 'loading' });

    difficulty = signal<Difficulty>('single');
    category = signal('');

    state = computed(() => this.quizState());

    questions = computed(() =>
        this.quizState().status === 'success' ? this.quizState().data! : []
    );

    answeredCount = computed(() => {
        const questions = this.questions();
        return questions.filter((_, index) => this.answerService.getAnswer(index)).length;
    });

    progressPercentage = computed(() => {
        const total = this.questions().length;
        const answered = this.answeredCount();
        return total > 0 ? (answered / total) * 100 : 0;
    });

    canFinishQuiz = computed(() =>
        this.answeredCount() === this.questions().length && this.questions().length > 0
    );

    ngOnInit(): void {
        this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const difficulty = params['difficulty'] as Difficulty;
            const category = params['category'];

            if (!difficulty || !category) {
                this.router.navigate(['/']);
                return;
            }

            this.difficulty.set(difficulty);
            this.category.set(category);
            this.loadQuestions();
        });
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
