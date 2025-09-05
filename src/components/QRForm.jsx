import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QRForm = ({
  qrOpacity, setQrOpacity,
  value, setValue,
  size, setSize,
  fgColor, setFgColor,
  bgColor, setBgColor,
  ecLevel, setEcLevel,
  quietZone, setQuietZone,
  logoImage, setLogoImage,
  logoWidth, logoHeight, handleLogoWidth, handleLogoHeight,
  logoRatioLocked, setLogoRatioLocked,
  logoOpacity, setLogoOpacity,
  logoPadding, setLogoPadding,
  logoPaddingStyle, setLogoPaddingStyle,
  logoPaddingRadius, setLogoPaddingRadius,
  removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo,
  qrStyle, setQrStyle,
  eyeRadius, setEyeRadius,
  eyeColor, setEyeColor,
  enableCORS, setEnableCORS,
  customId, setCustomId,
  logoNaturalWidth, logoNaturalHeight,
  // Props yang belum diimplementasikan sebelumnya
  logoBg, setLogoBg,
  logoBgWidth, setLogoBgWidth,
  logoBgHeight, setLogoBgHeight,
  logoBgPosition, setLogoBgPosition,
  logoBgX, setLogoBgX,
  logoBgY, setLogoBgY,
  logoBgObjectFit, setLogoBgObjectFit,
  logoBgCustomStyle, setLogoBgCustomStyle,
  // Handler functions for logo background
  handleLogoBgWidth, handleLogoBgHeight
}) => {
  // Simpan ukuran logo sebelum toggle background
  const prevLogoSize = useRef({ width: logoWidth, height: logoHeight });
  // Set QR color, eye color, dan logo size saat logoBg aktif
  useEffect(() => {
    if (logoBg) {
      if (setFgColor) setFgColor('#000000');
      if (setEyeColor) setEyeColor('#000000');
      prevLogoSize.current = { width: logoWidth, height: logoHeight };

    } else {
      // Kembalikan ukuran logo jika toggle dimatikan
      if (handleLogoWidth && prevLogoSize.current.width !== logoWidth) handleLogoWidth(prevLogoSize.current.width);
      if (handleLogoHeight && prevLogoSize.current.height !== logoHeight) handleLogoHeight(prevLogoSize.current.height);
    }
  }, [logoBg]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const fileInputRef = useRef();
  const [qrTested, setQrTested] = useState(false);
  const [qrTestResult, setQrTestResult] = useState(null);
  const [testError, setTestError] = useState(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [logoBgRatioLocked, setLogoBgRatioLocked] = useState(true);
  
  // Reset test result when value changes
  useEffect(() => {
    setQrTested(false);
    setQrTestResult(null);
    setTestError(null);
  }, [value]);

  const logoOptions = [
    { label: "ILMY", value: "/LOGO WAJIHAH/ILMY.png" },
    { label: "AL-FATH", value: "/LOGO WAJIHAH/AL-FATH.png" },
    { label: "AL-FATH-NoText", value: "/LOGO WAJIHAH/al-fath-logo.png" },
    { label: "Badan Mentoring", value: "/LOGO WAJIHAH/Badan Mentoring.png" },
    { label: "DKMSU", value: "/LOGO WAJIHAH/DKMSU.png" },
    { label: "MQ", value: "/LOGO WAJIHAH/MQ.png" },
    { label: "PRISMA", value: "/LOGO WAJIHAH/PRISMA.png" },
    { label: "Lazissu", value: "/LOGO WAJIHAH/Lazissu.png" },
  ];

  // Fakultas logos
  const fakultasLogos = [
    { label: "FEB", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FEB.png" },
    { label: "FIF", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FIF.png" },
    { label: "FIK", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FIK.png" },
    { label: "FIT", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FIT.png" },
    { label: "FKB", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FKB.png" },
    { label: "FRI", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FRI.png" },
    { label: "FTE", value: "/LOGO WAJIHAH/Al-Fath Fakultas/FTE.png" },
  ];
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleLogoChange(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo change with loading state
  const handleLogoChange = (newLogoImage) => {
    setLogoLoading(true);
    setLogoImage(newLogoImage);
    
    // Simulate loading time for color adjustment and size calculation
    setTimeout(() => {
      setLogoLoading(false);
    }, 800);
  };
  
  // Test QR code readability
  const testQrCode = async () => {
    try {
      setQrTested(true);
      setQrTestResult(null);
      setTestError(null);
      
      // Get QR canvas
      const qrId = customId && customId.trim() ? customId : 'qr-code-canvas';
      const qrEl = document.getElementById(qrId);
      let canvas = null;
      
      if (qrEl && qrEl.tagName === 'CANVAS') {
        canvas = qrEl;
      } else if (qrEl) {
        canvas = qrEl.querySelector('canvas');
      } else {
        canvas = document.querySelector(`#${qrId}, canvas#${qrId}`);
      }
      
      if (!canvas) {
        throw new Error("QR Code canvas tidak ditemukan");
      }
      
      const dataUrl = canvas.toDataURL('image/png');
      
      // Load image for testing
      const image = new Image();
      image.src = dataUrl;
      
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('Gagal memuat gambar QR'));
        setTimeout(() => reject(new Error('Timeout memuat gambar QR')), 3000);
      });
      
      // For demo purposes, we'll simulate a test result based on QR settings
      // In a real app, you'd use a QR code scanner library
      
      if (!value || value.trim() === '') {
        setQrTestResult(false);
        setTestError('QR Code tidak berisi data');
        return;
      }
      
      // Simulate potential issues with low error correction and dense data
      if (ecLevel === 'L' && value.length > 50) {
        setQrTestResult(false);
        setTestError('QR mungkin sulit dibaca. Tingkatkan level koreksi kesalahan');
        return;
      }
      
      // Simulate logo issues
      if (logoImage && logoWidth > size/2 && ecLevel !== 'H') {
        setQrTestResult(false);
        setTestError('Logo terlalu besar untuk level koreksi kesalahan saat ini');
        return;
      }
      
      setQrTestResult(true);
    } catch (err) {
      console.error('QR test error:', err);
      setQrTestResult(false);
      setTestError(err.message || 'Terjadi kesalahan saat menguji QR');
    }
  };

  // Check if viewport is mobile sized
  const isMobile = window.innerWidth < 768;

  // Style for the form container
  const formContainerStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: isMobile ? '10px' : '20px',
    boxSizing: 'border-box',
  };

  // Style for the form card
  const formCardStyle = {
    background: '#ffffff',
    borderRadius: isMobile ? '12px' : '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };

  // Style for the tabs
  const tabsStyle = {
    display: 'flex',
    borderBottom: '1px solid #eee',
    background: '#f8f9fa',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
  };

  // Style for individual tab
  const tabStyle = (isActive) => ({
    padding: isMobile ? '10px 12px' : '14px 20px',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#3498db' : '#555',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #3498db' : '3px solid transparent',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '4px' : '8px',
    fontSize: isMobile ? '13px' : '14px',
    flex: isMobile ? '1 0 auto' : 'auto',
    justifyContent: isMobile ? 'center' : 'flex-start',
  });

  // Form content style
  const formContentStyle = {
    padding: isMobile ? '16px' : '24px',
  };

  // Input group style
  const inputGroupStyle = {
    marginBottom: isMobile ? '16px' : '20px'
  };

  // Label style
  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#333',
    fontSize: isMobile ? '13px' : '14px'
  };

  // Input style
  const inputStyle = {
    width: '100%',
    padding: isMobile ? '8px 10px' : '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: isMobile ? '14px' : '15px',
    transition: 'border 0.2s ease',
    boxSizing: 'border-box',
  };

  // Button style
  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  // Secondary button style
  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f1f3f5',
    color: '#495057',
    border: '1px solid #ddd',
  };

  // Flex container
  const flexStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  };

  // Color preview style
  const colorPreviewStyle = (color) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: color,
    display: 'inline-block',
    marginLeft: '8px',
    border: '1px solid #ddd',
    verticalAlign: 'middle'
  });

  // Logo selector style
  const logoSelectorStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
    gap: '8px',
    marginTop: '12px'
  };

  // Logo option style
  const logoOptionStyle = (isSelected) => ({
    padding: '6px',
    border: isSelected ? '2px solid #3498db' : '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    background: isSelected ? '#eaf6fd' : '#fff',
    transition: 'all 0.2s ease',
  });

  // Logo image style
  const logoImageStyle = {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    marginBottom: '4px'
  };

  // Logo label style
  const logoLabelStyle = {
    fontSize: '11px',
    textAlign: 'center',
    color: '#666'
  };

  // Result message styles
  const resultMessageStyle = (success) => ({
    marginTop: '16px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: success ? '#d4edda' : '#f8d7da',
    color: success ? '#155724' : '#721c24',
    border: `1px solid ${success ? '#c3e6cb' : '#f5c6cb'}`,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  // Tab content animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div style={formContainerStyle}>
      <div style={formCardStyle}>
        <div style={tabsStyle}>
          <div 
            style={tabStyle(activeTab === 'basic')} 
            onClick={() => setActiveTab('basic')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <rect x="7" y="7" width="3" height="3"></rect>
              <rect x="14" y="7" width="3" height="3"></rect>
              <rect x="7" y="14" width="3" height="3"></rect>
              <rect x="14" y="14" width="3" height="3"></rect>
            </svg>
            Dasar
          </div>
          <div 
            style={tabStyle(activeTab === 'logo')} 
            onClick={() => setActiveTab('logo')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Logo
          </div>
          <div 
            style={tabStyle(activeTab === 'appearance')} 
            onClick={() => setActiveTab('appearance')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Tampilan
          </div>
          <div 
            style={tabStyle(activeTab === 'advanced')} 
            onClick={() => setActiveTab('advanced')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Lanjutan
          </div>
        </div>

        <div style={formContentStyle}>
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div 
                key="basic"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>URL atau Teks untuk QR Code </label>
                  <small>(link ini ubah aja sesuai kebutuhan, saranku udah di short link (misal make bitly))</small>

                  <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Masukkan URL atau teks untuk QR Code"
                    style={inputStyle}
                  />
                </div>
                <button
                  type="button"
                  style={{
                    marginBottom: 20,
                    padding: '10px 18px',
                    background: '#f1f3f5',
                    color: '#495057',
                    border: '1px solid #dee2e6',
                    borderRadius: 8,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: 15,
                    marginTop: 8
                  }}
                  onClick={() => {
                    setValue("https://bit.ly/btw-nitip");
                    setSize(500);
                    setBgColor("transparent");
                    setEcLevel("H");
                    setQuietZone(10);
                    setLogoImage("/LOGO WAJIHAH/MQ.png");
                    handleLogoWidth(128);
                    handleLogoBgHeight(128);
                    setLogoRatioLocked(true);
                    setLogoOpacity(1);
                    setLogoPadding(0.1);
                    setLogoPaddingStyle("circle");
                    setLogoPaddingRadius(0);
                    setRemoveQrCodeBehindLogo(true);
                    setQrStyle("squares");
                    setEyeRadius(10);
                    setEnableCORS(true);
                    setCustomId("");
                    setLogoBg(false);
                    setLogoBgWidth(10);
                    setLogoBgHeight(10);
                    setLogoBgPosition("center");
                    setLogoBgX(0);
                    setLogoBgY(0);
                    setLogoBgObjectFit("cover");
                    setLogoBgCustomStyle("");
                    setQrOpacity(1);
                  }}
                >
                  Reset ke Default
                </button>

                <div style={{marginBottom: '20px'}}>
                  <h5 style={{marginBottom: '8px', marginTop: '16px'}}>Pilih Logo</h5>
                  <div style={{fontSize:13, color:'#e67e22', marginBottom:8, marginTop:-4}}>
                    Jika logo masih bermasalah, coba pilih logo lain lalu kembali ke logo yang diinginkan.
                  </div>
                  {logoLoading && (
                    <div style={{
                      padding: '12px',
                      background: '#e3f2fd',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #bbdefb'
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #2196f3',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <span style={{color: '#1976d2', fontSize: '14px'}}>
                        Sedang menyesuaikan warna dan ukuran logo...
                      </span>
                      <style>
                        {`@keyframes spin { to { transform: rotate(360deg); } }`}
                      </style>
                    </div>
                  )}
                  <div style={logoSelectorStyle}>
                    {logoOptions.map(option => (
                      <div 
                        key={option.value}
                        style={{
                          ...logoOptionStyle(logoImage === option.value),
                          opacity: logoLoading ? 0.6 : 1,
                          pointerEvents: logoLoading ? 'none' : 'auto'
                        }}
                        onClick={() => handleLogoChange(option.value)}
                      >
                        <img 
                          src={option.value} 
                          alt={option.label}
                          style={logoImageStyle}
                        />
                        <span style={logoLabelStyle}>{option.label}</span>
                      </div>
                    ))}
                    <div 
                      style={{
                        ...logoOptionStyle(false),
                        border: '1px dashed #aaa',
                        justifyContent: 'center',
                        opacity: logoLoading ? 0.6 : 1,
                        pointerEvents: logoLoading ? 'none' : 'auto'
                      }}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <div style={{fontSize: '24px', color: '#aaa', marginBottom: '2px'}}>+</div>
                      <span style={logoLabelStyle}>Upload</span>
                      <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{display: 'none'}}
                      />
                    </div>
                  </div>
                </div>

                <div style={{marginBottom: '20px'}}>
                  <h5 style={{marginBottom: '8px', marginTop: '16px'}}>Logo Al-Fath Fakultas</h5>
                  <div style={logoSelectorStyle}>
                    {fakultasLogos.map(option => (
                      <div 
                        key={option.value}
                        style={{
                          ...logoOptionStyle(logoImage === option.value),
                          opacity: logoLoading ? 0.6 : 1,
                          pointerEvents: logoLoading ? 'none' : 'auto'
                        }}
                        onClick={() => handleLogoChange(option.value)}
                      >
                        <img 
                          src={option.value} 
                          alt={option.label}
                          style={logoImageStyle}
                        />
                        <span style={logoLabelStyle}>{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                         
               
              </motion.div>
            )}

            {activeTab === 'logo' && (
              <motion.div 
                key="logo"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <h4 style={{marginTop: 0, marginBottom: '16px'}}>Pengaturan Logo</h4>
                
                

                <div style={flexStyle}>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>Lebar Logo</label>
                    <input 
                      type="number"
                      value={logoWidth}
                      onChange={(e) => handleLogoWidth(Number(e.target.value))}
                      style={inputStyle}
                      min="10"
                      max="512"
                    />
                  </div>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>Tinggi Logo</label>
                    <input 
                      type="number"
                      value={logoHeight}
                      onChange={(e) => handleLogoHeight(Number(e.target.value))}
                      style={inputStyle}
                      min="10"
                      max="512"
                    />
                  </div>
                </div>
                
                <div style={{marginTop: '12px'}}>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input 
                      type="checkbox"
                      checked={logoRatioLocked}
                      onChange={(e) => setLogoRatioLocked(e.target.checked)}
                    />
                    <span style={{marginLeft: '8px'}}>Kunci rasio aspek logo</span>
                  </label>
                </div>

                <div style={{marginTop: '16px'}}>
                  <label style={labelStyle}>Transparansi Logo</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={logoOpacity}
                      onChange={(e) => setLogoOpacity(Number(e.target.value))}
                      style={{flex: 1, marginRight: '10px'}}
                    />
                    <span>{Math.round(logoOpacity * 100)}%</span>
                  </div>
                </div>

                <div style={{marginTop: '16px'}}>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input 
                      type="checkbox"
                      checked={removeQrCodeBehindLogo}
                      onChange={(e) => setRemoveQrCodeBehindLogo(e.target.checked)}
                    />
                    <span style={{marginLeft: '8px'}}>Hapus QR di belakang logo</span>
                  </label>
                </div>

                <div style={{marginTop: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef'}}>
                  <h5 style={{marginTop: 0, marginBottom: '16px', color: '#495057'}}>Pengaturan Logo Background</h5>
                  
                  <div style={{marginBottom: '16px'}}>
                    <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                      <input 
                        type="checkbox"
                        checked={logoBg}
                        onChange={(e) => setLogoBg(e.target.checked)}
                      />
                      <span style={{marginLeft: '8px'}}>Aktifkan Logo sebagai Background</span>
                    </label>
                    <p style={{fontSize: '12px', color: '#6c757d', margin: '4px 0 0 24px'}}>
                      Logo akan menjadi latar belakang QR code alih-alih di depan
                    </p>
                  </div>

                  {logoBg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{marginBottom: '16px'}}>
                        <label style={labelStyle}>Transparansi QR</label>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.01"
                            value={qrOpacity}
                            onChange={e => setQrOpacity(Number(e.target.value))}
                            style={{flex: 1, marginRight: '10px'}}
                          />
                          <input
                            type="number"
                            min="0.1"
                            max="1"
                            step="0.01"
                            value={qrOpacity}
                            onChange={e => setQrOpacity(Number(e.target.value))}
                            style={{width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', marginRight: '8px'}}
                          />
                        </div>
                        <p style={{fontSize: '12px', color: '#6c757d', margin: '4px 0 0'}}>
                          Atur transparansi QR agar logo lebih terlihat. (0.1 = sangat transparan, 1 = solid)
                        </p>
                      </div>
                      <div style={flexStyle}>
                        <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                          <label style={labelStyle}>Lebar Background</label>
                          <input 
                            type="number"
                            value={logoBgWidth}
                            onChange={(e) => handleLogoBgWidth ? handleLogoBgWidth(Number(e.target.value)) : setLogoBgWidth(Number(e.target.value))}
                            style={inputStyle}
                            min="10"
                            max="512"
                          />
                        </div>
                        <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                          <label style={labelStyle}>Tinggi Background</label>
                          <input 
                            type="number"
                            value={logoBgHeight}
                            onChange={(e) => handleLogoBgHeight ? handleLogoBgHeight(Number(e.target.value)) : setLogoBgHeight(Number(e.target.value))}
                            style={inputStyle}
                            min="10"
                            max="512"
                          />
                        </div>
                      </div>
                      
                      <div style={{marginTop: '12px'}}>
                        <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                          <input 
                            type="checkbox"
                            checked={logoBgRatioLocked}
                            onChange={(e) => setLogoBgRatioLocked(e.target.checked)}
                          />
                          <span style={{marginLeft: '8px'}}>Kunci rasio aspek background</span>
                        </label>
                      </div>

                      <div style={{marginTop: '16px'}}>
                        <label style={labelStyle}>Posisi Background</label>
                        <select 
                          value={logoBgPosition}
                          onChange={(e) => setLogoBgPosition(e.target.value)}
                          style={inputStyle}
                        >
                          <option value="center">Tengah</option>
                          <option value="top-left">Kiri Atas</option>
                          <option value="top-right">Kanan Atas</option>
                          <option value="bottom-left">Kiri Bawah</option>
                          <option value="bottom-right">Kanan Bawah</option>
                          <option value="custom">Kustom (X,Y)</option>
                        </select>
                      </div>

                      {logoBgPosition === 'custom' && (
                        <div style={{...flexStyle, marginTop: '12px'}}>
                          <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                            <label style={labelStyle}>Posisi X</label>
                            <input 
                              type="number"
                              value={logoBgX}
                              onChange={(e) => setLogoBgX(Number(e.target.value))}
                              style={inputStyle}
                            />
                          </div>
                          <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                            <label style={labelStyle}>Posisi Y</label>
                            <input 
                              type="number"
                              value={logoBgY}
                              onChange={(e) => setLogoBgY(Number(e.target.value))}
                              style={inputStyle}
                            />
                          </div>
                        </div>
                      )}

                      <div style={{marginTop: '16px'}}>
                        <label style={labelStyle}>Object Fit Background</label>
                        <select 
                          value={logoBgObjectFit}
                          onChange={(e) => setLogoBgObjectFit(e.target.value)}
                          style={inputStyle}
                        >
                          <option value="cover">Cover (Penuh)</option>
                          <option value="contain">Contain (Sesuai)</option>
                          <option value="fill">Fill (Rentang)</option>
                          <option value="scale-down">Scale Down</option>
                          <option value="none">None</option>
                        </select>
                      </div>

                    
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div 
                key="appearance"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Ukuran QR</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <input 
                      type="range"
                      min="200"
                      max="600"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      style={{flex: 1, marginRight: '10px'}}
                    />
                    <input 
                      type="number"
                      min="200"
                      max="600"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      style={{width: '70px', padding: '8px', borderRadius: '8px', border: '1px solid #ddd'}}
                    />
                  </div>
                  <p style={{fontSize: '13px', color: '#6c757d', margin: '4px 0 0'}}>
                    Ini adalah ukuran preview. QR yang diunduh akan tetap berkualitas baik.
                  </p>
                </div>

                <div style={flexStyle}>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>
                      Warna QR
                      <span style={colorPreviewStyle(fgColor)}></span>
                    </label>
                    <input 
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      style={{width: '100%', height: '40px'}}
                    />
                  </div>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>
                      Warna Latar Belakang
                      <span style={colorPreviewStyle(bgColor)}></span>
                    </label>
                    <input 
                      type="color"
                      value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      style={{width: '100%', height: '40px'}}
                    />
                    <label style={{display:'flex', alignItems:'center', marginTop:'8px', fontSize:'13px', cursor:'pointer'}}>
                      <input
                        type="checkbox"
                        checked={bgColor === 'transparent'}
                        onChange={e => setBgColor(e.target.checked ? 'transparent' : '#ffffff')}
                        style={{marginRight:'8px'}}
                      />
                      Transparan
                    </label>
                  </div>
                </div>

                <div style={flexStyle}>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>
                      Warna Sudut QR
                      <span style={colorPreviewStyle(eyeColor)}></span>
                    </label>
                    <input 
                      type="color"
                      value={eyeColor}
                      onChange={(e) => setEyeColor(e.target.value)}
                      style={{width: '100%', height: '40px'}}
                    />
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Gaya QR</label>
                  <select 
                    value={qrStyle}
                    onChange={(e) => setQrStyle(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="squares">Kotak (Default)</option>
                    <option value="dots">Titik</option>
                    <option value="fluid">Fluid</option>
                  </select>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Radius Sudut QR</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <input 
                      type="range"
                      min="0"
                      max="50"
                      value={eyeRadius}
                      onChange={(e) => setEyeRadius(Number(e.target.value))}
                      style={{flex: 1, marginRight: '10px'}}
                    />
                    <input 
                      type="number"
                      min="0"
                      max="50"
                      value={eyeRadius}
                      onChange={(e) => setEyeRadius(Number(e.target.value))}
                      style={{width: '70px', padding: '8px', borderRadius: '8px', border: '1px solid #ddd'}}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'advanced' && (
              <motion.div 
                key="advanced"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Level Koreksi Kesalahan</label>
                  <select 
                    value={ecLevel}
                    onChange={(e) => setEcLevel(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="L">L - Rendah (7% dapat dipulihkan)</option>
                    <option value="M">M - Medium (15% dapat dipulihkan)</option>
                    <option value="Q">Q - Quartile (25% dapat dipulihkan)</option>
                    <option value="H">H - Tinggi (30% dapat dipulihkan)</option>
                  </select>
                  <p style={{fontSize: '13px', color: '#666', margin: '6px 0 0'}}>
                    Level koreksi kesalahan yang lebih tinggi membuat QR lebih tahan terhadap kerusakan, tetapi mengurangi kapasitas data.
                  </p>
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Quiet Zone (Margin)</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <input 
                      type="range"
                      min="0"
                      max="50"
                      value={quietZone}
                      onChange={(e) => setQuietZone(Number(e.target.value))}
                      style={{flex: 1, marginRight: '10px'}}
                    />
                    <input 
                      type="number"
                      min="0"
                      max="50"
                      value={quietZone}
                      onChange={(e) => setQuietZone(Number(e.target.value))}
                      style={{width: '70px', padding: '8px', borderRadius: '8px', border: '1px solid #ddd'}}
                    />
                  </div>
                </div>
                {/* Fitur lanjutan lain dinonaktifkan */}
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Padding Logo</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <input 
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={Math.round(logoPadding * 100)}
                      disabled
                      style={{flex: 1, marginRight: '10px'}}
                    />
                    <input 
                      type="number"
                      min="0"
                      max="50"
                      value={Math.round(logoPadding * 100)}
                      disabled
                      style={{width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', marginRight: '8px'}}
                    />
                    <span>%</span>
                  </div>
                  <p style={{fontSize: '12px', color: '#6c757d', margin: '4px 0 0'}}>
                    Padding logo dalam persen dari ukuran logo (0-50%).
                  </p>
                  <div style={{color:'#e67e22', fontSize:'13px', marginTop:'4px'}}>Belum beres</div>
                </div>
                <div style={flexStyle}>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>Bentuk Padding Logo</label>
                    <select 
                      value={logoPaddingStyle}
                      disabled
                      style={inputStyle}
                    >
                      <option value="square">Kotak</option>
                      <option value="circle">Lingkaran</option>
                    </select>
                    <div style={{color:'#e67e22', fontSize:'13px', marginTop:'4px'}}>Belum beres</div>
                  </div>
                  <div style={{flex: '1 1 45%', minWidth: '120px'}}>
                    <label style={labelStyle}>Radius Padding Logo</label>
                    <input 
                      type="number"
                      value={logoPaddingRadius}
                      min="0"
                      max="100"
                      disabled
                      style={inputStyle}
                    />
                    <div style={{color:'#e67e22', fontSize:'13px', marginTop:'4px'}}>Belum beres</div>
                  </div>
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>ID Canvas Kustom</label>
                  <input 
                    type="text"
                    value={customId}
                    placeholder="qr-code-canvas (default)"
                    disabled
                    style={inputStyle}
                  />
                  <div style={{color:'#e67e22', fontSize:'13px', marginTop:'4px'}}>Belum beres</div>
                </div>
                <div style={{marginTop: '12px'}}>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input 
                      type="checkbox"
                      checked={enableCORS}
                      disabled
                    />
                    <span style={{marginLeft: '8px'}}>Aktifkan CORS</span>
                  </label>
                  <div style={{color:'#e67e22', fontSize:'13px', marginTop:'4px'}}>Belum beres</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QRForm;
