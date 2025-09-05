import React, { Component, useRef, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";

// Error boundary untuk menangkap error dari QRCode
class QRErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error("QRCode error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: 'center', border: '2px dashed #e74c3c', borderRadius: 10, background: '#fff', color: '#e74c3c' }}>
          <h3>QR Code Error</h3>
          <p>Data terlalu panjang atau pengaturan tidak valid.</p>
          <small style={{ fontSize: 12, color: '#777' }}>Coba kurangi panjang data atau ubah level error correction.</small>
          {this.state.errorMsg.includes("overflow") && (
            <p style={{ fontSize: 14, marginTop: 10 }}>
              Error: Code length overflow. Data QR terlalu panjang untuk ukuran yang dipilih.
            </p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

const QRPreview = ({
  value, size, previewSize = null, fgColor, bgColor, ecLevel, quietZone,
  logoImage, logoWidth, logoHeight, logoOpacity, logoPadding, logoPaddingStyle, logoPaddingRadius,
  removeQrCodeBehindLogo, qrStyle, eyeRadius, eyeColor, enableCORS, customId,
  logoBg, logoBgWidth, logoBgHeight, logoBgPosition, logoBgX, logoBgY, logoBgObjectFit, logoBgCustomStyle,
  qrOpacity
}) => {
  // Hidden canvas untuk download/new tab
  const fullCanvasRef = useRef();
  useEffect(() => {}, [value, size, fgColor, bgColor, ecLevel, quietZone, logoImage, logoWidth, logoHeight, logoOpacity, logoPadding, logoPaddingStyle, logoPaddingRadius, removeQrCodeBehindLogo, qrStyle, eyeRadius, eyeColor, enableCORS, logoBg, logoBgWidth, logoBgHeight, logoBgPosition, logoBgX, logoBgY, logoBgObjectFit, logoBgCustomStyle, qrOpacity]);
  // Batasi panjang data untuk mencegah overflow
  const maxLength = {
    'L': 2953,
    'M': 2331,
    'Q': 1663,
    'H': 1273
  };
  
  const truncatedValue = value.length > (maxLength[ecLevel] || 1000) 
    ? value.substring(0, (maxLength[ecLevel] || 1000)) 
    : value;
    
  return (
    <div style={{marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h3>Preview QR Code</h3>
      {/* Preview kecil */}
      {logoBg ? (
        <div style={{position: "relative", width: previewSize || size, height: previewSize || size, display: "inline-block"}}>
          <img
            src={logoImage}
            alt="Logo Background"
            style={{
              position: "absolute",
              width: logoBgWidth * ((previewSize || size) / size),
              height: logoBgHeight * ((previewSize || size) / size),
              ...(() => {
                const w = logoBgWidth * ((previewSize || size) / size);
                const h = logoBgHeight * ((previewSize || size) / size);
                const S = (previewSize || size);
                switch (logoBgPosition) {
                  case 'center':
                    return { left: (S - w) / 2, top: (S - h) / 2 };
                  case 'top-left':
                    return { left: 0, top: 0 };
                  case 'top-right':
                    return { left: S - w, top: 0 };
                  case 'bottom-left':
                    return { left: 0, top: S - h };
                  case 'bottom-right':
                    return { left: S - w, top: S - h };
                  case 'custom':
                    return { left: logoBgX * ((previewSize || size)/size), top: logoBgY * ((previewSize || size)/size) };
                  default:
                    return { left: 0, top: 0 };
                }
              })(),
              objectFit: logoBgObjectFit,
              opacity: logoOpacity,
              zIndex: 1,
              ...Object.fromEntries((logoBgCustomStyle||"").split(';').filter(Boolean).map(s=>{const [k,v]=s.split(':');return [k.trim(),v.trim()]}))
            }}
          />
          <div style={{position: "absolute", left: 0, top: 0, zIndex: 2}}>
            <QRErrorBoundary>
              <QRCode
                value={truncatedValue}
                size={previewSize || size}
                fgColor={fgColor}
                bgColor="rgba(255,255,255,0)"
                ecLevel={ecLevel}
                quietZone={quietZone}
                qrStyle={qrStyle}
                eyeRadius={eyeRadius ? [eyeRadius, eyeRadius, eyeRadius] : undefined}
                eyeColor={eyeColor}
                enableCORS={enableCORS}
                id={customId && customId.trim() ? customId : 'qr-code-canvas'}
                style={{boxShadow: "0 2px 8px #0002", opacity: logoBg && qrOpacity ? qrOpacity : 1}}
              />
            </QRErrorBoundary>
          </div>
        </div>
      ) : (
        <QRErrorBoundary>
          <QRCode
            value={truncatedValue}
            size={previewSize || size}
            fgColor={fgColor}
            bgColor={bgColor}
            ecLevel={ecLevel}
            quietZone={quietZone}
            logoImage={logoImage}
            logoWidth={logoWidth * ((previewSize || size) / size)}
            logoHeight={logoHeight * ((previewSize || size) / size)}
            logoOpacity={logoOpacity}
            logoPadding={logoPadding}
            logoPaddingStyle={logoPaddingStyle}
            logoPaddingRadius={logoPaddingRadius}
            removeQrCodeBehindLogo={removeQrCodeBehindLogo}
            qrStyle={qrStyle}
            eyeRadius={eyeRadius ? [eyeRadius, eyeRadius, eyeRadius] : undefined}
            eyeColor={eyeColor}
            enableCORS={enableCORS}
            id={customId && customId.trim() ? customId : 'qr-code-canvas'}
            style={{boxShadow: "0 2px 8px #0002"}}
          />
        </QRErrorBoundary>
      )}
      {/* Hidden canvas untuk download/new tab, ukuran asli */}
      <div style={{position:'absolute', left:'-9999px', width:0, height:0, overflow:'hidden'}}>
        <QRErrorBoundary>
          <QRCode
            value={truncatedValue}
            size={size}
            fgColor={fgColor}
            bgColor={logoBg ? "rgba(255,255,255,0)" : bgColor}
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
            eyeRadius={eyeRadius ? [eyeRadius, eyeRadius, eyeRadius] : undefined}
            eyeColor={eyeColor}
            enableCORS={enableCORS}
            id={(customId && customId.trim() ? customId : 'qr-code-canvas') + '-full'}
            style={{display:'block'}}
          />
        </QRErrorBoundary>
      </div>
    </div>
  );
};

export default QRPreview;
