// 간단한 XOR 암호화를 사용한 이미지 암호화/복호화 유틸리티
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "default-fallback-key";

// 문자열을 바이트 배열로 변환
function stringToBytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

// ArrayBuffer를 Base64로 인코딩
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Base64를 ArrayBuffer로 디코딩
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// XOR 암호화/복호화 (같은 함수)
function xorCrypt(data, key) {
  const keyBytes = stringToBytes(key);
  const result = new Uint8Array(data.length);
  
  for (let i = 0; i < data.length; i++) {
    result[i] = data[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return result;
}

// 파일 암호화 (Node.js 환경용)
export async function encryptFile(filePath, outputPath) {
  if (typeof require === 'undefined') {
    throw new Error('This function is for Node.js environment only');
  }
  
  const fs = require('fs');
  const fileData = fs.readFileSync(filePath);
  const encrypted = xorCrypt(fileData, ENCRYPTION_KEY);
  
  // .enc 확장자로 저장
  fs.writeFileSync(outputPath, encrypted);
  console.log(`Encrypted: ${filePath} -> ${outputPath}`);
}

// 웹에서 암호화된 파일을 복호화하여 이미지 URL 생성
export async function decryptImageToDataURL(encryptedFilePath) {
  try {
    const response = await fetch(encryptedFilePath);
    const encryptedArrayBuffer = await response.arrayBuffer();
    const encryptedData = new Uint8Array(encryptedArrayBuffer);
    
    // 복호화
    const decrypted = xorCrypt(encryptedData, ENCRYPTION_KEY);
    
    // Blob 생성 및 Data URL 변환
    const blob = new Blob([decrypted], { type: 'image/png' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to decrypt image:', error);
    return null;
  }
}

// React 컴포넌트에서 사용할 커스텀 훅
export function useDecryptedImage(encryptedPath) {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    if (!encryptedPath) return;
    
    setLoading(true);
    setError(null);
    
    decryptImageToDataURL(encryptedPath)
      .then(url => {
        if (url) {
          setImageUrl(url);
        } else {
          setError('Failed to decrypt image');
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
      
    // Cleanup: revoke object URL when component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [encryptedPath]);
  
  return { imageUrl, loading, error };
}