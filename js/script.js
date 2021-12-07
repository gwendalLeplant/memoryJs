function melange(tableau) {
    let tableau2 = [];
    let taille = tableau.length;
    for (let i = 0; i < taille; i++) {
        do {
            x = Math.floor(Math.random() * taille);
        } while (tableau2[x] != undefined);
        tableau2[x] = tableau[i];
    }
    return tableau2;
}

function dedouble(tableau) {
    let tableau2 = [];
    for (let val of tableau) {
        // Pour chaque valeur de tableau 
        // on copie deux fois dans tableau2
        tableau2.push(val);
        tableau2.push(val);
    }
    return tableau2;
}

function onClickTuile(e) {
    // Click désactivé si Victoire
    if (score < (tuileMixedUp.length / 2) && e.getAttribute('class') != 'img-tuile blank') {
        // Si le chemin de la dernière cliquée est différent de
        // la nouvelle tuile cliquée
        if (clickedTuile != e.getAttribute('data-src-revealed')) {
            // Si la dernière tuile cliquée n'est pas nulle
            if (clickedTuile != "") {
                // Sélection de la tuile concealed
                let concealedTuile = document.querySelector('.concealed');
                // Remise des ces attributs standards
                concealedTuile.setAttribute('src', './img/dead.jpg');
                concealedTuile.setAttribute('class', 'img-tuile');
            }
            // Sauvegarde de la nouvelle tuile cliquée
            clickedTuile = e.getAttribute('data-src-revealed');
            // Modification de son image par concealed
            e.setAttribute('src', clickedTuile);
            e.setAttribute('class', 'img-tuile concealed')
        } else { // En cas de tuiles identiques		
            // Sélection de la tuile concealed
            let concealedTuile = document.querySelector('.concealed');
            // Remise des ces attributs standards
            concealedTuile.setAttribute('src', './img/blank.jpg');
            concealedTuile.setAttribute('class', 'img-tuile blank');
            // Modification de son image par blank
            e.setAttribute('src', './img/blank.jpg');
            e.setAttribute('class', 'img-tuile blank');
            // Raz de la dernière tuile cliquée
            clickedTuile = "";
            // Incrémentation du score
            score++;
            // Vérification de victoire
            if (score >= (tuileMixedUp.length / 2)) {
                let tempsVictoire = new Date(Date.now() - tempsDebut);
                // Création d'un item dans le localStorage
                window.localStorage.setItem('tempsVictoire', tempsVictoire.getTime());
                // Affichage du message de victoire avec le temps écoulé
                document.querySelector('.message').innerHTML = 'Victoire en : ';
                document.querySelector('.message').innerHTML += tempsVictoire.getMinutes();
                document.querySelector('.message').innerHTML += 'min:';
                document.querySelector('.message').innerHTML += tempsVictoire.getSeconds();
                document.querySelector('.message').innerHTML += 'sec';
            }
        }
    }
}
// Création d'un tableau de string contenant le chemin de toutes les tuiles
let allTuilePath = [];
for (let i = 0; i < 42; i++) {
    allTuilePath.push("./img/" + i + ".jpg");
}
// Mélange du tableau
let allTuileMixedUp = melange(allTuilePath);
// Récupération des 16 premieres tuiles dédoublées et mélangées
let tuileMixedUp = melange(dedouble(allTuileMixedUp.splice(0, 16)));
let clickedTuile = "";
let score = 0;
let tempsDebut = new Date(Date.now());
// Boucle de clonage et renseignement de template 
// pour remplir le plateau de tuiles mélangées
for (let i = 0; i < tuileMixedUp.length; i++) {
    // Sélection et clonage du template
    let tuile = document.importNode(document.querySelector('#tuile').content, true);
    // Précision de l'attribut src à l'aide du tableau mélangé
    tuile.querySelector('.img-tuile').setAttribute('data-src-revealed', tuileMixedUp[i]);
    tuile.querySelector('.img-tuile').setAttribute('src', './img/dead.jpg');
    tuile.querySelector('.img-tuile').setAttribute('onclick', 'onClickTuile(this)');
    // Création de l'enfant dans le container
    document.querySelector('.container').appendChild(tuile);
}