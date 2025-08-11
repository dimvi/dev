# 이미지 암호화 설정 가이드

## 초기 설정

1. **환경 변수 파일 생성**
   ```bash
   cp .env.local.example .env.local
   ```

2. **암호화 키 설정**
   `.env.local` 파일을 열어서 `REACT_APP_ENCRYPTION_KEY` 값을 변경:
   ```
   REACT_APP_ENCRYPTION_KEY=your-unique-secret-key-123
   ```

## 새 이미지 추가 및 암호화

1. **PNG 파일을 public 폴더에 추가**
   ```bash
   cp your-image.png public/
   ```

2. **암호화 스크립트 실행**
   ```bash
   node encrypt-images.js
   ```

3. **코드에서 사용**
   ```javascript
   <DecryptedImage
     encryptedSrc={`${process.env.PUBLIC_URL}/your-image.enc`}
     fallbackSrc={`${process.env.PUBLIC_URL}/your-image.png`}
     width={256}
     height={256}
   />
   ```

## 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 추가됨)
- 프로덕션 환경에서는 환경 변수를 통해 키를 설정하세요
- 암호화 키를 변경하면 기존 암호화된 파일들을 다시 암호화해야 합니다

## 파일 구조
```
├── .env.local              # 로컬 환경 변수 (Git 제외)
├── .env.local.example      # 환경 변수 템플릿
├── encrypt-images.js       # 암호화 스크립트
├── src/
│   ├── utils/imageEncryption.js     # 암호화 유틸리티
│   └── components/DecryptedImage.js # 복호화 컴포넌트
└── public/
    ├── *.png              # 원본 이미지 파일
    └── *.enc              # 암호화된 이미지 파일
```