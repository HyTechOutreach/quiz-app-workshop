export interface QuestionData {
    id: string;
    question: string;
    options: {
        a: string;
        b: string;
        c: string;
        d: string;
    };
    answer: string;
}

export interface QuizDataResponse {
    single: {
        [category: string]: QuestionData[];
    };
    multiple: {
        [category: string]: QuestionData[];
    };
}
