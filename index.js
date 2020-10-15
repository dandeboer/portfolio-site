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
        this.etutorThumbnail = document.querySelector('#etutor-thumbnail')
        this.portfolioThumbnail = document.querySelector('#portfolio-thumbnail')
        this.projectListSubcontainer = document.querySelector('#project-list-subcontainer')
        this.closeProject = document.querySelector('#close-project')
        this.projectParagraph = document.querySelector('#project-paragraph')
        this.projectLinks = document.querySelector('#project-links')
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
        this.etutorThumbnail.addEventListener('click', this.etutorInfo.bind(this))
        this.portfolioThumbnail.addEventListener('click', this.portfolioInfo.bind(this))
        this.closeProject.addEventListener('click', this.projectAnimation.bind(this))
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
        window.scrollTo({ top: this.sectionHeight, left: 0, behavior: 'smooth' })
    }

    projectsScroll() {
        window.scrollTo({ top: (2 * this.sectionHeight), left: 0, behavior: 'smooth' })
    }

    contactScroll() {
        window.scrollTo({ top: (3 * this.sectionHeight), left: 0, behavior: 'smooth' })
    }

    etutorInfo() {
        this.projectAnimation()
        this.projectParagraph.innerText = 'eTutor is about connecting its users from around the globe and allowing them to tutor different languages to each other using video chat. This is a backend heavy project that uses Javascript, Python, Django, the Twilio API, and NodeJS. I was given two weeks to complete eTutor as my final project at Momentum Learning; it was a group project that was created remotely with my two partners Austin Smith and Asel Zhusupova. Last updated April 2020.'
        this.projectLinks.innerHTML = "<a href='https://e-tutor-momentum.herokuapp.com/' class='link'>visit eTutor</a> <a href='https://github.com/momentum-Tutor/eTutor' class='link'>project GitHub</a>"
    }

    portfolioInfo() {
        this.projectAnimation()
        this.projectParagraph.innerText = 'My portfolio was designed to be simple, but elegent. It is a completely front end project made with pure CSS and Javascript, meant to serve as a more visual and personal representation of my resume. Special care was taken to make my portfolio look good in mobile and various screen formats. Last updated October 2020'
        this.projectLinks.innerHTML = "<a href='https://github.com/dandeboer/portfolio-site' class='link'>project GitHub</a>"
    }

    projectAnimation() {
        this.projectListSubcontainer.classList.toggle('transform-rotateY-180deg')
    }
}

new Animations().setup()