[POST] /users : Création d'un nouvel utilisateur
[POST] /auth : Identification afin de récupérer un token JWT
[PUT] /users/x : Modification d'un utilisateur | Vérification du token
[GET] /users/x : Récupération d'un utilisateur
[GET] /users : Récupération de l'ensemble des utilisateurs

Univers
[GET] /universes : récupération de l'ensemble des univers
[POST] /universes : création d'un univers
[GET] /universes/x : Récupération d'un univers
[PUT] /universes/x  : Modification d'un univers
[DELETE] /universes/x : Suppression d'un univers et de tous les personnages associés

Personnages
[GET] /universes/x/characters : Récupération de l'ensemble des personnages d'un univers
[POST] /Universes/x/characters : Création d'un personnage dans un univers
[PUT] /universes/x/characters : Modification d'un personnage dans un univers
[DELETE] /universes/x/characters: Suppression d'un personnage dans univers

Conversations
[GET] /conversations : Récupération des conversations en cours qui renvoie aussi l'ID du personnage et de l'univers | Vérifier qu'on est proprio
[POST] /conversations : Création d'une nouvelle conversation avec un personnage
[GET] /conversations/x : Récupération d'un conversation avec le personnage et l'univers complet | vérifier qu'on est proprio
[DELETE] /conversation/x : Suppression d'une conversation avec un personnage

Messages
[GET] /conversations/x/messages : Récupération de l'historique des messages d'une conversation
[POST] /conversations/x/messages : Envoi d'un nouveau message dans la conversation | Renvoie le message de réponse
[PUT] /conversations/x : Regenere le dernier message d'une conversation