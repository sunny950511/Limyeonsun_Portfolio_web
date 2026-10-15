import React, { useState } from 'react';
import myProfile from './assets/yeonsun.png';

// 외부 이미지(http)는 유지하고, 내부 public 이미지는 배포 BASE_URL과 자동 결합하여 404 방지
const getAssetUrl = (path) => {
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\//, '');
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
};


// ==========================================
// 1. 프로필 & 인적사항 데이터
// ==========================================
const PROFILE = {
  avatar: myProfile,
  name: '임연선',
  birth: '1995.05.11',
  address: '경기도 수원시 장안구 송죽동',
  email: 'sunny950511@gmail.com',
  phone: '010-8497-4204',
  blog: 'https://blog.naver.com/sunnny_52'
};

const MENU = {
  portfolio: ['SNS Content', 'WEB & UI/UX Design', 'AI Image'],
};

// ==========================================
// 2. 프로젝트 리스트 데이터 (네이버 블로그 포스트처럼 관리)
//    - 새 글 추가: 맨 밑에 객체 하나만 복사해서 붙여넣기!
//    - 이미지: public/images/ 안에 넣고 "/images/파일명.jpg" 로 적으시면 됩니다.
// ==========================================
const PROJECTS = [
  // 1. 국립중앙박물관 리디자인 프로젝트 (첨부 이미지의 상세 뷰 예시)
  {
    id: 1,
    category: 'UI/UX',
    title: '국립중앙박물관 리디자인 프로젝트',
    thumbnail: '/images/museum/museum_main.png',
    demoUrl: 'https://sunny950511.github.io/museum/',
    description: '국립중앙박물관 UX/UI 웹 접근성 개선 개인 프로젝트입니다. 바로가기 버튼 클릭 시 라이브 데모 사이트로 이동됩니다.', // 텍스트 설명이 필요하면 여기에 작성 (엔터 줄바꿈 지원)
    // 블로그 포스팅처럼 아래로 쭉 이어질 상세 이미지 목록
    detailImages: [
      '/images/museum/museum_main.png',
    ],
  },
  {
    id: 2,
    category: 'UI/UX',
    title: '가상 브랜드 Mellobe 랜딩 페이지',
    thumbnail: '/images/mellobe/mellobe_main.png',
    demoUrl: 'https://sunny950511.github.io/Mellobe/',
    description: '가상 브랜드 Mellobe 랜딩 페이지 디자인 프로젝트입니다. 바로가기 버튼 클릭 시 라이브 데모 사이트로 이동됩니다.',
    detailImages: [
      '/images/mellobe/mellobe_main.png',
    ],
  },
  {
    id: 3,
    category: 'UI/UX',
    title: '사람인 홈페이지 리디자인 프로젝트',
    thumbnail: '/images/saramin/saramin_main.png',
    description: '사람인 홈페이지 리디자인 프로젝트입니다.\n\n-AI를 활용한 배너 이미지\n-반응형 클론 사이트',
    detailImages: [
      '/images/saramin/saramin_main.png',
    ],
  },
  {
    id: 4,
    category: 'UI/UX',
    title: 'AI 대시보드',
    thumbnail: '/images/dashboard/dashboard_main.png',
    demoUrl: 'https://dashboard-iota-bay-42.vercel.app/',
    description: 'AI 기반 데이터 시각화 대시보드 프로젝트입니다. 바로가기 버튼 클릭 시 라이브 데모 사이트로 이동됩니다.',
    detailImages: [
      '/images/dashboard/dashboard_main.png',
    ],
  },
  {
    id: 5,
    category: 'UI/UX',
    title: '가상 브랜드 MOMO&CO. 홈페이지',
    thumbnail: '/images/momo&co/momo&co_main.png',
    description: '가상 브랜드 MOMO&CO. 프로모션 페이지 디자인 프로젝트입니다.\n\n[반려동물과 함께하는 일상에 필요한 제품을 취향에 맞게 발견할 수 있는 라이프스타일 펫 커머스]\n\n- 페르소나 : 온라인 쇼핑에 익숙하고 가성비와 가심비를 모두 생각하며 디자인을 중요하게 생각하는 2030 반려동물 보호자\n- UX Goal : 사용자가 필요한 상품을 쉽게 찾을 수 있게한다.\n- 핵심 키워드 : 따뜻함(warm),깔끔함(clean),라이프스타일(lifestyle),신뢰감(trust)',
    detailImages: [
      '/images/momo&co/momo&co_main.png',
    ],
  },

  // SNS Content 카드들
  {
    id: 6,
    category: 'SNS Content',
    title: '책 추천 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_book.png',
    description: '피그마 템플릿을 활용한 인스타그램 세로형 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/sns_book.png'
    ],
  },
  {
    id: 7,
    category: 'SNS Content',
    title: '식단 간식 추천 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_snack.png',
    description: '피그마 템플릿을 활용한 인스타그램 세로형 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/sns_snack.png'
    ],
  },
  {
    id: 8,
    category: 'SNS Content',
    title: '여행지 추천 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_travel.png',
    description: '피그마 템플릿을 활용한 인스타그램 세로형 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/sns_travel.png',
    ],
  },
  {
    id: 9,
    category: 'SNS Content',
    title: '맛집 추천 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_food.png',
    description: '피그마 템플릿을 활용한 인스타그램 세로형 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/sns_food.png',
    ],
  },
  {
    id: 10,
    category: 'SNS Content',
    title: '취미 추천 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_hobby.png',
    description: '피그마 템플릿을 활용한 인스타그램 세로형 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/sns_hobby.png',
    ],
  },

  // SNS Content (카페 광고, 템플릿 등)
  {
    id: 11,
    category: 'SNS Content',
    title: '카페 광고 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_cafe.png',
    description: '',
    detailImages: [
      '/images/SNS/sns_cafe.png',
    ],
  },
  {
    id: 12,
    category: 'SNS Content',
    title: '템플릿 / 인스타그램 카드뉴스',
    thumbnail: '/images/SNS/카드뉴스1/01.png',
    description: '피그마 템플릿을 활용한 인스타그램 카드뉴스 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/카드뉴스1/01.png',
      '/images/SNS/카드뉴스1/02.png',
      '/images/SNS/카드뉴스1/03.png',
      '/images/SNS/카드뉴스1/04.png',
    ],
  },

  // Promotional 포스터
  {
    id: 13,
    category: 'SNS Content',
    title: '원데이클래스 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_class.png',
    description: '',
    detailImages: [
      '/images/SNS/sns_class.png'
    ],
  },
  {
    id: 14,
    category: 'SNS Content',
    title: '전시회 포스터 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_poster.png',
    description: '',
    detailImages: [
      '/images/SNS/sns_poster.png',
    ],
  },
  {
    id: 15,
    category: 'SNS Content',
    title: '브랜드 포스터 / 인스타그램 세로형',
    thumbnail: '/images/SNS/sns_brand.png',
    description: '',
    detailImages: [
      '/images/SNS/sns_brand.png',
    ],
  },
  {
    id: 16,
    category: 'SNS Content',
    title: '디저트 홍보 카드뉴스',
    thumbnail: '/images/SNS/디저트1/01.png',
    description: '피그마 템플릿을 활용한 인스타그램 세로형 콘텐츠입니다.',
    detailImages: [
      '/images/SNS/디저트1/01.png',
      '/images/SNS/디저트1/02.png',
      '/images/SNS/디저트1/03.png',
      '/images/SNS/디저트1/04.png',
      '/images/SNS/디저트1/05.png',
      '/images/SNS/디저트1/06.png',
      '/images/SNS/디저트1/07.png',
    ],
  },
];

