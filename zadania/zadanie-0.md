# Zadanie 0: Pobranie zależności i uruchomienie aplikacji

## Wstęp

Znajdujesz się teraz w repozytorium w stanie po komendzie `ng new`. Oznacza to, że masz już wygenerowaną strukturę projektu Angulara, ale nie masz jeszcze zainstalowanych zależności.

Twoim zadaniem będzie zapoznanie się z plikami projektu, zainstalowanie zależności oraz uruchomienie aplikacji.

## Kroki do wykonania

1. **Zainstaluj zależności**:

    Otwórz terminal w katalogu głównym projektu i uruchom polecenie `npm install`, aby zainstalować wszystkie wymagane zależności.

2. **Uruchom aplikację**:

    Po zainstalowaniu zależności, uruchom aplikację za pomocą polecenia `ng serve`. Aplikacja powinna być dostępna pod adresem `http://localhost:4200/`.

3. **Sprawdź działanie aplikacji**:

    Otwórz przeglądarkę i przejdź do podanego adresu, aby upewnić się, że aplikacja działa poprawnie. Możesz również zrobić to za pomocą linku z terminala w VSCode.

    Aplikacja powinna wyświetlać domyślną stronę powitalną, wygenerowaną przez Angular CLI.

4. **Przygotuj plik app.component.html**:

    Otwórz plik `src/app/app.component.html` i usuń z niego wszystko, oprócz `<router-outlet />`. Ten element odpowiada za wyświetlanie komponentów w zależności od aktualnego routingu.

    Po tym kroku, w przeglądarce powinna pojawić się pusta strona. Otwórz konsolę deweloperską (F12) i przejdź do zakładki "Elements". Zwróć uwagę, że w `<body>` znajduje się tylko `<app-root>` oraz `<router-outlet>`, co oznacza, że aplikacja jest gotowa do dalszej rozbudowy.

## Podsumowanie

Na tym etapie powinieneś mieć działającą i uruchomioną lokalnie aplikację Angular z zainstalowanymi zależnościami i przygotowanym plikiem `app.component.html`. Możesz teraz przejść do zadania pierwszego, gdzie zaczniesz tworzyć pierwsze komponenty i funkcjonalności aplikacji.
