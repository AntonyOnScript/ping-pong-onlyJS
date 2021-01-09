const cv = document.querySelector("canvas")
const ctx = cv.getContext("2d")
const width = cv.width = 400
const height = cv.height = 400
var loose=false
function random(min, max){
    const num = Math.floor(Math.random() * (max - min +1)) + min
    return num
}
class Entity {
    constructor(x, y, velX, velY) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
    }
}
class Player extends Entity {
    constructor(x, y, velX, velY, color) {
        super(x, y, velX, velY)
        this.sizeX = 10
        this.sizeY = 40
        this.color = color
    }
    render() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY)
    }
    controls() {
        window.onkeydown = (k) => {
            if (k.key === "w") {
                if ((this.y - this.sizeY) > -40) {
                    this.y -= this.velY
                }
                console.log('y: ' + this.y)
                console.log('sizeY: ' + this.sizeY)
                console.log((this.y - this.sizeY))
            } else if (k.key === "s") {
                if ((this.y + this.sizeY) < height) {
                    this.y += this.velY
                }
                console.log((this.y + this.sizeY))
            }
        }
    }
}
class Ball extends Entity {
    constructor(x, y, velX, velY) {
        super(x, y, velX, velY)
        this.size = 5
    }
    render() {
        ctx.beginPath()
        ctx.fillStyle = 'yellow'
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
    }
    move() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX)
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX)
            loose=true
        }
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY)
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY)
        }
        this.x += this.velX
        this.y += this.velY
    }
}
var j1 = new Player(0, 10, 0, 10, "red")
var b1 = new Ball(200, 200, random(-3,3) , random(-3,3))
function colide() {
    if(b1.x === 10 && (b1.y >=j1.y && b1.y <= j1.y+40)){
        b1.velX = -b1.velX+.5
        b1.velY = -b1.velY-.5
        j1.color = "white"
        console.log('colide')
    }
}

loop()

function loop() {
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height);
    if(loose===true){
        alert('bye bye')
        window.location.reload()
    }else{
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillRect(width / 2, 0, 5, height)
    colide()
    b1.move()
    b1.render()
    j1.controls()
    j1.render()
    requestAnimationFrame(loop)
    }
}
