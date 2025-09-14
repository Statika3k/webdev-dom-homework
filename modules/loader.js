let loadingElement = null
let formLoaderElement = null
let formElement = null
let commentsElement = null

export const initLoader = () => {
    loadingElement = document.getElementById('loading')
    formLoaderElement = document.getElementById('form-loader')
    formElement = document.querySelector('.add-form')
    commentsElement = document.querySelector('.comments')
}

export const showLoader = () => {
    if (loadingElement) {
        loadingElement.style.display = 'block'
    }
    if (commentsElement) {
        commentsElement.style.display = 'none'
    }
}

export const hideLoader = () => {
    if (loadingElement) {
        loadingElement.style.display = 'none'
    }
    if (commentsElement) {
        commentsElement.style.display = 'flex'
    }
}

export const showFormLoader = () => {
    if (formLoaderElement && formElement) {
        formElement.style.display = 'none'
        formLoaderElement.style.display = 'block'
    }
}

export const hideFormLoader = () => {
    if (formLoaderElement && formElement) {
        formLoaderElement.style.display = 'none'
        formElement.style.display = 'flex'
    }
}
