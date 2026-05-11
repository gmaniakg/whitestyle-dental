# 🦷 화이트스타일 치과 프로젝트 인수인계 가이드 (Antigravity용)

이 문서는 다른 환경의 Antigravity가 작업을 중단 없이 이어갈 수 있도록 오늘 수행된 모든 설정과 기술적 세부 사항을 담고 있습니다.

## 🛠️ 개발 환경 정보 (Environment)
- **운영체제**: Windows
- **Node.js**: `v24.15.0` (NVM 사용)
- **Git**: CLI 설치 및 `gh auth` 인증 완료 (대상 저장소: `whitestyle-dental`)
- **로컬 경로**: `c:\Users\lionk\Documents\whitestyle-dental`

## 🚀 배포 및 인프라 (Deployment)
- **GitHub 저장소**: [gmaniakg/whitestyle-dental](https://github.com/gmaniakg/whitestyle-dental)
- **Vercel URL**: [https://whitestyle-dental.vercel.app/](https://whitestyle-dental.vercel.app/)
- **자동 배포**: `main` 브랜치 푸시 시 Vercel에서 즉시 빌드 및 배포됨.

## ⚙️ 핵심 기능 구현 상세 (Implementation)

### 1. 무료 상담 이메일 전송 (Web3Forms)
- **방식**: 클라이언트 사이드 `fetch` (JavaScript)
- **수신 이메일**: `tp2303@naver.com`
- **설정**: `script.js` 하단의 `accessKey` 변수에 발급된 키가 입력되어 있습니다. 폼 전송 시 "상담 신청이 완료되었습니다" 알림창이 뜹니다.

### 2. 클라우드 AI 챗봇 (Gemini API)
- **구조**: Vercel Serverless Function 활용 (`/api/chat.js`)
- **모델**: `gemini-2.5-flash` (최신 텍스트 모델)
- **API Key**: `api/chat.js` 내부에 현재 작동하는 키가 삽입되어 있습니다.
- **프롬프트**: 화이트스타일치과의 '스마일 디렉터'로서 전문적이고 친절한 한국어 상담을 하도록 설정되어 있습니다.

## 📈 최근 업데이트 내역 (Latest Updates)
- **수치 데이터**: 강남역 30년, 누적 60,000명 이상, 지인 추천율 93.6% 반영 완료.
- **SEO 최적화**: `<title>` 및 `<meta>` 태그에 '강남역 임플란트', '강남역 치아교정' 키워드 강화.
- **CTA 강화**: 각 섹션(Trust, About, Services) 하단에 'VVIP 상담 신청하기' 유도 블록 추가.

## 📝 다음 작업 제안 (Next Steps)
1. **시각적 증명 추가**: 비포 & 애프터 환자 사례 갤러리 섹션 구축.
2. **보안 최적화**: `api/chat.js`에 노출된 API 키를 Vercel 대시보드의 Environment Variables로 옮기기.
3. **콘텐츠 보강**: '진료 과정 영상' 또는 '3D 장비 소개' 섹션의 상세 텍스트 작업.

---
**내일의 Antigravity에게**: 사용자님이 이 파일을 읽어달라고 하시면, 위 내용을 바탕으로 `script.js`와 `index.html`을 분석하여 작업을 이어가세요.
