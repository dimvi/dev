// 기존 암호화된 파일을 새로운 키로 재암호화하는 스크립트
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const OLD_KEY = "hanwoong-portfolio-2024"; // 기존 키
const NEW_KEY = process.env.REACT_APP_ENCRYPTION_KEY; // 새로운 키

if (!NEW_KEY) {
  console.error('❌ REACT_APP_ENCRYPTION_KEY가 .env.local 파일에 설정되지 않았습니다.');
  process.exit(1);
}

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

function reencryptFile(encFilePath) {
  // 1. 기존 키로 복호화
  const encryptedData = fs.readFileSync(encFilePath);
  const decrypted = xorCrypt(encryptedData, OLD_KEY);
  
  // 2. 새로운 키로 암호화
  const reencrypted = xorCrypt(decrypted, NEW_KEY);
  
  // 3. 파일 덮어쓰기
  fs.writeFileSync(encFilePath, reencrypted);
  
  console.log(`✅ 재암호화 완료: ${path.basename(encFilePath)}`);
}

function reencryptImages() {
  const publicDir = path.join(__dirname, 'public');
  
  if (!fs.existsSync(publicDir)) {
    console.error('❌ public 디렉토리를 찾을 수 없습니다.');
    return;
  }
  
  const files = fs.readdirSync(publicDir);
  const encFiles = files.filter(file => file.toLowerCase().endsWith('.enc'));
  
  if (encFiles.length === 0) {
    console.log('⚠️  .enc 파일을 찾을 수 없습니다.');
    return;
  }
  
  console.log(`🔄 ${encFiles.length}개의 .enc 파일을 새로운 키로 재암호화합니다...`);
  console.log(`기존 키: "${OLD_KEY}" -> 새로운 키: "${NEW_KEY}"`);
  
  encFiles.forEach(encFile => {
    const filePath = path.join(publicDir, encFile);
    
    try {
      reencryptFile(filePath);
    } catch (error) {
      console.error(`❌ ${encFile} 재암호화 실패:`, error.message);
    }
  });
  
  console.log('🎉 재암호화 완료!');
}

// 스크립트 실행
reencryptImages();