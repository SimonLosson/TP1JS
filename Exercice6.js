/**
 * Cyril Cuvelier - Simon Losson
 * CIR 2 ISEN
 * 13/10/2021
 * TP1
 */

let myArray = [20,1,13,8,10,6,15,25,2,10,14,18,9];
let torture = [32, 12, 4, 8, 12, 54, 21, 18, 16, 72, 10, 32, 63, 31, 23, 53, 12, 82, 12];

/**
 * Fonction qui affiche dans le terminal un histogramme à partir de valeurs données dnas un tableau
 * @param array Tableau de nombres
 */
const histogram = array => {
    console.log('');
    let max = array.reduce((a, b) => Math.max(a, b)); // On récupére le plus grand élément pour l'échelle
    const tailleLigne = array.length * 2; // On défini notre taille de ligne
    let line;

    /**
     * On fait une boucle qui produit chaque ligne en commençant par la plus haute,
     * on finit par la ligne 1
     */

    for (let i = max; i > 0; i--){
        line = "";

        /**
         * Ce block est la pour géré l'affichage de l'échelle. Selon la valeur de i, il affiche soit |, soit i
         * Il faut faire attention aux espaces
         */

        if (i === 5){
            line = " 5 ";
        }else if (i % 5 === 0){
            line += i;
            line += ' ';
        }else{
            line += " | ";
        }

        /**
         * Ce block la est fait pour remplir la fin de la ligne. Il compart chaque élément du tableau avec la valeur de i,
         * si l'élément est supérieur ou égal à i. Il est affiché, sinon on affiche un espace (IMPORTANT, si on oublie les espaces,
         * tout notre tableau est décalé. Cf version 1 de ce code :cry:)
         */

        for (let j = 0; j < tailleLigne; j++){
            if (j % 2 === 1){
                line += ' ';
            }else{
                if(array[j / 2] >= i){
                    line += '#';
                }else{
                    line += ' ';
                }
            }
        }
        // On affiche la ligne générée
        console.log(line);
    }

    /**
     * La fin du programme créée la ligne 0
     */

    line = " 0 ";
    for (let i = 1; i < tailleLigne; i++){
        line += '-';
    }
    console.log(line);

};

histogram(myArray);
histogram(torture);
