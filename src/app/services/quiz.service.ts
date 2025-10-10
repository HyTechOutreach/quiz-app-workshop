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
    private readonly baseApiUrl = 'https://hyland-tech-outreach-default-rtdb.europe-west1.firebasedatabase.app';

    /**
     * Fetches questions for a specific difficulty and category
     */
    getQuestions(difficulty: Difficulty, category: string): Observable<QuestionData[]> {
        const questionsUrl = this.buildQuestionsUrl(difficulty, category);
        return this.http.get<QuestionData[] | null>(questionsUrl).pipe(
            map(response => response || [])
        );
    }

    /**
     * Fetches available categories for a specific difficulty
     */
    getAvailableCategories(difficulty: Difficulty): Observable<string[]> {
        const categoriesUrl = this.buildCategoriesUrl(difficulty);
        return this.http.get<Record<string, any> | null>(categoriesUrl).pipe(
            map(response => this.extractCategoryKeys(response))
        );
    }

    private buildQuestionsUrl(difficulty: Difficulty, category: string): string {
        return `${this.baseApiUrl}/${difficulty}/${category}.json`;
    }

    private buildCategoriesUrl(difficulty: Difficulty): string {
        return `${this.baseApiUrl}/${difficulty}.json`;
    }

    private extractCategoryKeys(response: Record<string, any> | null): string[] {
        if (!response) {
            return [];
        }

        return Object.keys(response);
    }
}
