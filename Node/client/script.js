async function addUser(event){
    event.preventDefault();

    console.log("Reached here ...");

    let name = document.getElementById('name').Value;
    console.log("name : ", name);

    let email = document.getElementById('email').value;
    console.log("email :", email);

    let password = document.getElementById('password').value;
    console.log("password :", password);

    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');

    let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;


    //validations

    if(!name){
        nameError.innerHTML = "name is required";

    }else  {
        nameError.innerHTML = "";
    }
    if(!email){

        emailError.innerHTML = "email is required";
    }else if(!emailRegex.test(email)) {
        emailError.innerHTML = "invalid email";

    }else{
        emailError.innerHTML = "";
    }

    if(!password){
        passwordError.innerHTML = "password is required";
    }else  {
        passwordError.innerHTML = "";

    }

    let datas = {
        name,
        email,
        password,
    }
    console.log("datas : ", datas);

    let json_data = JSON.stringify(datas);
    console.log ("json_data : ", json_data);

    let response = await fetch('/submit',{
        method: "POST",
        headers :{
            'Content-Type' : "application/json",
        },
        body : json_data,
    });

    console.log("responser : ", response);

    let parsed_response = await response.text();

    
}