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
import {
  GithubOutlined,
  LinkOutlined,
  MailOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

// ------------------------------
// Demo data (수정해서 사용하세요)
// ------------------------------
const NAV_ITEMS = [
  { key: "about", href: "#about", title: "About" },
  { key: "skills", href: "#skills", title: "Skills" },
  { key: "projects", href: "#projects", title: "Projects" },
  { key: "experience", href: "#experience", title: "Experience" },
  { key: "contact", href: "#contact", title: "Contact" },
];

const SKILLS: { name: string; pct: number }[] = [
  { name: "C# / Unity", pct: 90 },
  { name: "Phaser / TS", pct: 85 },
  { name: "Perf / Tools", pct: 88 },
];

const PROJECTS = [
  {
    title: "Action RPG (Unity)",
    tags: ["Unity", "ECS", "Addressables"],
    summary:
      "씬 로딩 최적화로 초기 로딩 42% 단축. 몬스터 AI CPU 사용량 30% 감소.",
    demo: "#",
  },
  {
    title: "Canvas Puzzle (Phaser)",
    tags: ["Phaser", "TypeScript", "Vite"],
    summary: "Phaser로 웹 퍼즐 게임 제작. LCP 1.8s 달성, CLS 0.01.",
    demo: "#",
  },
  {
    title: "Ops Dashboard",
    tags: ["Vue", "GCP", "OAuth"],
    summary: "운영 대시보드 구축. 구글 OAuth 연동 및 권한 분리.",
    demo: "#",
  },
];

const EXPERIENCES = [
  {
    period: "2024.03 – 현재",
    company: "Supercat",
    position: "Unity Developer",
    points: [
      "Unity ECS 기반 실시간 멀티플레이 게임 개발",
      "Addressables로 리소스 관리 최적화",
      "물리 연산 최적화로 CPU 사용량 30% 감소",
    ],
    tags: ["Unity", "ECS", "Addressables"],
  },
  {
    period: "2021.05 – 2024.02",
    company: "Indie Studio",
    position: "Phaser/Web Game Developer",
    points: [
      "Phaser 기반 브라우저 게임 5종 제작 및 운영",
      "Vue + Vite로 운영 대시보드/툴 개발",
      "MAU 20k → 50k 성장 달성",
    ],
    tags: ["Phaser", "Vue", "Vite"],
  },
  {
    period: "2018.01 – 2021.04",
    company: "Studio",
    position: "Client Engineer",
    points: [
      "게임 UI/네트워크 모듈 개발",
      "로딩 최적화 및 메모리 관리 개선",
    ],
    tags: ["C#", "Unity"],
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
        {/* Sticky Header */}
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backdropFilter: "saturate(180%) blur(8px)",
            background: "rgba(0,0,0,0.45)",
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
                <Anchor direction="horizontal" items={NAV_ITEMS} targetOffset={80} />
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
          {/* Hero */}
          <section style={{ padding: "96px 16px 64px" }}>
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={14}>
                <Space direction="vertical" size="large">
                  <Title style={{ marginBottom: 0 }}>Unity/Phaser Game Developer</Title>
                  <Paragraph type="secondary" style={{ marginTop: 0 }}>
                    실사용 성능 최적화와 유지보수 쉬운 구조에 집중합니다. 실서비스 트래픽/빌드 파이프라인/클라이언트 렌더링 최적화 경험.
                  </Paragraph>
                  <Space wrap>
                    <Button type="primary" icon={<MailOutlined />} href="mailto:me@example.com">
                      Contact
                    </Button>
                    <Button icon={<GithubOutlined />} href="https://github.com/yourid" target="_blank">
                      GitHub
                    </Button>
                    <Button icon={<LinkOutlined />} href="#" target="_blank">
                      LinkedIn
                    </Button>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={10}>
                <Card hoverable>
                  <Space direction="vertical">
                    <Text type="secondary">현재 포커스</Text>
                    <div>
                      <Space wrap>
                        {[
                          "Unity ECS",
                          "Phaser",
                          "Vite",
                          "OAuth",
                          "GCP",
                        ].map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </Space>
                    </div>
                    <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
                      최근: 로딩 시간 38% 단축, 충돌 처리 O(N) → O(log N) 개선
                    </Paragraph>
                  </Space>
                </Card>
              </Col>
            </Row>
          </section>

          <Divider id="about" />

          {/* About */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>About</Title>
            <Paragraph>
              코드 분석·리팩토링과 성능 최적화에 강점. MVP + ECS 혼합 아키텍처로 UI/도메인 책임 분리.
            </Paragraph>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card>
                  <DescriptionsLike
                    items={[
                      ["지역", "Seoul, KR"],
                      ["경력", "7+ years"],
                      ["이메일", "me@example.com"],
                    ]}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card>
                  <Space direction="vertical">
                    <Text strong>핵심 가치</Text>
                    <Paragraph style={{ marginBottom: 0 }}>
                      가독성 높은 코드 → 낮은 결함률 → 빠른 릴리즈.
                    </Paragraph>
                  </Space>
                </Card>
              </Col>
            </Row>
          </section>

          <Divider id="skills" />

          {/* Skills */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>Skills</Title>
            <Space wrap size="small">
              {[
                "C#",
                "Unity",
                "Phaser",
                "TypeScript",
                "Vue",
                "ECS",
                "OAuth",
                "GCP",
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
            <Title level={2}>Projects</Title>
            <Row gutter={[16, 16]}>
              {PROJECTS.map((p) => (
                <Col xs={24} md={12} key={p.title}>
                  <Card
                    hoverable
                    title={p.title}
                    extra={
                      <Button size="small" type="link" icon={<LinkOutlined />} href={p.demo} target="_blank">
                        Demo
                      </Button>
                    }
                  >
                    <Space direction="vertical" size="small">
                      <Space wrap>
                        {p.tags.map((t: string) => (
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
            <Title level={2}>Experience</Title>
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

          <Divider id="contact" />

          {/* Contact */}
          <section style={{ padding: "64px 16px 96px" }}>
            <Title level={2}>Contact</Title>
            <Space size="middle" wrap>
              <Button type="primary" icon={<MailOutlined />} href="mailto:me@example.com">
                Email
              </Button>
              <Button icon={<GithubOutlined />} href="https://github.com/yourid" target="_blank">
                GitHub
              </Button>
              <Button icon={<LinkOutlined />} href="#" target="_blank">
                LinkedIn
              </Button>
            </Space>
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
// Small components
// ------------------------------
function Skill({ name, pct }: { name: string; pct: number }) {
  return (
    <Card hoverable>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>{name}</Text>
        <Progress percent={pct} />
      </Space>
    </Card>
  );
}

function DescriptionsLike({
  items,
}: {
  items: [string, React.ReactNode][];
}) {
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
