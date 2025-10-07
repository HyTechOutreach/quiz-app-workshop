export const Difficulty = {
    single: 'single',
    multiple: 'multiple',
} as const;
export type Difficulty = typeof Difficulty[keyof typeof Difficulty];
