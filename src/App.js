import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  FloatButton,
  Layout,
  Modal,
  Progress,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
  theme,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import DecryptedImage from "./components/DecryptedImage";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;


const PROFILE = `
• 글로벌·국내 캐주얼 게임 다수 런칭 및 라이브 서비스 운영
• 2.5D MMORPG 신작 개발 참여
• Unity DOTS(ECS)·URP 환경에서의 게임 개발 경험
• 엔진·툴링·시뮬레이터까지 아우르는 실전형 문제 해결 능력
`;

const ABOUT = `
저는 Unity와 Cocos2d-x를 활용해 라이브 서비스와 신작 개발을 모두 경험했습니다.
라이브 서비스 과정에서는 클라이언트 크래시 같은 긴급 이슈나 
대규모 업데이트 시 발생할 수 있는 호환성 문제에 대응해 왔습니다. 
무엇보다 서비스 안정성을 최우선으로 생각하며, 문제가 발생했을 때는 신속한 원인 파악과 대응뿐 아니라 
재발 방지를 위한 구조 개선과 프로세스 정비에도 힘써 왔습니다.

신규 프로젝트에서는 다양한 기술적 요구와 복잡한 문제를 다뤄왔으며,
기획부터 런칭까지 전 과정을 직접 경험하며 문제를 해결해 온 점이 강점이라고 생각합니다.

R&D 분야에도 꾸준히 관심을 가지고 새로운 기술을 학습하고 적용하는 것을 즐깁니다.
예를 들어 Unity의 ECS(Entity Component System)와 Job System을 초기 버전부터 연구해 왔고,
이를 실제 프로젝트에 도입해 성공적으로 런칭까지 이어간 경험이 있습니다. 
최근에는 Unity UIToolkit과 MVVM 패턴, Claude Code의 SubAgent·CustomCommand, 
바이브 코딩 등에도 관심을 가지고 실제로 다양한 개발 테스트를 진행하고 있습니다.

이처럼 라이브 서비스 운영, 신규 기술의 학습과 실험, 그리고 실무 적용에 이르기까지 다양한 경험을 통해 얻은 실전 역량을 갖추고 있습니다.
`;

const SKILLS = [
  { name: "Unity", pct: 80 },
  { name: "UI/Reactive 프레임워크(UGUI/UIToolkit)", pct: 80 },
  { name: "C#", pct: 75 },
  { name: "아키텍처(ECS/MVP/MVVM)", pct: 70 },
  { name: "DOTS / JobSystem / Burst", pct: 50 },
];


const MODAL_MAX_HEIGHT = "70vh";
const THUMBNAIL_SIZE = 128;

