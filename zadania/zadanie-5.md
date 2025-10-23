# Zadanie 5. Ukończenie funkcjonalności quizu i pokazanie wyników

## Wstęp

Na ten moment, użytkownik może korzystać z przycików radio do wyboru odpowiedzi w quizie, lecz jego odpowiedzi nie są nigdzie zapisywane ani wyświetlane po zakończeniu quizu. Twoim zadaniem jest dokończenie tej funkcjonalności, tak aby:

- odpowiedzi użytkownika były zapisywane podczas trwania quizu,
- użytkownik nie mógł przejść do następnego pytania bez wybrania odpowiedzi,
- po zakończeniu quizu, użytkownik mógł zobaczyć, na które pytania odpowiedział poprawnie, a na które nie.

## Kroki do wykonania

1. **Przechowywanie odpowiedzi użytkownika w komponencie `Quiz`**:

    Dodaj do kompinentu `Quiz` następujące elementy:

    - sygnał lub zmienną, która będzie przechowywać odpowiedzi użytkownika. Możesz użyć `Map`, gdzie kluczem będzie identyfikator pytania, a wartością wybrana odpowiedź,
    - sygnał lub zmienną, która będzie przechowywać odpowiedź użytkownika dla bieżącego pytania (jeśli istnieje).
    - metodę, która będzie aktualizować odpowiedzi użytkownika, gdy wybierze on odpowiedź w komponencie `Question`.

2. **Manipulacja danymi w komponencie `Question`**:

    Zmodyfikuj komponent `Question`, aby przyjmował dodatkowy input z aktualnie wybraną odpowiedzią oraz emitował output, gdy użytkownik wybierze odpowiedź:

    ```typescript
    currentAnswer = input<string>();
    answerSelected = output<string>();

    onAnswerSelected(answer: string): void {
        this.answerSelected.emit(answer);
    }
    ```

    Wykorzystaj te dane do zaznaczenia odpowiedniej opcji w grupie przycisków radio:

    ```html
    <mat-radio-group
        class="question__radio-group"
        [value]="currentAnswer()"
        (change)="onAnswerSelected($event.value)"
    ></mat-radio-group>
    ```

3. **Przekazanie danych z komponentu `Quiz` do komponentu `Question`**:

    W szablonie komponentu `Quiz`, przekaż aktualnie wybraną odpowiedź do komponentu `Question` oraz obsłuż zdarzenie wyboru odpowiedzi:

    ```html
    <app-question
        [question]="currentQuestion()!"
        [currentAnswer]="currentAnswer()"
        (answerSelected)="onAnswerSelected($event)"
    />
    ```

    Zweryfikuj kroki 1 - 3 w swojej aplikacji - nawiguj pomiędzy pytaniami, wybieraj odpowiedzi i upewnij się, że są one poprawnie zapisywane dla każdego pytania.

4. **Zablokowanie przejścia do następnego pytania bez wybrania odpowiedzi**:

    Jeśli dobrze pamiętasz, przycisk `Następne` w komponencie `Quiz` ma już logikę, która go wyłącza, gdy sygnał `isLastQuestion()` zwraca `true`. Możemy ją rozszerzyć, aby również brała pod uwagę, czy użytkownik wybrał już odpowiedź na bieżące pytanie:

    ```typescript
    canProceedToNextQuestion = computed(() => {
        return !this.isLastQuestion() && !this.currentAnswer();
    });
    ```

    ```html
    <button matButton="elevated" [disabled]="canProceedToNextQuestion()" (click)="nextQuestion()">
        Następne
    </button>
    ```

5. **Dodanie przycisku do zakończenia quizu**

    W komponencie `Quiz`, dodaj przycisk `Zakończ quiz`, który będzie widoczny tylko na ostatnim pytaniu. Po kliknięciu tego przycisku, użytkownik powinien zostać przekierowany do komponentu `Results`, gdzie zobaczy swoje wyniki. Na ten moment, możesz wyświetlić je w konsoli, lub bezpośrednio w nowym komponencie. W następnym zadaniu Rozwiniemy komponent `Results`, aby pokazać wyniki w bardziej przyjazny sposób.

## Podsumowanie

Po ukończeniu tego zadania, Twoja aplikacja quizowa powinna umożliwiać użytkownikowi wybieranie odpowiedzi na pytania, zapisywać te odpowiedzi oraz uniemożliwiać przejście do następnego pytania bez wybrania odpowiedzi. Dodatkowo, użytkownik powinien mieć możliwość zakończenia quizu i przejścia do komponentu wyników.

## Pomocna dokumentacja

- <https://angular.dev/guide/component-communication> - komunikacja między komponentami (`input` i `output`)
- <https://angular.dev/guide/template-binding> - składnia bindowania w szablonach (np. `[value]`, `[disabled]`)
- <https://angular.dev/guide/user-input> - obsługa zdarzeń użytkownika, np. `(change)`
- <https://angular.dev/guide/signals#computed-signals> - sygnały `computed`
- <https://material.angular.io/components/radio/overview> - dokumentacja komponentu `mat-radio-button`
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map> - dokumentacja obiektu `Map`
