
import React, { useState, useEffect } from "react";
import QRForm from "./components/QRForm";
import QRPreview from "./components/QRPreview";

function App() {
  // Load from localStorage if available
  const getInitial = (key, def) => {
    try {
      const saved = localStorage.getItem('qrform_' + key);
      if (saved !== null && saved !== undefined) {
        if (typeof def === 'boolean') return saved === 'true';
        if (typeof def === 'number') return Number(saved);
        return saved;
      }
    } catch {}
    return def;
  };
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [qrOpacity, setQrOpacity] = useState(getInitial('qrOpacity', 1));
  const [logoRatioLocked, setLogoRatioLocked] = useState(getInitial('logoRatioLocked', true));
  const [logoImage, setLogoImage] = useState(getInitial('logoImage', "/LOGO WAJIHAH/MQ.png"));
  const [logoBgWidth, setLogoBgWidth] = useState(getInitial('logoBgWidth', 10));
  const [logoBgHeight, setLogoBgHeight] = useState(getInitial('logoBgHeight', 10));
  const [logoNaturalWidth, setLogoNaturalWidth] = useState(256);
  const [logoNaturalHeight, setLogoNaturalHeight] = useState(256);
  const [logoBgPosition, setLogoBgPosition] = useState(getInitial('logoBgPosition', 'center'));
  const [logoBgX, setLogoBgX] = useState(getInitial('logoBgX', 0));
  const [logoBgY, setLogoBgY] = useState(getInitial('logoBgY', 0));
  const [logoBgCustomStyle, setLogoBgCustomStyle] = useState(getInitial('logoBgCustomStyle', ""));
  const [value, setValue] = useState(getInitial('value', "bit.ly/btw-nitip"));
  const [size, setSize] = useState(getInitial('size', 350));
  const [fgColor, setFgColor] = useState(getInitial('fgColor', "#000000"));
  const [bgColor, setBgColor] = useState(getInitial('bgColor', "transparent"));
  const [ecLevel, setEcLevel] = useState(getInitial('ecLevel', "H"));
  const [quietZone, setQuietZone] = useState(getInitial('quietZone', 10));
  const [logoWidth, setLogoWidth] = useState(getInitial('logoWidth', 128));
  const [logoHeight, setLogoHeight] = useState(getInitial('logoHeight', 128));
  const [logoBgObjectFit, setLogoBgObjectFit] = useState(getInitial('logoBgObjectFit', "cover"));
  const [logoOpacity, setLogoOpacity] = useState(getInitial('logoOpacity', 1));
  const [logoPadding, setLogoPadding] = useState(getInitial('logoPadding', 0.1));
  const [logoPaddingStyle, setLogoPaddingStyle] = useState(getInitial('logoPaddingStyle', "circle"));
  const [logoPaddingRadius, setLogoPaddingRadius] = useState(getInitial('logoPaddingRadius', 0));
  const [removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo] = useState(getInitial('removeQrCodeBehindLogo', true));
  const [qrStyle, setQrStyle] = useState(getInitial('qrStyle', "squares"));
  const [eyeRadius, setEyeRadius] = useState(getInitial('eyeRadius', 10));
  const [eyeColor, setEyeColor] = useState(getInitial('eyeColor', "#000000"));
  const [enableCORS, setEnableCORS] = useState(getInitial('enableCORS', true));
  const [customId, setCustomId] = useState(getInitial('customId', ""));
  const [logoBg, setLogoBg] = useState(getInitial('logoBg', false));
  // Handler for logoWidth/Height with ratio lock
  const handleLogoWidth = (w) => {
    setLogoWidth(w);
    if (logoRatioLocked && logoNaturalWidth && logoNaturalHeight) {
      setLogoHeight(Math.round(w * (logoNaturalHeight / logoNaturalWidth)));
    }
  };
  const handleLogoHeight = (h) => {
    setLogoHeight(h);
    if (logoRatioLocked && logoNaturalWidth && logoNaturalHeight) {
      setLogoWidth(Math.round(h * (logoNaturalWidth / logoNaturalHeight)));
    }
  };
  // Save to localStorage on change
  useEffect(() => { localStorage.setItem('qrform_qrOpacity', qrOpacity); }, [qrOpacity]);
  useEffect(() => { localStorage.setItem('qrform_logoRatioLocked', logoRatioLocked); }, [logoRatioLocked]);
  useEffect(() => { localStorage.setItem('qrform_logoImage', logoImage); }, [logoImage]);
  useEffect(() => { localStorage.setItem('qrform_logoBgWidth', logoBgWidth); }, [logoBgWidth]);
  useEffect(() => { localStorage.setItem('qrform_logoBgHeight', logoBgHeight); }, [logoBgHeight]);
  useEffect(() => { localStorage.setItem('qrform_logoBgPosition', logoBgPosition); }, [logoBgPosition]);
  useEffect(() => { localStorage.setItem('qrform_logoBgX', logoBgX); }, [logoBgX]);
  useEffect(() => { localStorage.setItem('qrform_logoBgY', logoBgY); }, [logoBgY]);
  useEffect(() => { localStorage.setItem('qrform_logoBgCustomStyle', logoBgCustomStyle); }, [logoBgCustomStyle]);
  useEffect(() => { localStorage.setItem('qrform_value', value); }, [value]);
  useEffect(() => { localStorage.setItem('qrform_size', size); }, [size]);
  useEffect(() => { localStorage.setItem('qrform_fgColor', fgColor); }, [fgColor]);
  useEffect(() => { localStorage.setItem('qrform_bgColor', bgColor); }, [bgColor]);
  useEffect(() => { localStorage.setItem('qrform_ecLevel', ecLevel); }, [ecLevel]);
  useEffect(() => { localStorage.setItem('qrform_quietZone', quietZone); }, [quietZone]);
  useEffect(() => { localStorage.setItem('qrform_logoWidth', logoWidth); }, [logoWidth]);
  useEffect(() => { localStorage.setItem('qrform_logoHeight', logoHeight); }, [logoHeight]);
  useEffect(() => { localStorage.setItem('qrform_logoBgObjectFit', logoBgObjectFit); }, [logoBgObjectFit]);
  useEffect(() => { localStorage.setItem('qrform_logoOpacity', logoOpacity); }, [logoOpacity]);
  useEffect(() => { localStorage.setItem('qrform_logoPadding', logoPadding); }, [logoPadding]);
  useEffect(() => { localStorage.setItem('qrform_logoPaddingStyle', logoPaddingStyle); }, [logoPaddingStyle]);
  useEffect(() => { localStorage.setItem('qrform_logoPaddingRadius', logoPaddingRadius); }, [logoPaddingRadius]);
  useEffect(() => { localStorage.setItem('qrform_removeQrCodeBehindLogo', removeQrCodeBehindLogo); }, [removeQrCodeBehindLogo]);
  useEffect(() => { localStorage.setItem('qrform_qrStyle', qrStyle); }, [qrStyle]);
  useEffect(() => { localStorage.setItem('qrform_eyeRadius', eyeRadius); }, [eyeRadius]);
  useEffect(() => { localStorage.setItem('qrform_eyeColor', eyeColor); }, [eyeColor]);
  useEffect(() => { localStorage.setItem('qrform_enableCORS', enableCORS); }, [enableCORS]);
  useEffect(() => { localStorage.setItem('qrform_customId', customId); }, [customId]);
  useEffect(() => { localStorage.setItem('qrform_logoBg', logoBg); }, [logoBg]);

  // Sync logo natural size
  useEffect(() => {
    if (!logoImage) return;
    const img = new window.Image();
    img.src = logoImage;
    img.onload = function() {
      setLogoNaturalWidth(img.naturalWidth || 256);
      setLogoNaturalHeight(img.naturalHeight || 256);
      // Set default scale: half of QR size, keep aspect ratio
      const qrHalf = size / 3;
      if (img.naturalWidth && img.naturalHeight) {
        if (img.naturalWidth > img.naturalHeight) {
          setLogoBgWidth(qrHalf);
          setLogoBgHeight(Math.round(qrHalf * (img.naturalHeight / img.naturalWidth)));
          setLogoWidth(qrHalf);
          setLogoHeight(Math.round(qrHalf * (img.naturalHeight / img.naturalWidth)));
        } else {
          setLogoBgHeight(qrHalf);
          setLogoBgWidth(Math.round(qrHalf * (img.naturalWidth / img.naturalHeight)));
          setLogoHeight(qrHalf);
          setLogoWidth(Math.round(qrHalf * (img.naturalWidth / img.naturalHeight)));
        }
      }
    };
  }, [logoImage, size]);

  // Sync rasio saat user mengubah width/height
  const handleLogoBgWidth = (w) => {
    setLogoBgWidth(w);
    if (logoNaturalWidth && logoNaturalHeight) {
      setLogoBgHeight(Math.round(w * (logoNaturalHeight / logoNaturalWidth)));
    }
  };
  const handleLogoBgHeight = (h) => {
    setLogoBgHeight(h);
    if (logoNaturalWidth && logoNaturalHeight) {
      setLogoBgWidth(Math.round(h * (logoNaturalWidth / logoNaturalHeight)));
    }
  };

  useEffect(() => {
    if (!logoImage) return;
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = logoImage;
    img.onload = function() {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i+3] < 128) continue;
          r += data[i];
          g += data[i+1];
          b += data[i+2];
          count++;
        }
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          const color = `rgb(${r},${g},${b})`;
          setFgColor(color);
          setEyeColor(color);
          setBgColor(`#ffffff`); // set bgColor to white for contrast
        }
        // if (logoBgObjectFit === 'contain' || logoPaddingStyle === 'circle') {
        //   setQrStyle('dots');
        // } else {
        //   setQrStyle('squares');
        // }
      } catch(e) {}
    };
  }, [logoImage, logoBgObjectFit, logoPaddingStyle]);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    }}>


        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth > 900 ? 'row' : 'column',
          alignItems: 'flex-start',
          gap: '32px',
        }}>
          {/* Left side - QR Preview and Download */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            width: '100%'
          }}>
            <div style={{
              background: 'white',
              borderRadius: window.innerWidth < 768 ? '12px' : '16px',
              padding: window.innerWidth < 768 ? '20px' : '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'fit-content',
              margin: '0 auto',
              maxWidth: '100%'
            }}>
              
              
              <QRPreview
                value={value}
                size={size}
                previewSize={window.innerWidth < 1000 ? size/2 : size}
                fgColor={fgColor}
                bgColor={bgColor}
                ecLevel={ecLevel}
                quietZone={quietZone}
                logoImage={logoImage}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                logoOpacity={logoOpacity}
                logoPadding={logoPadding}
                logoPaddingStyle={logoPaddingStyle}
                logoPaddingRadius={logoPaddingRadius}
                removeQrCodeBehindLogo={removeQrCodeBehindLogo}
                qrStyle={qrStyle}
                eyeRadius={eyeRadius}
                eyeColor={eyeColor}
                enableCORS={enableCORS}
                customId={customId}
                logoBg={logoBg}
                logoBgWidth={logoBgWidth}
                logoBgHeight={logoBgHeight}
                logoBgPosition={logoBgPosition}
                logoBgX={logoBgX}
                logoBgY={logoBgY}
                logoBgObjectFit={logoBgObjectFit}
                logoBgCustomStyle={logoBgCustomStyle}
                qrOpacity={qrOpacity}
              />
              <div style={{
                marginTop: 20, 
                display: 'flex', 
                alignItems: 'center',
                gap: window.innerWidth < 768 ? '10px' : '16px',
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                width: '100%'
              }}>
                <button 
                  type="button" 
                  style={{
                    padding: window.innerWidth < 768 ? '10px 16px' : '12px 24px', 
                    fontSize: window.innerWidth < 768 ? 14 : 16, 
                    borderRadius: 8, 
                    background: '#3498db', 
                    color: '#fff', 
                    border: 'none', 
                    cursor: 'pointer', 
                    boxShadow: '0 2px 8px rgba(52, 152, 219, 0.3)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flex: window.innerWidth < 768 ? '1' : 'initial'
                  }} 
                  onClick={() => setShowDownloadModal(true)}
                  onMouseOver={(e) => {
                    e.target.style.background = '#2980b9';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#3498db';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download QR (PNG)
                </button>
      {/* Modal Download Konfirmasi */}
      {showDownloadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: '32px 24px',
            maxWidth: 400,
            width: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            textAlign: 'center',
            position: 'relative',
          }}>
            <h3 style={{margin: 0, marginBottom: 16, color: '#222'}}>Sudah cek QR-nya bisa di-scan?</h3>
            <div style={{fontSize: 15, color: '#444', marginBottom: 18, lineHeight: 1.6}}>
              <b>Disarankan untuk mencoba scan QR terlebih dahulu sebelum download.</b><br/>
              QR code bisa saja <span style={{color:'#e67e22'}}>tidak terbaca</span> jika:<br/>
              <ul style={{textAlign:'left', margin:'10px 0 10px 20px', color:'#666', fontSize:14}}>
                <li>Teks/URL terlalu panjang</li>
                <li>Logo terlalu besar</li>
                <li>Warna QR kurang kontras dengan background</li>
                <li>Atau ada keanehan lain yang mengakibatkan tidak bisa scan qr <a href="https://www.linkedin.com/in/atiohaidar/">(kontak)</a></li>

              </ul>
              Pastikan QR sudah <span style={{color:'#27ae60'}}>bisa di-scan</span> dengan aplikasi scanner sebelum digunakan!
            </div>
            <div style={{display:'flex', gap:12, justifyContent:'center', marginTop: 18}}>
              <button
                style={{
                  padding: '10px 18px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(52, 152, 219, 0.15)'
                }}
                onClick={() => {
                  setShowDownloadModal(false);
                  // Download QR
                  const qrId = customId && customId.trim() ? customId : 'qr-code-canvas';
                  const fullCanvas = document.getElementById(qrId + '-full');
                  let canvas = null;
                  if (fullCanvas && fullCanvas.tagName === 'CANVAS') {
                    canvas = fullCanvas;
                  } else {
                    const qrEl = document.getElementById(qrId);
                    if (qrEl && qrEl.tagName === 'CANVAS') {
                      canvas = qrEl;
                    } else if (qrEl) {
                      canvas = qrEl.querySelector('canvas');
                    } else {
                      canvas = document.querySelector(`#${qrId}, canvas#${qrId}`);
                    }
                  }
                  if (canvas) {
                    const link = document.createElement('a');
                    link.download = 'qr-code.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                  } else {
                    alert('QR code canvas tidak ditemukan. Pastikan preview QR sudah muncul.');
                  }
                }}
              >
                Lanjutkan Download
              </button>
              <button
                style={{
                  padding: '10px 18px',
                  background: '#f1f3f5',
                  color: '#495057',
                  border: '1px solid #dee2e6',
                  borderRadius: 8,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: 15
                }}
                onClick={() => setShowDownloadModal(false)}
              >
                Batal
              </button>
            </div>
            <button
              onClick={() => setShowDownloadModal(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 14,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#aaa',
                cursor: 'pointer',
                padding: 0
              }}
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </div>
      )}
                
                <button 
                  type="button" 
                  style={{
                    padding: window.innerWidth < 768 ? '10px 16px' : '12px 20px', 
                    fontSize: window.innerWidth < 768 ? 14 : 16, 
                    borderRadius: 8, 
                    background: '#f1f3f5', 
                    color: '#495057', 
                    border: '1px solid #dee2e6', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flex: window.innerWidth < 768 ? '1' : 'initial'
                  }}
                  onClick={() => {
                    // Buka tab baru dengan QR code
                    const qrId = customId && customId.trim() ? customId : 'qr-code-canvas';
                    const fullCanvas = document.getElementById(qrId + '-full');
                    let canvas = null;
                    if (fullCanvas && fullCanvas.tagName === 'CANVAS') {
                      canvas = fullCanvas;
                    } else {
                      const qrEl = document.getElementById(qrId);
                      if (qrEl && qrEl.tagName === 'CANVAS') {
                        canvas = qrEl;
                      } else if (qrEl) {
                        canvas = qrEl.querySelector('canvas');
                      } else {
                        canvas = document.querySelector(`#${qrId}, canvas#${qrId}`);
                      }
                    }
                    if (canvas) {
                      const imageWindow = window.open('');
                      imageWindow.document.write('<html><head><title>QR Code Preview</title>');
                      imageWindow.document.write('</head><body style="margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f8f9fa;">');
                      imageWindow.document.write(`<img src="${canvas.toDataURL('image/png')}" style="max-width: 100%; height: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">`);
                      imageWindow.document.write('</body></html>');
                    }
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#e9ecef';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#f1f3f5';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  Pratinjau Ukuran Penuh
                </button>
              </div>
            </div>
            
          </div>
          

          {/* Right side - QR Form */}
          <div style={{
            flex: '1',
            width: '100%',
          }}>
            
            <QRForm
              value={value} setValue={setValue}
              size={size} setSize={setSize}
              fgColor={fgColor} setFgColor={setFgColor}
              bgColor={bgColor} setBgColor={setBgColor}
              ecLevel={ecLevel} setEcLevel={setEcLevel}
              quietZone={quietZone} setQuietZone={setQuietZone}
              logoImage={logoImage} setLogoImage={setLogoImage}
              logoWidth={logoWidth} logoHeight={logoHeight}
              handleLogoWidth={handleLogoWidth} handleLogoHeight={handleLogoHeight}
              logoRatioLocked={logoRatioLocked} setLogoRatioLocked={setLogoRatioLocked}
              logoOpacity={logoOpacity} setLogoOpacity={setLogoOpacity}
              logoPadding={logoPadding} setLogoPadding={setLogoPadding}
              logoPaddingStyle={logoPaddingStyle} setLogoPaddingStyle={setLogoPaddingStyle}
              logoPaddingRadius={logoPaddingRadius} setLogoPaddingRadius={setLogoPaddingRadius}
              removeQrCodeBehindLogo={removeQrCodeBehindLogo} setRemoveQrCodeBehindLogo={setRemoveQrCodeBehindLogo}
              qrStyle={qrStyle} setQrStyle={setQrStyle}
              eyeRadius={eyeRadius} setEyeRadius={setEyeRadius}
              eyeColor={eyeColor} setEyeColor={setEyeColor}
              enableCORS={enableCORS} setEnableCORS={setEnableCORS}
              customId={customId} setCustomId={setCustomId}
              logoNaturalWidth={logoNaturalWidth} logoNaturalHeight={logoNaturalHeight}
              logoBg={logoBg} setLogoBg={setLogoBg}
              logoBgWidth={logoBgWidth} setLogoBgWidth={setLogoBgWidth}
              logoBgHeight={logoBgHeight} setLogoBgHeight={setLogoBgHeight}
              logoBgPosition={logoBgPosition} setLogoBgPosition={setLogoBgPosition}
              logoBgX={logoBgX} setLogoBgX={setLogoBgX}
              logoBgY={logoBgY} setLogoBgY={setLogoBgY}
              logoBgObjectFit={logoBgObjectFit} setLogoBgObjectFit={setLogoBgObjectFit}
              logoBgCustomStyle={logoBgCustomStyle} setLogoBgCustomStyle={setLogoBgCustomStyle}
              handleLogoBgWidth={handleLogoBgWidth} handleLogoBgHeight={handleLogoBgHeight}
              qrOpacity={qrOpacity} setQrOpacity={setQrOpacity}
            />
            
          </div>
          
        </div>
        
        <div style={{textAlign: 'center', marginTop: '40px', color: '#6c757d', fontSize: '14px'}}>
        QR Generator for Wajihah Telkom University | Made with Github Copilot XD | ke <a href="https://github.com/TioHaidarHanif/wajihah-qr-generator" target="_blank" rel="noreferrer" style={{color:'#3498db', textDecoration:'none'}}>sini</a> aja klo ada apa2.
        </div>
    </div>
  );
}

export default App;