"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  outcome: string;
  highlights: string[];
  tone: "lime" | "orange" | "cream";
};

type Portfolio = {
  name: string;
  role: string;
  intro: string;
  about: string;
  email: string;
  capabilities: string[];
  projects: Project[];
};

const STORAGE_KEY = "ai-pm-portfolio-v1";

const defaultData: Portfolio = {
  name: "JXY",
  role: "AI 产品经理",
  intro: "我关注真实用户、数据决策与 AI 落地。从问题洞察到产品上线，用产品思维连接需求、模型和体验。",
  about: "我喜欢把模糊的问题拆成清晰的产品路径：先理解谁在为什么困扰，再判断 AI 能在哪个环节真正创造价值，最后用原型、数据和迭代把想法落到可用的产品里。",
  email: "yourname@email.com",
  capabilities: ["用户洞察", "AI 产品设计", "数据建模", "原型与 Coding"],
  projects: [
    {
      id: "career-ark",
      number: "01",
      title: "智聘方舟",
      category: "AI 求职决策平台 · 数字建模智能决策方向",
      summary: "从“广撒网”到“精准战”，用匹配度与成功率双指标帮助高校毕业生量化岗位选择。",
      tags: ["AI 产品", "决策模型", "求职平台"],
      outcome: "研究生组省三等奖",
      highlights: [
        "基于硬性技能与软性偏好多元指标，量化人岗匹配度",
        "引入岗位竞争度调节因子，修正并预估实际投递成功率",
        "把复杂模型翻译为直观分数，降低岗位筛选与决策成本",
      ],
      tone: "lime",
    },
    {
      id: "study-cat",
      number: "02",
      title: "学喵打卡",
      category: "学习习惯养成小程序",
      summary: "用轻量打卡、即时反馈与成长陪伴，把“想坚持”转化为每天都能完成的小行动。",
      tags: ["小程序", "习惯养成", "体验设计"],
      outcome: "独立 Coding 作品",
      highlights: [
        "围绕创建目标、每日打卡、连续记录设计核心任务闭环",
        "用拟人化的“学喵”反馈强化陪伴感与完成成就",
        "从产品构想到可运行版本，完整实践设计与开发流程",
      ],
      tone: "orange",
    },
    {
      id: "climb-together",
      number: "03",
      title: "一起攀",
      category: "轻量互动小游戏",
      summary: "围绕共同攀登目标设计的轻量小游戏，用协作、进度反馈和即时挑战创造持续参与感。",
      tags: ["小游戏", "互动机制", "Coding"],
      outcome: "独立 Coding 作品",
      highlights: [
        "将核心玩法收敛为清晰、可快速上手的单局体验",
        "用阶段进度与即时反馈维持目标感和游戏节奏",
        "验证从玩法设想到交互实现的快速产品化能力",
      ],
      tone: "cream",
    },
  ],
};

function MetricMockup() {
  return (
    <div className="metricMockup" aria-label="智聘方舟岗位匹配结果示意">
      <p>岗位决策快照</p><strong>AI 产品经理</strong>
      <div className="score"><span>匹配度</span><b>92</b><i>%</i></div>
      <div className="bar"><span /></div>
      <div className="probability"><span>预计成功率</span><b>68%</b></div>
      <small>已结合岗位竞争度修正</small>
    </div>
  );
}

function StudyMockup() {
  return (
    <div className="phoneMockup" aria-label="学喵打卡界面示意">
      <div className="phoneTop"><span>09:41</span><i>● ●</i></div>
      <p>今天也要向前一点</p><div className="catFace">^ ᵕ ^</div>
      <strong>连续学习 12 天</strong><div className="streak">🔥 12</div>
      <button tabIndex={-1}>完成今日打卡</button>
    </div>
  );
}

