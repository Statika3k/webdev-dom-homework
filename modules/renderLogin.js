import { login, updateToken, getComments, setCurrentUserName } from './api.js'
import { renderComments } from './renderComments.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const app = document.getElementById('app')
    app.innerHTML = `
    <div class="container">
        <h1>Страница входа</h1>
        <div class="add-form add-form__login">
            <h3>Форма входа</h3>
            <div class="add-form-input">
                <input type="text" class="login-input" id="login-input" placeholder="Логин">
                <input type="password" class="password-input" id="password-input" placeholder="Пароль">
            </div>
            <br>
            <button class="add-form-button" id="login-button">Войти</button>
            <a href="#" class="add-form-link" id="reg-link">Зарегистрироваться</a>
        </div>
    </div>
    `

    const loginButton = document.getElementById('login-button')
    const loginElement = document.getElementById('login-input')
    const passwordElement = document.getElementById('password-input')

    loginButton.addEventListener('click', () => {
        const loginValue = loginElement.value.trim()
        const passwordValue = passwordElement.value.trim()

        if (!loginValue || !passwordValue) {
            alert('Заполните все поля')
            return
        }

        loginButton.disabled = true

        login({ login: loginValue, password: passwordValue })
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
                loginButton.disabled = false
            })
    })

    document.getElementById('reg-link').addEventListener('click', (e) => {
        e.preventDefault()
        renderRegistration()
    })
}
