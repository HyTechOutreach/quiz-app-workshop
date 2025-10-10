import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Difficulty } from '../shared/models/difficulty.model';
import { CategoryOption } from './interfaces/category-option.interface';
import {
    DifficultyLevel,
    QuizType,
    NavigationParam,
    Routes,
} from '../shared/constants/quiz.constants';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule, RouterModule, MatSelectModule, MatFormFieldModule, MatCardModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private quizService = inject(QuizService);
    private router = inject(Router);

    selectedDifficulty = signal<Difficulty>(DifficultyLevel.SINGLE);
    selectedCategory = signal<string>('');
    selectedFormat = signal<QuizType | ''>('');

    availableCategories = signal<CategoryOption[]>([]);
    isLoading = signal(false);

    canStartQuiz = computed(
        () =>
            this.selectedCategory() !== '' &&
            this.selectedDifficulty() !== null &&
            this.selectedFormat() !== ''
    );

    difficultyOptions = [
        { value: DifficultyLevel.SINGLE as Difficulty, label: 'Łatwy (pojedyncza odpowiedź)' },
        { value: DifficultyLevel.MULTIPLE as Difficulty, label: 'Trudny (wielokrotny wybór)' },
    ];

    formatOptions = [
        { value: QuizType.STEP_BY_STEP, label: 'Krok po kroku' },
        { value: QuizType.ALL_QUESTIONS, label: 'Wszystkie pytania' },
    ];

    readonly QUIZ_TYPES = QuizType;

    ngOnInit(): void {
        this.loadCategories();
    }

    onDifficultyChange(difficulty: Difficulty): void {
        this.selectedDifficulty.set(difficulty);
        this.selectedCategory.set('');
        this.loadCategories();
    }

    onCategoryChange(category: string): void {
        this.selectedCategory.set(category);
    }

    onFormatChange(format: QuizType): void {
        this.selectedFormat.set(format);
    }

    startQuiz(): void {
        if (!this.canStartQuiz()) return;

        const format = this.selectedFormat() as QuizType;
        const routePath = this.getQuizRoutePath(format);

        this.router.navigate([routePath], {
            queryParams: {
                [NavigationParam.DIFFICULTY]: this.selectedDifficulty(),
                [NavigationParam.CATEGORY]: this.selectedCategory(),
            },
        });
    }

    private getQuizRoutePath(type: QuizType): string {
        return type === QuizType.STEP_BY_STEP
            ? Routes.QUIZ_STEP_BY_STEP
            : Routes.QUIZ_ALL_QUESTIONS;
    }

    private loadCategories(): void {
        this.isLoading.set(true);
        this.quizService.getAvailableCategories(this.selectedDifficulty()).subscribe({
            next: (categories) => {
                this.availableCategories.set(
                    categories.map((category) => ({
                        value: category,
                        label: this.formatCategoryLabel(category),
                    }))
                );
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading categories:', error);
                this.isLoading.set(false);
            },
        });
    }

    private formatCategoryLabel(category: string): string {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
}
