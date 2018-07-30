# Screen-saver for ILab multi-projector wall
- Trójwymiarowa animacja wykonana w oparciu o bibliotekę Three.js pozwalająca na szeroką konfigurację efektów wizualnych, elementów i ich ruchu po scenie.

- Aplikacja jest prekonfigurowana do uruchamiania jej w sali ILab ul. Przemysłowa 13 Kraków. Strona internetowa wyświetla się w trybie full-screen na czterech rzutnikach zainstalowanych w sali. Do wyświetlania animacji program nie wykorzystuje ekranu monitora głównego.

- Wraz ze startem aplikacji uruchamia się drugie okno przeglądarki służące do zarządzania animacją - pojawia się ono na monitorze głównym, jest dostępne zmienianie jego pozycji.


Instalacja aplikacji na komputerze w sali ILab:

1. Pobierz i rozpakuj zawartość repozytorium
2. Modyfikuj plik start.bat - w linijce 7 przy fladze -url dodaj lokalizację pliku index.html z repozytorium lub adres domeny, na której znajdują się pliki repozytorium.
3. W folderze audio umieszczaj ścieżki dźwiękowe, które będą automatycznie odtwarzane podczas działania aplikacji. Zaktualizuj sieżkę do pliku audio w pliku controlPanel.html
4. Uruchom wszystkie cztery rzutniki w sali.
5. Aplikację uruchamiaj poprzez plik start.bat

Zastrzeżenia dotyczące funkcjonowania aplikacji:

- Działanie skryptów jest optymalizowane pod aktualną wersję przeglądarki Mozilla Firefox

- Jeżeli plik start.bat korzysta z plików lokalnych to aplikacja jest w stanie funkcjonować bez aktywnego połączenia z internetem.

- Okno przeglądarki, w którym wyświetla się animacja nie może pełnić żadnych innych funkcji, służy jako tło/wygaszacz ekranu dla innych okien/aplikacji. Aby móc swobodnie korzystać z przeglądarki Firefox podczas działania skryptu należy uruchomić jej nowe okno.

- Aplikacja korzysta z local storage przeglądarki. Podczas zamykania okien aplikacji konfiguracja panelu kontrolnego trafia do pamięci przeglądarki. Aplikacja automatycznie przywraca ustawienia z poprzedniej sesji podczasu otwierania okna.

Funkcjonalności panelu konfiguracyjnego:

1. Pogląd i manipulacja puszczanym audio
2. Wybór typu animacji. Aplikacja posiada trzy główne typy ruchu obiektów wokół logo. W ramach poszczególnych typów pojawiają się stosowne kontrolki umożliwiające sterowanie parametrami animacji:
	- Random move : regulacja prędkości poruszania się obiektów wokół logo, regulacja odległości obiektów od centrum sceny,
	- Eliptical move: wybór osi, w których poruszają się obiekty oraz zmiana kierunku obrotu wszystkich elementów wokół logo, 
	- Free fall move: wybór typu ruchu spadania obiektów (odbijający, rain drop)
3. Wybór jednego z dwóch typów obrotu kamery wokół sceny
4. Regulacja prędkości obrotu kamery wokół sceny
5. Regulacja odległości kamery od centrum sceny
6. Włączenie/wyłączenie efektu lustra
7. Dodanie/usunięcie dodatkowego światła globalnego - hemisphere
8. Wybór koloru tła sceny