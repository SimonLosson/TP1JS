const addition = (nb1, nb2) => nb1 + nb2; // Fonction qui fait la somme de nb1 + nb2
const soustraction = (nb1, nb2) => nb1 - nb2; // Fonction qui fait la soustraction de nb1 - nb2
const multiplication = (nb1, nb2) => nb1 * nb2; // Fonction qui multiplie nb1 par nb2
const division = (nb1, nb2) => nb2 === 0 ? "Division par 0 !" : nb1 / nb2; // Fonction qui divise nb1 par nb2 en verifiant que nb2 ne soit pas négatif
const puissance = (nb1, nb2) => Math.pow(nb1, nb2); // Fonction qui met nb1 a la puissance nb2

console.log("1 + 3 = ", addition(1, 3));
console.log("2 - 4 = ", soustraction(2, 4));
console.log("3 * 3 = ", multiplication(3, 3));
console.log("2 / 0 = ", division(2, 0));
console.log("3 / 8 = ", division(3, 8));
console.log("2 ^ 4 = ", puissance(2, 4));
