const cv = document.querySelector("canvas")
const ctx = cv.getContext("2d")
const width = cv.width = 800
const height = cv.height = 400
var loose = false
var already = true
var points=0

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min
    if(num!==0{
    return num
    }else{
    return random(min,max)
    }
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
        this.sizeY = 60
        this.color = color
    }
    render() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY)
    }
    controls(){
        window.onkeydown = (k) => {
            if (k.key === "w") {
                if ((this.y - this.sizeY) > -60) {
                    this.y -= this.velY
                }
                console.log('y: ' + this.y)
                console.log('sizeY: ' + this.sizeY)
                console.log((this.y - this.sizeY))
            }if (k.key === "s") {
                if ((this.y + this.sizeY) < height) {
                    this.y += this.velY
                }
                console.log((this.y + this.sizeY))
            }
            if (k.key === "q") {
                this.y += 50
            }if (k.key === "e") {
                this.y -= 50
            }
            if (k.key === " ") {
                if (already === true) {
                    already = false
                } else if (already === false) {
                    already = true
                    loop()
                }
            }
        }
    }
}
class Player2 extends Player {
    constructor(x, y, velX, velY, color, variable) {
        super(x, y, velX, velY, color)
        this.variable=variable
    }
    controls(){
        if(b1.y+this.variable > this.y){
            this.y+=this.velY
        }
        if(b1.y+this.variable < this.y){
            this.y-=this.velY
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
            points++
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX)
            alert('you lose!')
            window.location.reload()
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
var velXBall = random(-2,2)
var velYBall = random(-2,2)
var vYBall = velYBall
var vXBall = velXBall

var j1 = new Player(0, 200, 0, 5, "red")
var j2 = new Player2(width-10, 200, 0, 5, "purple", random(-5,5))
var b1 = new Ball(width / 2, height / 2, velXBall, velYBall)
function colide() {
    if (b1.x === 10 && (b1.y >= j1.y-1 && b1.y <= j1.y + j1.sizeY+1)) {
        if(b1.velX <=3){
            b1.velX = -(b1.velX-1)     //(b1.velX+random(1,2))
            b1.velY = -(b1.velY-1)     //(b1.velY+random(-2,2))
        }else if(b1.x >= 4){
            b1.velX = -(b1.velX)
            b1.velY = -(b1.velY)
        }
        j1.color = "white"
        console.log('colide')
    }if(b1.x === width-10 && (b1.y >= j2.y-1 && b1.y <= j2.y + j2.sizeY+1)) {
        if(b1.velX <=3){
            b1.velX = -(b1.velX+1)     //(b1.velX+random(1,2))
            b1.velY = -(b1.velY+1)     //(b1.velY+random(-2,2))
        }else if(b1.x >= 4){
            b1.velX = -(b1.velX)
            b1.velY = -(b1.velY)
        }    //(b1.velY+random(-2,2))
        console.log('colide')
    }
}
function count(){
    ctx.beginPath()
    ctx.font = "20px Arial"
    ctx.textAlign = "right"
    ctx.fillStyle = "white"
    ctx.fillText(`your points: ${points}`, width, 20)
}

loop()
function loop() {
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height);
        
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillRect(width / 2, 0, 5, height)

    ctx.beginPath()
    ctx.font = "20px Arial"
    ctx.textAlign = "left"
    ctx.fillStyle = "white"
    ctx.fillText("Controls: w, a, s, d and Space for pause", 0, 20)

    j2.variable=random(-4,4)
    colide()
    count()
    b1.move()
    b1.render()
    j1.controls()
    j1.render()
    j2.render()
    j2.controls()

    if (already === true) {
        requestAnimationFrame(loop)
    } else if (already === false) {
        ctx.beginPath()
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(0, 0, width, height);
        ctx.beginPath()
        ctx.font = "40px Arial"
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText("Pause", width / 2, height / 2)
    }
}
