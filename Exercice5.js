/**
 * Cyril Cuvelier - Simon Losson
 * CIR 2 ISEN
 * 13/10/2021
 * TP1
 */

// Fonction qui somme deux nombres
const somme = (previousValue, currentValue) => previousValue + currentValue;
// Fonction qui vient de google et qui donne un nombre aléatoire entre min et max
const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
// Focntion qui donne le nombre de personne à la soirée entre 200 et 300 (le nombre de base est 250 avec plus ou moins 50 personnes)
const getNumeberOfPerson = () => randomNum(200, 300);
// Fonction qui simule une soirée et qui retourne le nombre de personne qui ont bu le cooktail.
const party = (numberOfPerson) => {
    let nbOfDrink = 0;
    for (let i = 0; i < numberOfPerson; i++){ // On interroge virtuellement chaque personne
        let chance = randomNum(1, 100);
        nbOfDrink = chance <= 78 ? nbOfDrink + 1 : nbOfDrink; // Si le le nombre est entre 1 et 78, il boit.
    }
    return nbOfDrink;
};
// Fonction qui simule n soirée(s) avec toutes les fonctions créées précédament
const simulation = () => {
    let average = 0;
    let arrayNbOfDrink = [];
    let nbOfSimulation = randomNum(500, 10000);

    // On remplit un tableau avec les valeurs de chaque simulation
    for (let i = 0; i < nbOfSimulation; i++){
        arrayNbOfDrink.push(party(getNumeberOfPerson()));
    }

    // On somme tous les éléments du tableau et on divise par la taille du tableau
    average = arrayNbOfDrink.reduce(somme) / arrayNbOfDrink.length;

    return [average, nbOfSimulation];
}

console.log("Le nombre de cooktail bu durant les soirées est en moyenne de : ", simulation()[0].toFixed(0), " en faissant ", simulation()[1], "simulation(s)");