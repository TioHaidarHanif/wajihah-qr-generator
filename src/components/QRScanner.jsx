
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const QRScanner = () => {
  const videoRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [flashOn, setFlashOn] = useState(false);
  const [flashSupported, setFlashSupported] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const codeReader = useRef(null);
  const [error, setError] = useState('');
  const [qrBox, setQrBox] = useState(null); // {points: [{x, y}, ...]}

  // Get available cameras & check flash support
  useEffect(() => {
    (async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        setCameras(videoDevices);
        if (videoDevices.length > 0) setSelectedCamera(videoDevices[0].deviceId);
        // Cek support flash/torch
        if (navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: videoDevices[0]?.deviceId } });
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities ? track.getCapabilities() : {};
          setFlashSupported(!!capabilities.torch);
          track.stop();
        } else {
          setFlashSupported(false);
        }
      } catch (e) {
        setError('Tidak dapat mengakses kamera.');
        setFlashSupported(false);
      }
    })();
    return () => { stopScan(); };
    // eslint-disable-next-line
  }, []);

  // Start/stop scan
  useEffect(() => {
    if (scanning && selectedCamera) {
      startScan();
    } else {
      stopScan();
    }
    // eslint-disable-next-line
  }, [scanning, selectedCamera, flashOn]);

  const startScan = async () => {
    if (!selectedCamera) return;
    stopScan();
    codeReader.current = new BrowserMultiFormatReader();
    try {
      await codeReader.current.decodeFromVideoDevice(
        selectedCamera,
        videoRef.current,
        (result, err, controls) => {
          // Highlight QR box jika terdeteksi
          if (result && result.resultPoints && result.resultPoints.length >= 4) {
            // Ambil 4 sudut QR
            setQrBox(result.resultPoints.map(p => ({ x: p.x, y: p.y })));
          } else {
            setQrBox(null);
          }
          if (result) {
            setResult(result.getText());
            setShowPopup(true);
            setScanning(false);
            controls.stop();
            setQrBox(null);
          }
        },
        {
          video: {
            facingMode: 'environment',
            deviceId: selectedCamera,
            ...(flashOn ? { torch: true } : {})
          }
        }
      );
    } catch (e) {
      setError('Gagal memulai kamera.');
    }
  };

  const stopScan = () => {
    if (codeReader.current) {
      if (typeof codeReader.current.stopContinuousDecode === 'function') {
        codeReader.current.stopContinuousDecode();
      } else if (typeof codeReader.current.stopDecoding === 'function') {
        codeReader.current.stopDecoding();
      }
      codeReader.current = null;
    }
    setQrBox(null);
  };

  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
  };

  const handleFlashToggle = () => {
    setFlashOn(f => !f);
  };

  const handleStart = () => {
    setError('');
    setResult(null);
    setShowPopup(false);
    setScanning(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setResult(null);
  };

  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  const isUrl = (text) => {
    // Cek jika text sudah valid URL
    try {
      new URL(text);
      return true;
    } catch {}
    // Cek jika text mirip domain/url tanpa protokol (bit.ly/xxx, google.com, dsb)
    const urlPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    const urlWithPathPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/;
    if (urlPattern.test(text) || urlWithPathPattern.test(text)) {
      return true;
    }
    // Cek jika text mirip shortlink (bit.ly/xxx, s.id/xxx, dll)
    if (/^(bit\.ly|s\.id|tinyurl\.com|t\.co|goo\.gl|cutt\.ly|rb\.gy|shope\.ee|wa\.me)\/.+/i.test(text)) {
      return true;
    }
    return false;
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <h2>QR Scanner</h2>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div style={{ marginBottom: 8 }}>
        <select value={selectedCamera} onChange={handleCameraChange}>
          {cameras.map(cam => (
            <option key={cam.deviceId} value={cam.deviceId}>{cam.label || `Kamera ${cam.deviceId}`}</option>
          ))}
        </select>
        <button onClick={handleFlashToggle} style={{ marginLeft: 8 }} disabled={!selectedCamera || !flashSupported}>
          {flashOn ? 'Matikan Flash' : 'Nyalakan Flash'}
        </button>
      </div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={handleStart} disabled={scanning || !selectedCamera}>
          {scanning ? 'Scanning...' : 'Mulai Scan'}
        </button>
        {scanning && (
          <button onClick={() => setScanning(false)} style={{ marginLeft: 8 }}>Stop</button>
        )}
      </div>
      <div style={{ width: '100%', minHeight: 240, background: '#222', borderRadius: 8, overflow: 'hidden', marginBottom: 8, position: 'relative' }}>
        <video ref={videoRef} style={{ width: '100%', height: 240, objectFit: 'cover' }} autoPlay muted playsInline />
        {/* Overlay highlight QR */}
        {qrBox && qrBox.length === 4 && (
          <svg
            width="100%"
            height="240"
            style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
          >
            <polygon
              points={qrBox.map(p => `${p.x},${p.y}`).join(' ')}
              fill="rgba(39, 174, 96, 0.15)"
              stroke="#27ae60"
              strokeWidth="3"
            />
          </svg>
        )}
      </div>
      {showPopup && (
        <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 12, minWidth: 300, textAlign: 'center', boxShadow: '0 2px 16px #0002' }}>
            <h3>Hasil Scan</h3>
            <div style={{ wordBreak: 'break-all', margin: '16px 0', color: '#333' }}>{result}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {isUrl(result) ? (
                <a
                  href={
                    result.match(/^https?:\/\//i)
                      ? result
                      : 'https://' + result
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Buka Link</button>
                </a>
              ) : (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(result)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Cari di browser</button>
                </a>
              )}
              <button onClick={handleCopy}>Copy</button>
              <button onClick={handleClosePopup}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
