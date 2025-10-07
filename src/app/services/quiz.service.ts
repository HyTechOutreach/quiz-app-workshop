import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { QuizDataResponse, QuestionData } from '../shared/interfaces/question-data.interface';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private readonly http = inject(HttpClient);
    private readonly API_URL = 'https://hyland-tech-outreach-default-rtdb.europe-west1.firebasedatabase.app/.json';

    /**
     * Fetches questions for a specific category from 'single' type
     */
    getQuestionsByCategory(category: string): Observable<QuestionData[]> {
        return this.http.get<QuizDataResponse>(this.API_URL).pipe(
            map(response => {
                const singleQuestions = response.single || {};
                return singleQuestions[category] || [];
            })
        );
    }
}
