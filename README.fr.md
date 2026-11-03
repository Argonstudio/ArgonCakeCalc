# ArgonCakeCalc

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk bokmål](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

**Connaissez votre coût réel avant d’annoncer un prix au client.**

> **Démo en ligne :** [https://argonstudio.github.io/ArgonCakeCalc/](https://argonstudio.github.io/ArgonCakeCalc/)  
> **Paiement de la licence :** **LIEN DE PAIEMENT ROBOKASSA À AJOUTER**

ArgonCakeCalc est un outil de calcul des coûts destiné aux pâtissiers et aux professionnels de la confection de gâteaux. Créez des recettes, gérez des listes d’ingrédients et de fournitures, composez des produits finis — y compris des gâteaux à plusieurs étages avec visualisation — et calculez immédiatement les coûts et les bénéfices. Les recettes et les produits créés peuvent être exportés au format PDF.

Vous fixez vous-même le prix de la licence. Le prix minimum d’une licence perpétuelle est de **1 USD (environ 0,89 EUR)**. Vous pouvez télécharger et tester l’application complète avant tout paiement. Consultez la section [Licence, essai et paiement](#licence-essai-et-paiement).

**Équivalents indicatifs de 1 USD :** environ 0,89 EUR. Il s’agit d’une conversion approximative fondée sur les taux de référence consultés le 3 novembre 2026. Le prestataire de paiement peut appliquer un taux, un arrondi ou des frais différents : vérifiez toujours le montant affiché avant de confirmer le paiement.

Aucune inscription, aucun abonnement ni aucune base de données dans le cloud ne sont nécessaires. Vos recettes et vos prix restent dans le navigateur, sur votre appareil. L’application fonctionne localement, sans installation ni connexion Internet.

## Démarrage rapide

L’application est fournie sous la forme d’un seul fichier HTML. Aucune installation n’est nécessaire.

1. Ouvrez le [dépôt GitHub d’ArgonCakeCalc](https://github.com/Argonstudio/ArgonCakeCalc) et accédez au fichier [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Sur la page du fichier, cliquez sur l’icône de téléchargement (**Download raw file**) et enregistrez le fichier dans un dossier où vous le conserverez.
3. Ouvrez le fichier enregistré dans un navigateur récent sur votre ordinateur, tablette ou smartphone.

Le fichier contient l’application, toutes les traductions de l’interface, les styles et les polices utilisées pour les PDF. Après le téléchargement, il peut fonctionner sans connexion Internet.

Vous préférez ne rien télécharger ? Ouvrez le site : [site ArgonCakeCalc](https://argonstudio.github.io/ArgonCakeCalc/shop/). Avec une adresse HTTPS stable, l’application peut également se préparer à fonctionner hors ligne après le premier chargement.

L’interface s’ouvre en anglais. Vous pouvez choisir directement dans l’application le russe, le français, l’allemand, le norvégien bokmål, l’espagnol, l’italien, le chinois simplifié ou le japonais.

Pour les développeurs : l’application peut être modifiée et reconstruite. Consultez [DEVELOPMENT.md](DEVELOPMENT.md) (en anglais uniquement). Un assistant de programmation IA peut vous aider à explorer le code et à effectuer des modifications.

> [!WARNING]
> **Vos données sont stockées dans le navigateur, et non dans le fichier HTML.** Si vous déplacez ou renommez le fichier, changez de navigateur, effacez les données du navigateur ou utilisez la navigation privée, vous risquez de perdre l’accès à vos recettes et à vos prix. Conservez le fichier au même endroit, ouvrez-le toujours dans le même navigateur et exportez régulièrement une sauvegarde JSON. Consultez la section [Vos données et vos sauvegardes](#vos-données-et-vos-sauvegardes).

## Fonctions de l’application

- **Matières et fournitures.** Gérez un catalogue d’ingrédients, de décorations, d’emballages et de consommables. Pour chaque article, indiquez le prix du conditionnement, la quantité par conditionnement, l’unité, la catégorie et, si nécessaire, la densité. Les grammes, kilogrammes, millilitres et litres sont pris en charge. La conversion entre masse et volume n’est effectuée que si la densité est connue ; les pièces ne sont jamais converties automatiquement en poids.
- **Recettes et composants.** Créez des recettes avec un rendement, des pertes à la préparation, des instructions et des lignes de composition. Un composant peut être une matière première ou une autre recette : une garniture peut contenir une crème, et une crème peut contenir un sirop. Les recettes imbriquées sont décomposées jusqu’aux matières premières ; les composants identiques sont regroupés dans une liste d’achats claire. Lorsque le prix d’une matière change, toutes les recettes et tous les produits qui en dépendent sont recalculés automatiquement.
- **Constructeur de produits.** Assemblez un produit à partir de biscuits, garnitures, crèmes, sirops d’imbibage, glaçages, décorations et emballages. Enregistrez les produits, dupliquez-les comme modèles et comparez plusieurs prix de vente sans modifier le calcul enregistré.
- **Coût complet.** Ajoutez la main-d’œuvre, l’électricité, les frais de livraison, l’emballage, les autres dépenses et une réserve pour les pertes. Définissez ensuite une majoration ou une marge bénéficiaire cible et, si nécessaire, un bénéfice minimum. Seule la partie du conditionnement réellement utilisée entre dans le coût ; les quantités de conditionnements de la liste d’achats sont arrondies à l’unité supérieure.
- **Mise à l’échelle.** Recalculez une recette selon le rendement souhaité ou selon le diamètre et la hauteur d’un gâteau rond. Chaque ligne de composition peut être ajustée proportionnellement, selon la surface, rester fixe ou être arrondie à un nombre entier de pièces. La géométrie du gâteau fournit une estimation auxiliaire ; elle ne constitue pas un calcul technique de résistance ou de sécurité alimentaire.
- **PDF, liste d’achats et sauvegarde.** Exportez un PDF contenant les ingrédients, les matières premières, les instructions, le coût, le prix conseillé et les dimensions. Téléchargez une liste d’achats pour la production ou pour la transmettre à la personne qui prépare la commande. Enregistrez une sauvegarde JSON complète pour transférer vos données entre navigateurs ou appareils.

## Votre premier calcul

Au premier lancement, vous pouvez commencer avec un espace de travail vide ou charger une démonstration fictive. La démo permet de comprendre rapidement le fonctionnement, mais ses prix sont des exemples et ne reflètent pas les prix réels du marché.

1. Ajoutez les prix d’achat que vous payez réellement.
2. Créez une recette et indiquez son rendement et ses pertes.
3. Composez un produit et définissez ses dimensions ou le nombre de portions.
4. Ajoutez la main-d’œuvre, l’électricité, l’emballage et les autres dépenses.
5. Comparez le prix de vente calculé selon la majoration et selon la marge cible.
6. Exportez un PDF et une liste d’achats, puis enregistrez une sauvegarde JSON.

## Calcul des prix

- Rendement après pertes = rendement saisi × pourcentage restant après les pertes.
- Prix avec majoration = coût complet × (1 + taux de majoration % ÷ 100).
- Prix selon la marge cible = coût complet ÷ (1 − marge % ÷ 100).
- Le prix conseillé est arrondi à la hausse selon la précision de la devise sélectionnée.
- Les calculs sont précis : les résultats intermédiaires ne sont pas arrondis à l’avance.
- Les recettes imbriquées sont décomposées en quantités de matières premières.
- Dans la liste d’achats, les conditionnements sont arrondis à l’unité supérieure ; dans le coût, seule la fraction réellement utilisée est comptabilisée.
- Le choix d’une devise ne modifie que son symbole et sa précision. Aucune conversion au taux de change n’est effectuée.

Les formules et les hypothèses sont décrites dans les [règles de calcul](docs/CALCULATIONS.md).

## Vos données et vos sauvegardes

Les matières, recettes, produits et paramètres sont stockés dans IndexedDB du navigateur, séparément pour chaque adresse de site ou emplacement de fichier. La langue de l’interface est enregistrée dans un petit paramètre local. Il n’y a ni compte, ni analytique, ni synchronisation cachée dans le cloud, ni base de recettes sur un serveur. Aucune donnée n’est envoyée sans action de votre part.

Exportez régulièrement des sauvegardes JSON, et faites-le impérativement avant de déplacer ou de renommer le fichier HTML. L’effacement des données du navigateur, la navigation privée, le changement d’adresse du site, le déplacement du fichier ou la perte de l’appareil peuvent rendre la base locale inaccessible. Le stockage d’un fichier local (`file://`) peut se comporter différemment selon les navigateurs ; pour une utilisation régulière, une adresse HTTPS stable est plus fiable. L’autorisation de stockage persistant du navigateur ne remplace pas une sauvegarde.

## Limitations

Les PDF sont générés sur votre appareil, sans fenêtre d’impression et sans envoi à un serveur. Le latin, le cyrillique, le chinois et le japonais sont pris en charge. Les polices chinoises et japonaises augmentent la taille du fichier de l’application. Les emoji non pris en charge et les caractères rares peuvent apparaître sous la forme `?` dans les PDF.

L’application ne comprend pas de gestion des stocks, de module fiscal, de conversion des devises, de gestion des commandes, de comptes cloud, de synchronisation entre appareils ni de calcul technique de la sécurité structurelle d’un gâteau. Vérifiez vous-même les résultats avant de les utiliser en production ou de communiquer un prix à un client.

## Licence, essai et paiement

ArgonCakeCalc est distribué sous la **ArgonCakeCalc Commercial Source-Available License, version 1.0**. Le code source est accessible au public pour consultation, mais sa visibilité publique n’autorise pas la redistribution, le transfert ni la publication de versions modifiées destinées à des tiers. Vous pouvez modifier l’application pour votre usage personnel.

Avant de payer, vous pouvez télécharger et utiliser gratuitement l’application complète pendant **un (1) mois** afin d’évaluer ses fonctions et son adéquation à vos besoins. L’application est disponible immédiatement ; aucune clé d’activation ni validation de compte n’est nécessaire.

Après le paiement réussi, la licence non exclusive est réputée accordée immédiatement. Vous choisissez librement le montant de la licence, à partir de **1 USD (environ 0,89 EUR)** ou de son équivalent affiché par le prestataire de paiement. Le montant est visible avant confirmation et vous prenez votre décision volontairement. Tout montant choisi, même supérieur à ce que vous aviez prévu, est considéré comme intentionnel et n’est pas remboursé simplement parce que vous changez d’avis ou cessez d’utiliser l’application.

L’équivalent de 0,89 EUR est indicatif et fondé sur les taux de référence consultés le 3 novembre 2026. Le montant affiché par le prestataire au moment du paiement prévaut.

Après l’octroi de la licence, un remboursement n’est envisagé qu’en cas de débit en double, d’erreur technique du système de paiement ou dans tout autre cas expressément prévu par la loi applicable. Envoyez votre demande à `voit.ne@gmail.com` en indiquant la date du paiement, le montant, l’adresse e-mail du payeur et l’identifiant de transaction Robokassa.

L’application est fournie **« EN L’ÉTAT » (AS IS)**. Le développeur ne garantit pas qu’elle répondra à des attentes particulières, à des processus métier ou à l’usage envisagé par l’utilisateur et, dans toute la mesure autorisée par la loi, n’est pas responsable des dommages causés à une activité, au chiffre d’affaires, aux bénéfices, aux données, à la réputation ou aux opérations. Il appartient à l’utilisateur de vérifier l’application et de décider si elle convient à ses besoins.

Consultez [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) et les [licences des composants tiers](THIRD_PARTY.md).

## Vendeur et assistance

- **Vendeur / titulaire des droits :** entrepreneur individuel sous le régime du travail indépendant, Ivan Anatolyevich Voitkov
- **Numéro d’identification fiscale (INN) :** 862203800782
- **Produit logiciel :** ArgonCakeCalc
- **Objet du paiement :** octroi d’un droit non exclusif d’utilisation du logiciel sous licence commerciale
- **Assistance et demandes :** `voit.ne@gmail.com`
- **Page de paiement :** **LIEN DE PAIEMENT ROBOKASSA À AJOUTER**
- **Site du service :** https://argonstudio.github.io/ArgonCakeCalc/shop/

Le paiement constitue une redevance de licence et non un don. Le bloc d’informations complet destiné à Robokassa et aux autorités de contrôle se trouve dans [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Auteur

**Ivan Voitkov** · [site de l’auteur](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [dépôt du projet](https://github.com/Argonstudio/ArgonCakeCalc)

ChatGPT (OpenAI) est coauteur. Je remercie les développeurs de cet outil remarquable.