const EXPERIENCES = [
  {
    period: "2023.07 ~ 재직",
    company: "슈퍼캣",
    position: "클라이언트 파트장",
    points: [
    ],
    tags: ["Unity", "UGUI", "Reactive", "UI Framework", "ECS", "MVP"],
    details: {
      images: [
        {
          src: `${process.env.PUBLIC_URL}/exp7.enc`,
          title: "바람의나라2"
        }
      ],
      items: [
        "주요 업무내용 및 실적",
        "  2.5D MMORPG 신작 개발, 클라이언트 파트 리딩",
        "  UI/Reactive 프레임워크 설계 및 구축",
        "  ECS/MVP 아키텍처 개선",
        "  DOTS ContentArchives 병렬 빌드 파이프라인 구축",
        "  코드 리뷰 및 아키텍처 가이드",
        "  신규 기술 도입 및 적용",
        "  개발 프로세스 개선",
        "개발도구",
        "  Unity",
        "  Git, Bitbucket",
        "  Visual Studio",
        "  Microsoft Excel",
        "  Jira, Confluence",
        "개발환경",
        "  Windows 10",
        "  Unity URP, C#",
        "  Jenkins",
        "  Android, iOS, Windows"
      ]
    }
  },
  {
    period: "2022.07 ~ 2023.07",
    company: "퍼즐원스튜디오",
    position: "리드 클라이언트 프로그래머",
    points: [
    ],
    tags: ["Unity", "최적화", "GC", "ANR"],
    details: {
      images: [
        {
          src: `${process.env.PUBLIC_URL}/exp6.enc`,
          title: "버블팝 오리진"
        }
      ],
      items: [
        "주요 업무내용 및 실적",
        "  2D 캐주얼 모바일 게임 라이브 서비스, 컨텐츠 개발",
        "  ANR 최적화 작업",
        "  리드 클라이언트 역할 수행",
        "  공용 3매치 엔진(레드판다) 유지보수",
        "개발도구",
        "  Unity",
        "  Git, GitLab",
        "  Rider",
        "개발환경",
        "  macOS",
        "  Unity, C#",
        "  Docker, Kubernetes, MongoDB, Firebase",
        "  Jenkins",
        "  Android, iOS"
      ]
    }
  },
  {
    period: "2014.07 ~ 2022.06",
    company: "위메이드플레이(선데이토즈)",
    position: "클라이언트 프로그래머",
    points: [
    ],
    tags: ["Unity", "DOTS", "JobSystem", "3Match"],
    details: {
      images: [
        {
          src: `${process.env.PUBLIC_URL}/exp5.enc`,
          title: "디즈니팝타운"
        },
        {
          src: `${process.env.PUBLIC_URL}/exp4.enc`,
          title: "LINE TouchMonchy"
        },
        {
          src: `${process.env.PUBLIC_URL}/exp3.enc`,
          title: "애니팡 사천성"
        }
      ],
      items: [
        "주요 업무내용 및 실적",
        "  2D 캐주얼 모바일 게임 라이브 서비스, 신작 개발",
        "  디즈니팝타운 신작 런칭",
        "    3매치 엔진 개발",
        "    Unity JobSystem, NativeCollections",
        "    인게임 시뮬레이터 개발",
        "  LINE TouchMonchy 신작 런칭",
        "    사천성 인게임 개발",
        "    LineSDK 연동",
        "  애니팡 사천성 라이브 서비스",
        "    컨텐츠 개발 및 코드 유지보수",
        "개발도구",
        "  Unity",
        "  Git, GitHub",
        "  Visual Studio",
        "  Trello",
        "개발환경",
        "  Windows 10",
        "  Unity, C#",
        "  RESTful API",
        "  Firebase",
        "  Jenkins",
        "  Android, iOS"
      ]
    }
  },
  {
    period: "2012.01 ~ 2014.05",
    company: "DevCrews",
    position: "클라이언트 프로그래머",
    points: [
    ],
    tags: ["Cocos2d-x", "C++"],
    details: {
      images: [
        {
          src: `${process.env.PUBLIC_URL}/exp2.enc`,
          title: "FruitJelly"
        },
        {
          src: `${process.env.PUBLIC_URL}/exp1.enc`,
          title: "BottleBattle"
        }
      ],
      items: [
        "주요 업무내용 및 실적",
        "  2D 캐주얼 모바일 게임 신작 개발",
        "  FruitJelly 신작 런칭",
        "    2012,2013 G-Star/IT EXPO 참가",
        "  BottleBattle 신작 런칭",
        "    2012 제3화 부산 모바일 앱 공모전 최우수상 수상",
        "개발도구",
        "  Cocos2d-x",
        "  Git, Bitbucket",
        "  Visual Studio",
        "개발환경",
        "  macOS",
        "  Cocos2d-x, C++",
        "  Android, iOS"
      ]
    }
  },
];

