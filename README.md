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

[Add your license information here]