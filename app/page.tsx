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
  image?: string;
  url?: string;
  linkLabel?: string;
};

type Education = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  metrics: string[];
};

type Portfolio = {
  name: string;
  role: string;
  intro: string;
  about: string;
  email: string;
  capabilities: string[];
  education: Education[];
  experiences: Experience[];
  projects: Project[];
};

const STORAGE_KEY = "ai-pm-portfolio-v2";

const sportsMoments = [
  { id: "climbing", label: "攀岩", en: "CLIMBING", src: "./sport-climbing.jpg", featured: true },
  { id: "skiing", label: "滑雪", en: "SKIING", src: "./sport-skiing.jpg", featured: false },
  { id: "surfing", label: "冲浪", en: "SURFING", src: "./sport-surfing.jpg", featured: false },
  { id: "hiking", label: "徒步", en: "HIKING", src: "./sport-hiking.jpg", featured: false },
];

const defaultData: Portfolio = {
  name: "景欣悦",
  role: "AI 产品经理",
  intro: "四川大学应用统计硕士在读，现于美团搜索产品部门负责 AI 产品工作。聚焦 Agent、RAG 与数据决策，擅长从需求洞察、方案设计到评测迭代，推动 AI 能力落地。",
  about: "我拥有应用统计与财务管理的复合背景，先后在美团、得物和小米参与 AI 产品、交易系统与数据平台建设。具备从 0 到 1 搭建 AI 数字员工、Agent 评测体系和经营看板的经验，也能通过 Coding 快速完成原型与产品验证。",
  email: "3256953428@qq.com",
  capabilities: ["AI 产品设计", "Agent / Skill / MCP", "RAG 与评测", "策略实验", "数据分析", "原型与 Coding"],
  education: [
    { school: "四川大学（985）", degree: "应用统计 · 硕士", period: "2025.09 - 2027.06", detail: "GPA 3.85/4.0 · 校优秀学生 · 一等奖学金（前 5%）" },
    { school: "四川大学（985）", degree: "财务管理 · 本科", period: "2021.09 - 2025.06", detail: "统计调研 94 · 统计分析 95 · Python 数据分析 94" },
  ],
  experiences: [
    {
      company: "美团 · 搜索产品部门", role: "AI 产品经理", period: "2026.05 - 至今",
      summary: "从 0 到 1 搭建搜索数据团队 AI 数字员工，覆盖问数、取数场景；负责知识飞轮、工作流可视化与 Agent 评测迭代。",
      metrics: ["覆盖 150+ 用户、680+ 次问答", "RAGAS 88.3%，正确率 89.4%", "异常定位从 1 小时缩短至 5 分钟"],
    },
    {
      company: "得物 · 个卖中台", role: "产品运营", period: "2026.01 - 2026.04",
      summary: "围绕瑕疵商品去化搭建“焕新分销”系统，以漏斗分析和产品优化提升选择、投放与售罄效率。",
      metrics: ["日均选择量 1203 件，环比 +83%", "入口点击率 +48%", "分销售罄率 45.4%，环比 +36.3%"],
    },
    {
      company: "小米集团 · 天星数科", role: "产品运营", period: "2025.05 - 2025.08",
      summary: "负责 6 家金融牌照公司标准化管理，搭建经营看板及银行业政策自动监测系统。",
      metrics: ["统一监控 6 家公司业务进度", "政策自动抓取、分类与风险提示", "政策监测效率提升 10 倍"],
    },
  ],
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
      image: "./project-jobrec.png",
      url: "https://jingxinyue6-sys.github.io/jobrec-ark-portfolio/?v=e19550b",
      linkLabel: "查看实时项目",
    },
    {
      id: "agent-dashboard",
      number: "02",
      title: "Agent 工作看板",
      category: "DataAgent 能力建设与运行管理看板",
      summary: "把 Agent 能力、知识库、Session 分析和运行状态整合到一张可持续迭代的工作看板中，让建设进度与质量风险一眼可见。",
      tags: ["AI Agent", "能力评测", "数据看板"],
      outcome: "独立产品设计与前端实现",
      highlights: [
        "以七维能力雷达与 Skill 分类呈现 Agent 当前能力和建设进度",
        "联通知识库、Session 筛选、运行巡检与质量文件状态",
        "将 NoCode 原型重构为响应式源码，支持后续 API 数据接入",
      ],
      tone: "orange",
      image: "./project-agent.png",
      url: "https://github.com/jingxinyue6-sys/agent-capability-dashboard",
      linkLabel: "查看 GitHub 项目",
    },
    {
      id: "climb-together",
      number: "03",
      title: "一起攀",
      category: "线下攀岩活动随机组队与比赛计分工具",
      summary: "面向攀岩馆线下活动，把录入名单、随机分组、抱石计分和速度对决整合成一套轻量流程，让组织者能快速开局。",
      tags: ["小游戏", "活动工具", "React Coding"],
      outcome: "独立 Coding 作品",
      highlights: [
        "支持名单录入、随机分队与队名自定义，降低现场组织成本",
        "设计抱石限时计分与速度对决两种玩法，适配不同活动节奏",
        "用本地存储保留活动设置，在移动端完成计时与计分操作",
      ],
      tone: "cream",
      image: "./project-climb.png",
      url: "https://github.com/jingxinyue6-sys/climb-together",
      linkLabel: "查看 GitHub 项目",
    },
    {
      id: "study-cat",
      number: "04",
      title: "学了吗",
      category: "AI 学习陪伴与时间管理小程序",
      summary: "用 AI 喵助手、学习打卡和日程管理陪伴用户建立稳定节奏，把目标拆成每天都能完成、能够获得反馈的小行动。",
      tags: ["AI 陪伴", "习惯养成", "小程序原型"],
      outcome: "独立 Coding 作品",
      highlights: [
        "围绕每日任务、连续打卡、专注计时与成长统计构建学习闭环",
        "用 AI 喵助手和拟人化反馈降低计划管理的心理负担",
        "整合日历、四象限任务与成就体系，兼顾效率和长期激励",
      ],
      tone: "orange",
      image: "./project-xuemiao.png",
      url: "https://github.com/jingxinyue6-sys/xuemiao-",
      linkLabel: "查看 GitHub 项目",
    },
  ],
};

