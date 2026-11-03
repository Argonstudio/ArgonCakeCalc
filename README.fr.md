# ArgonCakeCalc

**Connaissez votre coût réel avant d’annoncer le prix d’un gâteau.**

> **Site web :** **ТУТ ССЫЛКА НА САЙТ**  
> **Paiement de la licence :** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**

[English](README.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [Norsk](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

ArgonCakeCalc est un programme qui aide les pâtissiers. Fonctions principales : créer des recettes, enregistrer des listes d’ingrédients, concevoir des produits, y compris des gâteaux à plusieurs étages (avec visualisation), et obtenir immédiatement le calcul du coût de revient et du bénéfice. Les recettes et les produits créés peuvent être téléchargés en PDF. Le programme fonctionne en local, sans installation et sans connexion internet.

Aucun compte, abonnement ni base de données cloud n’est nécessaire. Vos recettes et vos prix restent dans le navigateur de votre appareil.

## Démarrage rapide

Le programme tient dans un seul fichier. Il n’y a rien à installer.

1. Ouvrez le [dépôt ArgonCakeCalc sur GitHub](https://github.com/Argonstudio/ArgonCakeCalc) et allez au fichier [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. Sur la page du fichier, cliquez sur l’icône de téléchargement (**Download raw file**) et enregistrez le fichier dans un dossier où il restera en permanence.
3. Ouvrez le fichier enregistré dans un navigateur moderne, sur un ordinateur, une tablette ou un smartphone.

Le fichier contient déjà le programme, toutes les traductions, les styles et les polices pour le PDF ; après le téléchargement, il fonctionne donc sans internet.

Vous ne voulez rien télécharger ? Ouvrez le site : **ТУТ ССЫЛКА НА САЙТ**. Sur une adresse HTTPS stable, l’application peut aussi se préparer à fonctionner hors ligne après le premier chargement.

L’interface s’ouvre en anglais. Vous pouvez changer de langue directement dans le programme : russe, français, allemand, norvégien bokmål, espagnol, italien, chinois simplifié ou japonais.

> [!WARNING]
> **Les données sont stockées dans le navigateur, et non dans le fichier HTML.** Si vous déplacez ou renommez le fichier, changez de navigateur, effacez les données du navigateur ou travaillez en navigation privée, vous risquez de perdre l’accès à vos recettes et à vos prix. Gardez le fichier au même endroit, ouvrez-le toujours dans le même navigateur et exportez régulièrement une copie JSON. Détails dans la section [Vos données et sauvegardes](#vos-données-et-sauvegardes).

## Ce que fait le programme

- **Matières.** Tenez un catalogue d’ingrédients, de décorations, d’emballages et de consommables. Pour chaque article, indiquez le prix de l’emballage, la quantité par emballage, l’unité, la catégorie et, si besoin, la densité. Les grammes, kilogrammes, millilitres et litres sont pris en charge. La masse et le volume ne sont convertis l’un en l’autre que si la densité est connue, et les pièces ne sont jamais converties automatiquement en poids.
- **Recettes et composants.** Créez des recettes avec un rendement, des pertes de préparation, des instructions et des lignes de composition. Un composant peut être une matière ou une autre recette : une garniture peut contenir une crème, et la crème un sirop. Les recettes imbriquées sont décomposées jusqu’aux matières premières, et les composants identiques sont regroupés dans une liste d’achats claire. Quand le prix d’une matière change, toutes les recettes et tous les produits concernés sont recalculés automatiquement.
- **Créateur de produits.** Assemblez un produit à partir de biscuits, garnitures, crèmes, sirops, glaçages, décorations et emballages. Enregistrez les produits, dupliquez-les comme modèles et comparez plusieurs prix de vente sans modifier le calcul enregistré.
- **Coût de revient complet.** Ajoutez la main-d’œuvre, l’électricité, les frais de livraison, l’emballage, les autres frais et une réserve pour pertes, puis définissez une majoration ou une marge cible et, si nécessaire, un bénéfice minimal. Le coût de revient ne compte que la part réellement utilisée d’un emballage, tandis que la liste d’achats arrondit les emballages à l’unité supérieure.
- **Mise à l’échelle.** Recalculez une recette selon le rendement souhaité ou selon le diamètre et la hauteur d’un gâteau rond. Chaque ligne de composition peut varier proportionnellement, selon la surface, rester fixe ou être arrondie à un nombre entier de pièces. La géométrie du gâteau est une estimation indicative, et non un calcul de résistance ou de sécurité.
- **PDF, liste d’achats et sauvegarde.** Exportez un PDF avec les ingrédients, les matières premières, les instructions, le coût de revient, le prix conseillé et les dimensions. Téléchargez une liste d’achats pour la production ou pour la transmettre à la personne qui prépare la commande. Enregistrez une copie JSON complète pour transférer vos données d’un navigateur ou d’un appareil à l’autre.

## Premier calcul

Au premier lancement, vous pouvez commencer avec un espace de travail vide ou avec une démo fictive. La démo montre rapidement le déroulement du travail, mais ses prix sont fictifs et ne reflètent pas les prix réels du marché.

1. Ajoutez les prix d’achat réels.
2. Créez une recette et indiquez son rendement et ses pertes.
3. Assemblez un produit et définissez ses dimensions ou son nombre de portions.
4. Ajoutez la main-d’œuvre, l’électricité, l’emballage et les autres frais.
5. Comparez le prix de vente selon la majoration et selon la marge cible.
6. Exportez un PDF et une liste d’achats, puis enregistrez une copie JSON.

## Comment les prix sont calculés

- Rendement après pertes = rendement saisi × pourcentage restant après pertes.
- Prix par majoration = coût de revient complet × (1 + majoration % ÷ 100).
- Prix par marge cible = coût de revient complet ÷ (1 − marge % ÷ 100).
- Le prix de vente conseillé est arrondi à l’unité supérieure selon la précision de la devise choisie.
- Les calculs sont exacts : les résultats intermédiaires ne sont pas arrondis prématurément.
- Les recettes imbriquées sont décomposées en quantités de matières premières.
- Dans la liste d’achats, les emballages sont arrondis à l’unité supérieure ; dans le coût de revient, seule la fraction réellement consommée est comptée.
- Le choix de la devise ne modifie que le symbole et la précision. Il n’y a pas de conversion au taux de change.

Les formules et hypothèses sont décrites dans les [règles de calcul](docs/CALCULATIONS.md).

## Vos données et sauvegardes

Les matières, recettes, produits et réglages sont stockés dans IndexedDB du navigateur, séparément pour chaque adresse de site ou emplacement de fichier. La langue de l’interface est conservée dans un petit réglage local. Il n’y a ni compte, ni analyse d’usage, ni synchronisation cloud cachée, ni base de recettes sur un serveur, et rien n’est envoyé sans votre action.

Exportez régulièrement des copies JSON, et toujours avant de déplacer ou de renommer le fichier HTML. Effacer les données du navigateur, la navigation privée, un changement d’adresse du site, le déplacement du fichier ou la perte de l’appareil peuvent rendre la base locale inaccessible. Le stockage d’un fichier local (`file://`) peut se comporter différemment selon les navigateurs ; pour un usage quotidien, une adresse HTTPS stable est plus fiable. L’autorisation de stockage persistant du navigateur ne remplace pas une sauvegarde.

## Limites

Le PDF est créé sur votre appareil, sans boîte de dialogue d’impression et sans envoi vers un serveur. Les caractères latins, cyrilliques, chinois et japonais sont pris en charge ; les polices chinoises et japonaises augmentent la taille du fichier. Les emoji non pris en charge et les caractères rares peuvent apparaître sous la forme de `?` dans le PDF.

Le programme ne comprend ni gestion de stock, ni module fiscal, ni taux de change, ni commandes, ni comptes cloud, ni synchronisation entre appareils, ni calcul de sécurité structurelle d’un gâteau. Avant de l’utiliser en production ou pour fixer un prix client, vérifiez vous-même le résultat.

## Licence, essai et paiement

ArgonCakeCalc est distribué sous la **ArgonCakeCalc Commercial Source-Available License, version 1.0**. Le code source est ouvert à la consultation, mais sa visibilité publique n’autorise pas la redistribution, la sous-licence ni la publication de versions modifiées pour des tiers.

Avant le paiement, vous pouvez télécharger et utiliser gratuitement la version complète pendant **un (1) mois** afin d’évaluer ses fonctions et son adéquation à vos besoins. Le programme est disponible immédiatement ; aucune clé d’activation ni validation de compte n’est requise.

Après un paiement réussi, la licence non exclusive est réputée accordée immédiatement. Vous choisissez vous-même le montant, à partir de 1 $ ou de l’équivalent affiché par le prestataire de paiement, vous le voyez avant de confirmer et vous décidez volontairement. Tout montant choisi, y compris un montant supérieur à celui que vous aviez prévu par la suite, est considéré comme voulu et n’est pas remboursé au seul motif que vous avez changé d’avis ou renoncé à utiliser le programme.

Après l’octroi de la licence, un remboursement n’est examiné qu’en cas de double débit, d’erreur technique du système de paiement ou dans tout autre cas expressément prévu par la loi. Envoyez votre demande à `voit.ne@gmail.com` en indiquant la date du paiement, le montant, l’e-mail du payeur et l’identifiant de l’opération Robokassa.

Le logiciel est fourni **« tel quel » (AS IS)**. Le développeur ne garantit pas qu’il répondra à vos attentes particulières, à vos processus métier ou à votre usage, et, dans la limite maximale autorisée par la loi, n’est pas responsable des dommages causés à votre activité, chiffre d’affaires, bénéfice, données, réputation ou opérations. Il vous appartient de vérifier le programme et de décider s’il vous convient.

Consultez [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) et [les licences des composants tiers](THIRD_PARTY.md).

## Vendeur et assistance

- **Vendeur / titulaire des droits :** entrepreneur individuel sous régime de travailleur indépendant, Ivan Anatolievitch Voïtkov
- **INN russe :** 862203800782
- **Produit :** ArgonCakeCalc
- **Objet du paiement :** droit non exclusif d’utiliser le logiciel sous licence commerciale
- **Assistance et réclamations :** `voit.ne@gmail.com`
- **Paiement :** **ТУТ ССЫЛКА НА ОПЛАТУ ROBOKASSA**
- **Site :** **ТУТ ССЫЛКА НА САЙТ**

Le paiement est une redevance de licence et non un don. Le bloc complet destiné à Robokassa et aux autorités se trouve dans [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Auteur

**Ivan Voitkov** · [site de l’auteur](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [dépôt](https://github.com/Argonstudio/ArgonCakeCalc)

Le projet a été créé par ChatGPT (OpenAI) en collaboration avec Ivan Voitkov. Ivan Voitkov reste l’auteur officiellement désigné du projet.

---

Pour les développeurs et contributeurs : [DEVELOPMENT.md](DEVELOPMENT.md) (en anglais uniquement).
