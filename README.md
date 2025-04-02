# Subnet Calculator

Aplikacja do obliczania parametrów sieci i podsieci IP, zbudowana przy użyciu React i TailwindCSS, uruchamiana w kontenerze Docker.

## Funkcjonalności

- Obliczanie podstawowych parametrów sieci:
  - Adres sieci
  - Adres rozgłoszeniowy (broadcast)
  - Pierwszy użyteczny adres
  - Ostatni użyteczny adres
  - Liczba dostępnych hostów
  - Maska podsieci (w różnych notacjach)
- Wizualizacja sieci i podsieci
- Konwersja między różnymi notacjami (binarną, dziesiętną, CIDR)
- Eksport wyników (CSV, JSON)
- Tryb ciemny/jasny

## Technologie

- **Frontend**: React, TailwindCSS
- **Konteneryzacja**: Docker, Docker Compose
- **Serwer web**: Nginx
- **Biblioteki IP**: ip-subnet-calculator, ip-address

## Wymagania

- Docker
- Docker Compose

## Uruchomienie aplikacji

### Przy użyciu Docker Compose

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/username/subnet-calculator.git
   cd subnet-calculator
   ```

2. Uruchom aplikację za pomocą Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Otwórz przeglądarkę i przejdź do adresu:
   ```
   http://localhost:8080
   ```

4. Aby zatrzymać aplikację:
   ```bash
   docker-compose down
   ```

### Uruchomienie w trybie deweloperskim

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom serwer deweloperski:
   ```bash
   npm start
   ```

3. Otwórz przeglądarkę i przejdź do adresu:
   ```
   http://localhost:3000
   ```

## Budowanie aplikacji

Aby zbudować aplikację do wdrożenia:

```bash
npm run build
```

Zbudowane pliki będą dostępne w katalogu `build/`.

## Struktura projektu

```
subnet-calculator/
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── Calculator.jsx
│   │   │   ├── CalculatorForm.jsx
│   │   │   ├── IPInput.jsx
│   │   │   ├── SubnetTable.jsx
│   │   │   └── VisualRepresentation.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   └── Common/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Alert.jsx
│   ├── utils/
│   │   ├── ipCalculations.js
│   │   ├── validation.js
│   │   └── formatters.js
│   ├── hooks/
│   │   └── useIPCalculator.js
│   ├── contexts/
│   │   └── CalculatorContext.jsx
│   ├── App.jsx
│   ├── index.jsx
│   └── styles.css
├── .dockerignore
├── .gitignore
├── package.json
├── README.md
└── nginx.conf
```

## Licencja

Ten projekt jest udostępniany na licencji MIT.
