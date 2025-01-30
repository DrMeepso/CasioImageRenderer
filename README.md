# Casio Calculator Image Converter

A web application that converts images into Casio calculator-compatible format. This tool allows you to transform regular images into pixel art that can be displayed on Casio calculators.

## Features

- Image resizing to 126x62 pixels (Casio calculator screen size)
- Contrast and brightness adjustment
- Floyd-Steinberg dithering for better image quality
- Automatic conversion to calculator-compatible code
- File download functionality

## Usage

1. Upload an image using the file picker
2. Adjust contrast and brightness sliders as needed
3. Click "Calculate" to convert the image
4. Click "Save" to download the calculator code file
5. Transfer the code to your Casio calculator

## Technical Details

- Built with Svelte and TypeScript
- Uses HTML Canvas for image processing
- Implements Floyd-Steinberg dithering algorithm
- Generates optimized code for Casio calculators
- Supports file names up to 8 characters (Casio fx-9750GII limitation)

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev
```

## License
```
Copyright (c) 2025 Meepso

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
```
