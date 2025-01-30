class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export function runEffects(offscreen: OffscreenCanvas, displayCtx: CanvasRenderingContext2D, brightness: number, contrast: number)
{
    // grab the image from the offscreen canvas and render the modified image to the onscreen canvas
    let pixelData: number[] = [];
    
    contrast = Math.pow((contrast + 100) / 100, 2);
    brightness = brightness * 2.55;

    let offScreenData = offscreen.getContext("2d");

    let imgData = offScreenData!.getImageData(0, 0, offscreen.width, offscreen.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
        let r = imgData.data[i];
        let g = imgData.data[i + 1];
        let b = imgData.data[i + 2];

        // apply brightness and contrast
        r = r * contrast + brightness;
        g = g * contrast + brightness;
        b = b * contrast + brightness;

        // clamp values
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        let grayScale = r * 0.3 + g * 0.59 + b * 0.11;

        if (imgData.data[i + 3] === 0) {
            grayScale = 255;
        }

        pixelData.push(grayScale);
    }

    
    // apply floid-steinberg dithering
    for (let i = 0; i < imgData.data.length; i += 1) {
        let oldPixel = pixelData[i];
        let newPixel = oldPixel > 128 ? 255 : 0;
        let quant_error = oldPixel - newPixel;
        
        pixelData[i] = newPixel;
        
        let nabouringPixels = [
            new Vector2(1, 0),
            new Vector2(-1, 1),
            new Vector2(0, 1),
            new Vector2(1, 1)
        ]
        
        for (let j = 0; j < nabouringPixels.length; j++) {
            let nabouringPixel = nabouringPixels[j]
            let nabouringPixelIndex = i + (nabouringPixel.y * offscreen.width + nabouringPixel.x)
    
            
            if (nabouringPixelIndex < 0 || nabouringPixelIndex > offscreen.width * offscreen.height) {
                continue
            }
                        
            pixelData[nabouringPixelIndex] += quant_error * (2 / 16);
        }
    }
    
    // remove any extra data from the pixelData array, it should be x*y in length
    pixelData = pixelData.slice(0, offscreen.width * offscreen.height);
    
    // render the modified image to the onscreen canvas
    //ctx.clearRect(0, 0, offscreen.width, offscreen.height);
    displayCtx.fillStyle = `rgb(255, 255, 255)`;
    displayCtx.fillRect(0, 0, offscreen.width, offscreen.height);

    for (let i = 0; i < pixelData.length; i++) {
        let x = i % offscreen.width;
        let y = Math.floor(i / offscreen.width);

        //console.log(pixelData[i], x, y);

        displayCtx.fillStyle = `rgb(${pixelData[i]}, ${pixelData[i]}, ${pixelData[i]})`;
        displayCtx.fillRect(x, y, 1, 1);
    }

    return pixelData;
}