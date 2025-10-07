import { QuestionData } from "./question-data.interface";

export interface QuizState {
    status: 'loading' | 'success' | 'error';
    data?: QuestionData[];
    error?: string;
}
