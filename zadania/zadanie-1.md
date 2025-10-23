# Zadanie 1: Dodanie routingu i pierwszego komponentu

## Wstęp

W tym zadaniu dodasz routing do aplikacji oraz stworzysz pierwszy komponent, który będzie wyświetlał proste powitanie. Zainstalujesz również Angular Material, aby móc korzystać z gotowych komponentów UI.

## Wynik końcowy
![1-done](./resources/zadanie-1-done.jpeg)

## Kroki do wykonania

1. **Wygeneruj nowy komponent**:

    ```bash
    ng generate component Home
    ```

2. **Dodaj routing do aplikacji**:

    Przejdź do pliku `app.routes.ts` i dodaj nową trasę dla komponentu `Home` do tablicy `routes`:

    ```typescript
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) }
    ```

    Zapisz plik i upewnij się, że w przeglądarce po odświeżeniu strony pojawia się zawartość komponentu `Home`.

3. **Zainstaluj Angular Material**:

    ```bash
    ng add @angular/material
    ```

    Wynikiem tej komendy będzie uruchomienie kreatora, który poprowadzi Cię przez proces instalacji. Po instalacji, upewnij się, że w pliku `package.json` pojawiły się nowe zależności związane z Angular Material.

4. **Dodaj przycisk do komponentu `Home`**:

    Otwórz plik `home.component.html` i dodaj przycisk z użyciem komponentu `mat-button` z Angular Material:

    ```html
    <button matButton="filled">Rozpocznij Quiz</button>
    ```

    Aby dyrektywa `matButton` działała poprawnie, upewnij się, że w komponencie `home.component.ts` zaimportowałeś moduł `MatButtonModule` z Angular Material:

    ```typescript
    import { Component } from '@angular/core';
    import { MatButtonModule } from '@angular/material/button';

    @Component({
        selector: 'app-home',
        imports: [MatButtonModule],
        templateUrl: './home.component.html',
        styleUrl: './home.component.scss',
    })
    export class HomeComponent {}
    ```

5. **Wystylizuj komponent `Home`**:

    Wycentrujemy teraz zawartość komponentu oraz dodamy prostą wiadomość powitalną. Otwórz plik `home.component.scss` i dodaj następujące style:

    ```scss
    .home__container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fafafa;
    }

    .home__header {
        margin-bottom: 2rem;
        text-align: center;
        font-size: 2.5rem;
        font-weight: 600;
    }
    ```

    Następnie, użyj tych klas w pliku `home.component.html`:

    ```html
    <div class="home__container">
        <h1 class="home__header">Witaj w Quiz App!</h1>
        <button matButton="filled">Rozpocznij Quiz</button>
    </div>
    ```

## Podsumowanie

Wiesz już jakiej komendy użyć do wygenerowania komponentu, gdzie dodać routing oraz jak zainstalować Angular Material. W kolejnym zadaniu dodasz kolejny komponent oraz nauczysz się, jak pobierać dane z zewnętrznego API.

## Pomocna dokumentacja

- <https://angular.dev/guide/routing-overview> - wprowadzenie do routingu
- <https://angular.dev/cli/generate> - generowanie komponentów, dyrektyw, serwisów itp. za pomocą Angular CLI
- <https://angular.dev/guide/standalone-components> - o samodzielnych komponentach
- <https://material.angular.io/guide/getting-started> - jak zacząć pracę z Angular Material
- <https://material.angular.io/components/button/overview> - dokumentacja komponentu przycisku w Angular Material
- <https://angular.dev/guide/component-styles> - style komponentów w Angularze
