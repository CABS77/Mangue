# Document d'Exigences — Site Web Import de Mangues du Sénégal

## Introduction

Ce document définit les exigences pour la création d'un site web professionnel dédié à l'activité d'importation de mangues en provenance du Sénégal. Le site servira de vitrine commerciale pour l'entreprise de Cheikh Ahmadou Bamba Sall (SIREN : 947 529 046), basée à Chevilly-Larue (94550), France. Le site cible à la fois les professionnels (B2B : grossistes, restaurateurs, distributeurs) et les particuliers (B2C) souhaitant découvrir et commander des mangues sénégalaises de qualité.

## Glossaire

- **Site_Web** : L'application web complète déployée et accessible publiquement via un navigateur
- **Page_Accueil** : La page d'atterrissage principale du site, premier point de contact avec le visiteur
- **Page_Produits** : La section du site présentant les variétés de mangues disponibles
- **Page_A_Propos** : La section décrivant l'entreprise, sa mission et son histoire
- **Page_Contact** : La section contenant le formulaire de contact et les coordonnées de l'entreprise
- **Page_Mentions_Legales** : La page contenant les informations légales obligatoires selon la loi française
- **Formulaire_Contact** : Le composant interactif permettant aux visiteurs d'envoyer un message à l'entreprise
- **Barre_Navigation** : Le composant de navigation principal permettant d'accéder aux différentes sections du site
- **Pied_De_Page** : La section inférieure commune à toutes les pages contenant les informations de contact et liens utiles
- **Visiteur** : Toute personne accédant au site web, qu'elle soit un professionnel ou un particulier
- **Bandeau_Cookies** : Le composant informant les visiteurs de l'utilisation des cookies conformément au RGPD
- **Section_Hero** : La zone visuelle principale en haut de la page d'accueil avec un message d'accroche et un appel à l'action
- **Carte_Produit** : Le composant visuel présentant une variété de mangue avec sa photo, son nom et sa description

## Exigences

### Exigence 1 : Navigation et structure générale du site

**User Story :** En tant que Visiteur, je veux naviguer facilement entre les différentes sections du site, afin de trouver rapidement les informations que je recherche.

#### Critères d'acceptation

1. THE Site_Web SHALL afficher une Barre_Navigation visible en haut de chaque page contenant les liens vers la Page_Accueil, la Page_Produits, la Page_A_Propos et la Page_Contact
2. THE Barre_Navigation SHALL afficher le logo et le nom de l'entreprise à gauche de la barre
3. WHEN un Visiteur clique sur un lien de la Barre_Navigation, THE Site_Web SHALL naviguer vers la section correspondante
4. THE Site_Web SHALL afficher un Pied_De_Page sur chaque page contenant l'adresse de l'entreprise, le numéro SIREN, un lien vers la Page_Mentions_Legales et un lien vers la Page_Contact
5. WHEN le Site_Web est affiché sur un écran de largeur inférieure à 768 pixels, THE Barre_Navigation SHALL se transformer en un menu hamburger accessible par un bouton
6. THE Site_Web SHALL être accessible conformément aux critères WCAG 2.1 niveau AA pour les contrastes de couleurs et la navigation au clavier

### Exigence 2 : Page d'accueil

**User Story :** En tant que Visiteur, je veux découvrir l'activité d'importation de mangues dès mon arrivée sur le site, afin de comprendre immédiatement l'offre proposée.

#### Critères d'acceptation

1. THE Page_Accueil SHALL afficher une Section_Hero avec une image de mangues sénégalaises, un titre d'accroche et un bouton d'appel à l'action redirigeant vers la Page_Produits
2. THE Page_Accueil SHALL afficher une section présentant trois arguments de vente principaux : l'origine sénégalaise, la qualité des fruits et le circuit d'importation direct
3. THE Page_Accueil SHALL afficher un aperçu des variétés de mangues phares avec un lien vers la Page_Produits pour en voir davantage
4. THE Page_Accueil SHALL afficher une section de témoignages ou de chiffres clés renforçant la crédibilité de l'entreprise
5. THE Page_Accueil SHALL afficher un appel à l'action en bas de page invitant le Visiteur à prendre contact via la Page_Contact

