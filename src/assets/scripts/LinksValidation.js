class Link {
    selectors = {
        overlay: '[data-js-overlay]',
        addressLink: '[href]'
    }

    states = {
        isActive: 'is-active',
    }

    message = {
        error: `
            <div class="overlay-error">
                <h5 class="overlay-error__title h5 has-accent-font">Location Error!</h5>
                <div class="overlay-error__description">
                    <p class="text_error-message has-accent-font">This link has no directory yet :(</p>
                </div>
            </div>
            `
    }

    constructor() {
        this.overlayElement = document.querySelector(this.selectors.overlay)

        this.bindEvents()
    }

    showMessage(message) {
        this.overlayElement.innerHTML = message
        this.overlayElement.classList.add(this.states.isActive)

        setTimeout(() => {
            this.overlayElement.classList.remove(this.states.isActive)
        }, 1400)
    }

    validateLink(linkElement) {

        const isHrefAttributeTemp =
            linkElement.attributes.href.value === '#' ||
            linkElement.attributes.href.value === '' ||
            linkElement.attributes.href.value === false

        if (!isHrefAttributeTemp) {
            return true
        }

        const message = this.message.error

        this.showMessage(message)

        return false
    }

    onClick(event)  {
        const isLinkElement = event.target.closest(this.selectors.addressLink)

        if (!isLinkElement) {
            return
        }

        const isLinkValid = this.validateLink(isLinkElement)

        if (!isLinkValid) {
            event.preventDefault()
        }
    }

    bindEvents() {
        document.addEventListener('click', (event) => this.onClick(event))
    }
}

export default Link