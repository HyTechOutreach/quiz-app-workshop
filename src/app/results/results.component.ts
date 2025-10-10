import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AnswerService } from '../shared/services/answer.service';
import { QuizResult } from '../shared/interfaces/quiz-result.interface';

@Component({
    selector: 'app-results',
    imports: [MatCardModule, MatButtonModule, MatIconModule, TitleCasePipe],
    templateUrl: './results.component.html',
    styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
    private answerService = inject(AnswerService);
    private router = inject(Router);

    quizResult = signal<QuizResult | null>(null);

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
        const result = this.answerService.getResults();
        if (result.totalQuestions === 0) {
            this.router.navigate(['/']);
            return;
        }
        this.quizResult.set(result);
    }

    restartQuiz(): void {
        this.answerService.resetQuiz();
        this.router.navigate(['/quiz']);
    }

    goHome(): void {
        this.answerService.resetQuiz();
        this.router.navigate(['/']);
    }
}
