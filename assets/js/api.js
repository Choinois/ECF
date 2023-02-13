let btnValider = document.querySelector('#valider');
let affiche = document.querySelector('#affiche');

let titre = document.querySelector('#rechercheTitre');
let annee = document.querySelector('#rechercheAnnee');
let type = document.querySelector('#rechercheType');


// /!\ L'API n'envoie qu'un seul résultat à chaque fois/!\

btnValider.addEventListener('click', ()=> {
    let titreTemp = "";
    let anneeTemp = "";
    let typeTemp = "";

    if (titre.value !== "") {
        titreTemp = "&t=" + titre.value.replace(/ /g,'+');
    };

    if (annee.value !== "") {
        anneeTemp = "&y=" + annee.value;       
    }
    if (type.value !== "type"){
        typeTemp = "&type=" + type.value;
    }

    let xhr = new XMLHttpRequest();

    xhr.open("GET", `http://www.omdbapi.com/?apikey=e945c7d0${titreTemp}${anneeTemp}${typeTemp}&page=100&plot=short`, true);
    xhr.send();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            let temp = JSON.parse(xhr.responseText);
            console.log(temp);
            affiche.innerHTML =
                `<table class="afficheFilm">
                <tr>
                    <th>
                        <img id="imgFilm"src="assets/img/image-not-found.jpg" alt="img">
                    </th>
                </tr>
                <tr>
                    <th id="titreFilm">
                        ${temp.Title}
                    </th>
                </tr>
                <tr id="anneeFilm">
                    <td>
                        ${temp.Year}
                    </td>
                </tr>
            </table>`
        }
    }
    
    let xhrImg = new XMLHttpRequest();

    xhrImg.open("GET", `http://img.omdbapi.com/?apikey=e945c7d0${titreTemp}${anneeTemp}${typeTemp}&i&plot=full`, true);
    xhrImg.send();

    xhrImg.onreadystatechange = function () {
        if (xhrImg.readyState === 4 && xhrImg.status === 200) {
            affiche.innerHTML = xhrImg;
        }
    }

    titre.value = "";
    annee.value = "";
    type.value = "type";

})
