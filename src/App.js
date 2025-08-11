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
// 데모 데이터 (수정해서 사용하세요)
// ------------------------------
const NAV_ITEMS = [
  { key: "about", href: "#about", title: "menu1" },
  { key: "skills", href: "#skills", title: "menu2" },
  { key: "projects", href: "#projects", title: "menu3" },
  { key: "experience", href: "#experience", title: "menu4" },
];

const SKILLS = [
  { name: "Skill1", pct: 90 },
  { name: "Skill2", pct: 85 },
  { name: "Skill3", pct: 88 },
];

const PROJECTS = [
  {
    title: "샤싣1",
    tags: ["tag1", "tag2", "tag3"],
    summary:
      "글쎄",
  },
  {
    title: "샤싣2",
    tags: ["Vue", "GCP", "OAuth"],
    summary: "꺄ㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑ",
  },
  {
    title: "샤싣34",
    tags: ["tag1", "tag2", "tag3"],
    summary: "조운정엉엉어",
  },
];

const EXPERIENCES = [
  {
    period: "2024.03 – 현재",
    company: "cp",
    position: "forward",
    points: [
      "??yallo",
      "some description..",
      "some description..",
    ],
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    period: "2021.05 – 2024.02",
    company: "com",
    position: "molla",
    points: [
      "point1...some description",
      "point2...some description",
      "point3...some description",
    ],
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    period: "2018.01 – 2021.04",
    company: "pppp",
    position: "pusyy",
    points: [
      "point1...some description",
      "point2...some description",
      "point3...some description",
    ],
    tags: ["tag1", "tag2", "tag3"],
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
                <Avatar size={40}>YR</Avatar>
                <Text style={{ color: "#fff" }} strong>
                  yourid
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
                  <Title style={{ marginBottom: 0 }}>Title</Title>
                  <Paragraph type="secondary" style={{ marginTop: 0 }}>
                    paragraph....
                  </Paragraph>
                  <Space wrap>
                    <Button type="primary" icon={<MailOutlined />} href="mailto:me@example.com">
                      Email
                    </Button>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={10}>
                <Card
                  style={{
                    textAlign: "center",
                    padding: 0,
                    minHeight: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  bodyStyle={{ padding: 0 }}
                >
                  {/* 썸네일 이미지 영역 */}
                  <img
                    src="/thumbnail.png"
                    alt="Profile Thumbnail"
                    style={{
                      width: "100%",
                      maxWidth: 180,
                      height: "auto",
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "32px auto",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </section>

          <Divider id="about" />

          {/* About */}
          <section style={{ padding: "64px 16px" }}>
            <Title level={2}>About</Title>
            <Paragraph>
              Paragraph text goes here. This section can include a brief introduction about yourself, your background, and what you are passionate about in your field of work.
            </Paragraph>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card>
                  <DescriptionsLike
                    items={[
                      ["key", "Value"],
                      ["key", "Value"],
                      ["key", "Value"],
                    ]}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card>
                  <Space direction="vertical">
                    <Text strong>Text</Text>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Paragraph text can be used to provide additional information or context about your skills, experiences, or projects. This is a great place to elaborate on your professional journey and what drives you in your career.
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
                "tag1",
                "tag2",
                "tag3",
                "tag4",
                "tag5",
                "tag6",
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
                    // extra={
                    //   <Button size="small" type="link" icon={<LinkOutlined />} href={p.demo} target="_blank">
                    //     Demo
                    //   </Button>
                    // }
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
