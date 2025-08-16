import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [grayscaleImage, setGrayscaleImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);
  const [conversionProgress, setConversionProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Auto-hide features after first upload
  useEffect(() => {
    if (originalImage && showFeatures) {
      const timer = setTimeout(() => setShowFeatures(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [originalImage, showFeatures]);

  // Convert image to grayscale using the same algorithm as your Python code
  const convertToGrayscale = (imageData) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create a temporary image to get dimensions
    const img = new Image();
    img.src = imageData;
    
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const totalPixels = data.length / 4;
        let processedPixels = 0;
        
        // Convert to grayscale using the same coefficients as your Python code
        // 0.2989 * R + 0.5870 * G + 0.1140 * B
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
          
          data[i] = gray;     // Red
          data[i + 1] = gray; // Green
          data[i + 2] = gray; // Blue
          // Alpha channel remains unchanged
          
          processedPixels++;
          if (processedPixels % 1000 === 0) {
            setConversionProgress((processedPixels / totalPixels) * 100);
          }
        }
        
        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to blob and create URL
        canvas.toBlob((blob) => {
          const grayscaleUrl = URL.createObjectURL(blob);
          setConversionProgress(100);
          resolve(grayscaleUrl);
        }, 'image/jpeg', 0.9);
      };
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please select an image smaller than 10MB.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setConversionProgress(0);
    
    try {
      // Create URL for original image
      const originalUrl = URL.createObjectURL(file);
      setOriginalImage(originalUrl);
      
      // Convert to grayscale
      const grayscaleUrl = await convertToGrayscale(originalUrl);
      setGrayscaleImage(grayscaleUrl);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
      setConversionProgress(0);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetImages = () => {
    if (originalImage) URL.revokeObjectURL(originalImage);
    if (grayscaleImage) URL.revokeObjectURL(grayscaleImage);
    setOriginalImage(null);
    setGrayscaleImage(null);
    setError(null);
    setShowFeatures(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const features = [
    {
      icon: '🎨',
      title: 'Smart Conversion',
      desc: 'Uses professional luminance formula for accurate grayscale'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      desc: 'Real-time processing with HTML5 Canvas technology'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      desc: 'Works perfectly on all devices and screen sizes'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      desc: 'All processing happens locally in your browser'
    }
  ];

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="Grayify Logo" className="logo-image" />
        <h1 className="app-title">Grayify</h1>
      </div>
      
      {showFeatures && !originalImage && (
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-desc">{feature.desc}</div>
            </div>
          ))}
        </div>
      )}
      
              <div className="upload-section">
          <div className="upload-header">
            <img src="/logo.png" alt="Grayify" className="upload-logo" />
            <h2>Transform Your Images</h2>
          </div>
          <div
            className={`upload-area ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div className="upload-icon">📁</div>
            <div className="upload-text">Click to upload or drag and drop</div>
            <div className="upload-hint">Supports: JPG, PNG, GIF, BMP, WebP (Max: 10MB)</div>
          </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="file-input"
        />
        
        {error && <div className="error">{error}</div>}
        
        {isLoading && (
          <div className="loading">
            Processing image... {conversionProgress > 0 && `${Math.round(conversionProgress)}%`}
          </div>
        )}
      </div>

      {(originalImage || grayscaleImage) && (
        <div className="images-container">
          {originalImage && (
            <div className="image-card">
              <div className="image-title">
                <img src="/logo.png" alt="Grayify" className="card-logo" />
                Original Image
              </div>
              <img
                src={originalImage}
                alt="Original"
                className="image-display"
              />
              <button
                className="download-btn"
                onClick={() => downloadImage(originalImage, 'grayify_original.jpg')}
              >
                💾 Download Original
              </button>
            </div>
          )}
          
          {grayscaleImage && (
            <div className="image-card">
              <div className="image-title">
                <img src="/logo.png" alt="Grayify" className="card-logo" />
                Grayscale Image
              </div>
              <img
                src={grayscaleImage}
                alt="Grayscale"
                className="image-display"
              />
              <button
                className="download-btn"
                onClick={() => downloadImage(grayscaleImage, 'grayify_grayscale.jpg')}
              >
                🎨 Download Grayscale
              </button>
            </div>
          )}
        </div>
      )}

      {(originalImage || grayscaleImage) && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="reset-btn"
            onClick={resetImages}
          >
            🔄 Upload New Image
          </button>
        </div>
      )}

      {!originalImage && !grayscaleImage && (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'white', opacity: 0.8 }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            Transform your colorful images into stunning grayscale masterpieces with Grayify! ✨
          </p>
          <p style={{ fontSize: '0.9rem' }}>
            Simply upload an image above to get started
          </p>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Grayify</h3>
            <p>Transform your images into stunning grayscale masterpieces</p>
          </div>
          <div className="footer-section">
            <h4>Developer</h4>
            <p>👨‍💻 Abeer Rai</p>
            <a href="mailto:theabeerrai@gmail.com" className="footer-email">
              📧 theabeerrai@gmail.com
            </a>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>🎨 Professional Grayscale Conversion</li>
              <li>⚡ Real-time Processing</li>
              <li>📱 Mobile Friendly</li>
              <li>🔒 Privacy First</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Grayify. Made with ❤️ by Abeer Rai</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
