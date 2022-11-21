# Sprawozdanie - Laboratorium 5

## Etap1 - 1

### Część 1

Sprawdzamy dla jakich platform sprzętowych jest dostępny obraz "node:alpine":<br />
```docker manifest inspect node:alpine | jq '.manifests[].platform'```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab4_PFSwChO/blob/main/screenshots/etap1_nodeAlpine_platformySprzetowe.png)<br /><br />
Za pomocą buildx budujemy obraz bez wybierania platform sprzętowych:<br />
``` docker buildx build -t docker.io/adrianszafranski/spr5:etap1.v1 --push . ```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab4_PFSwChO/blob/main/screenshots/etap1_budowaniePierwszegoObrazu.png)<br /><br />
Budując w ten sposób obraz, obraz został tworzony tylko dla jednej platformy sprzętowej(dla naszego komputera, na którym budowaliśmy obraz):<br />
```docker manifest inspect -v docker.io/adrianszafranski/spr5:etap1.v1 | jq '.Descriptor.platform'```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab4_PFSwChO/blob/main/screenshots/etap1_platformyPierwszegoObrazu.png)<br /><br />
### Część 2

Potrzebujemy builder-a z sterownikiem docker-container. Tworzymy go używając komend:<br />
```docker buildx create --name testbuilder```<br />
```docker buildx use testbuilder```<br />
Sprawdzamy czy skonfigurowana jest instalacja builder-a:<br />
```docker buildx inspect --bootstrap```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab4_PFSwChO/blob/main/screenshots/builder.png)<br /><br />


Wykorzystując buildx, sterownik docker-container oraz QEMU budujemy obraz dla trzech wybranych architektur sprzętowych i przesyłamy go do swojego konta na DockerHub:<br />
```docker buildx build -t docker.io/adrianszafranski/spr5:etap1.v2 --platform linux/amd64,linux/arm64/v8,linux/ppc64le --push .```<br />
![wykonanie komendy](https://github.com/Adrian54549/lab4_PFSwChO/blob/main/screenshots/etap1_budowanieDrugiegoObrazu_cz1.png)<br />
![wykonanie komendy](https://github.com/Adrian54549/lab4_PFSwChO/blob/main/screenshots/etap1_budowanieDrugiegoObrazu_cz2.png)<br /><br />

### Część 3
Sprawdzamy czy zbudowany obraz wspiera wybrane architektury sprzętowe:<br />
![wykonanie komendy](etap1_platformyDrugiegoObrazu.png)<br /><br />
 ``` ```
