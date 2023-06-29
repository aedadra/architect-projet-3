// creation et gestion de modal //

let modal = null

// ouverture de la modal //

const ouvrirModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.setAttribute("aria-hidden", "false")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
};

// fermeture de la modal //

const closeModal = function (e) {
    e.preventDefault()
    if (modal === null) return
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.setAttribute("aria-modal", "false")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
    {
        document.querySelector(".gallery").innerHTML = ""
        genererProjets()
    }
    setImage()
};

const stopPropagation = function (e) {
    e.stopPropagation()
};


document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", ouvrirModal)
});

// pointer les boutons et les galleries de la modal //

const editor = document.querySelector(".modal-editor");
const ajouter = document.querySelector(".ajout-de-projet");
const previousButton = document.querySelector(".previous");

// generation de la page d'ajout de photo //

const ajoutDeProjet = document.getElementById("ajout-de-photo").addEventListener("click", photoAjout)
function photoAjout(e) {
    e.preventDefault()

    editor.style.display = "none"
    ajouter.style.display = "block"
    previousButton.style.visibility = "visible"
};

// retour sur la gallerie de la modal //

const previous = document.querySelector(".previous").addEventListener("click", pagePrecedante)
function pagePrecedante(e) {
    e.preventDefault()
    setImage()
    editor.style.display = "block"
    ajouter.style.display = "none";
    previousButton.style.visibility = "hidden"

    {
        document.querySelector(".gallery-modal").innerHTML = ""
        genererModal()
    }
};

// generation des photos dans la modal //

function genererModal() {
    fetch("http://localhost:5678/api/works")
        .then(works => works.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {

                const works = document.querySelector(".gallery-modal");

                const projetElements = document.createElement("figure");
                projetElements.id = `${data[i].id}`
                projetElements.className = ("figure-modal");

                const image = document.createElement("img");
                image.src = `${data[i].imageUrl}`;
                image.id = `${data[i].id}`

                const editer = document.createElement("p");
                editer.innerText = "editer";

                const emplacementBoutonDelete = document.createElement("figcaption");

                const fleche = document.createElement("i")
                fleche.className = ("fa-solid fa-arrows-up-down-left-right deplacer")

                const boutonDelete = document.createElement("i");
                boutonDelete.className = ("fa-regular fa-trash-can supprimer");
                boutonDelete.id = image.id;

                emplacementBoutonDelete.appendChild(fleche);
                emplacementBoutonDelete.appendChild(boutonDelete);

                projetElements.appendChild(image);
                projetElements.appendChild(editer);
                projetElements.appendChild(emplacementBoutonDelete);

                works.appendChild(projetElements);

                boutonDelete.addEventListener("click", deleteItem)

                // fonction supprimer un projet //

                function deleteItem(e) {

                    // confirmation //

                    if (confirm("souhaitez vous vraiment supprimer l'élément ?") == true) {
                        const token = sessionStorage.getItem("token");
                        const id = data[i].id;
                        e.preventDefault()

                        // appel de l'api //

                        fetch("http://localhost:5678/api/works/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })

                            .then((reponse) => {

                                if (reponse.ok === true) {

                                    projetElements.remove()
                                    alert("l'élément a bien été supprimé")

                                } else {

                                    alert("une erreur est survenue")

                                }
                            })
                    }
                }
            }
        })
}
genererModal()       

