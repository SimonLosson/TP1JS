let fact = "Vérité sur Chuck Norris : Hulk s'est battu contre Chuck Norris une fois. Depuis, il fait de la pub pour le maïs.";

// Fonction qui met une chaîne de caractères sous forme de lettres minuscules en supprimant les espaces, les accents et les caractères spéciaux.
/** Cette ligne imbuvable et pas optimisé sert à enlever tout les caratères qui ne sont pas des lettres.
 * On commence par tout mettre en minuscule,
 * puis on enlève les espaces
 * puis les caratères spéciaux
 * puis on sépare les espaces des lettres avec normalize
 * et on supprime les accents
 **/
cleanString = (array) => array.toLowerCase().replace(/\s+/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

let chainetraitee = cleanString(fact);

/**
 * Cyril Cuvelier - Simon Losson
 * CIR 2 ISEN
 * 13/10/2021
 * TP1
 */

// Fonction qui remplace Chuck Norris par nom
const remplace = nom => fact.replace(/Chuck Norris/g, nom);
// Fonction qui donne la moyenne de lettres dans chaque mot d'une pharse.
// Pour ça on divise la taille totale par le nombre d'espace.
const avarageWordInArray = array => (chainetraitee.length - 1) / (fact.split(' ').length - 1);
// Fonction qui récupère le nombre de lettres unique dans la phrase
const getAllLetters = array => {

    let retour = [];
    for (let i = 0; i < chainetraitee.length; i++){
        if (chainetraitee.indexOf(chainetraitee[i]) === i){ // On compare l'élément avec sa première occurence
            retour.push(chainetraitee[i]);
        }
    }
    return retour;
}

// Fonction qui trie par ordre alphabétique le tableau array
const sortAlphabetically = array => array.sort();

fact = remplace("Cyril Cuvelier");

console.log("La phrase modifiée, tous les Chuck Norris sont devenus des Cyril Cuvelier : \n", fact);
console.log("La moyenne de lettre dans la phrase est de : ", avarageWordInArray(fact).toFixed(2));
console.log("La liste des lettres uniques dans la phrase est : ", getAllLetters(fact));
console.log("La liste des lettres uniques dans la phrase triée par ordre alphabétique est : ", sortAlphabetically(getAllLetters(fact)));
