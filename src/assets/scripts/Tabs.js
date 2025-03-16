const root = '[data-js-tabs]'

class Tabs {
  selectors = {
      root: root,
      tabElement: '[data-js-tabs-button]',
      contentElement: '[data-js-tabs-content]',
  }

  stateActions = {
      isActive: 'is-active'
  }

  constructor(tabsCollection) {
      this.tabsParentElement = tabsCollection
      this.tabsElements = this.tabsParentElement?.querySelectorAll(this.selectors.tabElement)
      this.contentElements = this.tabsParentElement?.querySelectorAll(this.selectors.contentElement)

      this.bindEvents()
  }

  updateUI(activeTabElement, targetTabElement) {
      activeTabElement.classList.remove(this.stateActions.isActive)
      targetTabElement.classList.add(this.stateActions.isActive)

      const activeTabAriaLabelledBy = activeTabElement.attributes['aria-labelledby'].value
      const targetTabAriaLabelledBy = targetTabElement.attributes['aria-labelledby'].value

      const activeContentElement = [...this.contentElements].find( contentElement => contentElement.id === activeTabAriaLabelledBy)
      const targetContentElement = [...this.contentElements].find( contentElement => contentElement.id === targetTabAriaLabelledBy)

      activeContentElement.classList.remove(this.stateActions.isActive)
      targetContentElement.classList.add(this.stateActions.isActive)
  }

  onTabButtonClick(event) {
      const target = event.target.closest(this.selectors.tabElement)
      const isElementActive = target.classList.contains(this.stateActions.isActive)

      if (isElementActive) {
          return
      }

      const activeTabElement = [...this.tabsElements].find( tabElement => tabElement.classList.contains(this.stateActions.isActive) )



      this.updateUI (activeTabElement, target)
  }

  bindEvents() {
      this.tabsElements?.forEach((tabElement) => {
          tabElement.addEventListener('click', (event) => this.onTabButtonClick(event))
      })
  }
}

class TabsCollections {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(root).forEach((element) => new Tabs(element))
    }
}

export default TabsCollections