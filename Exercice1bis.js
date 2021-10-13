/**
 * Cyril Cuvelier - Simon Losson
 * CIR 2 ISEN
 * 13/10/2021
 * TP1
 */

/**
 * Fait pour le FUN en 3h avec comme but d'amélioré la fonction de l'exercice 1 qui elle même était sensé être une
 * amélioration de 5 fonctions : somme, différence, produit, puissance, division. J'ai essayé d'avoir un code le plus
 * modulaire possible...
 * La conclusion : A vouloir trop optimisern, on s'y perd.
 */


/**
 * Fonction doTheCalcul, qui prends comme paramètres l'operateur ainsi que les nombres qui doivent
 * être calculés. Le nombre d'argument est ilimité sauf pour la division (ça n'a pas de sens sinon, fin
 * peut être mais j'ai pas réussi à l'implémenter)
 * La fonction renvoie la valeur des operations
 * @param operateur '+', '-', '*', '/', '^'
 * @param args Les nombres
 * @returns {number} La valeur du calcul
 */
const doTheCalcul = (operateur, ...args) => {
    let resultat;
    switch (operateur) {
        case '+':
            resultat = args.reduce((a, b) => a + b);
            break;
        case '-':
            resultat = args.reduce((a, b) => a - b);
            break;
        case '*':
            resultat = args.reduce((a, b) => a * b);
            break;
        case '^':
            resultat = args.reduce((a, b) => Math.pow(a, b));
            break;
        case '/':
            if (args.length > 2){
                console.log("Ça n'a pas de sens de diviser plusieurs nombres...");
            }else if (args[1] === 0){
                console.log("Division par 0...");
            }else {
                resultat = args[0] / args[1];
            }
            break;
        default:
            resultat = 0;
            break;
    }
    return resultat;
}

/**
 * La Fonction calculerLesParentheses, prend en entrée une string ou il y a des parenthéses. Elle extrait les parenthéses
 * et les calule. Elle remplace ensuite ces parenthéses par leur valeur dans le string : "(2+4)-6" => "6-6"
 * @param calcul string du type "(a/b)*c^d+(e-f)"
 * @returns {string} string du type "A*c^d+E"
 */
const calculerLesParentheses = (calcul) => {

    while (calcul.indexOf('(') !== -1){

        let start = calcul.indexOf('(');
        let end = calcul.indexOf(')') + 1;
        let parentheseCalcul = calcul.slice(start, end); // "(13*43)"
        let resultatParenthese;

        parentheseCalcul = parentheseCalcul.replace('(', '');
        parentheseCalcul = parentheseCalcul.replace(')', ''); // 13*43

        if (parentheseCalcul.indexOf('+') !== -1){
            resultatParenthese = doTheCalcul('+',
                parseFloat(parentheseCalcul.slice(0, parentheseCalcul.indexOf('+'))),
                parseFloat(parentheseCalcul.slice(parentheseCalcul.indexOf('+') + 1, parentheseCalcul.length))
            );
        }else if (parentheseCalcul.indexOf('-') !== -1){
            resultatParenthese = doTheCalcul('-',
                parseFloat(parentheseCalcul.slice(0, parentheseCalcul.indexOf('-'))),
                parseFloat(parentheseCalcul.slice(parentheseCalcul.indexOf('-') + 1, parentheseCalcul.length))
            );
        }else if (parentheseCalcul.indexOf('*') !== -1){
            resultatParenthese = doTheCalcul('*',
                parseFloat(parentheseCalcul.slice(0, parentheseCalcul.indexOf('*'))),
                parseFloat(parentheseCalcul.slice(parentheseCalcul.indexOf('*') + 1, parentheseCalcul.length))
            );
        }else if(parentheseCalcul.indexOf('/') !== -1){
            resultatParenthese = doTheCalcul('/',
                parseFloat(parentheseCalcul.slice(0, parentheseCalcul.indexOf('/'))),
                parseFloat(parentheseCalcul.slice(parentheseCalcul.indexOf('/') + 1, parentheseCalcul.length))
            );
        }else if(parentheseCalcul.indexOf('^') !== -1){
            resultatParenthese = doTheCalcul('^',
                parseFloat(parentheseCalcul.slice(0, parentheseCalcul.indexOf('^'))),
                parseFloat(parentheseCalcul.slice(parentheseCalcul.indexOf('^') + 1, parentheseCalcul.length))
            );
        }else{
            console.log("Il y a une erreur dans une parenthése !");
            resultatParenthese = 0;
        }
        // On remplace l'endroit ou l'on a trouvé les parenthéses par le résultat
        calcul = calcul.slice(0, start) + resultatParenthese + calcul.slice(end, calcul.length);
    }

    return calcul;
}
/**
 * Fonction doAllCalcul est la fonction qui effectue tous les calculs du type operator qu'il trouve dans le string calcul.
 * Il retourne le string avec les valeurs calculées à la place des calculs : "3+2" => "5"
 * @param operator '+', '-', '*', '/', '^'
 * @param calcul string du type "a/b*c^d+e-f"
 * @returns {string} string du type "a/b*c^d+e-f"
 */
const doAllCalcul = (operator, calcul) => {
    while (calcul.indexOf(operator) !== -1){
        let nbDroit, nbGauche, start, end;
        let i = calcul.indexOf(operator) - 1;

        while(parseInt(calcul[i]) == calcul[i] || calcul[i] === '.'){
            i--;
        }
        nbGauche = parseFloat(calcul.slice(i + 1, calcul.indexOf(operator)));
        start = i + 1;
        i = calcul.indexOf(operator) + 1;

        while(parseFloat(calcul[i]) == calcul[i] || calcul[i] === '.'){
            i++;
        }
        nbDroit = parseFloat(calcul.slice(calcul.indexOf(operator) + 1, i));
        end = i;

        calcul = calcul.slice(0, start) + doTheCalcul(operator, nbGauche, nbDroit) + calcul.slice(end, calcul.length);
    }

    return calcul;
}

/**
 * Fonction operation est la fonction qui fait le pont entre toutes les fonctions précédentes. Elle reçoit en entrée un
 * calcul sous la forme d'un string et en resort le résultat.
 * @param calcul string du type "a/b*c^d+e-f"
 * @returns {float} resultat du calcul
 */
const operation = (calcul) =>{
    let retour;

    if (calcul.length < 3){ // S'il n'y a pas assez d'éléments pour faire le calcul
        retour = -1;
        console.log("Vous n'avez pas rentré de calcul...");
    }else{

        // On commence par chercher les parenthéses pour les calculer
        calcul = calculerLesParentheses(calcul);
        // Maintenant que l'on a une ligne de calcul sans parenthese, on s'attaque aux priorités
        calcul = doAllCalcul('^', calcul);
        calcul = doAllCalcul('*', calcul);
        calcul = doAllCalcul('/', calcul);
        calcul = doAllCalcul('+', calcul);
        calcul = doAllCalcul('-', calcul);

    }

    return parseFloat(calcul);
};

console.log(operation("(4+5)^2*(99/100)^2"));
console.log(operation("2^(4+5)-2*1.66"));
