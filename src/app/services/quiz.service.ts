import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuestionData } from '../interfaces/question-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl =
        'https://hyland-tech-outreach-default-rtdb.europe-west1.firebasedatabase.app/';

    getQuestions(): Observable<QuestionData[]> {
        return this.http.get<QuestionData[]>(`${this.baseUrl}/single/angular.json`);
    }
}
