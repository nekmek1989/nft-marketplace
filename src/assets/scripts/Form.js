class FormValidate {
    selectors = {
        root: '[data-js-form]',
        errorMessage: '[data-js-form-field-errors]',
        passwordElement: "[name='password']",
    }

    errorMessages = {
        valueMissing: () => "This field can't be empty!",
        patternMismatch: ( {title} ) => title ||"Field don't match pattern!",
        tooShort: ({minLength}) => `Too short value, mim length is ${minLength}`,
        matchPasswords: () => 'Password must much'
    }

    constructor() {
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

    passwordsValidate(passwordAcceptElement) {
        const passwordElement = passwordAcceptElement.closest(this.selectors.root).querySelector(this.selectors.passwordElement)

        const isPasswordsMatches = passwordElement.value === passwordAcceptElement.value
        if (isPasswordsMatches) {
           return  false
        }

        return true
    }

    validate(element) {
        const errors = element.validity
        const risenErrors = []

        const isElementPasswordAccept = element.name === 'password-accept'

        if (isElementPasswordAccept) {
           element.validity.matchPasswords = this.passwordsValidate(element)
        }

        Object.entries(this.errorMessages).forEach(([errorType, errorMessage]) => {
            if (errors[errorType]) {
                risenErrors.push(errorMessage(element))
            }
        })

        this.showErrorMessage(risenErrors, element)

        return risenErrors.length === 0
    }

    onBlur(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.root)

        const isRequired = target.required

        if (isFormField && isRequired) {
            this.validate(target)
        }
    }

    onSubmit(event) {
        const isFormField = event.target.matches(this.selectors.root)

        if(!isFormField) {
            return
        }

        const requiredControlElements = [...event.target.elements]
            .filter(({required }) => required)


        let isFormValid = true
        let firstInvalidFieldControl = null

        requiredControlElements.forEach((element) => {
            const isFieldValid = this.validate(element)

            if (!isFieldValid) {
                isFormValid = false

                if(!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element
                }
            }
        })

        if(!isFormValid) {
            event.preventDefault()
            firstInvalidFieldControl.focus()
        }
    }

    bindEvents() {
        document.addEventListener('submit', (event) => {
            this.onSubmit(event)
        })

        document.addEventListener('focusout', (event) => {
            this.onBlur(event)
        })
    }

}

export default FormValidate