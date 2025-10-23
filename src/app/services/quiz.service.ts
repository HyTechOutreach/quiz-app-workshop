import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { QuestionData } from '../interfaces/question-data';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
    category: string;
    difficulty: string;
    questions: QuestionData[];
}

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = 'https://d1y0x5bhpq4nol.cloudfront.net';

    private answerMap: Map<string, string> | undefined;

    getQuestions(): Observable<QuestionData[]> {
        return this.http
            .get<ApiResponse>(`${this.baseUrl}/questions`, {
                params: {
                    category: 'angular',
                    multiple: 'false',
                    amount: 3,
                },
            })
            .pipe(map((response) => response.questions));
    }

    saveAnswers(answers: Map<string, string>): void {
        this.answerMap = answers;
    }

    getSavedAnswers(): Map<string, string> | undefined {
        return this.answerMap;
    }
}
