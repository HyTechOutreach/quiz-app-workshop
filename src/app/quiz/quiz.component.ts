import { Component, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { QuestionComponent } from '../question/question.component';
import { QuestionData } from '../shared/interfaces/question-data.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-quiz',
    imports: [QuestionComponent, MatButtonModule, TitleCasePipe],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent {
    currentQuestionIndex = signal(0);
    currentCategory = signal('angular');

    questions = signal<QuestionData[]>([
        {
            answer: "b",
            options: {
                a: "Biblioteką JavaScript do budowy interfejsów użytkownika",
                b: "Frameworkiem TypeScript do tworzenia aplikacji webowych",
                c: "Językiem programowania",
                d: "Bazą danych"
            },
            question: "Czym jest Angular?"
        },
        {
            answer: "d",
            options: {
                a: "JavaScript",
                b: "Java",
                c: "Python",
                d: "TypeScript"
            },
            question: "Jaki język jest podstawą Angulara?"
        }
    ]);

    currentQuestion = computed(() =>
        this.questions()[this.currentQuestionIndex()]
    );

    isFirstQuestion = computed(() =>
        this.currentQuestionIndex() === 0
    );

    isLastQuestion = computed(() =>
        this.currentQuestionIndex() === this.questions().length - 1
    );

    previousQuestion(): void {
        if (!this.isFirstQuestion()) {
            this.currentQuestionIndex.update(index => index - 1);
        }
    }

    nextQuestion(): void {
        if (!this.isLastQuestion()) {
            this.currentQuestionIndex.update(index => index + 1);
        }
    }
}
