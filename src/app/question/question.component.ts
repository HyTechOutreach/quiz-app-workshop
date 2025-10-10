import { Component, input, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionData } from '../shared/interfaces/question-data.interface';
import { AnswerService } from '../shared/services/answer.service';

@Component({
    selector: 'app-question',
    imports: [MatCardModule, MatRadioModule],
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss'
})
export class QuestionComponent {
    private answerService = inject(AnswerService);
    
    question = input.required<QuestionData>();
    questionIndex = input.required<number>();
    
    selectedAnswer = computed(() => 
        this.answerService.getAnswer(this.questionIndex()) || ''
    );

    optionsArray = computed(() => {
        const options = this.question().options;
        return [
            { key: 'a', value: options.a },
            { key: 'b', value: options.b },
            { key: 'c', value: options.c },
            { key: 'd', value: options.d }
        ];
    });

    onAnswerChange(value: string): void {
        this.answerService.setAnswer(this.questionIndex(), value);
    }
}
