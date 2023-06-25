// on empeche le rechargement de la page au bouton submit //
const connexion = document.getElementById("connexion").addEventListener ("submit", function (e){
    e.preventDefault()
    authentification ()
})


 function authentification () {

// recuperation des champs du formulaire //   
    let utilisateur = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }


    console.log (utilisateur)
 
    // appel de l'api // 
 
   fetch ("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify (
    utilisateur
    )
})


// stockage du token et redirection vers la page des projets //

.then (response => response.json ())

.then (data =>  { console.log(data)

        if (utilisateur.email === "") {
    
        document.getElementById("connexion").reset()
        alert ("veuillez entrer votre Email")
        
    
        } else if (utilisateur.password === "") {
        
        alert ("veuillez entrer le mot de passe")
        document.getElementById("connexion").reset ()
    
        } else if (data.token === undefined) {
    
        alert ("email ou mot de passe incorrect")
        document.getElementById("connexion").reset ()
    
        } else {
    
        window.location.href = "../index.html"
        sessionStorage.setItem("token", data.token)
        }
    })
.catch (error =>
    alert ("une erreur est survenue"))
}

    
   









      



    


