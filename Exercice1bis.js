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

const doAllCalcul = (opperator, calcul) => {
    while (calcul.indexOf(opperator) !== -1){
        let nbDroit, nbGauche, start, end;
        let i = calcul.indexOf(opperator) - 1;

        while(parseInt(calcul[i]) == calcul[i] || calcul[i] === '.'){
            i--;
        }
        nbGauche = parseFloat(calcul.slice(i + 1, calcul.indexOf(opperator)));
        start = i + 1;
        i = calcul.indexOf(opperator) + 1;

        while(parseFloat(calcul[i]) == calcul[i] || calcul[i] === '.'){
            i++;
        }
        nbDroit = parseFloat(calcul.slice(calcul.indexOf(opperator) + 1, i));
        end = i;

        calcul = calcul.slice(0, start) + doTheCalcul(opperator, nbGauche, nbDroit) + calcul.slice(end, calcul.length);
    }

    return calcul;
}

const opperation = (calcul) =>{
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

    return calcul;
};

console.log(opperation("(4+5)^2*(99/100)^2"));
console.log(opperation("2^(4+5)-2*1.66"));