### Exigence 3 : Présentation des produits

**User Story :** En tant que Visiteur, je veux consulter les variétés de mangues disponibles avec leurs caractéristiques, afin de choisir les produits qui correspondent à mes besoins.

#### Critères d'acceptation

1. THE Page_Produits SHALL afficher une liste de Carte_Produit présentant chaque variété de mangue disponible
2. THE Carte_Produit SHALL afficher pour chaque variété : une photo, le nom de la variété, une description du goût et de la texture, la période de disponibilité (saison) et le calibre
3. THE Page_Produits SHALL afficher une introduction expliquant l'origine des mangues et le processus de sélection au Sénégal
4. WHEN un Visiteur consulte la Page_Produits sur un écran de largeur inférieure à 768 pixels, THE Page_Produits SHALL afficher les Carte_Produit en une seule colonne
5. WHEN un Visiteur consulte la Page_Produits sur un écran de largeur supérieure ou égale à 768 pixels, THE Page_Produits SHALL afficher les Carte_Produit en grille de deux ou trois colonnes

### Exigence 4 : Page À Propos

**User Story :** En tant que Visiteur, je veux connaître l'histoire de l'entreprise et sa démarche d'importation, afin de m'assurer du sérieux et de la fiabilité du fournisseur.

#### Critères d'acceptation

1. THE Page_A_Propos SHALL afficher la présentation de l'entreprise incluant le nom du fondateur, la date de création et la localisation à Chevilly-Larue
2. THE Page_A_Propos SHALL afficher la mission de l'entreprise : importer des mangues de qualité directement depuis le Sénégal
3. THE Page_A_Propos SHALL afficher une section décrivant le processus d'importation : sélection sur place, transport et livraison en France
4. THE Page_A_Propos SHALL afficher les valeurs de l'entreprise : qualité, traçabilité, commerce équitable et lien avec le Sénégal
5. THE Page_A_Propos SHALL afficher une photo ou illustration du fondateur ou de l'équipe

### Exigence 5 : Formulaire de contact

**User Story :** En tant que Visiteur, je veux pouvoir contacter l'entreprise facilement, afin de poser des questions ou passer une commande.

#### Critères d'acceptation

1. THE Page_Contact SHALL afficher un Formulaire_Contact contenant les champs : nom complet, adresse e-mail, numéro de téléphone (optionnel), type de demande (particulier ou professionnel) et message
2. WHEN un Visiteur soumet le Formulaire_Contact avec tous les champs obligatoires remplis, THE Formulaire_Contact SHALL envoyer les données et afficher un message de confirmation
3. WHEN un Visiteur soumet le Formulaire_Contact avec un champ obligatoire manquant, THE Formulaire_Contact SHALL afficher un message d'erreur indiquant le champ manquant sans effacer les données déjà saisies
4. WHEN un Visiteur saisit une adresse e-mail au format invalide, THE Formulaire_Contact SHALL afficher un message d'erreur spécifique sous le champ e-mail
5. THE Page_Contact SHALL afficher les coordonnées de l'entreprise à côté du formulaire : adresse postale (14 voie des meuniers, 94550 Chevilly-Larue), adresse e-mail de contact et numéro de téléphone
6. THE Page_Contact SHALL afficher une carte de localisation indiquant l'adresse de l'entreprise

### Exigence 6 : Mentions légales

**User Story :** En tant que Visiteur, je veux accéder aux mentions légales du site, afin de connaître les informations juridiques de l'entreprise conformément à la loi française.

#### Critères d'acceptation

