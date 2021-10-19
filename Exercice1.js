/**
 * Cyril Cuvelier - Simon Losson
 * CIR 2 ISEN
 * 13/10/2021
 * TP1
 */


/**
 * Cette fonction fait une opération qui est definie avec le paramètre opérateur sur l'ensemble des nombres contenus dans args
 * Pour la division, les premiers éléments sont sommés et divisés par le dernier.
 * Pour la mise au carré, le premier nombre est mis à la puissance et les autres sont traités en fonction de l'opérateur en fin de chaîne.
 * On peut remettre un deuxième opérateur si le premier est une puissance (Pour le FUN)
 * @param opérateur Cela doit être un char : '+', '-', '/', '*', '^'
 * @param args Ce sont des nombres
 * @returns {number} Retourne le total de l'opération sous forme d'un nombre.
 */

function opperation(opperateur, ...args) {

    let total = 0;

    if (opperateur !== '/'){
        switch (opperateur) {
            case '+':
                for (let nombre of args){
                    total += nombre;
                }
                break;
            case '-':
                for (let nombre of args){
                    total -= nombre;
                }
                break;
            case '*':
                total = 1;
                for (let nombre of args){
                    total *= nombre;
                }
                break;
            case '^': // Le cas de la puissance, qui est un peu plus complexe

                total = args[0]; // On récupère le nombre à mettre au carré.
                args.splice(0, 1);  // on enlève ce nombre.

                if (args.length === 1){ // Si on veut juste faire une puissance "normale" avec 2 nombre.

                    if (parseInt(args[0])){
                        total = Math.pow(total, args[0]);
                    }else{
                        console.log("Vous n'avez pas mis 2 nombres pour la puissance !");
                    }

                }else{ // Si on fait la puissance d'un nombre et d'une opération de plusieurs nombres

                    let opperateurPuissance = args[args.length - 1]; // On récupére l'opérateur de la puissance.
                    args.splice(args.length - 1, args.length - 1); // On enlève cet opérateur.

                    if (['+', '-', '/', '^'].includes(opperateurPuissance)){ // On verifie que le dernier champ est bien un opérateur.
                        let puissance = opperation(opperateurPuissance, ...args);
                        total = Math.pow(total, puissance);
                    }else{
                        console.log("Vous avez mis plus de 2 nombres pour la puissance sans spécifier d'operateur !");
                    }

                }

            default:
                break;
        }
    }else{ // La division

        if (args[args.length - 1] !== 0){
            let diviseur = args[args.length - 1]; // On récupère le diviseur
            args.splice(args.length - 1, 1); // On enlève le diviseur
            total = opperation('+', ...args);
            total /= diviseur;
        }else{
            console.log("Attention vous faites une division par 0... C'est le dernier élément qui divise la somme !");
        }

    }

    return total;
}

// Soooo smooth :)
console.log("1 + 8 + 10 + 10 = ", opperation('+',1,8,10,10));
console.log("1 - 8 - 10 - 10 = ", opperation('-',1,8,10,10));
console.log("1 * 8 * 10 * 10 = ", opperation('*',1,8,10,10));
console.log("(1 + 8 + 10) / 10 = ",opperation('/',1,8,10,10));
console.log("(1 + 8 + 10) / 0 = ", opperation('/',1,8,10,0));
console.log("2 ^ 8 = ", opperation('^',2,8));
console.log("2 ^ (1 + 3 + 4) =", opperation('^',2,1,3,4,'+'));
// Si vous avez un jour rêvé de faire 2 puissances d'un coup. Pour la mise au carré, le premier nombre est mis à la puissance et les autres sont traités en fonction de l'opérateur en fin de chaîne.
console.log("2 ^ 3 ^ 4 = ", opperation('^', 2, 3, 4, '^'));
// Si vous avez un jour rêvé de faire la puissance d'une puissance d'une puissance
console.log("2 ^ 2 ^ 2 ^ 2 = ", opperation('^', 2, 2, 2, 2, '^', '^'));
// Le fun n'a plus aucune limite (fin si 2 opérateurs, j'ai pas réussi à mettre une infinité d'opérateur)
console.log("2 ^ 2 ^ (3 + 2) = ", opperation('^', 2, 2, 3, 2, '+', '^'));
