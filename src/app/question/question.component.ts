import { Component, input, signal, computed, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionData } from '../shared/interfaces/question-data.interface';

@Component({
    selector: 'app-question',
    imports: [MatCardModule, MatRadioModule],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss'
})
export class QuestionComponent {
    question = input.required<QuestionData>();
    selectedAnswer = signal<string>('');

    optionsArray = computed(() => {
        const options = this.question().options;
        return [
            { key: 'a', value: options.a },
            { key: 'b', value: options.b },
            { key: 'c', value: options.c },
            { key: 'd', value: options.d }
        ];
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['question']) {
            this.selectedAnswer.set('');
        }
    }

    onAnswerChange(value: string): void {
        this.selectedAnswer.set(value);
    }
}
