# kdp-goptaryfa

Wtyczka do przeglądarek pomagająca wybrać, która taryfa KZK GOP bardziej opłaca się dla danego przejazdu.

Aktualna taryfa KZKGOP jest na stronie
http://www.kzkgop.com.pl/strony/p-1-cennik-od-1012018-r.html

Projekt w ramach Koduj dla Polski (zob. np. http://kodujdlapolski.pl).

# Jak używać?

Wtyczka jest dostępna pod następującymi adresami:
* Chrome: https://chrome.google.com/webstore/detail/gop-taryfa/hiebekpfadlkbhmlaoffcijmipmbainb
* Firefox: https://addons.mozilla.org/addon/gop-taryfa/

Po zainstalowaniu wtyczki i wejściu na stronę ze szczegółowym rozkładem jazdy (np. https://rj.metropoliaztm.pl/rozklady/2-7/43579/0/159633/98376783/#98376783) obok nazw przystanków wyświetlą się checkbox'y. Po zaznaczeniu przystanku początkowego i końcowego zostaniemy poinformowani, która taryfa będzie tańsza.
![Przykład](screenshot.png?raw=true "Przykład")

# Wskazówki dla developerów

## Testy

Aby uruchomić testy wystarczy wpisać `yarn test`

## Kompilacja

Aby uzyskać końcowy plik JSa robimy `yarn build` i wykorzystujemy plik `dist/bundle.js`
(Wcześniej zrób `yarn install`, jeśli nie masz webpacka.)

UWAGA: na Ubuntu może być konflikt pakietów - nie instaluj sugerowanego pakietu, jeśli nie masz yarna!
Zrób wg instrukcji tutaj: https://yarnpkg.com/en/docs/install#linux-tab
UWAGA2: tak jak piszą na w/w stronie, potrzebujesz nowszego node'a na starszym Ubuntu. Zainstaluj go wg instrukcji tutaj:
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

### In English
To build the project run `yarn build`. The final file is in `dist/bundle.js`.
(Do `yarn install`, if you don't have webpack.)

NOTE:  there is a different package in Ubuntu that provides _yarn_. Do not install it! Use instructions here:
https://yarnpkg.com/en/docs/install#linux-tab
NOTE2: on older Ubuntu you will need a newer _node_. Install it with instruction from here:
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

### Pisanie kodu w TypeScripcie
Możliwe do użycia edytory mające wsparcie dla TypeScripta:
- Visual Studio Code: https://code.visualstudio.com/
- Atom: https://atom.io/
- plugin dla Vima, np. https://github.com/leafgarland/typescript-vim

### In English
To write in TypeScript you can use for example:
- Visual Studio Code: https://code.visualstudio.com/
- Atom: https://atom.io/
- plugin for Vim, eg. https://github.com/leafgarland/typescript-vim

