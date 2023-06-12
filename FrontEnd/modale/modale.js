let modal = null
// ouverture de la modal //
const ouvrirModal = function (e) {
    e.preventDefault ()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute ("aria-hidden")
    target.setAttribute ("aria-modal", "true")
    modal = target
    modal.addEventListener ("click", closeModal)
    modal.querySelector (".js-modal-close").addEventListener ("click", closeModal)
    modal.querySelector (".js-modal-stop").addEventListener ("click", stopPropagation)
};
// fermeture de la modal //
const closeModal = function (e) {
    e.preventDefault ()
    if (modal === null) return
    modal.style.display = "none"
    modal.setAttribute ("aria-hidden", "true")
    modal.setAttribute ("aria-modal", "false")
    modal.removeEventListener("click", closeModal)
    modal.querySelector (".js-modal-close").removeEventListener ("click", closeModal)
    modal.querySelector (".js-modal-stop").removeEventListener ("click", stopPropagation)
    modal = null
};

const stopPropagation = function (e) {
    e.stopPropagation ()
};


document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener ("click", ouvrirModal)
});


// generation des photos dans la modal //
const url = fetch ("http://localhost:5678/api/works")
    .then (works => works.json())
    .then (data => {

     async function genererWorks (data) {
 
        for (let i=0; i<data.length; i++){
           
            const works = document.querySelector (".gallery-modal");
            const projet = data[i];
            const projetElements = document.createElement ("figure");
            const image = document.createElement ("img");
            image.src = `${projet.imageUrl}`;
            const editer = document.createElement ("p");
            editer.innerText = "editer";
            const boutonDelete = document.createElement ("i");
            boutonDelete.className = ("fa-regular fa-trash-can");
        
            projetElements.appendChild(image); 
            projetElements.appendChild (editer);
            projetElements.appendChild (boutonDelete);      
            works.appendChild(projetElements);
        
        


            boutonDelete.addEventListener ("click", deleteElement, genererWorks)
    const token = localStorage.getItem("token")
   

    
    
    async function deleteElement () {
    await fetch ("http://localhost:5678/api/works/`${id}`", {
        method: "DELETE",
        headers: {  accept: "*/*",
                    Authorization: `Bearer ${token}` }
    })
    .then ((reponse) => {
        if (reponse.ok === true) {
            projetElements.remove()
            alert ("l'élément a bien été supprimé")
           
        }else{alert ("une erreur est survenue")}
    
    }) 
    .catch (error => console.log (error))
        }}}
document.querySelector(".gallery-modal").innerHTML ="";
genererWorks (data)
console.log (data)
})



