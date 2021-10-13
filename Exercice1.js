/**
 * Cette fonction fait une opperation qui est defini avec le paramètre opperateur sur l'ensemble des nombres contenus dans args
 * Pour la division, les premiers éléments sont sommés et divisiés par le dernier.
 * Pour la mise au carré, le permier nombre est mis à la puissance et les autres sont traités en fonction de l'oppérateur en fin de chaine.
 * On peut remettre un deuxième oppérateur si le premier est une puissance (Pour le FUN)
 * @param opperateur Cela doit être un char : '+', '-', '/', '*', '^'
 * @param args Ce sont des nombres
 * @returns {number} Retourne le total de l'opperation sous forme d'un nombre.
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

                total = args[0]; // On récupére le nombre à mettre au carré.
                args.splice(0, 1);  // on enléve ce nombre.

                if (args.length === 1){ // Si on veut juste faire une puissance "normal" avec 2 nombre.

                    if (parseInt(args[0])){
                        total = Math.pow(total, args[0]);
                    }else{
                        console.log("Vous n'avez pas mis 2 nombres pour la puissance !");
                    }

                }else{ // Si on fait la puissance d'un nombre et d'une opperation de plusieurs nombres

                    let opperateurPuissance = args[args.length - 1]; // On récupére l'opperateur de la puissance.
                    args.splice(args.length - 1, args.length - 1); // On enléve cet opperateur.

                    if (['+', '-', '/', '^'].includes(opperateurPuissance)){ // On verifie que le dernier champ est bien un opperateur.
                        let puissance = opperation(opperateurPuissance, ...args);
                        total = Math.pow(total, puissance);
                    }else{
                        console.log("Vous avez mis plus de 2 nombres pour la puissance sans spécifier d'opperateur !");
                    }

                }

            default:
                break;
        }
    }else{ // La division

        if (args[args.length - 1] !== 0){
            let diviseur = args[args.length - 1]; // On récupére le diviseur
            args.splice(args.length - 1, 1); // On enleve le diviseur
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
// Si vous avez un jour rếvé de faire 2 puissances d'un coupPour la mise au carré, le permier nombre est mis à la puissance et les autres sont traités en fonction de l'oppérateur en fin de chaine.
console.log("2 ^ 3 ^ 4 = ", opperation('^', 2, 3, 4, '^'));
// Si vous avez un jour rếvé de faire la puissance d'une puissance d'une puissance
console.log("2 ^ 2 ^ 2 ^ 2 = ", opperation('^', 2, 2, 2, 2, '^', '^'));
// Le fun n'a plus aucune limite (fin si 2 oppérateurs, j'ai pas réussi à mettre une infinité d'oppérateur)
console.log("2 ^ 2 ^ (3 + 2) = ", opperation('^', 2, 2, 3, 2, '+', '^'));