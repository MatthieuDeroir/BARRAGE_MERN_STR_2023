@startuml
!define Table(x) class x << (T,#FFAAAA) >>
skinparam {
BackgroundColor transparent
ArrowColor #333333
BorderColor #333333
}

hide empty members

Table(Matrice_de_flux) {
| Composant/Flux           | Application Web  |   SGBD MongoDB   |      API    | Panneau d'affichage 1 | Panneau d'affichage 2 |
|--------------------------|------------------|------------------|-------------|-----------------------|-----------------------|
| Application Web          |                  | Lecture/Écriture | HTTPS (443) |                       |                       |
| Base de données MongoDB  | Lecture/Écriture |                  |             |                       |                       |
| API                      |     HTTPS (443)  |                  |             |                  WSS  |                  WSS  |
| Panneau d'affichage 1    |                  |                  |       WSS   |                       |                       |
| Panneau d'affichage 2    |                  |                  |       WSS   |                       |                       |
}
@enduml