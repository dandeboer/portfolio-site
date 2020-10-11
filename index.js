class Animations {
    constructor() {
        this.time = 0
        this.homeDescription1 = document.querySelector('#home-description-1')
        this.homeDescription2 = document.querySelector('#home-description-2')
        this.descriptionShown = 1
        this.listOfDescriptions = ['am a hard worker', 'want you to check out my LinkedIn', 'am a kind and friendly person', 'work well in a team', 'love to do a good job', 'am a creative problem solver']
        this.usedDescriptions = ['love cats', 'learn quickly', 'have 11 flanel shirts']
    }
    async homeDescriptionText() {
        await new Promise(r => setTimeout(r, 3500))
        this.homeDescriptionAnimation()
        if (this.time == 3) {
            if (this.descriptionShown == 1) {
                this.homeDescription2.innerText = "am a Full Stack Web Developer"
                this.descriptionShown = 2
            }
            else {
                this.homeDescription1.innerText = "am a Full Stack Web Developer"
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



new Animations().homeDescriptionText()

function getViewportHeight() {
    console.log(window.innerHeight)
}

getViewportHeight()

// make it so that the part of the website you are on is underlined in the nav bar while you are in it