class Timer {
    selectors = {
        root: '[data-js-timer]',
        hours: '[data-js-timer-hours]',
        minutes: '[data-js-timer-minutes]',
        seconds: '[data-js-timer-seconds]',
    }

    constructor() {
        this.timerElement = document.querySelector(this.selectors.root)
        this.hoursCountElement = this.timerElement?.querySelector(this.selectors.hours)
        this.minutesCountElement = this.timerElement?.querySelector(this.selectors.minutes)
        this.secondsCountElement = this.timerElement?.querySelector(this.selectors.seconds)

        this.time = {
            hours: this.getRandomInt(71),
            minutes: this.getRandomInt(59),
            seconds: this.getRandomInt(59),
        }

        this.timer()
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    messageTimer(message) {
        const {hours, minutes, seconds} = message

        this.hoursCountElement.innerHTML = hours
        this.minutesCountElement.innerHTML = minutes
        this.secondsCountElement.innerHTML = seconds

    }

    timeFormated(timeObj) {

        for (let elementTime in timeObj) {
            timeObj[elementTime] = timeObj[elementTime].toString()
        }

        for (let elementTime in timeObj) {
            const elementLengthMoreThenOne = timeObj[elementTime].length > 1

            if (!elementLengthMoreThenOne) {
                timeObj[elementTime] = '0' + timeObj[elementTime]
            }
        }
        return timeObj
    }

    counter() {
        this.time.seconds--

        const isMinutePassed = this.time.seconds === 0
        const isHourPassed = this.time.minutes === 0 && this.time.seconds === 0

        if (isHourPassed) {
            this.time.seconds = 59
            this.time.minutes = 59
            this.time.hours--
        } else if (isMinutePassed) {
            this.time.seconds = 59
            this.time.minutes--
        }

        const time = {...this.time}

        const timeFormated = this.timeFormated(time)

        this.messageTimer(timeFormated)
    }

    timer() {
        const interval = setInterval(() => this.counter(), 1000)

        if (!this.timerElement) {
            clearInterval(interval)
        }
    }
}

export default Timer