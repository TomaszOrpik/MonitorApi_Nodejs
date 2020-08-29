By zobaczyć angielską wersję [kliknij tu](https://github.com/TomaszOrpik/MonitorApi_Nodejs/blob/master/README.md)

# MonitorApi_Nodejs
Monitor Api odtworzone w node + express js

# Wstęp
API zostało stworzone by śledzić aktywność użytkowników sklepu [Vegetarian Shop](https://vegeshop-714fb.firebaseapp.com/). Zbiera ono takie informacje jak: lokacja, koszyk użytkownika, urządzenie i wiele więcej w bazie danych mongoDB. Takie dane są łatwo dostępne jako sformatowane informacje typu: dane użytkowników, średnie dane użytkownika i wartości globalne w formie wszystkich oraz średnich danych. Łatwo je połączyć z innymi sklepami, by dane użytkowników były wyświetlane w aplikacjach, które nie są kompatybilne z Google Analytics.

# Instalacja
By API zadziałało:
1. Wpisz `npm install`
2. Określ link do bazy danych w db.config.js
3. Wpisz `nodemon server.js`

# Odnośniki do zasobów
Lista odnośników API:

| Zasób      | Wymagane        |Wynik        |
|:--------------|:--------------------|:-------------|
| Get `/users` | Brak | Zwraca z bazy danych informacje o wszystkich użytkownikach oraz ich aktywności |
| Get `/users/:id` | Id użytkownika | Zwraca z bazy danych informacje o wszystkich sesjach użytkownika w formie obiektu JSON|
| Get `/users/all/average` | Brak | Zwraca z bazy danych średnią z aktywności wszystkich użytkowników |
| Get `/users/average/:id` | Id użytkownika | Zwraca z bazy danych średnią z aktywności użytkownika |
| Post `/sessions` | User id, User ip, Date of visit, Device, Browser, Location, reffer | Przekazuje do bazy danych informacje o nowej sesji |
| Get `/sessions` | Brak | Zwraca informację o wszystkich sesjach na stronie |
| Get `/sessions/:id` | Id sesji | Zwraca informacje o sesji z wybranym id |
| Get `/sessions_user/:id` |  Id użytkownika | Zwraca informacje o wszystkich sesjach użytkownika z wybranym id |
| Patch `/sessions/:id` | Id sesji, User Id, User ip, Number of visit, Date of visit, Device, Browser, Location, Reffer, Visited pages, Items in cart, Buyed items, Was user logged?, Did user contacted service desk? | Uaktualnia wszystkie dane sesji z podanym id |
| Put `/sessions_pages/:id` | Id sesji, Page name, Time spend on page(sekundy) | Dodaje dane strony na której był użytkownik do sesji o podanym id |
| Put `/sessions_cartItems/:id` | Id sesji, Item name, Action on item | Dodaje dane interakcji z koszykiem do sesji o podanym id |
| Put `/sessions_buyedItems/:id` | Id sesji, Item name, Item quantity | Dodaje dane koszyka do sesji o podanym id |
| Put `/sessions_scrap/:id` | id sesji, Mouse X, Mouse Y, Window Width, Window Heigth, ScrollTopPosition, Current Page, Clicked Item Id | Dodaje dane aktualnej aktywności użytkownika na stronie |
| Patch `/sessions_logged/:id` | Id sesji, Did logged? | Zmienia status zmiennej DidLogged w sesji o podanym id |
| Patch `/sessions_contacted/:id` | Id sesji, Did contacted? | Zmienia status zmiennej DidContacted w sesji o podanym id |
| Delete `/sessions/:id` | Id sesji | Usuwa z bazy danych sesję o podanym id |

# Inne
### Zgłoś problemy i ulepszenia

Możesz zgłosić problemy i wysłać pomysły na ulepszenia [tutaj](https://github.com/TomaszOrpik/MonitorApi_Nodejs/issues)

### Licencja

Aplikacja działa na zasadach GENERAL PUBLIC LICENSE by poznać szczegóły [sprawdź plik ze szczegółami](https://github.com/TomaszOrpik/MonitorApi_Nodejs/blob/master/LICENSE)

### Kontakt

Zapraszam do [kontaktu ze mną!](https://github.com/TomaszOrpik)