function GameMockup() {
  return (
    <div className="gameMockup" aria-label="一起攀游戏界面示意">
      <div className="summit">▲</div><div className="route"><span>1</span><span>2</span><span>3</span><span>4</span></div>
      <strong>一起到达山顶</strong><p>本局进度 · 72%</p>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<Portfolio>(defaultData);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setData(JSON.parse(stored)); } catch { window.localStorage.removeItem(STORAGE_KEY); }
    }
  }, []);

  function update(next: Portfolio) {
    setData(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  }

  function setField<K extends keyof Portfolio>(key: K, value: Portfolio[K]) {
    update({ ...data, [key]: value });
  }

  function setProject(index: number, patch: Partial<Project>) {
    const projects = data.projects.map((project, i) => i === index ? { ...project, ...patch } : project);
    update({ ...data, projects });
  }

  function addProject() {
    const index = data.projects.length;
    update({ ...data, projects: [...data.projects, {
      id: `project-${Date.now()}`, number: String(index + 1).padStart(2, "0"), title: "新项目",
      category: "项目类型", summary: "在这里写一句话项目简介。", tags: ["标签一", "标签二"],
      outcome: "项目成果", highlights: ["核心工作一", "核心工作二"], tone: index % 2 ? "orange" : "cream",
    }] });
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "我的AI产品经理作品集.json"; anchor.click();
    URL.revokeObjectURL(url);
  }

  function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { update(JSON.parse(String(reader.result))); } catch { window.alert("这个文件无法识别，请选择之前导出的 JSON 文件。"); }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function resetData() {
    if (window.confirm("确定恢复初始内容吗？当前修改将被覆盖。")) update(defaultData);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="返回首页">{data.name}<span>·</span>AI PM</a>
        <div className="navLinks"><a href="#work">作品</a><a href="#about">关于我</a>
          <button className="edit" onClick={() => setEditorOpen(true)}>编辑作品集</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <p className="eyebrow">{data.role} · 2026 PORTFOLIO</p>
        <h1>把复杂问题，<br />变成<span>有用的 AI 产品</span>。</h1>
        <div className="heroBottom"><p>{data.intro}</p><a className="roundLink" href="#work" aria-label="查看作品">↓</a></div>
      </section>

      <section className="work" id="work">
        <div className="sectionHead"><p>SELECTED WORK / {String(data.projects.length).padStart(2, "0")}</p><p>PRODUCT THINKING × AI × CODING</p></div>
        <div className="projectList">
          {data.projects.map((project, index) => (
            <article className={`projectCard ${project.tone}`} key={project.id}>
              <div className="projectCopy">
                <div className="projectMeta"><span>{project.number}</span><span>{project.category}</span></div>
                <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <h2>{project.title}</h2><p className="lead">{project.summary}</p>
                <ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
                <div className="outcome"><span>项目成果</span><b>{project.outcome}</b></div>
              </div>
              <div className="visualPanel">
                {index === 0 ? <MetricMockup /> : index === 1 ? <StudyMockup /> : <GameMockup />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <p className="eyebrow">ABOUT / 关于我</p>
        <div className="aboutGrid"><h2>不只提出想法，<br /><span>也把它做出来。</span></h2>
          <div><p>{data.about}</p><div className="capabilities">{data.capabilities.map(item => <span key={item}>{item}</span>)}</div></div>
        </div>
      </section>

      <footer><div><p>期待一起创造有用的产品。</p><a href={`mailto:${data.email}`}>{data.email}</a></div><span>© 2026 {data.name} · BUILT WITH CURIOSITY</span></footer>

      <button className="floatingEdit" onClick={() => setEditorOpen(true)} aria-label="打开内容编辑器">✎</button>
      <div className={editorOpen ? "editorOverlay open" : "editorOverlay"} onClick={() => setEditorOpen(false)} />
      <aside className={editorOpen ? "editor open" : "editor"} aria-hidden={!editorOpen}>
        <div className="editorHead"><div><span>PORTFOLIO CMS</span><h3>编辑你的作品集</h3></div><button onClick={() => setEditorOpen(false)} aria-label="关闭编辑器">×</button></div>
        <p className="saveState">{saved ? "✓ 已自动保存到本机" : "修改后将自动保存"}</p>
        <div className="editorSection"><h4>个人信息</h4>
          <label>显示名称<input value={data.name} onChange={e => setField("name", e.target.value)} /></label>
          <label>求职方向<input value={data.role} onChange={e => setField("role", e.target.value)} /></label>
          <label>首屏介绍<textarea rows={4} value={data.intro} onChange={e => setField("intro", e.target.value)} /></label>
          <label>关于我<textarea rows={5} value={data.about} onChange={e => setField("about", e.target.value)} /></label>
          <label>联系邮箱<input value={data.email} onChange={e => setField("email", e.target.value)} /></label>
          <label>能力标签（用逗号分隔）<input value={data.capabilities.join("，")} onChange={e => setField("capabilities", e.target.value.split(/[，,]/).map(v => v.trim()).filter(Boolean))} /></label>
        </div>
        {data.projects.map((project, index) => <div className="editorSection projectEditor" key={project.id}>
          <div className="editorTitle"><h4>项目 {project.number}</h4><button onClick={() => update({ ...data, projects: data.projects.filter((_, i) => i !== index) })}>删除</button></div>
          <label>项目名称<input value={project.title} onChange={e => setProject(index, { title: e.target.value })} /></label>
          <label>项目类型<input value={project.category} onChange={e => setProject(index, { category: e.target.value })} /></label>
          <label>一句话简介<textarea rows={3} value={project.summary} onChange={e => setProject(index, { summary: e.target.value })} /></label>
          <label>项目成果<input value={project.outcome} onChange={e => setProject(index, { outcome: e.target.value })} /></label>
          <label>标签（用逗号分隔）<input value={project.tags.join("，")} onChange={e => setProject(index, { tags: e.target.value.split(/[，,]/).map(v => v.trim()).filter(Boolean) })} /></label>
          <label>核心工作（每行一项）<textarea rows={5} value={project.highlights.join("\n")} onChange={e => setProject(index, { highlights: e.target.value.split("\n").filter(Boolean) })} /></label>
        </div>)}
        <button className="addProject" onClick={addProject}>＋ 添加一个项目</button>
        <div className="dataTools"><button onClick={exportData}>导出备份</button><button onClick={() => fileInput.current?.click()}>导入内容</button><button className="danger" onClick={resetData}>恢复默认</button></div>
        <input ref={fileInput} type="file" accept="application/json" hidden onChange={importData} />
      </aside>
    </main>
  );
}
