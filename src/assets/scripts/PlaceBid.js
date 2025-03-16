class PlaceBid {
    selectors = {
        root: '[data-js-overlay-place-bid]',
        button: '[data-js-place-bid]',
        closeButton: '[data-js-overlay-place-bid-close-button]',
        errorMessage: '[data-js-form-field-errors]',
    }

    states = {
        isLock: 'is-lock'
    }

    errorMessages = {
        valueMissing: () => "This field can't be empty!",
        patternMismatch: ( {title} ) => title ||"Field don't match pattern!",
    }

    constructor() {
        this.overlayElement = document?.querySelector(this.selectors.root)
        this.closeOverlayElement = this.overlayElement?.querySelector(this.selectors.closeButton)

        this.buttons = document?.querySelectorAll(this.selectors.button)

        this.bindEvents()
    }

    showErrorMessage(errorMessage, element) {

        const errorFormElement = element
            .parentElement
            .parentElement
            .querySelector(this.selectors.errorMessage)

        errorFormElement.innerHTML = errorMessage
            .map((message) => `<p class='text_error-message'>${message}</p>`)
            .join('')
    }

    validate(element) {
        const errors = element.validity
        const risenErrors = []


        Object.entries(this.errorMessages).forEach(([errorType, errorMessage]) => {
            if (errors[errorType]) {
                risenErrors.push(errorMessage(element))
            }
        })

        this.showErrorMessage(risenErrors, element)

        return risenErrors.length === 0
    }

    onSubmit(event) {
        const elements = [...event.target.elements].filter((element) => element.required)


        let isFormValid = true

        elements.forEach((element) => {
            const isFieldValid = this.validate(element)

            if (!isFieldValid) {
                isFormValid = false
            }
        })

        if(!isFormValid) {
            event.preventDefault()
        }
    }

    onButtonClick() {
        this.overlayElement.showModal()
        document.documentElement.classList.toggle(this.states.isLock)
    }

    onCloseButtonClick() {
        document.documentElement.classList.toggle(this.states.isLock)

        this.overlayElement.close()
    }

    bindEvents() {
        this.buttons.forEach((button) => button.addEventListener('click', () => this.onButtonClick()))

        this.closeOverlayElement?.addEventListener('click', () => this.onCloseButtonClick())

        this.overlayElement.addEventListener('submit', (event) => this.onSubmit(event))
    }
}

export default PlaceBid