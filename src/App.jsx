import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FaGooglePlay, FaInstagram, FaLinkedinIn, FaEnvelope, FaBars, FaTimes, FaApple } from 'react-icons/fa';
import MarkdownViewer from './components/MarkdownViewer';
import CertificateViewer from './components/CertificateViewer';

// Main landing page component
const StrmlyLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle link clicks
  const handleLinkClick = (e, linkType) => {
    // Prevent default link behavior
    e.preventDefault();

    // Close mobile menu when navigating
    setMobileMenuOpen(false);

    // Navigate to appropriate routes for privacy and terms links
    if (linkType === 'Privacy Policy' || linkType === 'Privacy') {
      navigate('/legal/privacy');
    } else if (linkType === 'Terms of Service' || linkType === 'Terms') {
      navigate('/legal/terms');
    }else if( linkType==='Child Safety' || linkType==='Child Safety'){
      navigate('/legal/child-safety');
    }
    else if (linkType === 'Instagram') {
      window.open('https://www.instagram.com/strmly_', '_blank');
    } else if (linkType === 'LinkedIn') {
      window.open('https://www.linkedin.com/company/strmly/posts/?feedView=all', '_blank');
    } else if (linkType === 'Email') {
      window.open('mailto:team@strmly.com', '_blank');
    } else if (linkType === 'MSME') {
      navigate('/certificate/msme');
    } else if (linkType === 'DPIIT') {
      navigate('/certificate/dpiit');
    }
    else if(linkType === 'AppStore') {
      // Show coming soon modal for App Store
      setShowComingSoonModal(true);
    }
    else if(linkType==='Download'){
      window.open('https://play.google.com/store/apps/details?id=com.anonymous.strmly');
    } else {
      // Show launch modal for other links
      setShowLaunchModal(true);
    }
  };

  // Close the modal
  const closeLaunchModal = () => {
    setShowLaunchModal(false);
  };

  const closeComingSoonModal = () => {
    setShowComingSoonModal(false);
  };

  // Prevent background scroll while coming-soon modal is open
  useEffect(() => {
    if (showComingSoonModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showComingSoonModal]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle email submission
  const handleEmailSubmit = (email) => {
    // Here you would typically save the email to your backend
    console.log('Email submitted:', email);
    // For this example, we're just closing the modal
    closeLaunchModal();
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Modern grid background with subtle gradient */}
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

      {/* Header - Responsive SaaS style */}
      <header className={`relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-10 py-6 md:py-8 border-b border-gray-800/30 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Top row with logo and mobile menu button */}
        <div className="w-full flex justify-between items-center">
          {/* Enhanced Logo with Paperclip */}
          <div className="flex items-center space-x-2 md:space-x-4 group cursor-pointer" onClick={(e) => handleLinkClick(e, 'Home')}>
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {['Sign-up', 'Log-in', 'Terms', 'Privacy', 'Child Safety'].map((item, index) => (
              <button
                key={item}
                onClick={(e) => handleLinkClick(e, item)}
                className={`px-5 py-2.5 text-sm border-gray-300 rounded-full font-medium text-gray-300 hover:text-white border border-transparent hover:border-gray-700 transition-all duration-300 hover:bg-white/5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/30 hover:bg-white/10 transition-all z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-5 h-5 text-gray-300" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-screen w-full z-40 ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Semi-transparent backdrop that covers the whole screen */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        {/* Actual dropdown menu */}
        <div 
          className={`absolute top-[60px] right-4 w-[200px] transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-black opacity-100 text-white backdrop-blur-md border border-gray-700/50 rounded-lg shadow-lg overflow-hidden">
            <div className="py-2 px-1">
              {['Sign-up', 'Log-in', 'Terms', 'Privacy, Child Safety'].map((item) => (
                <button
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLinkClick(e, item);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-between"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive SaaS style */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] md:min-h-[65vh] px-4 md:px-8 pt-8 md:pt-12">
        {/* Hero Text - Responsive Typography */}
        <div className={`text-center max-w-5xl mx-auto mb-12 md:mb-16 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 md:mb-8">
            <span className="block text-3xl sm:text-4xl md:text-7xl text-white leading-tight">
              India's first <span className="text-gray-400">blockchain</span> based
            </span>
            <span className="block text-white mt-2 text-3xl sm:text-4xl md:text-7xl leading-tight">
              social media platform
            </span>
          </h1>
          
          <p className={`text-base md:text-xl text-gray-400 mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed px-4 ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            Experience the future of social networking with blockchain technology, 
            complete transparency, and user-owned content.
          </p>
        </div>

        {/* Responsive App Store + Google Play Buttons */}
        <div className={`mb-16 md:mb-24 flex flex-col sm:flex-row gap-4 justify-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          {/* Google Play Button */}
          <button 
            className="group flex items-center space-x-3 md:space-x-5 px-6 md:px-10 py-4 md:py-5 bg-gray-900 text-white rounded-xl border border-gray-700/50 hover:border-gray-500 transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
            onClick={(e) => handleLinkClick(e, 'Download')}
          >
            <div className="p-2 md:p-2.5 bg-green-600 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
              <FaGooglePlay className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Get it on</div>
              <div className="text-lg md:text-xl font-bold text-white">Google Play</div>
            </div>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* App Store Button */}
          <button 
            className="group flex items-center space-x-3 md:space-x-5 px-6 md:px-10 py-4 md:py-5 bg-gray-900 text-white rounded-xl border border-gray-700/50 hover:border-gray-500 transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
            onClick={(e) => handleLinkClick(e, 'AppStore')}
          >
            <div className="p-2 md:p-2.5 bg-black rounded-lg group-hover:bg-gray-800 transition-colors duration-300">
              <FaApple className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Get it on</div>
              <div className="text-lg md:text-xl font-bold text-white">App Store</div>
            </div>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </main>

      {/* Responsive Recognition Section */}
      <section className={`relative z-10 px-4 md:px-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12 lg:space-x-24">
          {/* MSME Recognition */}
          <div className="text-center group cursor-pointer" onClick={(e) => handleLinkClick(e, 'MSME')}>
            <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 md:mb-5 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-gray-500/50 transition-all duration-300 group-hover:scale-105">
              <img 
                src="/msme-logo.png" 
                alt="MSME Logo"
                className="w-28 h-28 md:w-40 md:h-40 rounded-md object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            <p className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
              Recognized by Udyam as <br />
              <span className="font-semibold text-white">MSME</span>
            </p>
          </div>
          
          {/* DPIIT Recognition */}
          <div className="text-center group cursor-pointer" onClick={(e) => handleLinkClick(e, 'DPIIT')}>
            <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 md:mb-5 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-gray-500/50 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
              <img 
                src="/dpiit-logo.png" 
                alt="DPIIT Logo"
                className="w-28 h-28 md:w-40 md:h-40 rounded-md object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            <p className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
              Recognized by DPIIT<br />
              <span className="font-semibold text-orange-500">#startupindia</span>
            </p>
          </div>

          {/* Make in India */}
          <div className="text-center group cursor-pointer">
            <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 md:mb-5 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-gray-500/50 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
              <img 
                src="/made-in-india-logo.png" 
                alt="Made in India Logo"
                className="w-28 h-28 md:w-40 md:h-40 rounded-md object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            <p className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
              100% Research, Developed and<br />
              <span className="font-semibold text-white">Designed in India</span>
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Footer */}
      <footer className="relative z-10 mt-12 md:mt-16 border-t border-gray-800/30 bg-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Company Information */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4 md:mb-6 text-white">STRMLY</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                India's first blockchain based social media platform. Building the future of decentralized content sharing.
              </p>
              <div className="flex space-x-4 justify-start">
                <a href="https://www.instagram.com/strmly_" className="w-10 h-10 rounded-full bg-white/5 border border-gray-700/30 flex items-center justify-center hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300" >
                  <FaInstagram className="text-gray-400 hover:text-white transition-colors" />
                </a>
                <a href="https://www.linkedin.com/company/strmly/posts/?feedView=all" className="w-10 h-10 rounded-full bg-white/5 border border-gray-700/30 flex items-center justify-center hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300" >
                  <FaLinkedinIn className="text-gray-400 hover:text-white transition-colors" />
                </a>
                <a href="mailto:team@strmly.com" className="w-10 h-10 rounded-full bg-white/5 border border-gray-700/30 flex items-center justify-center hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300" >
                  <FaEnvelope className="text-gray-400 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 md:mb-6 text-gray-400">Company</h3>
              <ul className="space-y-2 md:space-y-3">
                {['About Us', 'Careers', 'Blog', 'Press'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" onClick={(e) => handleLinkClick(e, item)}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 md:mb-6 text-gray-400">Legal</h3>
              <ul className="space-y-2 md:space-y-3">
                {['Terms of Service', 'Privacy Policy','Child Safety' ,'Cookies', 'Data Processing'].map (item => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" onClick={(e) => handleLinkClick(e, item)}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-4 md:mb-6 text-gray-400">Contact</h3>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, 'Email')}>team@strmly.com</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, 'Phone')}>+91 98765 43210</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleLinkClick(e, 'Location')}>Bengaluru, India</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800/30 text-center text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} STRMLY. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Responsive Launch Modal */}
      {showLaunchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Enhanced Backdrop with blur effect */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeLaunchModal}
          ></div>
          
          {/* Enhanced Modal Content */}
          <div className="relative z-10 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-10 max-w-sm md:max-w-lg w-full animate-modal-appear shadow-2xl shadow-black/50">
            {/* Close Button - Enhanced */}
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
              onClick={closeLaunchModal}
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Enhanced Logo with animation */}
            <div className="flex items-center justify-center mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-gray-500/50 transition-all duration-300 animate-float">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/153/153194.png"
                  alt="Paperclip"
                  className="w-7 h-7 md:w-9 md:h-9 filter invert opacity-80"
                />
              </div>
              <span className="text-2xl md:text-3xl font-bold tracking-wide text-white ml-3 md:ml-4">
                STRMLY
              </span>
            </div>
            
            {/* Enhanced Content */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">🎉 We're Live!</h3>
              
              {/* Gradient divider matching theme */}
              <div className="h-0.5 w-16 md:w-20 bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 mx-auto mb-4 md:mb-6 rounded-full"></div>
              
              <p className="text-lg md:text-xl text-gray-300 mb-3 md:mb-4 leading-relaxed">
                Our blockchain-based social media platform is now available.
              </p>
              <p className="text-gray-400 mb-6 md:mb-10 leading-relaxed text-sm md:text-base">
                Join thousands of users already experiencing the future of social networking.
              </p>
              
              {/* Enhanced Play Store Button matching theme */}
              <div className="mb-6 md:mb-8 flex gap-4 justify-center">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.anonymous.strmly" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-3 md:space-x-4 px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-xl border border-gray-700/50 hover:border-gray-500 transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                >
                  <div className="p-1.5 md:p-2 bg-green-600 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                    <FaGooglePlay className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Download on</div>
                    <div className="text-sm md:text-lg font-bold text-white">Google Play</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>

                <button
                  onClick={(e) => handleLinkClick(e, 'AppStore')}
                  className="group inline-flex items-center space-x-3 md:space-x-4 px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-xl border border-gray-700/50 hover:border-gray-500 transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                >
                  <div className="p-1.5 md:p-2 bg-black rounded-lg group-hover:bg-gray-800 transition-colors duration-300">
                    <FaApple className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Download on</div>
                    <div className="text-sm md:text-lg font-bold text-white">App Store</div>
                  </div>
                </button>
              </div>
              
              {/* Enhanced dismiss button */}
              <button 
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
                onClick={closeLaunchModal}
              >
                Continue browsing →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Modal for App Store */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop: stronger blur + semi-opaque layer */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeComingSoonModal}
            aria-hidden="true"
          />
          
          <div className="relative z-[100000] bg-gray-900/95 border border-gray-700/50 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={closeComingSoonModal}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg">
                <FaApple className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-300 mb-4">We're working on the iOS release. The App Store version will be available soon.</p>
            <button onClick={closeComingSoonModal} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Close</button>
          </div>
        </div>
      )}

      {/* Enhanced CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-modal-appear {
          animation: modalAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .text-gradient-pink-purple {
          background-image: linear-gradient(90deg, #f472b6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Add styles for markdown content */
        .markdown-content h1 {
          font-size: 1.8rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(107, 114, 128, 0.3);
        }
        
        .markdown-content h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .markdown-content h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .markdown-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        .markdown-content ul, .markdown-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .markdown-content li {
          margin-bottom: 0.5rem;
        }
        
        .markdown-content a {
          color: #93c5fd;
          text-decoration: underline;
        }
        
        .markdown-content blockquote {
          border-left: 4px solid #4b5563;
          padding-left: 1rem;
          font-style: italic;
          margin: 1rem 0;
        }
        
        .markdown-content code {
          background-color: rgba(75, 85, 99, 0.3);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
        
        .markdown-content pre {
          background-color: rgba(31, 41, 55, 0.5);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

// Root component with routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StrmlyLanding />} />
        <Route path="/legal/:type" element={<MarkdownViewer />} />
        <Route path="/certificate/:type" element={<CertificateViewer />} />
      </Routes>
    </Router>
  );
};

export default App;