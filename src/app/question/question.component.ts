import { Component, input, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionData } from '../shared/interfaces/question-data.interface';
import { AnswerService } from '../shared/services/answer.service';

@Component({
    selector: 'app-question',
    imports: [MatCardModule, MatRadioModule, MatCheckboxModule],
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

    selectedAnswersArray = computed(() => {
        const currentAnswer = this.selectedAnswer();
        return this.parseSelectedAnswers(currentAnswer);
    });

    isMultipleChoice = computed(() =>
        this.answerService.isMultipleChoice()
    );

    optionsArray = computed(() => {
        const questionOptions = this.question().options;
        return [
            { key: 'a', value: questionOptions.a },
            { key: 'b', value: questionOptions.b },
            { key: 'c', value: questionOptions.c },
            { key: 'd', value: questionOptions.d }
        ];
    });

    onRadioAnswerChange(selectedValue: string): void {
        this.answerService.setAnswer(this.questionIndex(), selectedValue);
    }

    onCheckboxChange(optionKey: string, isChecked: boolean): void {
        const currentSelectedAnswers = this.selectedAnswersArray();
        const updatedAnswers = this.updateSelectedAnswers(currentSelectedAnswers, optionKey, isChecked);

        this.answerService.setAnswer(this.questionIndex(), updatedAnswers.join(','));
    }

    isChecked(optionKey: string): boolean {
        return this.selectedAnswersArray().includes(optionKey);
    }

    private parseSelectedAnswers(answerString: string): string[] {
        if (!answerString || answerString.trim() === '') {
            return [];
        }

        return answerString
            .split(',')
            .map(answer => answer.trim())
            .filter(answer => answer !== '');
    }

    private updateSelectedAnswers(currentAnswers: string[], optionKey: string, isChecked: boolean): string[] {
        if (isChecked) {
            return [...currentAnswers, optionKey].sort();
        } else {
            return currentAnswers.filter(answerKey => answerKey !== optionKey);
        }
    }
}
