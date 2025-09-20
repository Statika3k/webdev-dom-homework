import { registration, updateToken, getComments, setCurrentUserName } from './api.js'
import { renderComments } from './renderComments.js'
import { renderLogin } from './renderLogin.js'


export const renderRegistration = () => {
    const app = document.getElementById('app')
    app.innerHTML = `
    <div class="container">
        <h1>Страница регистрации</h1>
        <div class="add-form add-form__login">
            <h3>Форма регистрации</h3>
            <div class="add-form-input">
                <input type="text" class="login-input" id="login-input" placeholder="Логин"> 
                <input type="text" class="name-input" id="name-input" placeholder="Имя">       
                <input type="password" class="password-input" id="password-input" placeholder="Пароль">
            </div>
            <br>
            <button class="add-form-button" id="register-button">Зарегистрироваться</button>
            <a href="#" class="add-form-link" id="login-link">Войти</a>
        </div>
    </div>
    `
    const registerButton = document.getElementById('register-button')
    const loginElement = document.getElementById('login-input')
    const nameElement = document.getElementById('name-input')
    const passwordElement = document.getElementById('password-input')

    registerButton.addEventListener('click', () => {
        const loginValue = loginElement.value.trim()
        const nameValue = nameElement.value.trim()
        const passwordValue = passwordElement.value.trim()

        if (!loginValue || !nameValue || !passwordValue) {
            alert('Заполните все поля')
            return
        }

        registerButton.disabled = true

        registration({
            login: loginValue,
            name: nameValue,
            password: passwordValue,
        })
        .then((responseData) => {
            updateToken(responseData.user.token)
            setCurrentUserName(responseData.user.name)
            return getComments()
        })
        .then(() => {
            renderComments()
        })
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => {
            registerButton.disabled = false
        })
    })

    document.getElementById('login-link').addEventListener('click', (e) => {
        e.preventDefault()
        renderLogin()
    })
}
