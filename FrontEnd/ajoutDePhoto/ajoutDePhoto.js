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
               } else {
                alert ("une erreur s'est produite")
                document.getElementById("form").reset()
               }
            })

    }








