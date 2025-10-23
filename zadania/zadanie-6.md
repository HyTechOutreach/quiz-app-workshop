# Zadanie 6. Dokończenie komponentu `Results` i dalsze kroki

## Wstęp

W tym zadaniu dokończysz implementację komponentu `Results`, który będzie wyświetlał podsumowanie quizu po jego zakończeniu. Będziesz musiał zaimplementować logikę obliczania wyniku oraz wyświetlania szczegółowych informacji o odpowiedziach użytkownika.

## Kroki do wykonania

1. **Pozyskaj prawidłowe odpowiedzi z API**:

    Otwórz ponownie dokumentację API i zapoznaj się z endpointem `/answers`. Ten endpoint zwraca listę prawidłowych odpowiedzi dla odpowiednich identyfikatorów pytań. Zaimplementuj w serwisie `QuizService` metodę `getCorrectAnswers(questionIds: string[])`, która przyjmie tablicę identyfikatorów pytań i zwróci Observable z mapą: `identyfikator` - `tablica prawidłowych odpowiedzi`.

    ```typescript
    getCorrectAnswers(questionIds: string[]): Observable<Map<string, string[]>> {
        return this.http
            .post<AnswersResponse>(`${this.baseUrl}/answers`, { questionIds })
            .pipe(map((response) => response.answers));
    }
    ```

2. **Pokaż wyniki quizu**:

    Masz już dostęp do odpowiedzi użytkownika oraz do prawidłowych odpowiedzi. Dokończ implementację komponentu `Results`, aby w przystępny sposób wyświetlał wyniki quizu. Możesz użyć do tego poznanych Ci już komponentów Angular Material, jak na przykład [MatCard](https://material.angular.io/components/card/overview).

## Podsumowanie

Po ukończeniu tego zadania, Twój quiz powinien być w pełni funkcjonalny - użytkownik będzie mógł odpowiadać na pytania, a po zakończeniu quizu zobaczy szczegółowe wyniki swoich odpowiedzi. Nie oznacza to jednak końca pracy nad aplikacją - teraz oddajemy Cię w ręce własnej kreatywności! Możesz dodać nowe funkcjonalności, takie jak:

1. Wybór kategorii, trudności, lub liczby pytań przed rozpoczęciem quizu:

    - wykorzystaj [MatFormField](https://material.angular.dev/components/form-field/overview) do stworzenia formularza wyboru w komponencie `Home`, dodając odpowiednie kontrolki formularza, takie jak [MatSelect](https://material.angular.dev/components/select/overview) do wyboru kategorii i trudności,
    - rozszerz nawigację do quizu o przekazywanie wybranych opcji jako parametrów zapytania,
    - zmodyfikuj serwis `QuizService`, aby uwzględniał te parametry przy pobieraniu pytań z API.

2. Pionowy widok quizu z paskiem postępu:

    - zmodyfikuj komponent `Quiz`, aby na podstawie wyboru użytkownika wyświetlał pytania w istniejący sposób lub w pionowym widoku. Ewentualnie, stwórz nowy komponent dla pionowego widoku quizu, do którego będziesz przekazywał te same dane.
    - dodaj pasek postępu, który będzie wskazywał, na którym etapie quizu znajduje się użytkownik. Możesz użyć do tego [MatProgressBar](https://material.angular.dev/components/progress-bar/overview#determinate).

3. Tablica wyników:

    - dodaj logikę zapisywania wyników quizu do lokalnego magazynu przeglądarki ([localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#examples)),
    - stwórz nowy komponent `Leaderboard`, który będzie wyświetlał poprzednie wyniki użytkownika z lokalnego magazynu w formie tabeli (na przykład, przy użyciu [MatTable](https://material.angular.io/components/table/overview)),
    - dodaj nawigację do komponentu `Leaderboard` z poziomu komponentu `Home` lub `Results`.

4. Tryb ciemny strony:

    - dodaj możliwość przełączania się między trybem jasnym i ciemnym w aplikacji, wykorzystując [Theming w Angular Material](https://material.angular.io/guide/theming),
    - stwórz przełącznik (na przykład, używając [MatSlideToggle](https://material.angular.io/components/slide-toggle/overview)) w komponencie `Toolbar`, który będzie umożliwiał użytkownikowi zmianę motywu.

5. Własne funkcjonalności lub ulepszenia, które Twoim zdaniem mogą poprawić doświadczenie użytkownika podczas korzystania z aplikacji quizowej!
