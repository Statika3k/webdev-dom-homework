import { getComments } from './modules/api.js'
import { initLoader, showLoader, hideLoader } from './modules/loader.js'
import { renderLogin } from './modules/renderLogin.js'

function initApp() {
    const app = document.getElementById('app')
    if (!app) {
        const appDiv = document.createElement('div')
        appDiv.id = 'app'
        document.body.appendChild(appDiv)
    }

    initLoader()
    showLoader()


getComments()
    .then(() => {
        hideLoader()
    }).catch(error => {
        // Если не авторизован или ошибка
        hideLoader()
        renderLogin()
    })
}
initApp()
