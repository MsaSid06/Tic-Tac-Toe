// Dis moi juste pourquoi quand le rouge gagne, et qu'on continue le jeu, la couleure rouge revient les deux premieres fois de suite .
const content = document.querySelectorAll(".content");
const buttonRed = document.querySelector(".red");
const buttonBlue = document.querySelector(".blue");
const divParent = document.querySelector(".parent");
const EcrireScoreRed = document.querySelector(".a_red");
const EcrireScoreBlue = document.querySelector(".a_blue");
const continuer = document.querySelector(".Continuer");
const recommencer = document.querySelector(".restart");
// console.log(continuer);

/** ------------------- Slide -------------------------------------------------------*/
const message = document.querySelector(".alerte");
const messageErreur = document.querySelector(".BadAlerte");
const paragrapheAlerte = document.querySelector(".messageBon");
const paragrapheBadAlerte = document.querySelector(".messageMauvais");
const paragrapheNeutre = document.querySelector(".messageNeutre");
const messageNeutre = document.querySelector(".Neutre");

export function SlideMessage(notification, statut) {
  if (statut == 1) {
    paragrapheAlerte.textContent = notification;
    message.classList.add("apparition");
    setTimeout(() => {
      message.classList.remove("apparition");
    }, 7000);
  } else if (statut == 0) {
    paragrapheBadAlerte.textContent = notification;
    messageErreur.classList.add("apparition");
    setTimeout(() => {
      messageErreur.classList.remove("apparition");
    }, 7000);
  } else {
    paragrapheNeutre.textContent = notification;
    messageNeutre.classList.add("apparition");
    setTimeout(() => {
      messageNeutre.classList.remove("apparition");
    }, 7000);
  }
}
/**------------------------------------------------------------------------------ */

// red impair , blue pair

let quiAgagnerLaManchePrecedente = "Bleue";

let nombreClick = 1,
  Click = 0,
  caseRouge = "",
  caseBleue = "",
  a = 0,
  retourRed,
  retourBlue,
  Winner = "";

let Bgcolor = "";
resetOpacity("Bleue");

content.forEach((element) => {
  element.addEventListener("click", () => {
    if (!DivClicker(element)) {
      Bgcolor = gestionAlternanceCouleureContainer(
        quiAgagnerLaManchePrecedente,
      );
      element.style.background = Bgcolor;
      element.style.pointerEvents = "none"; //empecher un click futur sur ce meme carrer
      gestionAlternanceCouleureButton(++Click);
      a++;
      collectionCouleureCase();
    }
  });
});

/**
 *
 * @param {*} color
 * @param {*} dernier represente le dernier gagnant, par defaut c'est "red"
 * @returns
 */
function gestionAlternanceCouleureContainer(dernier) {
  if (dernier == "Rouge") {
    if (nombreClick++ % 2 == 0) {
      return "blue";
    } else {
      return "red";
    }
  } else {
    if (nombreClick++ % 2 == 0) {
      return "red";
    } else {
      return "blue";
    }
  }
}

function resetOpacity(gagnantPrecedent) {
  for (let i = 0; i < 9; i++) {
    content[i].style.opacity = 1;
    content[i].style.background = "black";
    content[i].style.pointerEvents = "auto";
  }
  divParent.style.pointerEvents = "auto";
  if (gagnantPrecedent == "Rouge") {
    buttonRed.style.opacity = 1;
    buttonBlue.style.opacity = 0.3;
    Click = 1;
    nombreClick = 1;
    quiAgagnerLaManchePrecedente = "Bleue";
  } else if (gagnantPrecedent == "Bleue" || gagnantPrecedent == "") {
    buttonRed.style.opacity = 0.3;
    buttonBlue.style.opacity = 1;
    Click = 0;
    quiAgagnerLaManchePrecedente = "Bleue";
    nombreClick = 1;
  }

  ((caseRouge = ""),
    (caseBleue = ""),
    (a = 0),
    retourRed,
    retourBlue,
    (Winner = ""),
    (Bgcolor = ""));
}

function VerifierSilYaDejaDesGagner() {
  for (let i = 0; i < 9; i++) {
    if (content[i].style.opacity != 1) {
      return true;
    }
  }
  return false;
}

setInterval(() => {
  if (!VerifierSilYaDejaDesGagner() && a >= 3) {
    VerificationParInterval();
  }
}, 1100);

