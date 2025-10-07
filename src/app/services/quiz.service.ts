import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { QuestionData } from '../shared/interfaces/question-data.interface';
import { Difficulty } from '../shared/models/difficulty.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private readonly http = inject(HttpClient);

    private buildApiUrl(difficulty: Difficulty, category: string): string {
        return `https://hyland-tech-outreach-default-rtdb.europe-west1.firebasedatabase.app/${difficulty}/${category}.json`;
    }

    /**
     * Fetches questions for a specific difficulty and category
     */
    getQuestions(difficulty: Difficulty, category: string): Observable<QuestionData[]> {
        const url = this.buildApiUrl(difficulty, category);
        return this.http.get<QuestionData[] | null>(url).pipe(
            map(response => response || [])
        );
    }
}
