/**
 * Cyril Cuvelier - Simon Losson
 * CIR 2 ISEN
 * 13/10/2021
 * TP1
 */

let myArray = [157, 10, 81, 1000, 4, 1024, 16, 492, 9, 287, 0]; // Angle donnés en degrés

// On filtre les éléments du tableau pour ne garder que ceux qui sont impairs
let impaire = myArray.filter(number => number % 2 === 1);

// On remplace les angles en degrés en leur sinus. On les converti en radian avant calcul
let sinus = myArray.map(number => Math.sin(number * (Math.PI / 180)));

/**
 * Fonction qui compart le logarithme en base 10 d'un nombre avec sa position dans un tableau. Si les deux sont égales,
 * le nombre total est incrémenté. La fonction retourne total, càd le nombre d'éléments du tableau qui réspecte cette condition
 * @param array Le tableau a traité
 * @returns {number} Le nombre d'éléments qui respect la condition testé
 */
function logInArray(array){
    let total = 0;

    for (let i = 0; i < array.length; i++){
        if (Math.log10(array[i]) === i){
            total++;
        }
    }

    return total;
}


console.log("Le tableau des nombres impaire : ", impaire);
console.log("Le tabeau des sinus : ", sinus);
console.log("Le nombre d'éléments qui respectent la condition imposée : ", logInArray(myArray));
console.log("Le nombre d'éléments qui respectent la condition imposée : ", logInArray(myArray));