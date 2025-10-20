# Zadanie 3. Stworzenie serwisu do pobierania pytań quizowych

## Wstęp

W poprzednich zadaniach stworzyliśmy podstawową strukturę aplikacji quizowej w Angularze, składającą się z komponentów `Quiz` oraz `Question`. W tym zadaniu zajmiemy się stworzeniem serwisu, który będzie odpowiedzialny za pobieranie pytań quizowych z zewnętrznego API. Dzięki temu nasza aplikacja stanie się bardziej modularna i łatwiejsza do utrzymania.

## Kroki do wykonania

0. **Poprawienie działania i stylizacji komponentów**:

    Jeśli jeszcze tego nie zrobiłeś, to dobry moment, aby wystylizować komponenty `Quiz` oraz `Question`, aby wyglądały estetycznie i były wygodne w użytkowaniu:

    - Wystylizuj i wyśrodkuj zawartość komponentu `Quiz` na stronie.
    - Dodaj dyrektywy `disabled` do przycisków "Poprzednie" i "Następne", aby zapobiec nawigacji poza zakresem dostępnych pytań.
    - Wystylizuj i wyśrodkuj zawartość komponentu `Question`.

    Całość powinna wyglądać mniej więcej tak:
    ![3-1](./resources/Zadanie-3-screen-1.png)

1. **Stworzenie serwisu**:

    Użyj Angular CLI, aby wygenerować serwis o nazwie `QuizService`:

    ```bash
    ng generate service services/quiz
    ```

    Dodaj do niego metodę `getQuestions()`, która będzie zwracać typ `Observable<QuestionData[]>`. Na ten moment, możesz przenieśc do niej statyczne dane z komponentu `Quiz`:

    ```typescript
        getQuestions(): Observable<QuestionData[]> {
        const questions = [
            {
                id: '1',
                answer: 'b',
                options: {
                    a: 'Biblioteką JavaScript do budowy interfejsów użytkownika',
                    b: 'Frameworkiem TypeScript do tworzenia aplikacji webowych',
                    c: 'Językiem programowania',
                    d: 'Bazą danych',
                },
                question: 'Czym jest Angular?',
            },
            {
                id: '2',
                answer: 'd',
                options: {
                    a: 'JavaScript',
                    b: 'Java',
                    c: 'Python',
                    d: 'TypeScript',
                },
                question: 'Jaki język jest podstawą Angulara?',
            },
        ];

        return of(questions);
    }
    ```

2. **Wstrzyknięcie serwisu do komponentu**:

    Serwisy w Angularze są wstrzykiwane do komponentów za pomocą mechanizmu Dependency Injection. Wykorzystaj go, aby wstrzyknąć `QuizService` do komponentu `Quiz` i pobrać pytania quizowe.

    Dodaj na górze klasy `QuizComponent`:

    ```typescript
    private readonly quizService = inject(QuizService);

    questions = toSignal(this.quizService.getQuestions(), { initialValue: [] });
    ```

    Sprawdź, czy działanie aplikacji pozostało bez zmian i czy pytania są poprawnie wyświetlane.

3. **Wstrzyknięcie klienta HTTP i pobranie pytań z API**:

    `HttpClient` to wbudowany serwis Angulara, który umożliwia wykonywanie zapytań HTTP. Wykorzystamy go w `QuizService`, aby pobrać pytania z zewnętrznego API.

    Najpierw przejdź do pliku `app.config.ts` i dodaj funkcję `provideHttpClient()` do tablicy `providers`:

    ```typescript
    import { provideHttpClient } from '@angular/common/http';

    export const appConfig: ApplicationConfig = {
        providers: [
            provideBrowserGlobalErrorListeners(),
            provideZonelessChangeDetection(),
            provideRouter(routes),
            provideHttpClient(),
        ],
    };
    ```

    Następnie, w serwisie quizowym, zaimportuj i wstrzyknij `HttpClient`:

    ```typescript
    private readonly http = inject(HttpClient);
    ```

    Zmodyfikuj metodę `getQuestions()`, aby wykonywała zapytanie GET do endpointu
    `https://hyland-tech-outreach-default-rtdb.europe-west1.firebasedatabase.app/single/angular`:

    ```typescript
    private readonly baseUrl =
    'https://hyland-tech-outreach-default-rtdb.europe-west1.firebasedatabase.app/';

    getQuestions(): Observable<QuestionData[]> {
        return this.http.get<QuestionData[]>(`${this.baseUrl}/single/angular`);
    }
    ```

    Zweryfikuj, czy aplikacja działa poprawnie i czy pytania są pobierane z API.

## Podsumowanie

Gratulacje! Udało Ci się stworzyć serwis w Angularze, który korzysta z zewnętrznego API. W kolejnych zadaniach będziemy rozwijać aplikację, dodając nowe funkcjonalności i ulepszając istniejące komponenty.
