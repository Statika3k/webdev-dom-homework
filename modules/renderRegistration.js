import { registration, updateToken, getComments } from "./api.js"
import { renderComments } from './renderComments.js'
import { initAddComment } from './initListeners.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
    <div class="container">
    <h1>Страница регистрации</h1>
    <div class="add-form add-form__login ">
        <h3>Форма входа</h3>
        <div class="add-form-input">
            <input type="text" class="login-input" id="login-input" placeholder="login"> 
            <input type="text" class="name-input" id="name-input" placeholder="Имя">       
            <input type="text" class="password-input" id="password-input" placeholder="Пароль">
        </div>
        <br>
        <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
    </div>
    </div>
    `
        const loginButton = document.getElementById('reg-button')
        const loginElement = document.getElementById('login-input')
        const nameElement = document.getElementById('name-input')
        const passwordElement = document.getElementById('password-input')
    
        loginButton.addEventListener("click", () => {
            registration({
                login: loginElement.value,
                name: nameElement.value,
                password: passwordElement.value,
            }).then((responseData) => {
                updateToken(responseData.user.token)
                return getComments()
            }).then(() => {
                renderComments()
                initAddComment()
            }).catch(error => {
                alert('Ошибка входа: ' + error.message)
            })
        })

}

