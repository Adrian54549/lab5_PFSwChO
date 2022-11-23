# Sprawozdanie - Laboratorium 5

## Etap1

### Część 1

Sprawdzamy dla jakich platform sprzętowych jest dostępny obraz "node:alpine":<br />
```docker manifest inspect node:alpine | jq '.manifests[].platform'```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap1_nodeAlpine_platformySprzetowe.png)<br /><br />
Za pomocą buildx budujemy obraz bez wybierania platform sprzętowych:<br />
``` docker buildx build -t docker.io/adrianszafranski/spr5:etap1.v1 --push . ```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap1_budowaniePierwszegoObrazu.png)<br /><br />
Budując w ten sposób obraz, obraz został tworzony tylko dla jednej platformy sprzętowej (dla platformy, na której obraz został utworzony):<br />
```docker manifest inspect -v docker.io/adrianszafranski/spr5:etap1.v1 | jq '.Descriptor.platform'```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap1_platformyPierwszegoObrazu.png)<br /><br />
### Część 2

Potrzebujemy builder-a z sterownikiem docker-container. Tworzymy go używając komend:<br />
```docker buildx create --name testbuilder```<br />
```docker buildx use testbuilder```<br />
Sprawdzamy czy skonfigurowana jest instalacja builder-a:<br />
```docker buildx inspect --bootstrap```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/builder.png)<br /><br />


Wykorzystując buildx, sterownik docker-container oraz QEMU budujemy obraz dla trzech wybranych architektur sprzętowych(linux/amd64, linux/arm64/v8, linux/ppc64le) i przesyłamy go do swojego konta na DockerHub:<br />
```docker buildx build -t docker.io/adrianszafranski/spr5:etap1.v2 --platform linux/amd64,linux/arm64/v8,linux/ppc64le --push .```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap1_budowanieDrugiegoObrazu_cz1.png)<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap1_budowanieDrugiegoObrazu_cz2.png)<br /><br />

### Część 3
Sprawdzamy czy zbudowany obraz wspiera wybrane architektury sprzętowe:<br />
 ```docker manifest inspect -v docker.io/adrianszafranski/spr5:etap1.v2 | jq '.[].Descriptor.platform'```
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap1_platformyDrugiegoObrazu.png)<br /><br />

## Etap2

### Część 1 i 2
Budujemy plik docker-compose.yml, który deklaruje użycie dwóch serwisów, redis oraz app gdzie app oznacza kontener BUDOWANY na bazie dostarczonego pliku Dockerfile:
[plik docker-compose.yml](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/docker-compose.yml)<br /><br />

### Część 3
Uruchamiamy aplikacje:<br />
```docker compose up -d```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap2_uruchamianieUtworzonejAplikacji.png)<br /><br />
Prezentujemy działanie aplikacji:<br />
![prezentacja dzialania](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap2_prezentacjaDzialaniaUtworzonejAplikacji_cz1.png)<br />
Odświeżamy stronę<br /><br />
![prezentacja dzialania](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap2_prezentacjaDzialaniaUtworzonejAplikacji_cz2.png)<br />


## Etap3

Aby możliwe było przegotowanie aplikacji na inną platformę sprzętową niż architektura wykorzystywanego hosta (komputera) trzeba użyc komendy: <br />
```docker buildx bake -f docker-compose.yml --set *.platform=linux/ppc64le --push --set=*.output=type=image,name=docker.io/adrianszafranski/spr5:etap3.v1,push=true```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap3_wykonanieKomendy.png)<br />
Stworzyliśmy aplikacje dla linux/ppc64le. Aby sprawdzić czy operacja zadziałała prawidłowo wpisujemy:<br />
```docker manifest inspect -v docker.io/adrianszafranski/spr5:etap3.v1 | jq '.Descriptor.platform'```<br />
![prezentacja dzialania](https://github.com/Adrian54549/lab5_PFSwChO/blob/main/screenshots/etap3_wynik.png)<br />

## Link do repozytorium DockerHub
https://hub.docker.com/r/adrianszafranski/spr5