export default function PortfolioApp() {
  const [shouldBlur, setShouldBlur] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllExperiencesModalVisible, setIsAllExperiencesModalVisible] = useState(false);

  useEffect(() => {
    const checkBlurCondition = () => {
      const currentUrl = window.location.href;
      const isDevPath = currentUrl.includes('localhost:3000/dev') || currentUrl.includes('dimvi.github.io/dev');
      const urlParams = new URLSearchParams(window.location.search);
      const hasCorrectParam = urlParams.get('param') === 'hanwoong';
      
      console.log('Blur check:', {
        currentUrl,
        isDevPath,
        searchParams: window.location.search,
        paramValue: urlParams.get('param'),
        hasCorrectParam,
        shouldBlur: isDevPath && !hasCorrectParam
      });
      
      setShouldBlur(isDevPath && !hasCorrectParam);
    };

    checkBlurCondition();
    
    window.addEventListener('popstate', checkBlurCondition);
    return () => window.removeEventListener('popstate', checkBlurCondition);
  }, []);

  const handleExperienceClick = (exp) => {
    setSelectedExperience(exp);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedExperience(null);
  };

  const handleAllExperiencesModalOpen = () => {
    setIsAllExperiencesModalVisible(true);
  };

  const handleAllExperiencesModalClose = () => {
    setIsAllExperiencesModalVisible(false);
  };

  const handlePrevCompany = () => {
    const currentIndex = EXPERIENCES.findIndex(exp => exp.company === selectedExperience.company);
    if (currentIndex > 0) {
      setSelectedExperience(EXPERIENCES[currentIndex - 1]);
    }
  };

  const handleNextCompany = () => {
    const currentIndex = EXPERIENCES.findIndex(exp => exp.company === selectedExperience.company);
    if (currentIndex < EXPERIENCES.length - 1) {
      setSelectedExperience(EXPERIENCES[currentIndex + 1]);
    }
  };

  const getCurrentIndex = () => {
    return EXPERIENCES.findIndex(exp => exp.company === selectedExperience?.company);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
          fontFamily: "'IBM Plex Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
      }}
    >
      <div style={{
        filter: shouldBlur ? 'blur(10px)' : 'none',
        transition: 'filter 0.3s ease'
      }}>
        <Layout>

        <Content style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* 소개 */}
          <section style={{ padding: "96px 16px 64px" }}>
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={14}>
                <Space direction="vertical" size="large">
                  <Title style={{ marginBottom: 0 }}>박한웅 | 클라이언트 프로그래머</Title>
                  <Paragraph type="secondary" style={{ marginTop: 0, whiteSpace: "pre-line" }}>
                    {PROFILE}
                  </Paragraph>
                  <Space wrap>
                    <Button type="primary" icon={<MailOutlined />} href="mailto:hidimvi@gmail.com">
                      이메일
                    </Button>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={10}>
                {/* 썸네일 이미지 영역 */}
                <DecryptedImage
                  encryptedSrc={`${process.env.PUBLIC_URL}/thumb.enc`}
                  fallbackSrc={`${process.env.PUBLIC_URL}/thumb.png`}
                  width={240}
                  height={240}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "32px auto",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                    display: "block",
                  }}
                  preview={false}
                />
              </Col>
            </Row>
          </section>

          <Divider id="about" />

          {/* About */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>소개</Title>
            <Paragraph type="secondary" style={{ marginTop: 0, whiteSpace: "pre-line" }}>
              {ABOUT}
            </Paragraph>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="기본 정보" style={{ height: "100%" }}>
                  <DescriptionsLike
                    items={[["이름", "박한웅 (Hanwoong Park)"], ["연락처", "010-9311-2117"], ["이메일", "hidimvi@gmail.com"], ["생년월일", "1987.01.03"]]}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="핵심 역량" style={{ height: "100%" }}>
                  <DescriptionsLike
                    items={[
                      ["아키텍처 설계", "클라이언트 아키텍처 설계"],
                      ["프레임워크 구축", "UI/Reactive 프레임워크 구축"],
                      ["서비스 운영", "안정적 라이브 운영 및 개발 효율 향상"],
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </section>

          <Divider id="skills" />

          {/* Skills */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>기술</Title>
            <Space wrap size="small">
              {[
                "Unity",
                "C#",
                "UGUI",
                "UIToolkit",
                "JobSystem",
                "DOTS(ECS/Jobs/Burst)",
                "Cocos2d-x",
                "C++",
              ].map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </Space>
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {SKILLS.map((s) => (
                <Col xs={24} sm={12} lg={8} key={s.name}>
                  <Skill name={s.name} pct={s.pct} />
                </Col>
              ))}
            </Row>
          </section>

          <Divider id="experience" />

          {/* Experience (이력 폼) */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>경력</Title>
            <Timeline
              mode="left"
              items={EXPERIENCES.map((exp) => ({
                label: exp.period,
                children: (
                  <Card hoverable onClick={() => handleExperienceClick(exp)} style={{ cursor: 'pointer' }}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
                      <Title level={4} style={{ marginBottom: 0 }}>
                        {exp.company}
                      </Title>
                      <Text type="secondary" style={{ fontSize: '12px' }}>[자세히보기]</Text>
                    </Row>
                    <Text strong type="secondary">{exp.position}</Text>
                    <div style={{ marginTop: 16 }}>
                      <Space wrap>
                        {exp.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </Space>
                    </div>
                  </Card>
                ),
              }))}
            />
          </section>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Hanwoong Park
        </Footer>

        <FloatButton.BackTop />
        </Layout>
        
        <Modal
          title={
            <Row justify="space-between" align="middle" style={{ paddingRight: 40 }}>
              <Col>
                <Button 
                  type="text" 
                  icon={<LeftOutlined />} 
                  onClick={handlePrevCompany}
                  disabled={getCurrentIndex() === 0}
                  size="small"
                >
                  다음
                </Button>
              </Col>
              <Col>
                <Text strong>{selectedExperience?.company}</Text>
              </Col>
              <Col>
                <Button 
                  type="text" 
                  icon={<RightOutlined />} 
                  onClick={handleNextCompany}
                  disabled={getCurrentIndex() === EXPERIENCES.length - 1}
                  size="small"
                >
                  이전
                </Button>
              </Col>
            </Row>
          }
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={handleAllExperiencesModalOpen}
              >
                전체 경력 보기
              </Button>
            </div>
          }
          width={800}
          centered
          styles={{
            body: {
              maxHeight: MODAL_MAX_HEIGHT,
              overflowY: 'auto'
            }
          }}
        >
          {selectedExperience && (
            <div>
              <Space direction="vertical" size="middle" style={{ width: "100%", marginBottom: 16 }}>
                <div>
                  <Text strong>{selectedExperience.position}</Text>
                  <br />
                  <Text type="secondary">{selectedExperience.period}</Text>
                </div>
              </Space>
              
              <Card style={{ width: "100%" }}>
                <Row gutter={24} align="top">
                  <Col flex="none">
                    <Space direction="vertical" size="middle" style={{ display: 'flex', flexDirection: 'column' }}>
                      {selectedExperience.details?.images?.map((image, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                          <DecryptedImage
                            encryptedSrc={image.src}
                            fallbackSrc={image.src.replace('.enc', '.png')}
                            width={THUMBNAIL_SIZE}
                            height={THUMBNAIL_SIZE}
                            style={{
                              objectFit: "cover",
                              borderRadius: 8,
                              marginBottom: 8
                            }}
                            preview={false}
                          />
                          {image.title && (
                            <div style={{ 
                              fontSize: '12px', 
                              fontWeight: 'bold', 
                              color: '#666',
                              width: THUMBNAIL_SIZE,
                              textAlign: 'center'
                            }}>
                              {image.title}
                            </div>
                          )}
                        </div>
                      ))}
                    </Space>
                  </Col>
                  <Col flex="auto">
                    <div style={{ margin: 0 }}>
                      {selectedExperience.details?.items?.map((item, itemIndex) => {
                        const indentLevel = (item.match(/^(\s*)/)[0].length) / 2;
                        const cleanText = item.trim();
                        return (
                          <div 
                            key={itemIndex} 
                            style={{ 
                              marginBottom: 8, 
                              paddingLeft: `${indentLevel * 20}px`,
                              position: 'relative'
                            }}
                          >
                            <Text>
                              {indentLevel > 0 ? '• ' : '• '}
                              {cleanText.replace(/^[•\-\*]\s*/, '')}
                            </Text>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </Card>
              
            </div>
          )}
        </Modal>

        {/* 전체 경력 모달 */}
        <Modal
          title="전체 경력 상세"
          open={isAllExperiencesModalVisible}
          onCancel={handleAllExperiencesModalClose}
          footer={null}
          width={1400}
          centered
          styles={{
            body: {
              maxHeight: "80vh",
              overflowY: 'auto'
            }
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {EXPERIENCES.map((exp, expIndex) => (
              <Card key={expIndex} title={`${exp.company} (${exp.period})`} style={{ width: "100%" }}>
                <Text strong type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                  {exp.position}
                </Text>
                
                <Row gutter={24} align="top">
                  <Col flex="none">
                    <Space direction="vertical" size="middle" style={{ display: 'flex', flexDirection: 'column' }}>
                      {exp.details?.images?.map((image, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                          <DecryptedImage
                            encryptedSrc={image.src}
                            fallbackSrc={image.src.replace('.enc', '.png')}
                            width={THUMBNAIL_SIZE}
                            height={THUMBNAIL_SIZE}
                            style={{
                              objectFit: "cover",
                              borderRadius: 8,
                              marginBottom: 8
                            }}
                            preview={false}
                          />
                          {image.title && (
                            <div style={{ 
                              fontSize: '12px', 
                              fontWeight: 'bold', 
                              color: '#666',
                              width: THUMBNAIL_SIZE,
                              textAlign: 'center'
                            }}>
                              {image.title}
                            </div>
                          )}
                        </div>
                      ))}
                    </Space>
                  </Col>
                  <Col flex="auto">
                    <div style={{ margin: 0 }}>
                      {exp.details?.items?.map((item, itemIndex) => {
                        const indentLevel = (item.match(/^(\s*)/)[0].length) / 2;
                        const cleanText = item.trim();
                        return (
                          <div 
                            key={itemIndex} 
                            style={{ 
                              marginBottom: 8, 
                              paddingLeft: `${indentLevel * 20}px`,
                              position: 'relative'
                            }}
                          >
                            <Text>
                              {indentLevel > 0 ? '• ' : '• '}
                              {cleanText.replace(/^[•\-\*]\s*/, '')}
                            </Text>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

// ------------------------------
// 컴포넌트
// ------------------------------
function Skill({ name, pct }) {
  return (
    <Card hoverable>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>{name}</Text>
        <Progress percent={pct} />
      </Space>
    </Card>
  );
}

function DescriptionsLike({ items }) {
  return (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      {items.map(([k, v]) => (
        <Row key={k} justify="space-between">
          <Text type="secondary">{k}</Text>
          <Text>{v}</Text>
        </Row>
      ))}
    </Space>
  );
}