@startuml
title Diagramme d'Architecture du Système

left to right direction

cloud VPN

rectangle "Panneau 1"{
rectangle "TinkerBoard 1" {
[Application Electron.js 1]
}
[Router 4G 1]
}
[Application Electron.js 1] --> [Panneau 1] : <<Affiche>>
[Application Electron.js 1] --> [Router 4G 1]
[Router 4G 1] --> VPN : <<Communique via WSS>>

rectangle "Panneau 2"{
rectangle "TinkerBoard 2" {
[Application Electron.js 2]
}
[Router 4G 2]

}
[Application Electron.js 2] --> [Panneau 2] : <<Affiche>>
[Application Electron.js 2] --> [Router 4G 2]
[Router 4G 2] --> VPN : <<Communique via WSS>>


actor "User" as user
rectangle "Serveur" {
rectangle "Application Web (MERN)" {
[Frontend (React)]
[Backend (Node.js)]
}
[Base de données MongoDB]
[UFW Firewall]
[Nginx Reverse Proxy]
[Certificat SSL]
[Cron]
database "Base de données MongoDB" as db
}



[Backend (Node.js)] --> db : <<Ecrit/Lit données>>
[Backend (Node.js)] -down-> VPN : <<Communique via WSS>>

user --> [Frontend (React)] : <<Interagit avec l'application>>

@enduml
