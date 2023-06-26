// pointer le formulaire //

const form = document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault ()
    ajoutWorks ()
    });

// fonction d'ajout des travaux //
    
function ajoutWorks () {

    const image = document.getElementById ("image");
    const title = document.getElementById("title");
    const category = document.getElementById("category");

// construction de l'objet à envoyer à l'API //

    const formData = new FormData (form);

        formData.append ("image", image.files[0]);
        formData.append ("title", title.value);
        formData.append ("category", category.value);
   
// recuperation du token et appel de l'API //    

    const token = sessionStorage.getItem("token");

        fetch ("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`,
            "accept": "application/json"
            },  
            body: formData
        })

            .then (response => {
               
                if (response.status === 201) {
               
                    alert ("l'élément à bien été ajouté")               
                    document.getElementById("form").reset()
                    setImage ()
               
                } else if (image.files.length == 0) {
                    
                    alert ("veuillez selectionner une image")

                } else {
               
                    alert ("une erreur s'est produite")
                    document.getElementById("form").reset()
                    setImage ()
               }
            })
    }

    
// gestion aperçu de l'image //

getImage ()

    function getImage () {
        document.querySelector(".image").addEventListener("change", function(e){
            
            let file = e.target.files [0]
            let url = URL.createObjectURL(file)
            document.querySelector (".preview-img img").src = url
            document.querySelector(".ajout-form").setAttribute("style", "display:none;")
            document.querySelector (".preview-img").setAttribute("style", "display:flex;")
        }) 
    }

// remettre l'aperçu a zero //

    function setImage () {
        document.querySelector(".ajout-form").setAttribute("style", "display:flex;")
        document.querySelector (".preview-img").setAttribute("style", "display:none;")
        document.querySelector (".preview-img img").setAttribute("src", "#")
    }

// fonction pour changer la couleur du bouton valider //

const image = document.querySelector ("#image")
const title = document.querySelector ("#title")
const category = document.querySelector ("#category")
const addValidate = document.querySelector (".add-validate")
    
    function updateValidationButton() {

        if (
        
            image.files.length > 0 && // Si le compteur de photos est a 0
            title.value !== "" && // Et les valeurs des input title et category ne sont pas vides
            category.value !== ""
        
        ) {
        
            addValidate.classList.add("color-change"); // Alors la class "true" est ajoutée au bouton
    
        } else {
            
            addValidate.classList.remove("color-change");
        
        }
    }

// On ecoute les événements de modification des champs et on appel la fonction //

image.addEventListener("input", updateValidationButton);
title.addEventListener("input", updateValidationButton);
category.addEventListener("input", updateValidationButton);

    
