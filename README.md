# kdp-goptaryfa

Projekt ma na celu stworzenie skryptozakładki (bookmarklet), która uruchomiona
w kontekście strony z trasą przejazdu pojazdu KZKGOP (np.
http://rj.kzkgop.com.pl/rozklady/1-6/28337/1/159242/71746844/
) pozwoli wybrać dwa przystanki z trasy i wskaże, którą taryfę (czasową czy
odległościową) najlepiej (w kontekście ceny) jest wybrać dla kupna biletu jednorazowego.

W dalszej kolejności można zaimplementować wygodniejszą formę używania niż skryptozakładka,
czyli dodatki (addon) dla przeglądarek.

Aktualna taryfa KZKGOP jest na stronie
http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html

Projekt w ramach Koduj dla Polski (zob. np. http://kodujdlapolski.pl).


# Testy

Aby uruchomić testy wystarczy wpisać `yarn test`

# Kompilacja

Aby uzyskać końcowy plik JSa robimy `yarn build` i wykorzystujemy plik `dist/bundle.js`
(Wcześniej zrób `yarn install`, jeśli nie masz webpacka.)

UWAGA: na Ubuntu może być konflikt pakietów - nie instaluj sugerowanego pakietu, jeśli nie masz yarna!
Zrób wg instrukcji tutaj: https://yarnpkg.com/en/docs/install#linux-tab
UWAGA2: tak jak piszą na w/w stronie, potrzebujesz nowszego node'a na starszym Ubuntu. Zainstaluj go wg instrukcji tutaj:
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

## In English
To build the project run `yarn build`. The final file is in `dist/bundle.js`.
(Do `yarn install`, if you don't have webpack.)

NOTE:  there is a different package in Ubuntu that provides _yarn_. Do not install it! Use instructions here:
https://yarnpkg.com/en/docs/install#linux-tab
NOTE2: on older Ubuntu you will need a newer _node_. Install it with instruction from here:
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

# Pisanie kodu w TypeScripcie
Możliwe do użycia edytory mające wsparcie dla TypeScripta:
- Visual Studio Code: https://code.visualstudio.com/
- Atom: https://atom.io/
- plugin dla Vima, np. https://github.com/leafgarland/typescript-vim

## In English
To write in TypeScript you can use for example:
- Visual Studio Code: https://code.visualstudio.com/
- Atom: https://atom.io/
- plugin for Vim, eg. https://github.com/leafgarland/typescript-vim

