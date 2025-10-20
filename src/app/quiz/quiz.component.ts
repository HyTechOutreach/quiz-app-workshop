import { Component, computed, signal } from '@angular/core';
import { QuestionData } from '../interfaces/question-data';
import { QuestionComponent } from '../question/question.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-quiz',
    imports: [QuestionComponent, MatButtonModule],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    questions = signal<QuestionData[]>([
        {
            id: '1',
            answer: 'b',
            options: {
                a: 'Biblioteką JavaScript do budowy interfejsów użytkownika',
                b: 'Frameworkiem TypeScript do tworzenia aplikacji webowych',
                c: 'Językiem programowania',
                d: 'Bazą danych',
            },
            question: 'Czym jest Angular?',
        },
        {
            id: '2',
            answer: 'd',
            options: {
                a: 'JavaScript',
                b: 'Java',
                c: 'Python',
                d: 'TypeScript',
            },
            question: 'Jaki język jest podstawą Angulara?',
        },
    ]);

    currentQuestionIndex = signal(0);

    currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);

    previousQuestion(): void {
        this.currentQuestionIndex.update((index) => index - 1);
    }

    nextQuestion(): void {
        this.currentQuestionIndex.update((index) => index + 1);
    }
}
