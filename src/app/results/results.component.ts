import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { take } from 'rxjs';
import { AnswerService } from '../shared/services/answer.service';
import { QuizResult } from '../shared/interfaces/quiz-result.interface';
import { QuizType, NavigationParam, Routes } from '../shared/constants/quiz.constants';

@Component({
    selector: 'app-results',
    imports: [MatCardModule, MatButtonModule, MatIconModule, TitleCasePipe],
    templateUrl: './results.component.html',
    styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
    private answerService = inject(AnswerService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    quizResult = signal<QuizResult | null>(null);
    previousQuizType = signal<QuizType>(QuizType.STEP_BY_STEP);

    scoreColor = computed(() => {
        const result = this.quizResult();
        if (!result) {
            return '';
        }

        if (result.score >= 80) {
            return 'success';
        }

        if (result.score >= 60) {
            return 'warning';
        }

        return 'error';
    });

    scoreMessage = computed(() => {
        const result = this.quizResult();
        if (!result) {
            return '';
        }

        if (result.score >= 80) {
            return 'Świetny wynik! 🎉';
        }

        if (result.score >= 60) {
            return 'Dobry wynik! 👍';
        }

        return 'Możesz spróbować ponownie 💪';
    });

    ngOnInit(): void {
        this.detectPreviousQuizType();
        this.loadQuizResults();
    }

    restartQuiz(): void {
        const result = this.quizResult();
        if (!result) {
            return;
        }

        this.answerService.resetQuiz();
        this.navigateToQuiz(result.difficulty, result.category);
    }

    goHome(): void {
        this.answerService.resetQuiz();
        this.router.navigate([Routes.HOME]);
    }

    private detectPreviousQuizType(): void {
        this.route.queryParams.pipe(take(1)).subscribe(params => {
            if (params[NavigationParam.FROM] === QuizType.ALL_QUESTIONS) {
                this.previousQuizType.set(QuizType.ALL_QUESTIONS);
            }
        });
    }

    private loadQuizResults(): void {
        const result = this.answerService.getResults();
        if (result.totalQuestions === 0) {
            this.router.navigate([Routes.HOME]);
            return;
        }

        this.quizResult.set(result);
    }

    private navigateToQuiz(difficulty: string, category: string): void {
        const routePath = this.getQuizRoutePath();
        this.router.navigate([routePath], {
            queryParams: {
                [NavigationParam.DIFFICULTY]: difficulty,
                [NavigationParam.CATEGORY]: category
            }
        });
    }

    private getQuizRoutePath(): string {
        return this.previousQuizType() === QuizType.ALL_QUESTIONS ? Routes.QUIZ_ALL_QUESTIONS : Routes.QUIZ_STEP_BY_STEP;
    }
}