export default function Home() {
  const [data, setData] = useState<Portfolio>(defaultData);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Portfolio;
        const savedProjects = parsed.projects || [];
        const mergedProjects = defaultData.projects.map(project => ({
          ...(savedProjects.find(item => item.id === project.id) || {}),
          ...project,
        }));
        const customProjects = savedProjects.filter(item => !defaultData.projects.some(project => project.id === item.id));
        setData({ ...defaultData, ...parsed, projects: [...mergedProjects, ...customProjects] });
      } catch { window.localStorage.removeItem(STORAGE_KEY); }
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

  function setEducation(index: number, patch: Partial<Education>) {
    const education = data.education.map((item, i) => i === index ? { ...item, ...patch } : item);
    update({ ...data, education });
  }

  function setExperience(index: number, patch: Partial<Experience>) {
    const experiences = data.experiences.map((item, i) => i === index ? { ...item, ...patch } : item);
    update({ ...data, experiences });
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
        <a className="brand" href="#top" aria-label="返回首页">
          <i className="brandMark" aria-hidden="true"><b>J</b><span>X</span></i>
          <span className="brandCopy"><b>{data.name}</b><small>AI PRODUCT</small></span>
        </a>
        <div className="navLinks">
          <a href="#top"><b>首页</b><small>home</small></a>
          <a href="#about"><b>个人简介</b><small>biography</small></a>
          <a href="#skills"><b>技能</b><small>skill</small></a>
          <a href="#work"><b>作品集</b><small>portfolio</small></a>
          <a href="#contact"><b>联系方式</b><small>information</small></a>
          <button className="edit" onClick={() => setEditorOpen(true)}>编辑</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="doodleLine lineOne" /><div className="doodleLine lineTwo" />
        <p className="eyebrow">{data.role} · 2026 PORTFOLIO</p>
        <div className="welcome">WELC<span className="heroApple" />ME</div>
        <div className="heroStage">
          <div className="heroCopy"><p>在 AI 面前<br />人人都是产品创造者</p><small>In front of AI, everyone is a product creator</small></div>
          <div className="speech">Hi! I&apos;m {data.name}<i /></div>
          <div className="appleBuddy"><i className="leaf" /><i className="shine" /><strong>{data.projects.length}</strong><small>核心作品</small><span>AI</span><b>⌣</b></div>
        </div>
        <div className="heroBottom"><p>{data.intro}</p><a className="continue" href="#about">CONTINUE 〉</a></div>
      </section>

      <section className="about" id="about">
        <div className="slideTitle"><b>个人简介</b><span>biography</span></div>
        <div className="aboutGrid">
          <div className="profileIllustration">
            <div className="portraitFrame"><img src="./profile.jpg" alt="景欣悦个人照片" /><i className="portraitApple" /></div>
            <div className="profileBubble">Hi! I&apos;m {data.name}<small>{data.role}</small></div>
          </div>
          <div className="aboutCard">
            <p className="eyebrow">ABOUT ME / 关于我</p>
            <h2>不只提出想法，<br /><span>也把它做出来。</span></h2>
            <p>{data.about}</p>
            <div className="capabilities">{data.capabilities.map(item => <span key={item}>{item}</span>)}</div>
            <div className="educationList">{data.education.map(item => <div key={`${item.school}-${item.degree}`}>
              <span>{item.period}</span><b>{item.school}</b><strong>{item.degree}</strong><small>{item.detail}</small>
            </div>)}</div>
          </div>
        </div>
        <a className="returnLink" href="#top">〈 return</a>
      </section>

      <section className="skills" id="skills">
        <div className="skillsColumn">
          <div className="slideTitle left"><b>专业技能</b><span>expertise</span></div>
          <div className="skillBars">
            {["产品策略", "AI Agent", "RAG 评测", "数据分析", "Python / SQL"].map((skill, index) => <div className="skillRow" key={skill}>
              <i>{["PM", "AI", "DA", "UX", "⌘"][index]}</i><b>{skill}</b><span>{Array.from({ length: 5 }).map((_, dot) => <em className={dot < 5 - (index % 2) ? "on" : ""} key={dot}>●</em>)}</span>
            </div>)}
          </div>
        </div>
        <div className="skillsColumn abilityColumn">
          <div className="slideTitle left"><b>个人能力</b><span>ability</span></div>
          <ul>{[...data.capabilities,"Vue 3 / Supabase","Stata","CET-6","跨团队协作"].map(item => <li key={item}><i />{item}</li>)}</ul>
        </div>
        <a className="returnLink" href="#top">〈 return</a>
      </section>

      <section className="experience" id="experience">
        <div className="slideTitle"><b>实习经历</b><span>experience</span></div>
        <div className="experienceList">{data.experiences.map((item, index) => <article key={item.company}>
          <div className="experienceNo">0{index + 1}</div>
          <div className="experienceMain"><span>{item.period}</span><h2>{item.company}</h2><h3>{item.role}</h3><p>{item.summary}</p></div>
          <ul>{item.metrics.map(metric => <li key={metric}>{metric}</li>)}</ul>
        </article>)}</div>
        <a className="returnLink" href="#top">〈 return</a>
      </section>

      <section className="work" id="work">
        <div className="slideTitle"><b>作品集</b><span>portfolio</span></div>
        <div className="sectionHead"><p>SELECTED WORK / {String(data.projects.length).padStart(2, "0")}</p><p>PRODUCT THINKING × AI × CODING</p></div>
        <div className="projectList">
          {data.projects.map(project => (
            <article className={`projectCard ${project.tone}`} key={project.id}>
              <div className="visualPanel">
                {project.image ? <img className="projectImage" src={project.image} alt={`${project.title}首页界面`} /> : <div className="projectPlaceholder">{project.title}</div>}
              </div>
              <div className="projectCopy">
                <div className="projectMeta"><span>{project.number}</span><span>{project.category}</span></div>
                <h2>{project.title}</h2><p className="lead">{project.summary}</p>
                <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <details><summary>查看项目亮点</summary><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></details>
                {project.url && <a className="liveProject" href={project.url} target="_blank" rel="noreferrer">{project.linkLabel || "查看项目"} <span>↗</span></a>}
                <div className="outcome"><span>项目成果</span><b>{project.outcome}</b></div>
              </div>
            </article>
          ))}
        </div>
        <div className="carouselDots"><i /><i className="active" /><i /><i /></div>
        <a className="returnLink" href="#top">〈 return</a>
      </section>

      <section className="life" id="life">
        <div className="lifeHeading">
          <div className="slideTitle left"><b>运动女孩</b><span>sporty girl</span></div>
          <p>在产品、数据与代码之外，用攀登、速度、海浪与远方，保持向上生长的生命力。</p>
        </div>
        <div className="lifeGrid">
          {sportsMoments.map(moment => <figure className={moment.featured ? "lifeCard featured" : "lifeCard"} key={moment.id}>
            <img src={moment.src} alt={`${moment.label}运动照`} />
            <figcaption><b>{moment.label}</b><span>{moment.en}</span></figcaption>
          </figure>)}
        </div>
        <div className="lifeApple" aria-hidden="true"><i /><span>GO!</span></div>
        <a className="returnLink" href="#top">〈 return</a>
      </section>

      <footer id="contact">
        <div className="contactIntro"><p>Hi!<br />CALL ME</p><div className="contactApple"><i /><span>⌣</span></div></div>
        <div className="contactPanels">
          <div className="contactCard"><h2>联系我</h2><p>✉　{data.email}</p><p>⌂　期待 AI 产品经理相关机会</p></div>
          <div className="messageCard"><h2>留言板</h2><textarea aria-label="留言内容" placeholder="Start Message……" /><a href={`mailto:${data.email}`}>发送到我的邮箱 〉</a></div>
        </div>
        <a className="returnLink" href="#top">〈 return</a><span className="copyright">© 2026 {data.name} · BUILT WITH CURIOSITY</span>
      </footer>

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
        {data.education.map((item, index) => <div className="editorSection" key={`${item.school}-${index}`}>
          <h4>教育经历 {index + 1}</h4>
          <label>学校<input value={item.school} onChange={e => setEducation(index, { school: e.target.value })} /></label>
          <label>专业与学历<input value={item.degree} onChange={e => setEducation(index, { degree: e.target.value })} /></label>
          <label>时间<input value={item.period} onChange={e => setEducation(index, { period: e.target.value })} /></label>
          <label>补充信息<textarea rows={3} value={item.detail} onChange={e => setEducation(index, { detail: e.target.value })} /></label>
        </div>)}
        {data.experiences.map((item, index) => <div className="editorSection" key={`${item.company}-${index}`}>
          <h4>实习经历 {index + 1}</h4>
          <label>公司与部门<input value={item.company} onChange={e => setExperience(index, { company: e.target.value })} /></label>
          <label>岗位<input value={item.role} onChange={e => setExperience(index, { role: e.target.value })} /></label>
          <label>时间<input value={item.period} onChange={e => setExperience(index, { period: e.target.value })} /></label>
          <label>经历简介<textarea rows={4} value={item.summary} onChange={e => setExperience(index, { summary: e.target.value })} /></label>
          <label>关键成果（每行一项）<textarea rows={4} value={item.metrics.join("\n")} onChange={e => setExperience(index, { metrics: e.target.value.split("\n").filter(Boolean) })} /></label>
        </div>)}
        {data.projects.map((project, index) => <div className="editorSection projectEditor" key={project.id}>
          <div className="editorTitle"><h4>项目 {project.number}</h4><button onClick={() => update({ ...data, projects: data.projects.filter((_, i) => i !== index) })}>删除</button></div>
          <label>项目名称<input value={project.title} onChange={e => setProject(index, { title: e.target.value })} /></label>
          <label>项目类型<input value={project.category} onChange={e => setProject(index, { category: e.target.value })} /></label>
          <label>一句话简介<textarea rows={3} value={project.summary} onChange={e => setProject(index, { summary: e.target.value })} /></label>
          <label>项目成果<input value={project.outcome} onChange={e => setProject(index, { outcome: e.target.value })} /></label>
          <label>项目链接<input value={project.url || ""} onChange={e => setProject(index, { url: e.target.value })} /></label>
          <label>按钮文字<input value={project.linkLabel || ""} onChange={e => setProject(index, { linkLabel: e.target.value })} /></label>
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
