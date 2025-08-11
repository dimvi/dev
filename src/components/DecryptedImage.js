import React, { useState, useEffect } from 'react';
import { Image, Spin } from 'antd';

// 간단한 XOR 복호화 함수
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "hanwoong";

// 디버깅용 로그
console.log('DecryptedImage - Environment check:', {
  env: process.env.REACT_APP_ENCRYPTION_KEY,
  key: ENCRYPTION_KEY,
  allEnv: Object.keys(process.env).filter(key => key.startsWith('REACT_APP'))
});

function stringToBytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

function xorCrypt(data, key) {
  const keyBytes = stringToBytes(key);
  const result = new Uint8Array(data.length);
  
  for (let i = 0; i < data.length; i++) {
    result[i] = data[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return result;
}

async function decryptImageToDataURL(encryptedFilePath) {
  try {
    console.log('Attempting to decrypt:', encryptedFilePath);
    console.log('Using encryption key:', ENCRYPTION_KEY);
    
    const response = await fetch(encryptedFilePath);
    if (!response.ok) {
      console.error('Fetch failed:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const encryptedArrayBuffer = await response.arrayBuffer();
    const encryptedData = new Uint8Array(encryptedArrayBuffer);
    console.log('Encrypted data size:', encryptedData.length);
    
    // 복호화
    const decrypted = xorCrypt(encryptedData, ENCRYPTION_KEY);
    console.log('Decrypted data size:', decrypted.length);
    
    // Blob 생성 및 Data URL 변환
    const blob = new Blob([decrypted], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    console.log('Generated blob URL:', url);
    return url;
  } catch (error) {
    console.error('Failed to decrypt image:', error);
    return null;
  }
}

export default function DecryptedImage({ 
  encryptedSrc, 
  fallbackSrc, 
  width, 
  height, 
  style, 
  preview = true, 
  ...props 
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!encryptedSrc) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    decryptImageToDataURL(encryptedSrc)
      .then(url => {
        if (url) {
          setImageUrl(url);
        } else {
          setError('Failed to decrypt image');
        }
      })
      .catch(err => {
        console.error('Decryption error:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
      
    // Cleanup: revoke object URL when component unmounts or src changes
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [encryptedSrc]);
  
  if (loading) {
    return (
      <div 
        style={{ 
          width, 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...style 
        }}
      >
        <Spin />
      </div>
    );
  }
  
  if (error || !imageUrl) {
    return (
      <Image
        src={fallbackSrc}
        width={width}
        height={height}
        style={style}
        preview={preview}
        {...props}
      />
    );
  }
  
  return (
    <Image
      src={imageUrl}
      width={width}
      height={height}
      style={style}
      preview={preview}
      {...props}
    />
  );
}