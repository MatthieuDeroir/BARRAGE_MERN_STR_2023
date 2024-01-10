@startuml
|User|
start
:Se connecte à l'application web;
if (Connexion réussie) then (oui)
:Configure la playlist d'envoi;
if (Données valides) then (oui)
:Envoie la playlist au backend;
else (non)
:Reçoit un message d'erreur de validation;
stop
endif
|Backend API + Websocket|
:Reçoit la playlist;
if (Erreur de réception) then (oui)
:Envoie un message d'erreur à l'utilisateur;
stop
else (non)
:Enregistre les informations dans la base de données MongoDB;
:Envoie une notification via le websocket;
endif
|Panneaux|
:Reçoivent la notification;
if (Erreur de réception) then (oui)
:Envoie un message d'erreur à l'API backend;
stop
else (non)
:Mettent à jour les données d'instruction;
:Affichent les informations sur les panneaux;
endif
else (non)
|User|
:Reçoit un message d'erreur de connexion;
endif
stop
@enduml
