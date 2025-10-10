import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'quiz', loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent) },
    { path: 'all-questions', loadComponent: () => import('./all-questions-quiz/all-questions-quiz.component').then(m => m.AllQuestionsQuizComponent) },
    { path: 'results', loadComponent: () => import('./results/results.component').then(m => m.ResultsComponent) },
];
