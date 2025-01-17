import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = ["slide", "pagination"]
  static values = {
    currentSlide: {type: Number, default: 0},
    autoplay: {type: Boolean, default: true},
    interval: {type: Number, default: 4000},
  }

  connect() {
    if (this.autoplayValue) {
      this.slideInterval = setInterval(() => {
        this.#moveNext()
      }, this.intervalValue)
    }
  }

  disconnect() {
    this.#clearSlideInterval()
  }

  move(event) {
    this.currentSlideValue = event.params.index
    this.#clearSlideInterval()
  }

  next() {
    this.#moveNext()
    this.#clearSlideInterval()
  }

  previous() {
    this.#movePrevious();
    this.#clearSlideInterval()
  }

  currentSlideValueChanged() {
    this.#render()
  }

  get slideCount() {
    return this.slideTargets.length
  }

  #clearSlideInterval() {
    this.autoPlayValue = false
    if (this.slideInterval) {
      clearInterval(this.slideInterval)
    }
  }

  #render() {
    this.#renderSlideTargets();
    this.#renderPaginationTargets();
  }

  #renderPaginationTargets() {
    this.paginationTargets.forEach((target, index) => {
      if (index === this.currentSlideValue) {
        target.ariaSelected = "true"
      } else {
        target.ariaSelected = "false"
      }
    })
  }

  #renderSlideTargets() {
    this.slideTargets.forEach((target, index) => {
      if (index === this.currentSlideValue) {
        target.ariaHidden = "false"
      } else {
        target.ariaHidden = "true"
      }
    })
  }

  #moveNext() {
    if (this.currentSlideValue + 1 < this.slideCount) {
      this.currentSlideValue = this.currentSlideValue + 1
    } else {
      this.currentSlideValue = 0
    }
  }

  #movePrevious() {
    if (this.currentSlideValue - 1 >= 0) {
      this.currentSlideValue = this.currentSlideValue - 1
    } else {
      this.currentSlideValue = this.slideCount - 1
    }
  }
}
