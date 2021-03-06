// import express
const express = require("express");
// permet de créer des routeurs individuels
const router = express.Router();

// import des dépendances nécessaires
const userCtrl = require("../controllers/user");
const validPassword = require('../middleware/password');

// les routes pour créer un compte et se connecter au compte
// routes POST car le front-end envoi l'adresse mail et mdp
// Les routes fournies sont celles prévues par l'application front-end.
router.post("/signup", validPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

//on exporte pour pouvoir importer dans app.js
module.exports = router;