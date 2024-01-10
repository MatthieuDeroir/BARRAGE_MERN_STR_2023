@startuml

actor Utilisateur
participant "Système" as S
participant "Panneau 1" as P1
participant "Panneau 2" as P2

Utilisateur -> S: S'authentifie
activate S
S --> Utilisateur: Vérifie les identifiants
deactivate S

Utilisateur -> S: Configure l'affichage
activate S
S --> Utilisateur: Valide la configuration
deactivate S

Utilisateur -> S: Confirme la configuration
activate S
S --> P1: Envoie les informations
S --> P2: Envoie les informations
deactivate S

activate P1
P1 --> Utilisateur: Affiche les informations
deactivate P1

activate P2
P2 --> Utilisateur: Affiche les informations
deactivate P2

@enduml
