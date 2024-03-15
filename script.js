//Valeurs globales
let numberToGuess; //le nombre à deviner, donné en premier par le joueur 1
let givenNumber; //le nombre donné par joueur 2, peut être réassigné plusieurs fois
let minRange = 0; //minimum du champ de valeur des nombres
let maxRange = 50; //maximum du champ de valeur des nombres
let guessCount = 0; //nombre de tentatives pour deviner le nombre numberToGuess
let playerTurn = 1;
let win = false;

//prompt joueur 2
function askGivenNumber(str) {
   return prompt(str);
}

//prompt joueur 1
function askGuessedNumber(str) {
   let n = prompt(str);
   if (n >= 0 && n <= 50) return n;
   else {
      alert("Nombre invalide!");
      return askGuessedNumber(str);
   }
}

function didIWin(nPlayer1, nPlayer2) {
   //vérifie si le nombre est correct
   if (nPlayer1 === nPlayer2) {
      //alert("Bravo ! Vous avez deviné le nombre");
      return true;
   }

   //alert() si le nombre est plus grand ou plus petit, SEULEMENT si le nombre est entre 0 et 50
   if (nPlayer2 >= minRange && nPlayer2 <= maxRange) {
      if (nPlayer1 > nPlayer2 && nPlayer2 > 0) alert("Plus grand !");
      else if (nPlayer1 < nPlayer2 && nPlayer2 < 50) alert("Plus petit !");
   }

   //sinon
   return false;
}

function modifyRange(n) {
   //si le nombre donné est supérieur au minimum du champ ET inférieur au nombre à deviner (min < n < numberToGuess)
   if (n > minRange && n < numberToGuess) {
      minRange = n; //on réassigne le nouveau minimum
      document.getElementById("min").innerText = `${minRange} < `; //on modifie l'affichage dans le HTML
   }

   //si le nombre donné est inférieur au maximum du champ ET supérieur au nombre à deviner (numberToGuess < n < max)
   if (n < maxRange && n > numberToGuess) {
      maxRange = n; //on réassigne le nouveau maximum
      document.getElementById("max").innerText = ` < ${maxRange}`; //on modifie l'affichage dans le HTML
   }
   if (n < minRange || n > maxRange)
      alert(`Le nombre doit être entre ${minRange} et ${maxRange} !`);
}

function displayInstructions() {
   let instructions = document.getElementById("inputLabel");
   if (!instructions) return;

   if (playerTurn === 1) {
      instructions.innerText = `Joueur 1, choisissez un chiffre entre ${minRange} et ${maxRange} :`;
   }

   if (playerTurn === 2) {
      instructions.innerText = `Joueur 2, devinez un chiffre entre ${minRange} et ${maxRange} :`;
   }
}

function displayCount(n) {
   //récursive
   let displayedCount = document.getElementById("count");

   //si la balise pour le nombre de tentatives existe, on le modifie
   if (displayedCount) displayedCount.innerText = `Nombre de tentatives : ${n}`;
   else {
      //sinon on crée un nouveau node
      let countNode = document.createElement("p");
      countNode.setAttribute("id", "count");
      document.getElementById("main").append(countNode);
      displayCount(n); //on rapelle la fonction pour modifier son contenu dans le if qui précède
   }
}

function displayWin() {
   let main = document.getElementById("main");

   let displayedMessage = document.createElement("p");
   displayedMessage.setAttribute("id", "win");
   displayedMessage.innerText = `Bravo ! Vous avez deviné le nombre après ${guessCount + 1} tentatives !`;
   let retryBtn = document.createElement("button");
   retryBtn.setAttribute("id", "btn");
   retryBtn.setAttribute("type", "button");
   retryBtn.innerText = "Recommencer";

   main.replaceChildren(displayedMessage, retryBtn);
}

function getNumber() {
   const res = parseInt(document.getElementById("guess").value); //récupère la valeur dans le input du HTML
   document.getElementById("guess").value = ""; //efface le champ
   return res;
}

function gameplay() {
   //if (numberToGuess === undefined) numberToGuess = parseInt(askGuessedNumber("Joueur 1: Donnez un nombre entre 0 et 50"))
   //givenNumber = parseInt(askGivenNumber("Joueur 2: Devinez un nombre entre 0 et 50"));

   //Joueur 1 choisi le premier nombre puis return pour arrêter la fonction
   if (numberToGuess === undefined) {
      let n = getNumber();
      if (isNaN(n)) return;

      //Si le nombre donné n'est pas entre 0 et 50, on return pour arrêter la fonction
      if (n < 0 || n > 50) {
         alert("Le nombre doit être entre 0 et 50");
         return;
      }

      //sinon on assigne la valeur
      numberToGuess = n;
      playerTurn++;
      return;
   }

   //Joueur 2 devine le nombre
   givenNumber = getNumber();

   //console.log(numberToGuess, givenNumber);

   //vérifie si le nombre a été trouvé
   if (didIWin(numberToGuess, givenNumber) === false) {
      //nombre non trouvé
      guessCount++; //on incrémente le nombre de tentative
      displayCount(guessCount); //on affiche ou modifie le nombre de tentative
      modifyRange(givenNumber); //on modifie et affiche le champ min et max si besoin
   } else {
      //lnombre trouvé, on affiche un message de victoire
      win = true;
      displayWin();
   }
}

/**********************************************************************/
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
   if (win) document.location.reload();

   gameplay();
   displayInstructions();
});
window.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      if (win) document.location.reload();

      gameplay();
      displayInstructions();
   }
});

displayInstructions();