// ==========================================
// 3. AI Image 갤러리 이미지 목록 (원본 비율 유지)
// ==========================================
const AI_IMAGES = [
  '/images/ai_img/01.png',
  '/images/ai_img/02.png',
  '/images/ai_img/03.png',
  '/images/ai_img/04.png',
  '/images/ai_img/Frame 96 1.png',
  '/images/ai_img/Frame 97 1.png',
  '/images/ai_img/Frame 98 1.png',
  '/images/ai_img/Frame 99 1.png',
  '/images/ai_img/Frame 101 1.png',
  '/images/ai_img/Frame 102 1.png',
  '/images/ai_img/care01 1.png',
  '/images/ai_img/care02 1.png',
  '/images/ai_img/care03 1.png',
  '/images/ai_img/care06 1.png',
  '/images/ai_img/care08 1.png',
  '/images/ai_img/eat02 1.png',
  '/images/ai_img/home03 1.png',
  '/images/ai_img/home04 1.png',
  '/images/ai_img/home05 1.png',
  '/images/ai_img/home06 1.png',
];

// ==========================================
// 4. Amusement 갤러리 이미지 목록
// ==========================================
const AMUSE_IMAGES = [
  '/images/amuse/KakaoTalk_20261005_171120301.jpg',
  '/images/amuse/KakaoTalk_20261006_132843260_10.jpg',
  '/images/amuse/KakaoTalk_20261008_120459917_02.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_02.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_07.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_10.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_12.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_13.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_14.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_15.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_16.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_17.jpg',
  '/images/amuse/KakaoTalk_20261008_155637119_20.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372_01.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372_14.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372_15.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372_16.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372_18.jpg',
  '/images/amuse/KakaoTalk_20261008_173927372_26.jpg',
  '/images/amuse/KakaoTalk_20261010_213909619_03.jpg',
  '/images/amuse/KakaoTalk_20261015_160817328.jpg',
];

