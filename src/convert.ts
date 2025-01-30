class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

type Line = {
    startX: number,
    endX: number,
    y: number,
    length: number
}

const programHeadder = `ClrGraph
ViewWindow 1,127,1,63
AxesOff
GridOff`;

const programLoop = function (startx: number, endX: number, y: number) {
    return `For ${startx+1}->X To ${endX+1}
PxlOn ${y+1},X
Next`
}

export function Convert(pixels: number[], canvasSize: { width: number, height: number })
{

    let BlackPixels: Vector2[] = [];
    for (let i = 0; i < pixels.length; i++)
    {
        if (pixels[i] === 0) {
            BlackPixels.push({
                x: (i) % canvasSize.width,
                y: Math.floor((i) / canvasSize.width)
            })
        }
    }

    let lines: Line[] = []
    let usedPixels: Vector2[] = []

    for (let i = 0; i < BlackPixels.length; i++) {
        if (usedPixels.find(p => p.x === BlackPixels[i].x && p.y === BlackPixels[i].y)) {
            continue
        }

        let x = BlackPixels[i].x
        let y = BlackPixels[i].y

        let startX = x
        let endX = x

        let hasFoundEnd = false
        while (!hasFoundEnd) {
            let pixel = BlackPixels.find(p => p.x === x && p.y === y)
            if (pixel) {
                usedPixels.push(pixel)
                endX = x
            } else {
                hasFoundEnd = true
            }

            x++
        }
        
        lines.push({
            startX,
            endX,
            y,
            length: endX - startX
        })

    }

    let program = programHeadder + "\n"
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        if (line.length > 2)
        {
            program += programLoop(line.startX, line.endX, line.y) + "\n"
        } else {
            for (let x = line.startX; x <= line.endX; x++) {
                program += `PxlOn ${line.y+1},${x+1}\n`
            }
        }
    }

    return program;
}