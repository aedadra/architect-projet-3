// on empeche le rechargement de la page au bouton submit //
const connexion = document.getElementById("connexion");
connexion.addEventListener ("submit", function (e){
    e.preventDefault()


async function authentification () {
// recuperation des champs du formulaire //   
    let utilisateur = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
  

    console.log (utilisateur)
 // appel de l'api // 
   const verify = await fetch ("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify (
   utilisateur
    )
})
// stockage du token et redirection vers la page des projets //
if (verify.ok === true) {
    let data = await verify.json ();
    console.log (data);
    localStorage.setItem ('token', data.token);
    window.location.href = "../index.html";
// gestion des erreurs //    
}  else {
alert  (`email ou mot de passe incorrect`)
}} 
// appel de la fonction //
 authentification ()

}); 


