const username = document.getElementById("username");
const password = document.getElementById("password");
const submitButton = document.querySelector(".submitt input");
const container = document.querySelector(".container");
const newpage = document.querySelector(".new-page")

window.onload = () => {
    setTimeout(setUsernamePass, 1000)
}

const setUsernamePass = () => {
    username.value = "eve.holt@reqres.in"
    password.value = "pistol"
    localStorage.setItem("username", EncryptStringAES(username.value))
    localStorage.setItem("password", EncryptStringAES(password.value))

}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    apisentRegister();


})

const apisentRegister = async () => {
    try {
        const dataBody = {
            username: username.value,
            password: password.value
        }
        const response = await axios({
            url: "https://reqres.in/api/register",
            data: dataBody,
            method: "post"
        })
        const {
            data
        } = response

        localStorage.setItem("apikey", EncryptStringAES(data.token))
        container.remove();
        newpage.style.display = "block"
        getapiSource()

    } catch (error) {
        alert("You enter invalid username or password!!!! Please try again!")

    }


}

const getapiSource = async () => {
    const response = await axios({
        url: "https://reqres.in/api/users?page=1",
    })
    const {
        data
    } = response;
    data.data.forEach(element => {
        newpage.innerHTML += ` 
        <ul class="newpage-inner" >
        <li >${element.id}</li>  
        <li>${element.email}</li>
        <li>${element.first_name} ${element.last_name}</li>
        <li><img src="${element.avatar}"/></li>
     
    
 </ul>
 
 `

    });

}