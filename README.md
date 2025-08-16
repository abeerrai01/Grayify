# Grayify

A modern React web application that allows users to upload images from their local system and convert them to grayscale using the same algorithm as your Python code.

## Features

- 🖼️ **Image Upload**: Drag and drop or click to upload images
- 🎨 **Grayscale Conversion**: Uses the same coefficients as your Python code (0.2989 * R + 0.5870 * G + 0.1140 * B)
- 💾 **Download**: Download both original and grayscale images
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Processing**: Instant conversion using HTML5 Canvas
- 🎯 **Modern UI**: Beautiful gradient design with smooth animations
- ✨ **Grayify Magic**: Transform your images with professional-grade conversion

## Algorithm

The grayscale conversion uses the same coefficients as your Python code:
```javascript
gray = 0.2989 * R + 0.5870 * G + 0.1140 * B
```

This is the standard luminance formula that gives the most accurate grayscale representation of color images.

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to experience Grayify!

## Usage

1. **Upload an Image**:
   - Click the upload area to select a file, or
   - Drag and drop an image file onto the upload area

2. **View Results**:
   - The original image will be displayed on the left
   - The grayscale version will be displayed on the right

3. **Download Images**:
   - Click "Download Original" to save the original image
   - Click "Download Grayscale" to save the converted image

4. **Upload New Image**:
   - Click "Upload New Image" to start over with Grayify

## Supported File Types

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- WebP (.webp)

## Technical Details

- **Frontend**: React 18 with Hooks
- **Image Processing**: HTML5 Canvas API
- **Styling**: CSS3 with modern gradients and animations
- **File Handling**: File API and Blob URLs
- **Responsive Design**: CSS Grid and Flexbox
- **Brand**: Grayify - Professional Image Transformation

## File Structure

```
src/
├── App.js          # Main application component
├── App.css         # Component-specific styles
├── index.js        # Application entry point
└── index.css       # Global styles

public/
└── index.html      # HTML template

package.json         # Dependencies and scripts
README.md           # This file
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Images are processed entirely in the browser using HTML5 Canvas
- No server-side processing required
- Fast conversion even for large images
- Memory efficient with automatic cleanup
- Grayify's optimized algorithms ensure lightning-fast processing

## Customization

You can easily customize the grayscale coefficients by modifying the `convertToGrayscale` function in `App.js`:

```javascript
const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
```

Grayify uses the industry-standard luminance formula for the most accurate grayscale conversion.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
