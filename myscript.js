/*
Implement Langton's Ant, with visual output.

```
  There's an ant on an infinite 2d grid, each square is initially white, but can be flipped to black.
  The ant moves based on the color of the square it's on:
    On a white square, turn 90° CW, flip square color, move forward one unit
    On a black square, turn 90° CCW, flip square color, move forward one unit

  Simulate the ant's movements, and if there is time attempt to render the board.
```
- */

const c = document
    .getElementById('canvas')
    .getContext('2d')

c.canvas.width = document.body.clientWidth
c.canvas.height = document.body.clientHeight

console.log(c)
class Ant {
    constructor(xMax, yMax) {
        this.x = Math.floor(Math.random() * xMax)
        this.y = Math.floor(Math.random() * yMax)
        this.xMax = xMax
        this.yMax = yMax
        this.direction = 'NORTH'
    }

    nextStep(isActive) {
        (isActive) ? this.turnCounterClockwise() : this.turnClockwise()
        this.move()
        if(this.x > this.xMax) this.x = 0
        if(this.x < 0) this.x = this.xMax
        if(this.y > this.yMax) this.y = 0
        if(this.y < 0) this.y = this.yMax
    }

    move(){
        switch (this.direction) {
            case 'NORTH':
                this.y += 1
                break;
            case 'EAST':
                this.x += 1
                break;
            case 'SOUTH':
                this.y -= 1
                break;
            case 'WEST':
                this.x -= 1
            default:
                break;
        }
    }

    turnClockwise() {
        switch (this.direction) {
            case 'NORTH':
                this.direction = 'EAST'
                break;
            case 'EAST':
                this.direction = 'SOUTH'
                break;
            case 'SOUTH':
                this.direction = 'WEST'
                break;
            case 'WEST':
                this.direction = 'NORTH'
                break;
            default:
                break;
        }
    }

    turnCounterClockwise() {
        switch (this.direction) {
            case 'NORTH':
                this.direction = 'WEST'
                break;
            case 'EAST':
                this.direction = 'NORTH'
                break;
            case 'SOUTH':
                this.direction = 'EAST'
                break;
            case 'WEST':
                this.direction = 'SOUTH'
                break;
            default:
                break;
        }
    }
}

class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.isActive = false
    }

    drawRect = (x, y, tileWidth, tileHeight, fillColor, strokeColor) => {
        c.lineWidth = 0.05
        c.fillStyle = fillColor
        c.fillRect(x, y, tileWidth, tileHeight)
        c.strokeStyle = strokeColor
        c.strokeRect(x, y, tileWidth, tileHeight)
    }
}

const canvasWidth = c.canvas.width
const canvasHeight = c.canvas.height

const widthCount = 100
const heightCount = 100
const tileWidth = (canvasWidth / widthCount)
const tileHeight = (canvasHeight / heightCount)

const tileStates = {}

for (let i = 0; i < widthCount; i++) {
    for (let j = 0; j < widthCount; j++) {
        const tile = new Tile(i, j)
        tile.drawRect(i * tileWidth,j * tileHeight, tileWidth, tileHeight, '#fff', '#000')
        const key = `${i},${j}`
        tileStates[key] = tile
    }
}

const ant = new Ant(widthCount - 1, heightCount - 1)

setInterval(() => {
    let currTile = tileStates[`${ant.x},${ant.y}`]
    let isCurrTileActive = currTile.isActive
    if (!isCurrTileActive) {
        currTile.isActive = true
        currTile.drawRect(ant.x * tileWidth, ant.y * tileHeight, tileWidth, tileHeight, '#000', '#000')
    }
    if (isCurrTileActive) {
        currTile.isActive = false
        currTile.drawRect(ant.x * tileWidth, ant.y * tileHeight, tileWidth, tileHeight, '#fff', '#000')
    }
    ant.nextStep(isCurrTileActive)
}, 10)