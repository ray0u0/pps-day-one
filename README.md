# jodal — 오늘부터 조달청

조달청 업무를 소재로 한 비공식 HTML 시뮬레이션 게임 프로젝트입니다.

## 로컬 실행

- **권장:** `today-pps/index.html` (가벼운 HTML + `today-pps/assets/`의 이미지·`bgm-loop.mp3`)
- 단일 파일(대용량): 루트 `오늘부터_조달청.html` — 이미지·BGM이 HTML 안에 들어 있음
- 소스 수정 후: `node build-game.cjs` (위 두 HTML + Pages용 asset 복사)
- 배경 루프 mp3 원본: `assets/bgm-loop.mp3` (`npm run bgm`으로 재생성)

## GitHub Pages

- 저장소: [ray0u0/pps-day-one](https://github.com/ray0u0/pps-day-one)
- 게임 URL: **https://ray0u0.github.io/pps-day-one/** (`today-pps/` — Actions 배포)

`main`에 push하면 `.github/workflows/pages.yml`이 `today-pps`를 Pages에 올립니다.

조달청 로고·나르미·달이 캐릭터 권리는 해당 권리자에게 있습니다. 공식 서비스가 아닙니다.