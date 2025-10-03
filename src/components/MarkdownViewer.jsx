import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaBars, FaTimes } from 'react-icons/fa';
// Import the markdown content as strings
import { privacyPolicyContent, termsAndConditionsContent, childSafetyContent } from '../utils/markdownContent';

const MarkdownViewer = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { type } = useParams();
  
  useEffect(() => {
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        let title = '';
        
        if (type === 'privacy') {
          title = 'Privacy Policy';
          setContent(privacyPolicyContent);
        } else if (type === 'terms') {
          title = 'Terms and Conditions';
          setContent(termsAndConditionsContent);
        }else if(type === 'child-safety'){
          title = 'Child Safety Standards';
          setContent(childSafetyContent);
        } else {
          throw new Error('Invalid document type');
        }
        
        document.title = `STRMLY | ${title}`;
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMarkdown();
  }, [type]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 space-y-4 md:space-y-0">
          <Link to="/" className="flex items-center space-x-2 md:space-x-4 group">
            <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-gray-500/50 transition-all duration-300">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/153/153194.png"
                alt="Paperclip"
                className="w-5 h-5 md:w-7 md:h-7 filter invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-wide text-white group-hover:text-gray-200 transition-colors duration-200">
              STRMLY
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link to="/" className="px-4 py-2 md:px-5 md:py-2.5 text-sm border border-gray-700 rounded-lg font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 hover:bg-white/5">
              Back to Home
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/30 hover:bg-white/10 transition-all z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-4 h-4 text-gray-300" />
              ) : (
                <FaBars className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Dropdown */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-screen w-full z-40 ${
            mobileMenuOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Solid black backdrop that covers the whole screen */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Actual dropdown menu */}
          <div 
            className={`absolute top-[80px] right-4 w-[200px] transition-all duration-300 ease-in-out ${
              mobileMenuOpen 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black text-white border border-gray-700/50 rounded-lg shadow-lg overflow-hidden">
              <div className="py-2 px-1">
                <Link 
                  to="/" 
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/legal/privacy" 
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/legal/terms" 
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 pb-4 border-b border-gray-700/50">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-red-400 py-8 text-center">
              <p className="mb-4 text-lg md:text-xl">Error loading content</p>
              <p className="text-sm md:text-base">{error}</p>
            </div>
          ) : (
            <div className="markdown-content prose prose-invert prose-sm md:prose-base max-w-none text-sm md:text-base">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-xs md:text-sm mt-8 md:mt-12">
          © {new Date().getFullYear()} STRMLY. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;
