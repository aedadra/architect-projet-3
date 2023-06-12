const form = document.querySelector("form");

form.addEventListener ("submit", async (e)=> {
    e.preventDefault ();

    const formData = new FormData (form);
    console.log(formData)

    })



