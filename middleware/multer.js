// Multer est un package qui nous permet de gérer 
// les fichiers entrants dans les requêtes HTTP.
// ici, ce sera les images téléchargées par les users
const multer = require("multer");

// je traduis les types de fichier pour générer les extensions possibles
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};


// la config de multer nécessite deux arguments : destination + filename prenant 3 params chacun
// la méthode diskStorage() configure le chemin et le nom de fichier pour les fichiers entrants.
const storage = multer.diskStorage({
  // la destination
  destination: (req, file, callback) => {
    //Le callback renvoie vers la destination d'enregistrement qui est le dossier images
    // null pour dire qu'il n'y a pas d'erreur
    callback(null, "images");
  },
  // quel nom de fichier considérer ?
  filename: (req, file, callback) => {
    // on crée le nom du fichier : prend le nom d'origine, le split 
    // et remplace les espaces par des undescores
    const name = file.originalname.split(" ").join("_"); 
    // on génère l'extension du fichier
    const extension = MIME_TYPES[file.mimetype];
    // renvoie en callback le nom du fichier final
    callback(null, name + Date.now() + "." + extension);
  },
});

// j'exporte multer en appelant la constante storage
// .single signifie que c'est un fichier unique et non un groupe
// "image" pour dire à multer qu'il s'agit d'un fichier image uniquement
module.exports = multer({storage: storage}).single('image');
