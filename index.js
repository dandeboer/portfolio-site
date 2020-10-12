class Animations {
    constructor() {
        this.descriptionTime = 0
        this.homeDescription1 = document.querySelector('#home-description-1')
        this.homeDescription2 = document.querySelector('#home-description-2')
        this.descriptionShown = 1
        this.listOfDescriptions = ['am a hard worker', 'want you to check out my LinkedIn', 'am a kind and friendly person',
            'love to do a good job', 'am a creative problem solver', 'like conscructive criticism']
        this.usedDescriptions = ['love cats', 'learn quickly', 'work well in a team']
        this.homeButton = document.querySelector('#home-button')
        this.aboutButton = document.querySelector('#about-button')
        this.projectsButton = document.querySelector('#projects-button')
        this.contactButton = document.querySelector('#contact-button')
        this.homeContainer = document.querySelector('#home-container')
        this.navTicking = false
        this.sectionHeight = this.homeContainer.offsetHeight
        this.currentSection
        this.yTracking
    }

    setup() {
        this.homeDescriptionText()
        window.addEventListener('scroll', this.navUnderlineTicker.bind(this))
        window.addEventListener('resize', this.updateSectionHeight.bind(this))
        this.navUnderlineTicker()
        this.homeButton.addEventListener('click', this.homeScroll.bind(this))
        this.aboutButton.addEventListener('click', this.aboutScroll.bind(this))
        this.projectsButton.addEventListener('click', this.projectsScroll.bind(this))
        this.contactButton.addEventListener('click', this.contactScroll.bind(this))
    }

    async homeDescriptionText() {
        await new Promise(r => setTimeout(r, 3500))
        this.homeDescriptionAnimation()
        if (this.descriptionTime == 3) {
            if (this.descriptionShown == 1) {
                this.homeDescription2.innerText = 'am a Full Stack Web Developer'
                this.descriptionShown = 2
            }
            else {
                this.homeDescription1.innerText = 'am a Full Stack Web Developer'
                this.descriptionShown = 1
            }
            this.descriptionTime = 0
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
            this.descriptionTime++
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

    navUnderlineTicker() {
        if (!this.navTicking) {
            window.requestAnimationFrame(this.navUnderlineAnimation.bind(this))
            this.navTicking = true
        }
    }

    navUnderlineAnimation() {
        this.yTracking = this.homeContainer.getBoundingClientRect().y * -1 + 65
        if (this.yTracking < (this.sectionHeight / 2) && this.currentSection != 'home') {
            this.currentSection = 'home'
            this.navRemoveUnderline()
            this.homeButton.classList.add('nav-underline')
        }
        else if ((this.sectionHeight / 2) < this.yTracking && this.yTracking < ((this.sectionHeight / 2) + this.sectionHeight) && this.currentSection != 'about') {
            this.currentSection = 'about'
            this.navRemoveUnderline()
            this.aboutButton.classList.add('nav-underline')
        }
        else if (((this.sectionHeight / 2) + this.sectionHeight) < this.yTracking && this.yTracking < ((this.sectionHeight / 2) + (2 * this.sectionHeight)) && this.currentSection != 'projects') {
            this.currentSection = 'projects'
            this.navRemoveUnderline()
            this.projectsButton.classList.add('nav-underline')
        }
        else if (((this.sectionHeight / 2) + (2 * this.sectionHeight)) < this.yTracking && this.currentSection != 'contact') {
            this.currentSection = 'contact'
            this.navRemoveUnderline()
            this.contactButton.classList.add('nav-underline')
        }
        this.navTicking = false
    }

    navRemoveUnderline() {
        this.homeButton.classList.remove('nav-underline')
        this.aboutButton.classList.remove('nav-underline')
        this.projectsButton.classList.remove('nav-underline')
        this.contactButton.classList.remove('nav-underline')
    }

    updateSectionHeight() {
        this.sectionHeight = this.homeContainer.offsetHeight
    }

    homeScroll() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    aboutScroll() {
        window.scrollTo({top: this.sectionHeight, left: 0, behavior: 'smooth'})
    }

    projectsScroll() {
        window.scrollTo({top: (2 * this.sectionHeight), left: 0, behavior: 'smooth'})
    }

    contactScroll() {
        window.scrollTo({top: (3 * this.sectionHeight), left: 0, behavior: 'smooth'})
    }
}

new Animations().setup()