import { Component, computed, inject, signal } from '@angular/core';
import { QuestionData } from '../interfaces/question-data';
import { QuestionComponent } from '../question/question.component';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../services/quiz.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-quiz',
    imports: [QuestionComponent, MatButtonModule],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    private readonly quizService = inject(QuizService);

    questions = toSignal(this.quizService.getQuestions(), { initialValue: [] });

    currentQuestionIndex = signal(0);

    currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);

    isFirstQuestion = computed(() => this.currentQuestionIndex() === 0);

    isLastQuestion = computed(() => this.currentQuestionIndex() === this.questions().length - 1);

    previousQuestion(): void {
        this.currentQuestionIndex.update((index) => index - 1);
    }

    nextQuestion(): void {
        this.currentQuestionIndex.update((index) => index + 1);
    }
}
