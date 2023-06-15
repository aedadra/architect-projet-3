// appel de l'api //
const url = fetch ("http://localhost:5678/api/works")
    .then (works => works.json())
    .then (data => {
      
// generation des projets par l'api //
      function genererWorks (data) {
 
        for (let i=0; i<data.length; i++){

            const works = document.querySelector (".gallery");
            
            const projet = document.createElement ("article");
            
            const image = document.createElement ("img");
            image.src = `${data[i].imageUrl}`;
            
            const titre = document.createElement ("p");
            titre.innerText = `${data[i].title}`;


            projet.appendChild(image);
            projet.appendChild(titre);
            works.appendChild(projet);
    }};

document.querySelector(".gallery").innerHTML ="";
genererWorks (data);
console.log(data)

// copie du array //
const mySet = new Set (data); 
console.log (mySet)

// bouton objets //
document.querySelector(".objets").addEventListener ("click", function () {
    
  const objetsFiltres = data.filter(function (data) {
    return data.categoryId == 1
    
  });

    document.querySelector(".gallery").innerHTML = "";
    genererWorks (objetsFiltres)

});

// bouton appartements //
document.querySelector(".appartements").addEventListener ("click", function () {
    
  const appartementsFiltres = data.filter (function (data) {
    return data.categoryId == 2
    
  });

document.querySelector(".gallery").innerHTML = "";
genererWorks (appartementsFiltres)
});

// bouton des Hotels et restaurants //
document.querySelector(".hotels").addEventListener ("click", function () {
    
  const hotelsFiltres = data.filter (function (data) {
    return data.categoryId == 3
    
  });

document.querySelector(".gallery").innerHTML = "";
genererWorks (hotelsFiltres)
});

// bouton pour faire apparaitre tout le contenu //
document.querySelector(".tous").addEventListener ("click", function () {
   
  const tousFiltres = data.filter (function (data) {
    return data
    
  });

document.querySelector(".gallery").innerHTML = "";
genererWorks (tousFiltres)
});

})


