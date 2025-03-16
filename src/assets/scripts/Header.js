class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-header-overlay]',
        signUpButton: '[data-js-header-sign-up-button]',
        burgerButton: '[data-js-header-burger-button]'
    }

    state = {
        isActive: 'is-active',
        isLock: 'is-lock',
        sizeS: 'button_size-s'
    }

    constructor() {
        this.headerElement = document.querySelector(this.selectors.root)
        this.overlayElement = this.headerElement.querySelector(this.selectors.overlay)
        this.signUpButtonElement = this.headerElement.querySelector(this.selectors.signUpButton)
        this.burgerButtonElement = this.headerElement.querySelector(this.selectors.burgerButton)

        this.bindEvents()
    }

    onClickBurgerButtonElement = () => {
        document.documentElement.classList.toggle(this.state.isLock)
        this.overlayElement.classList.toggle(this.state.isActive)
        this.burgerButtonElement.classList.toggle(this.state.isActive)
        this.signUpButtonElement.classList.toggle(this.state.sizeS)
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onClickBurgerButtonElement)
    }
}

export default Header