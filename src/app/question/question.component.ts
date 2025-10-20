import { Component, computed, input } from '@angular/core';
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

    options = computed(() =>
        Object.entries(this.question().options).map(([key, value]) => ({ key, value }))
    );
}
