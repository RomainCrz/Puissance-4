const joueur1 = prompt("Entrez le nom du premier joueur");
const joueur2 = prompt("Entrez le nom du deuxième joueur");
const btn = document.querySelector(".rejouer");
const slider = document.querySelector(".slider");
const tour = document.querySelector("h2 > span");
const colonnes = document.querySelectorAll(".colonne");

let numJoueur = 1;
let grille = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

tour.textContent = joueur1;

function coup(e, color) {
  for (let index = 5; index >= 0; index--) {
    if (e.target.localName === "li") {
      const classLi = e.target.parentElement.children[index].classList;
      if (classLi.contains("vide")) {
        classLi.add(color);
        grille[index][e.path[2].id] = color;
        classLi.remove("vide");

        if (numJoueur == 1) {
          numJoueur = 2;
          tour.textContent = joueur2;
        } else {
          numJoueur = 1;
          tour.textContent = joueur1;
        }
        return;
      }
    } else {
      const classUl = e.target.children[index].classList;
      if (classUl.contains("vide")) {
        classUl.add(color);
        grille[index][e.path[2].id] = color;
        classUl.remove("vide");

        if (numJoueur == 1) {
          numJoueur = 2;
        } else {
          numJoueur = 1;
        }
        return;
      }
    }
  }
}

function check(numJoueur) {
  somme = 0;
  let test;
  if (numJoueur == 2) {
    test = "rouge";
  } else {
    test = "jaune";
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      somme = 0;

      let nbPions = 0;

      if (grille[i][j] == test) {
        console.log(i, j);
        if (j <= 3) {
          for (let k = j; k < j + 4; ++k) {
            if (grille[i][k] == test) {
              ++somme;
            }
          }
          if (nbPions < somme) {
            nbPions = somme;
          }
          somme = 0;
        }

        if (i > 2) {
          for (let k = i; k > i - 4; --k) {
            if (grille[k][j] == test) {
              ++somme;
            }
          }
          if (nbPions < somme) {
            nbPions = somme;
          }
          somme = 0;
        }

        if (i > 2 && j <= 3) {
          let j2 = j;
          for (let k = i; k > i - 4; --k) {
            if (grille[k][j2] == test) {
              ++somme;
            }
            j2 = j2 + 1;
          }
          if (nbPions < somme) {
            nbPions = somme;
          }
          somme = 0;
        }

        if (i <= 2 && j <= 3) {
          let j2 = j;
          for (let k = i; k < i + 4; ++k) {
            if (grille[k][j2] == test) {
              ++somme;
            }
            j2 = j2 + 1;
          }
          if (nbPions < somme) {
            nbPions = somme;
          }
          somme = 0;
        }
      }
      //   console.log(nbPions);
      if (nbPions == 4) {
        return true;
      }
    }
  }

  return false;
}

colonnes.forEach((colonne) => {
  colonne.addEventListener("click", (e) => {
    if (numJoueur == 1) {
      coup(e, "rouge");
      if (check(numJoueur)) {
        setTimeout(() => {
          alert(joueur1 + " a gagné !");

          btn.style.visibility = "visible";
        }, 300);
      }
    } else {
      coup(e, "jaune");
      if (check(numJoueur)) {
        setTimeout(() => {
          alert(joueur2 + " a gagné !");

          btn.style.visibility = "visible";
        }, 300);
      }
    }
  });
});

btn.addEventListener("click", () => {
  btn.style.visibility = "hidden";
  slider.style.transform = "translateX(-100%)";

  setTimeout(() => {
    const rouges = document.querySelectorAll(".rouge");
    rouges.forEach((rouge) => {
      rouge.style.transform = "translateY(1000px)";
    });
    const jaunes = document.querySelectorAll(".jaune");
    jaunes.forEach((jaune) => {
      jaune.style.transform = "translateY(1000px)";
    });
  }, 1000);

  setTimeout(() => {
    slider.style.transform = "translateX(0)";
    const lis = document.querySelectorAll("li");
    lis.forEach((li) => {
      li.classList.remove("rouge");
      li.classList.remove("jaune");
      li.classList.add("vide");
      li.style.transform = "translateY(0px)";
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          grille[i][j] = 0;
          console.log(grille);
        }
      }
    });
  }, 2000);
});
