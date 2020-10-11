class Animations {
    constructor() {
        this.time = 0
        this.homeDescription1 = document.querySelector('#home-description-1')
        this.homeDescription2 = document.querySelector('#home-description-2')
        this.descriptionShown = 1
        this.listOfDescriptions = ['am a hard worker', 'want you to check out my LinkedIn', 'am a kind and friendly person',
            'love to do a good job', 'am a creative problem solver', 'like conscructive criticism']
        this.usedDescriptions = ['love cats', 'learn quickly', 'work well in a team']
    }
    async homeDescriptionText() {
        await new Promise(r => setTimeout(r, 3500))
        this.homeDescriptionAnimation()
        if (this.time == 3) {
            if (this.descriptionShown == 1) {
                this.homeDescription2.innerText = 'am a Full Stack Web Developer'
                this.descriptionShown = 2
            }
            else {
                this.homeDescription1.innerText = 'am a Full Stack Web Developer'
                this.descriptionShown = 1
            }
            this.time = 0
            this.homeDescriptionText()
        }
        else {
            let randomDescription = Math.floor(Math.random() * this.listOfDescriptions.length)
            if (this.descriptionShown == 1) {
                this.homeDescription2.innerText = this.listOfDescriptions[randomDescription]
                this.descriptionShown = 2
            }
            else {
                this.homeDescription1.innerText = this.listOfDescriptions[randomDescription]
                this.descriptionShown = 1
            }
            this.usedDescriptions.push(this.listOfDescriptions[randomDescription])
            this.listOfDescriptions.splice(randomDescription, 1, this.usedDescriptions[0])
            this.usedDescriptions.shift()
            this.time++
            this.homeDescriptionText()
        }
    }
    async homeDescriptionAnimation() {
        if (this.descriptionShown == 1) {
            this.homeDescription1.classList.toggle('description-fade')
            this.homeDescription1.classList.toggle('left100')
            this.homeDescription2.classList.toggle('description-fade')
            await new Promise(r => setTimeout(r, 500))
            this.homeDescription1.classList.toggle('left100')
        }
        else {
            this.homeDescription2.classList.toggle('description-fade')
            this.homeDescription2.classList.toggle('left100')
            this.homeDescription1.classList.toggle('description-fade')
            await new Promise(r => setTimeout(r, 500))
            this.homeDescription2.classList.toggle('left100')
        }
    }
}

class Functionality {
    constructor() {
        this.homeButton = document.querySelector('#home-button')
        this.aboutButton = document.querySelector('#about-button')
        this.projectsButton = document.querySelector('#projects-button')
        this.contactButton = document.querySelector('#contact-button')
    }
    setup() {
        // bind() is used to keep the correct scope for the this keyword. Otherwise the
        // value for this will become the element the eventlistener is firing on
        this.homeButton.addEventListener('click', this.homeScroll.bind(this))
    }
    removeUnderline() {
        this.homeButton.classList.remove('nav-underline')
    }
    homeScroll() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        this.homeButton.classList.toggle('nav-underline')
    }
    // aboutScroll() {

    // }
    // projectsScroll() {

    // }
    // contactScroll() {

    // }
}

new Animations().homeDescriptionText()
new Functionality().setup()



let ticking = false
let divHeight = window.innerHeight - 65
let home = document.querySelector('#home-container')
let currentSection
let hButton = document.querySelector('#home-button')
let aButton = document.querySelector('#about-button')


console.log(divHeight)
window.addEventListener('scroll', test)

function removeUnderline() {
    hButton.classList.remove('nav-underline')
    aButton.classList.remove('nav-underline')
}

function test() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            yTracking = home.getBoundingClientRect().y * -1 + 65
            console.log(yTracking)
            if (yTracking < (divHeight / 2) && currentSection != 'home') {
                currentSection = 'home'
                removeUnderline()
                hButton.classList.add('nav-underline')
            }
            else if (yTracking > (divHeight / 2) && currentSection != 'about') {
                currentSection = 'about'
                removeUnderline()
                aButton.classList.add('nav-underline')
            }
            ticking = false
        })
        ticking = true
    }
}

test()