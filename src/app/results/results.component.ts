import { Component, inject } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
    private readonly quizService = inject(QuizService);

    ngOnInit(): void {
        console.log('Saved Answers:', this.quizService.getSavedAnswers());
    }
}