function App() {
  // 현재 선택된 프로젝트 ID (null이면 전체 목록 뷰, id가 있으면 해당 상세 뷰)
  const [selectedId, setSelectedId] = useState(null);

  // 현재 선택된 카테고리 ('ALL'이면 전체 프로젝트 표시)
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // 현재 열람 중인 프로젝트 찾기
  const currentProject = PROJECTS.find((p) => p.id === selectedId);

  // 카테고리 필터링된 프로젝트 목록
  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedCategory === 'ALL') return true;

    // UX/UI 디자인: 섹션 1, 2, 3, 4, 5 및 category가 'UI/UX'인 프로젝트 모두 포함
    if (selectedCategory === 'WEB & UI/UX Design' || selectedCategory === 'UI/UX') {
      return project.category === 'UI/UX' || [1, 2, 3, 4, 5].includes(project.id);
    }

    if (selectedCategory === 'SNS Content') {
      return project.category === 'SNS Content';
    }

    if (selectedCategory === 'AI Image') {
      return project.category === 'AI Image';
    }

    return project.category === selectedCategory;
  });

  // 카드 클릭 시 상세 페이지 열기
  const handleCardClick = (id) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 전체 포트폴리오 보기 (메인 화면으로 복귀)
  const handleShowAll = () => {
    setSelectedCategory('ALL');
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 카테고리 메뉴 클릭
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-container">
      {/* 1. 좌측 사이드바 (스크롤 시에도 좌측에 고정) */}
      <aside className="sidebar">
        {/* 프로필 사진 */}
        <div className="profile-avatar-wrap">
          <img
            src={PROFILE.avatar}
            alt="프로필 이미지"
            className="profile-avatar"
          />
        </div>

        {/* Portfolio 메뉴 */}
        <div className="sidebar-section">
          <h2
            className="sidebar-title"
            style={{ cursor: 'pointer' }}
            onClick={handleShowAll}
            title="전체 포트폴리오 보기"
          >
            Portfolio
          </h2>
          <ul className="sidebar-list">
            {MENU.portfolio.map((item, index) => {
              const isActive = selectedCategory === item;
              return (
                <li
                  key={index}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Amusement 메뉴 */}
        <div className="sidebar-section">
          <h2
            className={`sidebar-title clickable ${selectedCategory === 'Amusement' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleCategoryClick('Amusement')}
            title="Amusement 갤러리 보기"
          >
            Amusement
          </h2>
        </div>

        {/* About Me 정보 */}
        <div className="sidebar-section">
          <h2 className="sidebar-title">About Me</h2>
          <ul className="sidebar-list">
            <li className="sidebar-item">{PROFILE.name}</li>
            <li className="sidebar-item">{PROFILE.birth}</li>
            <li className="sidebar-item">{PROFILE.address}</li>
            <li className="sidebar-item">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </li>
            <li className="sidebar-item">{PROFILE.phone}</li>
            {PROFILE.blog && (
              <li className="sidebar-item">
                <a
                  href={PROFILE.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* 2. 우측 콘텐츠 영역 */}
      <main className="content-area">
        {currentProject ? (
          /* ====================================================
             [첨부 이미지 2번 형태: 블로그형 상세 페이지]
             ==================================================== */
          <article className="detail-view">
            {/* 상단 네비게이션: UI/UX 국립중앙박물관 리디자인 프로젝트 */}
            <div className="detail-top-nav">
              <div className="detail-nav-left">
                <span className="detail-nav-category">{currentProject.category}</span>
                <span className="detail-nav-title">{currentProject.title}</span>
              </div>
              <button
                type="button"
                className="detail-back-btn"
                onClick={handleBackToList}
              >
                ✕ 목록으로
              </button>
            </div>

            {/* 본문 설명 및 세로로 나열되는 상세 이미지들 */}
            <div className="detail-content">
              {/* 라이브 데모 버튼: demoUrl이 등록된 모든 프로젝트에 자동으로 동일 버튼 노출 */}
              {currentProject.demoUrl && currentProject.demoUrl.trim() !== '' && (
                <div className="detail-demo-wrap">
                  <a
                    href={currentProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-demo-btn"
                  >
                    Live Demo 바로가기 ↗
                  </a>
                </div>
              )}

              {currentProject.description && (
                <div className="detail-description">
                  {currentProject.description}
                </div>
              )}

              {/* 카테고리가 SNS Content, AI Image, Amusement인 경우 썸네일 크기로 축소 */}
              <div
                className={`detail-images-list ${['SNS Content', 'AI Image', 'Amusement'].includes(currentProject.category)
                  ? 'compact'
                  : ''
                  }`}
              >
                {currentProject.detailImages &&
                  currentProject.detailImages.map((imgSrc, index) => (
                    <div key={index} className="detail-image-item">
                      <img
                        src={getAssetUrl(imgSrc)}
                        alt={`${currentProject.title} - ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </article>
        ) : selectedCategory === 'AI Image' ? (
          /* ====================================================
             AI Image 전용 자유 비율 갤러리 (Masonry 형식)
             ==================================================== */
          <div className="ai-gallery-grid">
            {AI_IMAGES.map((imgSrc, index) => (
              <div key={index} className="ai-gallery-item">
                <img
                  src={getAssetUrl(imgSrc)}
                  alt={`AI Image ${index + 1}`}
                  className="ai-gallery-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : selectedCategory === 'Amusement' ? (
          /* ====================================================
             Amusement 전용 감성 갤러리 (적당한 크기의 스냅샷 그리드)
             ==================================================== */
          <div className="amuse-gallery-grid">
            {AMUSE_IMAGES.map((imgSrc, index) => (
              <div key={index} className="amuse-gallery-item">
                <img
                  src={getAssetUrl(imgSrc)}
                  alt={`Amusement ${index + 1}`}
                  className="amuse-gallery-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          /* ====================================================
             메인 화면(ALL) 또는 기타 카테고리 필터
             ==================================================== */
          <>
            {filteredProjects.length > 0 ? (
              <div className="project-grid">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="project-card"
                    onClick={() => handleCardClick(project.id)}
                  >
                    <div className="thumbnail-wrap">
                      <img
                        src={getAssetUrl(project.thumbnail)}
                        alt={project.title}
                        className="thumbnail-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="project-info">
                      <span className="project-category">{project.category}</span>
                      <span className="project-title">{project.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-category-msg">
                <p>해당 카테고리에 등록된 프로젝트가 없습니다.</p>
                <button
                  type="button"
                  className="detail-back-btn"
                  style={{ marginTop: '16px' }}
                  onClick={handleShowAll}
                >
                  전체 포트폴리오 보기
                </button>
              </div>
            )}

            {/* 메인 화면('ALL') 접속 시 AI Image 갤러리도 하단에 바로 표시 */}
            {selectedCategory === 'ALL' && (
              <div className="main-ai-section">
                <h3 className="main-section-title">AI Image</h3>
                <div className="ai-gallery-grid">
                  {AI_IMAGES.map((imgSrc, index) => (
                    <div key={index} className="ai-gallery-item">
                      <img
                        src={getAssetUrl(imgSrc)}
                        alt={`AI Image ${index + 1}`}
                        className="ai-gallery-img"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
