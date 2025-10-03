import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quiz } from './quiz/quiz';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'quiz', loadComponent: () => import('./quiz/quiz').then(m => m.Quiz) },
];