function VerificationParInterval() {
  retourRed = a > 3 ? Gagner(caseRouge, 0) : "";
  retourBlue = a > 3 ? Gagner(caseBleue, 1) : "";
  Winner = retourRed ? "Rouge" : retourBlue ? "Bleue" : "";
  quiAgagnerLaManchePrecedente = Winner;
  if (Winner) {
    Winner === "Rouge"
      ? (EcrireScoreRed.textContent = parseInt(EcrireScoreRed.textContent) + 1)
      : Winner === "Bleue"
        ? (EcrireScoreBlue.textContent =
            parseInt(EcrireScoreBlue.textContent) + 1)
        : "";
    recommencer.classList.add("Continuer");
    continuer.classList.add("Continuer-apparition");
  } else {
    if (a == 9) {
      if (!Winner) {
        caseGagnantes("0", 0);
        recommencer.classList.add("Continuer");
        continuer.classList.add("Continuer-apparition");
      }
    }
  }
  if (Click >= 9) {
    Winner = retourRed ? "Rouge" : retourBlue ? "Bleue" : "";
  }
}

function DivClicker(a) {
  if (a.style.pointerEvents == "none") {
    return true;
  } else {
    return false;
  }
}
function gestionAlternanceCouleureButton(i) {
  if (i % 2 == 0) {
    buttonRed.style.opacity = 0.3;
    buttonBlue.style.opacity = 1;
  } else {
    buttonRed.style.opacity = 1;
    buttonBlue.style.opacity = 0.3;
  }
}

/**
 * permet de collection les indices des cases clicke dans des tableau dedier a chaque couleure
 */
function collectionCouleureCase() {
  for (let i = 0; i < 9; i++) {
    if (content[i].style.background == "red") {
      if (!caseRouge.includes(i)) {
        caseRouge += i;
        // console.log("Red", caseRouge);
      }
    } else if (content[i].style.background == "blue") {
      if (!caseBleue.includes(i)) {
        caseBleue += i;
        // console.log("blue", caseBleue);
      }
    }
  }
}

function Gagner(table, a) {
  if (table.includes("0") && table.includes("1") && table.includes("2")) {
    caseGagnantes("012", a);
    return true;
  } else if (
    table.includes("3") &&
    table.includes("4") &&
    table.includes("5")
  ) {
    caseGagnantes("345", a);
    return true;
  } else if (
    table.includes("6") &&
    table.includes("7") &&
    table.includes("8")
  ) {
    caseGagnantes("678", a);
    return true;
  } else if (
    table.includes("0") &&
    table.includes("3") &&
    table.includes("6")
  ) {
    caseGagnantes("036", a);
    return true;
  } else if (
    table.includes("1") &&
    table.includes("4") &&
    table.includes("7")
  ) {
    caseGagnantes("147", a);
    return true;
  } else if (
    table.includes("2") &&
    table.includes("5") &&
    table.includes("8")
  ) {
    caseGagnantes("258", a);
    return true;
  } else if (
    table.includes("0") &&
    table.includes("4") &&
    table.includes("8")
  ) {
    caseGagnantes("048", a);
    return true;
  } else if (
    table.includes("2") &&
    table.includes("4") &&
    table.includes("6")
  ) {
    caseGagnantes("246", a);
    return true;
  } else {
    if (Click > 9) {
      caseGagnantes("0", 0);
      return false;
    }
  }
}

/**
 *
 * @param {String} chaine chaine issu des tableau red ou  bleu.
 * @param {Integer} statut 0
 */
function caseGagnantes(chaine, statut) {
  if (chaine == "0" && statut == 0) {
    SlideMessage("Match Null !! Veuillez recommencer", 2);
    resetOpacity();
  } else {
    for (let i = 0; i < 9; i++) {
      if (chaine.includes(i)) {
        content[i].classList.add("gagner");
        let notification = statut
          ? "Les bleux ont gagner"
          : "Les Rouges ont gagner";
        SlideMessage(notification, statut);
      } else {
        content[i].style.opacity = 0.3;
        content[i].style.pointerEvents = "none";
      }
    }
    divParent.style.pointerEvents = "none";
  }
}

continuer.addEventListener("click", () => {
  content.forEach((element) => {
    // gestionAlternanceCouleureButton(a);
    element.classList.remove("gagner");
    continuer.classList.remove("Continuer-apparition");
    recommencer.classList.remove("Continuer");
  });
  resetOpacity(Winner);
  Winner == "Rouge" ? (a = 1) : (a = 2);
});

function restart() {
  resetOpacity("");
  EcrireScoreRed.textContent = 0;
  EcrireScoreBlue.textContent = 0;
  buttonRed;
}

recommencer.addEventListener("click", () => {
  quiAgagnerLaManchePrecedente = Winner;
  restart();
});

// console.log(2 % 0);
