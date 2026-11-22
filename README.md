# PitchCraft

PitchCraft aide à transformer une idée de projet en pitch et en présentation PowerPoint téléchargeable.

## Fonctionnalités actuelles

- Formulaire React en français, adapté aux écrans mobiles et ordinateurs.
- Génération d'un pitch par l'API OpenAI.
- Création d'un fichier PowerPoint à partir du sujet et du pitch.
- Validation de la description du projet côté interface et côté serveur.
- URL de l'API configurable pour le déploiement.

## Technologies

- Frontend : React.
- Backend : Node.js, Express.
- IA : API OpenAI (modèle configuré dans `backend/services/aiService.js`).
- Présentation : PptxGenJS.

## Prérequis

- Node.js et npm.
- Une clé API OpenAI valide pour utiliser la génération IA.

## Installation locale

### 1. Configurer le backend

Depuis la racine du dépôt :

```bash
cd backend
npm install
```

Copiez `.env.example` vers un fichier `.env`, puis renseignez votre clé API :

```env
OPENAI_API_KEY=votre_cle_api
PORT=5000
```

Démarrez l'API :

```bash
npm start
```

L'API écoute par défaut sur `http://localhost:5000`. Le point de contrôle est disponible sur `/api/health`.

### 2. Démarrer le frontend

Dans un autre terminal, depuis la racine du dépôt :

```bash
cd frontend
npm install
npm start
```

Par défaut, le frontend appelle `http://localhost:5000`. Pour utiliser une autre adresse d'API, créez `frontend/.env` et ajoutez :

```env
REACT_APP_API_URL=https://votre-api.example.com
```

Redémarrez le serveur React après toute modification d'une variable `REACT_APP_*`.

## Tests

Depuis le dossier `backend` :

```bash
npm test
```

Depuis le dossier `frontend` :

```bash
npm test
```

## Sécurité

- Ne publiez jamais votre fichier `.env` ou votre clé API.
- Le fichier `.env.example` ne contient qu'une valeur fictive.
- Les fichiers PowerPoint générés sont enregistrés dans `backend/files/`.

## État du projet

Le projet est en cours d'amélioration. Les tests automatisés doivent être exécutés localement et le déploiement doit être configuré avant une mise en production.