1. THE Page_Mentions_Legales SHALL afficher les informations d'identification de l'entreprise : nom du responsable (Cheikh Ahmadou Bamba Sall), adresse du siège social (14 voie des meuniers, 94550 Chevilly-Larue), numéro SIREN (947 529 046) et date d'immatriculation
2. THE Page_Mentions_Legales SHALL afficher les informations de l'hébergeur du site : nom, adresse et coordonnées
3. THE Page_Mentions_Legales SHALL afficher la politique de protection des données personnelles conformément au RGPD, incluant les types de données collectées, la finalité du traitement et les droits des utilisateurs
4. THE Page_Mentions_Legales SHALL afficher les conditions d'utilisation du site
5. THE Page_Mentions_Legales SHALL être accessible depuis le Pied_De_Page de chaque page du site

### Exigence 7 : Conformité RGPD et cookies

**User Story :** En tant que Visiteur, je veux être informé de l'utilisation de mes données personnelles et des cookies, afin de pouvoir exercer mes droits conformément au RGPD.

#### Critères d'acceptation

1. WHEN un Visiteur accède au Site_Web pour la première fois, THE Site_Web SHALL afficher un Bandeau_Cookies informant de l'utilisation des cookies avec les options « Accepter » et « Refuser »
2. WHEN un Visiteur clique sur « Accepter » dans le Bandeau_Cookies, THE Site_Web SHALL enregistrer le consentement et masquer le bandeau
3. WHEN un Visiteur clique sur « Refuser » dans le Bandeau_Cookies, THE Site_Web SHALL ne charger aucun cookie non essentiel et masquer le bandeau
4. WHILE un Visiteur n'a pas interagi avec le Bandeau_Cookies, THE Site_Web SHALL ne charger aucun cookie non essentiel
5. THE Site_Web SHALL conserver le choix du Visiteur concernant les cookies pendant une durée de 13 mois conformément aux recommandations de la CNIL

### Exigence 8 : Performance et référencement (SEO)

**User Story :** En tant que propriétaire du site, je veux que le site soit rapide et bien référencé sur les moteurs de recherche, afin d'attirer des clients potentiels recherchant des mangues du Sénégal.

#### Critères d'acceptation

1. THE Site_Web SHALL obtenir un score Lighthouse Performance supérieur ou égal à 90 sur mobile et desktop
2. THE Site_Web SHALL inclure des balises meta (title, description) uniques et pertinentes sur chaque page
3. THE Site_Web SHALL utiliser des balises HTML sémantiques (header, main, nav, section, article, footer) pour structurer le contenu
4. THE Site_Web SHALL générer un fichier sitemap.xml listant toutes les pages du site
5. THE Site_Web SHALL optimiser les images en utilisant des formats modernes (WebP) avec des attributs alt descriptifs en français
6. WHEN un moteur de recherche indexe le Site_Web, THE Site_Web SHALL fournir des données structurées (Schema.org) de type LocalBusiness avec les informations de l'entreprise

### Exigence 9 : Design responsive et identité visuelle

**User Story :** En tant que Visiteur, je veux que le site soit visuellement attrayant et utilisable sur tous mes appareils, afin d'avoir une expérience agréable quel que soit mon support de navigation.

#### Critères d'acceptation

1. THE Site_Web SHALL s'adapter aux écrans de largeur 320 pixels à 2560 pixels sans perte de contenu ni défilement horizontal
2. THE Site_Web SHALL utiliser une palette de couleurs évoquant le Sénégal et les mangues : tons de vert, jaune-orangé et doré
3. THE Site_Web SHALL utiliser une typographie lisible avec une taille de police minimale de 16 pixels pour le corps de texte
4. THE Site_Web SHALL afficher des images de haute qualité optimisées pour le web représentant les mangues et le Sénégal
5. WHEN un Visiteur survole un élément interactif (bouton, lien, carte), THE Site_Web SHALL afficher un retour visuel (changement de couleur ou animation subtile) dans un délai inférieur à 100 millisecondes
