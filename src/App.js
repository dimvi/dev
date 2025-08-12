import React, { useMemo, useState } from "react";
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  FloatButton,
  Image,
  Layout,
  Progress,
  Row,
  Space,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  theme,
} from "antd";
import { MailOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const NAV_ITEMS = [
  { key: "about", href: "#about", title: "소개" },
  { key: "skills", href: "#skills", title: "기술" },
  { key: "projects", href: "#projects", title: "대표 성과" },
  { key: "experience", href: "#experience", title: "경력" },
];

const PROFILE = `
• ECS·MVP 아키텍처 기반 MMORPG 클라이언트의 시스템 개발·구조 개선
• Unity DOTS(ECS)·URP 환경에서의 게임 개발 경험
• 글로벌·국내 캐주얼 게임 다수 런칭 및 안정적 라이브 서비스 운영
• 엔진·툴링·시뮬레이터까지 아우르는 실전형 문제 해결 능력
`;

const ABOUT = `
기존 설계 원칙과 규약을 지키며 확장성과 유지보수성을 높이는 방향으로 개선합니다.
구조가 없으면 모듈과 데이터 흐름을 설계하고 필요한 시스템·툴을 구현합니다.
UI/Reactive 프레임워크, JobSystem·DOTS 기반 데이터 지향 설계, 서드파티 연동과 툴링 제작에도 능숙합니다.
리뷰는 아키텍처 일관성과 규약 준수에 중점을 둡니다.
`;

const SKILLS = [
  { name: "C#", pct: 95 },
  { name: "Unity3D", pct: 92 },
  { name: "DOTS / JobSystem / Burst", pct: 88 },
  { name: "최적화(GC/메모리/로딩/ANR)", pct: 90 },
  { name: "UI/Reactive 프레임워크(UGUI/UIToolkit)", pct: 85 },
  { name: "아키텍처(ECS/MVP/MVVM)", pct: 87 },
];

const PROJECTS = [
  {
    title: "디즈니팝타운 KR/APEC/GLOBAL 런칭",
    tags: ["Unity3D", "3Match", "멀티터치", "JobSystem", "NativeCollections"],
    summary:
      "3매치 엔진 업그레이드/범용화, 멀티터치 로직, 맵/유저데이터 설계, 시뮬레이터로 1차 밸런싱 자동화.",
  },
  {
    title: "MMORPG 바람의나라2 신작 개발 참여",
    tags: ["Unity", "UGUI", "Reactive", "ECS", "DOTS 병렬 빌드"],
    summary:
      "클라이언트2 파트 리딩, UI/Reactive 프레임워크, ECS/MVP 아키텍처 개선, DOTS ContentArchives 병렬 빌드.",
  },
  {
    title: "BubblePopOrigin 라이브 최적화",
    tags: ["GC", "메모리", "로딩", "ANR"],
    summary: "런타임 메모리/로딩/ANR 지표 개선 및 안정적 라이브 운영.",
  },
  {
    title: "Touch Monchy JP 런칭",
    tags: ["Unity", "사천성", "Line SDK", "툴링"],
    summary: "사천성 로직, 데이터 설계, Line SDK 연동, PSD→UGUI 변환 툴 개발.",
  },
];

const EXPERIENCES = [
  {
    period: "2023.07 ~ 재직",
    company: "슈퍼캣",
    position: "클라이언트 파트장",
    points: [
      "MMORPG 바람의나라2 신작 개발 참여",
      "UI 프레임워크(UGUI) 및 Reactive 프레임워크(유사 UniRx) 설계/구축",
      "ECS/MVP 아키텍처 개선 및 시스템 정립",
      "Unity DOTS ContentArchives 병렬 빌드 파이프라인 구축",
    ],
    tags: ["Unity", "UGUI", "Reactive", "ECS", "DOTS"],
  },
  {
    period: "2022.07 ~ 2023.07",
    company: "퍼즐원스튜디오",
    position: "리드 클라이언트 프로그래머",
    points: [
      "BubblePopOrigin 컨텐츠 개발",
      "GC/메모리/로딩/ANR 최적화 및 런타임 성능 개선",
    ],
    tags: ["Unity", "최적화", "GC", "ANR"],
  },
  {
    period: "2014.07 ~ 2022.06",
    company: "위메이드플레이(선데이토즈)",
    position: "클라이언트 프로그래머",
    points: [
      "디즈니팝타운 KR/APEC/GLOBAL 런칭",
      "3매치 시스템 엔진화/범용화, 에디터 기능 추가",
      "JobSystem 병렬화, NativeCollections, unsafe 최적화",
      "인게임 시뮬레이터(패턴/Greedy)로 1차 밸런싱 자동화",
      "오프라인 서버 API(LuaScript) 및 UI 컨텐츠 개발",
    ],
    tags: ["Unity", "3Match", "JobSystem", "시뮬레이터"],
  },
  {
    period: "2012.01 ~ 2014.05",
    company: "DevCrews",
    position: "클라이언트 프로그래머",
    points: [
      "FruitJelly/BottleBattle 런칭",
      "Bluetooth 1vs1 대전, 레벨/유저데이터 설계",
      "부산 모바일 앱 공모전 최우수상, G-Star/IT EXPO 참가",
    ],
    tags: ["Cocos2d-x", "C++", "Bluetooth"],
  },
];

export default function PortfolioApp() {
  const [dark, setDark] = useState(false);
  const algo = useMemo(
    () => (dark ? theme.darkAlgorithm : theme.defaultAlgorithm),
    [dark]
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: algo,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
        },
      }}
    >
      <Layout>
        {/* 고정 헤더 */} 
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backdropFilter: "saturate(180%) blur(8px)",
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <Row align="middle" justify="space-between" gutter={16}>
            <Col>
              <Space size="large" align="center">
                <Avatar size={40}>HP</Avatar>
                <Text style={{ color: "#fff" }} strong>
                  Hanwoong Park
                </Text>
              </Space>
            </Col>
            <Col flex="auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Anchor
                  direction="horizontal"
                  items={NAV_ITEMS}
                  targetOffset={80}
                />
              </div>
            </Col>
            <Col>
              <Tooltip title={dark ? "라이트 모드" : "다크 모드"}>
                <Button
                  shape="round"
                  icon={dark ? <SunOutlined /> : <MoonOutlined />}
                  onClick={() => setDark((v) => !v)}
                />
              </Tooltip>
            </Col>
          </Row>
        </Header>

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
                <Image
                  src={`${process.env.PUBLIC_URL}/thumb.png`}
                  fallback={`${process.env.PUBLIC_URL}/logo512.png`}
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
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card>
                  <DescriptionsLike
                    items={[
                      ["이름", "박한웅 (Hanwoong Park)"],
                      ["연락처", "010-9311-2117"],
                      ["이메일", "hidimvi@gmail.com"],
                      ["생년월일", "1987.01.03"],
                      [
                        "관심 기술",
                        "PostProcessing, Unity URP, Unity DOTS(ECS/JobSystem/Burst), Unity UIToolkit(MVVM)",
                      ],
                    ]}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card>
                  <Space direction="vertical">
                    <Text strong>핵심 역량</Text>
                    <Paragraph style={{ marginBottom: 0 }}>
                      대규모 클라이언트 아키텍처(ECS/MVP) 설계, 성능/메모리/로딩/ANR 최적화, UI/Reactive 프레임워크 구축,
                      JobSystem 기반 병렬화와 데이터 지향 설계를 통한 안정적 라이브 운영 및 개발 효율 향상.
                    </Paragraph>
                  </Space>
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
                "Unity3D",
                "C#",
                "DOTS(ECS/Jobs/Burst)",
                "UGUI",
                "UIToolkit",
                "Reactive",
                "최적화(GC/메모리/로딩/ANR)",
                "JobSystem",
                "NativeCollections",
                "URP",
                "PostProcessing",
                "LuaScript",
                "Cocos2d-x",
                "C++",
                "ActionScript",
                "Starling",
              ].map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </Space>
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {SKILLS.map((s) => (
                <Col xs={24} md={8} key={s.name}>
                  <Skill name={s.name} pct={s.pct} />
                </Col>
              ))}
            </Row>
          </section>

          <Divider id="projects" />

          {/* Projects */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>대표 성과</Title>
            <Row gutter={[16, 16]}>
              {PROJECTS.map((p) => (
                <Col xs={24} md={12} key={p.title}>
                  <Card
                    hoverable
                    title={p.title}
                  >
                    <Space direction="vertical" size="small">
                      <Space wrap>
                        {p.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </Space>
                      <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                        {p.summary}
                      </Paragraph>
                    </Space>
                  </Card>
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
                  <Card hoverable>
                    <Title level={4} style={{ marginBottom: 0 }}>
                      {exp.company}
                    </Title>
                    <Text strong type="secondary">{exp.position}</Text>
                    <ul style={{ paddingLeft: 18, marginTop: 8, marginBottom: 8 }}>
                      {exp.points.map((line) => (
                        <li key={line}>
                          <Text>{line}</Text>
                        </li>
                      ))}
                    </ul>
                    <Space wrap>
                      {exp.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </Space>
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
