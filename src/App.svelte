<script lang="ts">

    import { onMount } from 'svelte';
    import { runEffects } from './canvasEffects';
    import { Convert } from './convert';
    
    let canvas: HTMLCanvasElement;
    let filePicker: HTMLInputElement;
    let ctx: CanvasRenderingContext2D

    let originalImage = new OffscreenCanvas(126, 62);

    let calculatorScreenSize = {
        width: 126,
        height: 62
    }

    let convertedImage: string = ""
    let imgName: string = ""

    onMount(() => {
        canvas.width = calculatorScreenSize.width;
        canvas.height = calculatorScreenSize.height;

        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        if (canvas == null || filePicker == null) {
            console.error('canvas or filePicker is null!');
            return;
        }

        // when the file is selected, draw the image on the canvas
        filePicker.addEventListener('change', (e) => {
            const file = filePicker.files![0];
            imgName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let offscreenCtx = originalImage.getContext('2d') as OffscreenCanvasRenderingContext2D;
                    offscreenCtx.clearRect(0, 0, calculatorScreenSize.width, calculatorScreenSize.height);
                    offscreenCtx.drawImage(img, 0, 0, calculatorScreenSize.width, calculatorScreenSize.height);
                    update2ndCanvas();

                    // copy the image to the visible canvas
                    ctx.clearRect(0, 0, calculatorScreenSize.width, calculatorScreenSize.height);                
                    runEffects(originalImage, ctx, 0,0);

                    convertedImage = ""
                }
                img.src = reader.result as string;
            }
            reader.readAsDataURL(file);
        })

        let contrast = document.getElementById('contrast') as HTMLInputElement;
        let brightness = document.getElementById('brightness') as HTMLInputElement;

        contrast.addEventListener('input', (e) => {
            runEffects(originalImage, ctx, parseInt(contrast.value), parseInt(brightness.value));
            convertedImage = ""
        })

        brightness.addEventListener('input', (e) => {
            runEffects(originalImage, ctx, parseInt(contrast.value), parseInt(brightness.value));
            convertedImage = ""
        })

    })

    function update2ndCanvas()
    {
        let canvas2 = document.getElementById('AlwaysCanvas') as HTMLCanvasElement;
        canvas2.width = calculatorScreenSize.width;
        canvas2.height = calculatorScreenSize.height;
        let ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
        
        // draw the original image
        ctx2.clearRect(0, 0, calculatorScreenSize.width, calculatorScreenSize.height);
        ctx2.drawImage(originalImage, 0, 0, calculatorScreenSize.width, calculatorScreenSize.height);
    }

    function calculate() {
        let contrast = document.getElementById('contrast') as HTMLInputElement;
        let brightness = document.getElementById('brightness') as HTMLInputElement;

        let pixels = runEffects(originalImage, ctx, parseInt(contrast.value), parseInt(brightness.value));
        let converted = Convert(pixels, calculatorScreenSize);
        convertedImage = converted;
    }

    function download()
    {
        let a = document.createElement('a');
        a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(convertedImage);
        a.download = `${prompt("What should the file be called?")!.slice(0,7)}.txt`; // the max file name length is 8 on the casio fx-9750GIII
        a.click();
    }

    // given the convertedImage return in KB the size of the string
    function getStringSize()
    {
        return (new TextEncoder().encode(convertedImage).length / 1024).toFixed(2);
    }

</script>

<main>
    <div id="contentHolder">
        <h2>Casio Calculator Image Util</h2>
        <div id="canvasHolder">
            <canvas id="PreviewCanvas" bind:this={canvas}></canvas>
            <div id="controllHolder">
                <input type="range" min="-100" max="100" step="1" value="0" id="contrast" />
                <label for="contrast">Contrast</label>
                <input type="range" min="-50" max="50" step="1" value="0" id="brightness" />
                <label for="brightness">Brightness</label>
            </div>
            <canvas id="AlwaysCanvas"></canvas>
        </div>
        <div style="justify-content: center; display: flex; flex-direction: column; gap: 5px;">
            <br>
            <input type="file" accept="image/*" bind:this={filePicker} />
            <button onclick="{calculate}">Calculate</button>
            {#if convertedImage != ""}
                <button onclick="{download}">Save {getStringSize()}kb</button>
            {:else}
                <button disabled>Save</button>
            {/if}
        </div>
    </div>
</main>

<style>

    #contentHolder {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    canvas {
        border: 1px solid black;
        aspect-ratio: 126 / 62;
        width: calc(126px * 2);
        image-rendering: pixelated;
        border-radius: 5px;
    }
    #canvasHolder{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    #controllHolder{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
</style>
