var films = [
    {    name: "Deadpool",      years: 2016,    authors : "Tim Miller" },
    {    name: "Spiderman",     years: 2002,    authors : "Sam Raimi" },
    {    name: "Scream",        years: 1996,    authors : "Wes Craven" },
    {    name: "It: chapter 1", years: 2019,    authors : "Andy Muschietti" }
];

let btnAjouter = document.querySelector('#ajouter');
let btnTrier =  document.querySelector('#trier');
let btnValider = document.querySelector('#valider');

let ajouterFilm = document.querySelector('#inputFilm');
let ajoutTitre = document.querySelector('#ajoutTitre');
let ajoutAnnee = document.querySelector('#ajoutAnnee');
let ajoutAuteur = document.querySelector('#ajoutAuteur');

let liste = document.querySelector('#liste');


/**
 * Affiche la liste de films
 */
function affiche(){

    let listeTemp =
        `<table class="listeFilm">
            <tr>
                <th>Titre</th>
                <th>Année</th>
                <th>Réalisateur</th>
            </tr>`;
    for (let i = 0; i < films.length; i++) {
        listeTemp += (`<tr>
        <td>${films[i].name}</td>
        <td>${films[i].years}</td>
        <td>${films[i].authors}</td>
        <td class="suppr"><button onclick="supprButton(${i})">Supprimer</button></td>
        </tr>`);
    }
    listeTemp += `</table>`
    liste.innerHTML = listeTemp;
}

/**
 * Supprime un film & demande confirmation avec une alerte
 * @param numFilm {number}
 */
function supprButton(numFilm){

    Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer ce film de la liste ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non, annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Le film a bien été supprimé !',
                icon: 'success',
                timer: '1000'
                })
            films.splice(numFilm,1)
            affiche ();
        }
    })
}

/**
 * Fait apparaitre le champ d'ajout de film et disparaitre le bouton ajouter
 */
btnAjouter.addEventListener('click', function() {

    btnAjouter.style.visibility = 'hidden';
    ajouterFilm.style.visibility = 'visible';
})

/**
 * Fait passer la première lettre d'un mot en majuscule 
 * @param mot {string}
 */
function capitalize (mot) {
    return mot[0].toUpperCase() + mot.slice(1);
}

/**
 * Vérifie les données saisies, lance fonctions affiche & capitalize si pas d'erreur ou lance erreur 
 */
btnValider.addEventListener('click', function(){

    if (ajoutTitre.value.length > 1 && ajoutAnnee.value >= 1900 && ajoutAnnee.value <= 2023 && ajoutAuteur.value.length > 4) {
        films.push(
            {
                name: capitalize(ajoutTitre.value),
                years: ajoutAnnee.value,
                authors: capitalize(ajoutAuteur.value)
            }
        )
        ajoutTitre.value = ""
        ajoutAnnee.value = ""
        ajoutAuteur.value = ""
    
        Swal.fire({
            icon: 'success',
            title: 'Film ajouté avec succès',
            timer: 3000
        })

        affiche()

    } else {
        let alert = "<li>";
        if (ajoutTitre.value.length < 2) {
            alert += '<ul>Le titre du film doit contenir au moins 2 caractères</ul>'
        }
        if (ajoutAnnee.value < 1900 || ajoutAnnee.value > 2023) {
            alert += `<ul>L'année du film doit être comprise entre 1900 et 2023</ul>`
        }
        if (ajoutAuteur.value.length < 5) {
            alert += `<ul>Le nom de l'auteur doit contenir au moins 5 caractères</ul>`
        };
        alert += '</li>';
        Swal.fire({
            icon: 'warning',
            title: 'Erreur dans le formulaire :',
            html: alert,
            timer: 5000
        })
    }       
})

/**
 * Tri par titre ou date et lance la fonction affiche
 * /!\ Problême de tri : Après avoir mit un tri par année, impossible de re-trier par titre /!\
 */

btnTrier.addEventListener('click', function () {
          
    if (btnTrier.value === 'annee') {
        films.sort(function (a, b){
            return b.years - a.years;
            });
    } else if (btnTrier.value === 'titre'){
        films.sort(function (a, b){
            return a.name - b.name;
            });
    }

    affiche ();
})


