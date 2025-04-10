# Openclassrooms - **Projet 14** - HRNet

HRNet est une application de gestion des employés, construite avec **Next.js**, **TypeScript**, **Redux**, **React Hook Form**, **Yup** pour la validation des formulaires, et **Tailwind CSS** pour la mise en forme.

## Fonctionnalités

-   Gestion des employés avec un formulaire pour ajouter de nouveaux employés.
-   Validation de formulaire avec `Yup` et `React Hook Form`.
-   Utilisation de Redux pour gérer l'état global de l'application.
-   Affichage réactif des employés dans une grille de cartes et dans un tableau.
-   Ajout d'employés avec des données stockées localement dans `localStorage`.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

-   **Node.js** : [Télécharger et installer Node.js](https://nodejs.org/)
-   **npm** ou **yarn** : Le gestionnaire de paquets utilisé pour installer les dépendances.

## Installation

1. Clonez ce dépôt sur votre machine locale :

    ```bash
    git clone https://github.com/stephanievanoverberghe/ocr-p14-hrnet-nextjs.git
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ou
    yarn install
    ```

3. Lancez le serveur de développement :

    ```bash
    npm run dev
    ou
    yarn dev
    ```

4. Ouvrez votre navigateur à

    ```bash
    http://localhost:3000
    ```

## Structure du Projet

-   **`src/app`** : Contient les pages et les composants principaux de l'application.

    -   **`create`** : Page de création d'un employé.
    -   **`list`** : Page affichant la liste des employés.

-   **`src/components`** : Composants réutilisables comme les cartes des employés, le formulaire de sélection (Dropdown), et la fenêtre modale.
-   **`src/store`** : Contient les slices Redux pour gérer l'état des employés.

-   **`src/data`** : Contient les données statiques comme les états et départements.

-   **`src/types`** : Types TypeScript pour la gestion des données des employés.

## Fonctionnement

L'application permet d'ajouter des employés via un formulaire. Les informations des employés sont stockées dans `localStorage` et peuvent être consultées sur la page de liste. Un modal confirme l'ajout d'un employé avec succès.

### Exemple de données d'un employé :

-   Prénom et Nom
-   Date de naissance
-   Date d'embauche
-   Adresse (rue, ville, état, code postal)
-   Département

## Formulaire

Le formulaire utilise **React Hook Form** pour la gestion des formulaires et **Yup** pour la validation. Les champs sont validés avant l'enregistrement, et des messages d'erreur sont affichés si un champ n'est pas rempli correctement.

## Stockage local

Les employés sont stockés dans le **localStorage** de votre navigateur. Chaque nouvel employé ajouté est sauvegardé et persisté lors du rechargement de la page.

## Technologies utilisées

-   **Next.js** : Framework React pour la création de sites web et d'applications web.
-   **Redux Toolkit** : Pour la gestion d'état.
-   **React Hook Form** : Pour la gestion des formulaires.
-   **Yup** : Pour la validation des formulaires.
-   **Tailwind CSS** : Pour le design réactif et moderne.
-   **TypeScript** : Pour une meilleure expérience de développement avec le typage fort.

## Apprentissage

Si vous souhaitez en savoir plus sur les technologies utilisées dans ce projet, voici quelques ressources utiles :

-   [Next.js Documentation](https://nextjs.org/docs)
-   [React Hook Form Documentation](https://react-hook-form.com/)
-   [Yup Documentation](https://github.com/jquense/yup)
-   [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Déploiement

### Déployer sur Vercel

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la plateforme **Vercel**.

1. Créez un compte sur [Vercel](https://vercel.com/).
2. Connectez votre dépôt GitHub à Vercel.
3. Déployez l'application avec un clic.

Vercel s'occupera de tout le déploiement pour vous, et vous n'aurez plus qu'à suivre les instructions pour connecter votre projet à leur plateforme.

## Contributions

Les contributions sont les bienvenues ! Si vous avez des idées d'amélioration ou des corrections à proposer, ouvrez une **issue** ou créez une **pull request**.

---

Merci d'utiliser **HRNet** ! 🎉
