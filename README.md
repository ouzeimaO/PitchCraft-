# 🎤 PitchCraft

PitchCraft est une application **full-stack** qui génère automatiquement :
- Un **pitch concis et convaincant** grâce à GPT‑5
- Une **présentation PowerPoint (.pptx)** téléchargeable

## 🚀 Fonctionnalités
- Formulaire React pour entrer un sujet
- API Node.js/Express qui génère le pitch et la présentation
- Téléchargement direct du fichier PowerPoint (encours de developpement)
- Architecture claire : `frontend/` (React) et `backend/` (Express)

## 📂 Structure du projet
PITCHCRAFT/
│── backend/              # API Node.js/Express
│   ├── index.js
│   ├── routes/
│   ├── services/
│   └── files/            # Présentations générées (.pptx)
│
│── frontend/             # Application React
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   └── api.js
│
└── README.md

## ⚙️ Installation

### Backend
```bash
cd backend
npm install
npm start

###frontend

cd frontend
npm install
npm start
