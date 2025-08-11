// Node.js 스크립트로 public 폴더의 PNG 파일들을 암호화
const fs = require('fs');
const path = require('path');

// 환경 변수에서 암호화 키를 가져옵니다
require('dotenv').config({ path: '.env.local' });
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
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

function encryptFile(inputPath, outputPath) {
  const fileData = fs.readFileSync(inputPath);
  const encrypted = xorCrypt(fileData, ENCRYPTION_KEY);
  fs.writeFileSync(outputPath, encrypted);
  console.log(`✅ Encrypted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
}

// public 폴더의 모든 PNG 파일을 찾아서 암호화
function encryptImages() {
  const publicDir = path.join(__dirname, 'public');
  
  if (!fs.existsSync(publicDir)) {
    console.error('❌ public 디렉토리를 찾을 수 없습니다.');
    return;
  }
  
  const files = fs.readdirSync(publicDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
  
  if (pngFiles.length === 0) {
    console.log('⚠️  PNG 파일을 찾을 수 없습니다.');
    return;
  }
  
  console.log(`🔄 ${pngFiles.length}개의 PNG 파일을 암호화합니다...`);
  
  pngFiles.forEach(pngFile => {
    const inputPath = path.join(publicDir, pngFile);
    const baseName = path.basename(pngFile, '.png');
    const outputPath = path.join(publicDir, `${baseName}.enc`);
    
    try {
      encryptFile(inputPath, outputPath);
      
      // 원본 파일 삭제 (선택사항)
      // fs.unlinkSync(inputPath);
      // console.log(`🗑️  원본 파일 삭제: ${pngFile}`);
      
    } catch (error) {
      console.error(`❌ ${pngFile} 암호화 실패:`, error.message);
    }
  });
  
  console.log('🎉 암호화 완료!');
}

// 스크립트 실행
encryptImages();