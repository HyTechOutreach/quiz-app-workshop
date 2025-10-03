# Hyland Tech Outreach - Przygotowanie środowiska Angular

Witamy na warsztatach Hyland Tech Outreach! 🚀

Ten przewodnik pomoże Ci przygotować środowisko programistyczne do pracy z Angularem. Wykonaj wszystkie kroki poniżej **przed** warsztatami, aby móc od razu zacząć kodować.

## 🛠️ Instalacja niezbędnych narzędzi

### 0. Konto na GitHub

Jeśli jeszcze nie masz konta na GitHub, zarejestruj się na https://github.com/join. Rejestracja jest darmowa, nie trwa długo. 
Możesz użyć swojego konta Google by się zalogować.

### 1. Node.js i npm

#### Windows:

1. Przejdź na https://nodejs.org
2. Pobierz wersję 22 LTS (Long Term Support)
3. Uruchom pobrany installer i postępuj zgodnie z instrukcjami
4. Uruchom Command Prompt lub PowerShell jako administrator
5. Sprawdź instalację:

```bash
node --version
npm --version
```

#### macOS:

**Opcja 1 - Homebrew (zalecane):**

```bash
# Zainstaluj Homebrew jeśli nie masz
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Zainstaluj Node.js
brew install node
```

**Opcja 2 - Oficjalny installer:**

1. Przejdź na https://nodejs.org
2. Pobierz wersję LTS dla macOS
3. Uruchom installer

#### Linux (Ubuntu/Debian):

```bash
# Aktualizuj listę pakietów
sudo apt update

# Zainstaluj Node.js i npm
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Sprawdź instalację
node --version
npm --version
```

### 2. Angular CLI

Po zainstalowaniu Node.js, zainstaluj Angular CLI globalnie:

```bash
npm install -g @angular/cli@latest
```

Sprawdź instalację:

```bash
ng version
```

### 3. Git

#### Windows:

1. Pobierz Git z https://git-scm.com/download/win
2. Uruchom installer z domyślnymi ustawieniami
3. Sprawdź instalację w Command Prompt:

```bash
git --version
```

#### macOS:

```bash
# Z Homebrew
brew install git

# Lub sprawdź czy masz już zainstalowany
git --version
```

#### Linux:

```bash
sudo apt install git
```

### 4. Visual Studio Code (zalecane)

1. Pobierz VS Code z https://code.visualstudio.com
2. Zainstaluj dla swojego systemu operacyjnego
3. Uruchom VS Code

#### Zalecane rozszerzenia dla VS Code:

Otwórz VS Code i zainstaluj następujące rozszerzenia (Ctrl/Cmd + Shift + X):

- **Angular Language Service**
- **Auto Rename Tag**
- **Material Icon Theme**
- **Prettier - Code formatter**
- **ESLint**
- **GitLens**

## ✅ Weryfikacja instalacji

Uruchom następujące komendy, aby sprawdzić czy wszystko działa:

```bash
# Sprawdź wersje
node --version          # Powinno być >= 22.0.0
npm --version           # Powinno być >= 9.0.0
ng version              # Powinno pokazać wersję Angular CLI
git --version           # Powinno pokazać wersję Git
```

## 🎯 Co powinniśmy mieć gotowe na warsztaty

Po wykonaniu wszystkich kroków powinieneś mieć zainstalowane (najnowsze wersje):

- ✅ Stworzone konto na GitHub
- ✅ Node.js
- ✅ npm
- ✅ Angular CLI
- ✅ Git
- ✅ VS Code

---

**Powodzenia na warsztatach! 🎉**

_Pamiętaj: Lepiej przygotować środowisko wcześniej niż tracić czas podczas warsztatów na instalację!_
