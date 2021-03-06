// Importation d'express pour créer des applis web avec Node
const express = require('express');
// pour intéragir avec la base de données mongoDB
const mongoose = require("mongoose");
// pour protéger les informations de connexion vers la base de données
require("dotenv").config();
// pour pouvoir travailler avec les chemins des fichiers
const path = require("path");
// pour sécuriser les en-tête http de l'application express
const helmet = require("helmet");
// pour nettoyer les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
const sanitize = require("express-mongo-sanitize");

// pour les routes vers l'utilisateur et les sauces
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");


//Je me connecte à la base de données
mongoose.connect(process.env.DB_CODE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// je fais appel au module Express 
// le mot-clé app fait souvent référence au module express
// on peut utiliser un autre nom, mais c'est la convention
const app = express();

// Avant la route d'API, on ajoute la fonction (middleware) des headers permettant
// aux deux ports front et back de communiquer entre eux
// CORS (Communication front et back)permettre l'accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // "*" permet d'accéder a l'API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // permet d'envoyer des requêtes avec ces méthodes
  next(); // passe l'exécution au middleware suivant
});



// Pour gérer la requête Post venant de l'appli front, on a besoin d'en extraire le corps JSON
// middleware mis a dispo par Express :
app.use(express.json());

// protection de l'appli de certaines vulnerabilités en protégeant les en-têtes
app.use(helmet());

// Nettoyage des données user pour éviter des injections dans la base de données
app.use(sanitize());


// configuration des routes d'API attendue par le front-end

// indique à Express qu'il faut gérer la ressource images de manière statique 
 app.use("/images", express.static(path.join(__dirname, "images")));

 app.use("/api/auth", userRoutes);
 app.use("/api/sauces", sauceRoutes);


// Exportation appli express pour y avoir accès depuis les autres fichiers
module.exports = app;








