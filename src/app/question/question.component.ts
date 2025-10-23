import { Component, computed, input, output } from '@angular/core';
import { QuestionData } from '../interfaces/question-data';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-question',
    imports: [MatCardModule, MatRadioModule],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
})
export class QuestionComponent {
    question = input.required<QuestionData>();

    currentAnswer = input<string>();
    answerSelected = output<string>();

    options = computed(() =>
        Object.entries(this.question().options).map(([key, value]) => ({ key, value }))
    );

    onAnswerSelected(answer: string): void {
        this.answerSelected.emit(answer);
    }
}
