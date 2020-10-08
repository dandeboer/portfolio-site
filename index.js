class Animations {
    constructor() {
        this.time = 0
        this.description = document.querySelector('.home-description')
        this.listOfDescriptions = ['am a hard worker', 'learn quickly', 'want you to check out my LinkedIn', 'am a kind and friendly person', 'work well in a team', 'love to do a good job', 'am a creative problem solver']
        this.usedDescriptions = ['love cats', 'think analytically', 'have 11 flanel shirts']
    }
    async homeDescription() {
        await new Promise(r => setTimeout(r, 3000));
        if (this.time == 3) {
            this.description.innerText = "am a Full Stack Web Developer"
            this.time = 0
            this.homeDescription()
        }
        else {
            let randomDescription = Math.floor(Math.random() * this.listOfDescriptions.length)
            this.description.innerText = this.listOfDescriptions[randomDescription]
            this.usedDescriptions.push(this.listOfDescriptions[randomDescription])
            this.listOfDescriptions.splice(randomDescription, 1, this.usedDescriptions[0])
            this.usedDescriptions.shift()
            this.time++
            this.homeDescription()
        }
    }
    descriptionAnimation() {

    }
}

new Animations().homeDescription()


// make it so that the part of the website you are on is underlined in the nav bar while you are in it