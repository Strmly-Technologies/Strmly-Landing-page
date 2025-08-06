import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// Import the markdown content as strings
import { privacyPolicyContent, termsAndConditionsContent } from '../utils/markdownContent';

const MarkdownViewer = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
        
        {/* Content */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-700/50">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-red-400 py-8 text-center">
              <p className="mb-4 text-xl">Error loading content</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="markdown-content prose prose-invert prose-sm md:prose-base max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
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

export default MarkdownViewer;
     