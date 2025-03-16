const rootElement = '[data-js-buttons]'

class Buttons {
    selectors = {
        root: rootElement,
        clipBoardButtonElement: '[data-js-buttons-clip-board]',
        followButtonElement: '[data-js-buttons-follow]',
        overlayElement: '[data-js-overlay]'
    }

    attributes = {
        clipBoardButtonAttribute: 'data-js-buttons-clip-board',
        followButtonAttribute: 'data-js-buttons-follow',
    }

    states = {
        isActive: 'is-active',
        isFollowed: 'is-followed'
    }

    messages = {
        follow: {
            success: `<p>You are following this author now ✓</p>`,
            error: `
                <div class="overlay-error">
                    <h5 class="overlay-error__title h5 has-accent-font">Error!</h5>
                    <div class="overlay-error__description">
                        <p class="text_error-message has-accent-font">Something went wrong, try letter :(</p>
                    </div>
                </div>
            `,
            unfollow: `<p>You are not following this author now ✓</p>`
        },
        clipboard: {
            success: `<p>Success copied into clipboard ✓</p>`,
            error: `
                <div class="overlay-error">
                    <h5 class="overlay-error__title h5 has-accent-font">Error!</h5>
                    <div class="overlay-error__description">
                        <p class="text_error-message has-accent-font">Something went wrong, try letter :(</p>
                    </div>
                </div>
            `
        }
    }

    buttonInnerText = {
        followed:  `
                            <span class="button__line-wrapper">                        
                                <span class="button__line is-active"></span>
                                <span class="button__line is-active"></span>
                            </span>
                            Followed
                    `,
        follow: `
                            <span class="button__line-wrapper">                        
                                <span class="button__line"></span>
                                <span class="button__line"></span>
                            </span>
                            Follow
                 `
    }

    constructor(rootElement) {
        this.buttons = {
            clipBoardButtonElement: rootElement?.querySelector(this.selectors.clipBoardButtonElement),
            followButtonElement: rootElement?.querySelector(this.selectors.followButtonElement)
        }
        this.overlayElement = document.querySelector(this.selectors.overlayElement)

        this.bindEvents()
    }

    showMessage(message) {
        this.overlayElement.innerHTML = message
        this.overlayElement.classList.add(this.states.isActive)

        setTimeout( () => this.overlayElement.classList.remove(this.states.isActive)
            , 1400
        )
    }

    onClipBoardButtonClick() {
        const { success, error } = this.messages.clipboard

        navigator.clipboard.writeText('0x1RGT7154748V1CE5176479CDGB574AE244B939B5')
            .then(() => this.showMessage(success))
            .catch(() => this.showMessage(error))
    }

    updateUI(innerText) {
        this.buttons.followButtonElement.innerHTML = innerText
        this.buttons.followButtonElement.classList.toggle(this.states.isFollowed)
    }

    onFollowButtonClick() {
        const tryFollow =
            new Promise(
            (resolve, reject) => {
                const isSuccess = Math.random() > 0.05
                setTimeout(
                    () => {
                        const buttonText = this.buttonInnerText.followed
                        const {success, error} = this.messages.follow

                        if (isSuccess) {
                            resolve({buttonText, success})
                        } else (
                            reject(error)
                        )
                    },
                    500
                )
             }
            )

        const tryUnfollow =
            new Promise(
            (resolve, reject) => {
                const isSuccess = Math.random() > 0.05
                setTimeout(
                    () => {
                        const buttonText = this.buttonInnerText.follow
                        const {unfollow, error} = this.messages.follow

                        if (isSuccess) {
                            resolve({buttonText, unfollow})
                        } else (
                            reject(error)
                        )
                    },
                    500
                )
            }
        )

        const isUserFollowed = [...this.buttons.followButtonElement.classList].find((value) => value === this.states.isFollowed)
        if (isUserFollowed) {
            tryUnfollow
                .then(({buttonText, unfollow}) => {
                    this.showMessage(unfollow)
                    this.updateUI(buttonText)
                })
                .catch(error => this.showMessage(error))
        }
        else {
            tryFollow
                .then(({buttonText, success}) => {
                    this.showMessage(success)
                    this.updateUI(buttonText)
                })
                .catch(error => this.showMessage(error))
        }
    }

    bindEvents() {
        for (const button in this.buttons) {

            if ( this.buttons[button].hasAttribute(this.attributes.clipBoardButtonAttribute) ) {
                this.buttons[button].addEventListener('click',
                    () => this.onClipBoardButtonClick()
                )
            }
            else if ( this.buttons[button].hasAttribute(this.attributes.followButtonAttribute) ) {
                this.buttons[button].addEventListener('click',
                        () => this.onFollowButtonClick()
                )
            }
        }
    }
}

class ButtonsCollections {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootElement).forEach((element) => new Buttons(element))
    }
}

export default ButtonsCollections