export const QuizType = {
  STEP_BY_STEP: 'step-by-step',
  ALL_QUESTIONS: 'all-questions'
} as const;

export const DifficultyLevel = {
  SINGLE: 'single',
  MULTIPLE: 'multiple'
} as const;

export const NavigationParam = {
  FROM: 'from',
  DIFFICULTY: 'difficulty',
  CATEGORY: 'category'
} as const;

export const Routes = {
  HOME: '/',
  QUIZ_STEP_BY_STEP: '/quiz',
  QUIZ_ALL_QUESTIONS: '/all-questions',
  RESULTS: '/results'
} as const;

export type QuizType = typeof QuizType[keyof typeof QuizType];
export type DifficultyLevel = typeof DifficultyLevel[keyof typeof DifficultyLevel];
export type NavigationParam = typeof NavigationParam[keyof typeof NavigationParam];
export type Route = typeof Routes[keyof typeof Routes];
