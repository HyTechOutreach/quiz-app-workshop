import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'quiz', loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent) },
];
