# kdp-goptaryfa

Projekt ma na celu stworzenie skryptozakładki (bookmarklet), która uruchomiona
w kontekście strony z trasą przejazdu pojazdu KZKGOP (np.
http://rozklady.kzkgop.com.pl/rozklad/pokaz_kurs.php?id_kursu=1741348&nr_przystanku=1
) pozwoli wybrać dwa przystanki z trasy i wskaże, którą taryfę (czasową czy
odległościową) najlepiej (w kontekście ceny) jest wybrać dla kupna biletu jednorazowego.

W dalszej kolejności można zaimplementować wygodniejszą formę używania niż skryptozakładka,
czyli dodatki (addon) dla przeglądarek.

Aktualna taryfa KZKGOP jest na stronie
http://www.kzkgop.com.pl/strony/p-1-cennik-oplat.html

W międzyczasie zmieniła się strona KZK GOP; stworzona skryptozakładka działała (i działa nadal)
dla starej wersji strony KZK GOP. Prace nad nową wersją odbywają się w branchu new-website.

Projekt w ramach Koduj dla Polski (zob. np. http://kodujdlapolski.pl).


# Testy

Aby uruchomić testy wystarczy wpisać `yarn test`