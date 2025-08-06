import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CertificateViewer = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Set the document title
    document.title = `STRMLY | ${type === 'msme' ? 'MSME Certificate' : 'DPIIT Certificate'}`;
    
    // Define the images based on certificate type
    if (type === 'msme') {
      setImages(['/Udyam Registration Certificate-1-2_page-0001.jpg','/Udyam Registration Certificate-1-2_page-0002.jpg']);
    } else if (type === 'dpiit') {
      setImages(['/DPIIT Startup Certificate_page-0001.jpg']);
    } else {
      // Invalid certificate type, navigate back to home
      navigate('/');
    }
  }, [type, navigate]);
  
  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Modern grid background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black opacity-80"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-gray-500/50 transition-all duration-300">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/153/153194.png"
                alt="Paperclip"
                className="w-7 h-7 filter invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <span className="text-2xl font-bold tracking-wide text-white group-hover:text-gray-200 transition-colors duration-200">
              STRMLY
            </span>
          </Link>
          
          <Link to="/" className="px-5 py-2.5 text-sm border border-gray-700 rounded-lg font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 hover:bg-white/5">
            Back to Home
          </Link>
        </div>
        
        {/* Certificate Content */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-700/50">
            {type === 'msme' ? 'MSME Certificate' : 'DPIIT Certificate'}
          </h1>
          
          {images.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="relative mb-6 max-w-full">
                <img 
                  src={images[currentIndex]} 
                  alt={`${type === 'msme' ? 'MSME' : 'DPIIT'} Certificate`}
                  className="max-w-full rounded-lg shadow-2xl border border-gray-700/50"
                />
                
                {/* Navigation arrows for DPIIT with multiple images */}
                {images.length > 1 && (
                  <div className="absolute inset-x-0 top-1/2 flex justify-between px-4 -translate-y-1/2">
                    <button 
                      onClick={prevImage}
                      disabled={currentIndex === 0}
                      className={`w-10 h-10 rounded-full bg-black/70 flex items-center justify-center ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/90'}`}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      disabled={currentIndex === images.length - 1}
                      className={`w-10 h-10 rounded-full bg-black/70 flex items-center justify-center ${currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/90'}`}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Page indicator */}
              {images.length > 1 && (
                <div className="flex space-x-2 mt-4">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
              )}
              
              <p className="text-gray-400 mt-6 text-center">
                This is an official {type === 'msme' ? 'MSME' : 'DPIIT'} certificate issued to STRMLY Technologies Pvt. Ltd.
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} STRMLY. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;
