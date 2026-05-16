# Graph Report - .  (2026-05-16)

## Corpus Check
- 130 files · ~61,197 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 517 nodes · 650 edges · 36 communities (24 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Auth & Personalization Core|Auth & Personalization Core]]
- [[_COMMUNITY_Market & Finance Content|Market & Finance Content]]
- [[_COMMUNITY_App Infrastructure & Foundation|App Infrastructure & Foundation]]
- [[_COMMUNITY_Static Pages & CMS Integration|Static Pages & CMS Integration]]
- [[_COMMUNITY_Project Dependencies|Project Dependencies]]
- [[_COMMUNITY_Backend API & Business Logic|Backend API & Business Logic]]
- [[_COMMUNITY_Internationalization (i18n)|Internationalization (i18n)]]
- [[_COMMUNITY_Sanity Studio Nitya's Lives|Sanity Studio: Nitya's Lives]]
- [[_COMMUNITY_Sanity Studio My Project|Sanity Studio: My Project]]
- [[_COMMUNITY_Admin Dashboard Functions|Admin Dashboard Functions]]
- [[_COMMUNITY_Backend Dependencies|Backend Dependencies]]
- [[_COMMUNITY_Sanity Config My Project|Sanity Config: My Project]]
- [[_COMMUNITY_Sanity Config Nitya's Lives|Sanity Config: Nitya's Lives]]
- [[_COMMUNITY_CMS Schema Definitions|CMS Schema Definitions]]
- [[_COMMUNITY_Build & Automation Scripts|Build & Automation Scripts]]
- [[_COMMUNITY_Model Announcements|Model: Announcements]]
- [[_COMMUNITY_Model Bookmarks|Model: Bookmarks]]
- [[_COMMUNITY_Model Budget Entries|Model: Budget Entries]]
- [[_COMMUNITY_Model Comments|Model: Comments]]
- [[_COMMUNITY_Model Notifications|Model: Notifications]]
- [[_COMMUNITY_Model Push Subscriptions|Model: Push Subscriptions]]
- [[_COMMUNITY_Model Subscribers|Model: Subscribers]]
- [[_COMMUNITY_Model News Items|Model: News Items]]
- [[_COMMUNITY_Model Users|Model: Users]]
- [[_COMMUNITY_Service Worker|Service Worker]]
- [[_COMMUNITY_Vercel Config|Vercel Config]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 48 edges
2. `dependencies` - 16 edges
3. `dependencies` - 13 edges
4. `compilerOptions` - 12 edges
5. `compilerOptions` - 12 edges
6. `devDependencies` - 11 edges
7. `scripts` - 8 edges
8. `nav` - 8 edges
9. `nav` - 8 edges
10. `nav` - 8 edges

## Surprising Connections (you probably didn't know these)
- `AppContent()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.jsx → src/context/AuthContext.jsx
- `XPWidget()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/XPWidget.jsx → src/context/AuthContext.jsx
- `BookmarkButton()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/BookmarkButton.jsx → src/context/AuthContext.jsx
- `EMICalculator()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/EMICalculator.jsx → src/context/AuthContext.jsx
- `MicroFeed()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/MicroFeed.jsx → src/context/AuthContext.jsx

## Communities (36 total, 12 thin omitted)

### Community 0 - "Auth & Personalization Core"
Cohesion: 0.07
Nodes (29): AuthModal(), BookmarkButton(), CommentsSection(), CommunitySection(), EMICalculator(), LifeScoreWidget(), MicroFeed(), NewsletterForm() (+21 more)

### Community 1 - "Market & Finance Content"
Cohesion: 0.06
Nodes (4): BLOG_POSTS, GEO_TIPS, SIM_SCENARIOS, TRENDING

### Community 2 - "App Infrastructure & Foundation"
Cohesion: 0.05
Nodes (27): AIChatbot(), Navbar(), ThemeContext, ThemeProvider(), useTheme(), AboutUs, AuthorProfile, BudgetTracker (+19 more)

### Community 3 - "Static Pages & CMS Integration"
Cohesion: 0.05
Nodes (8): DUMMY_COMPARISONS, DUMMY_ADVISORS, ALPHABET, CATEGORIES, EXTENDED_TERMS, LEVELS, EXTENDED_TERM_DICTIONARY, sanityClient

### Community 4 - "Project Dependencies"
Cohesion: 0.05
Nodes (39): dependencies, bootstrap, bootstrap-icons, chart.js, html2canvas, i18next, i18next-browser-languagedetector, @portabletext/react (+31 more)

### Community 5 - "Backend API & Business Logic"
Cohesion: 0.05
Nodes (36): Announcement, Anthropic, app, bcrypt, Bookmark, BudgetEntry, cachedMarketData, cachedNews (+28 more)

### Community 6 - "Internationalization (i18n)"
Cohesion: 0.05
Nodes (34): hero, subtitle, title, nav, budget, home, login, markets (+26 more)

### Community 7 - "Sanity Studio: Nitya's Lives"
Cohesion: 0.07
Nodes (29): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, eslint (+21 more)

### Community 8 - "Sanity Studio: My Project"
Cohesion: 0.07
Nodes (29): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, eslint (+21 more)

### Community 9 - "Admin Dashboard Functions"
Cohesion: 0.07
Nodes (19): [activeTab, setActiveTab], [analytics, setAnalytics], [annLink, setAnnLink], [annLinkText, setAnnLinkText], [annMsg, setAnnMsg], [announcements, setAnnouncements], [annType, setAnnType], chartData (+11 more)

### Community 10 - "Backend Dependencies"
Cohesion: 0.08
Nodes (25): author, dependencies, @anthropic-ai/sdk, bcryptjs, cors, dotenv, express, express-rate-limit (+17 more)

### Community 11 - "Sanity Config: My Project"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib, module (+6 more)

### Community 12 - "Sanity Config: Nitya's Lives"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib, module (+6 more)

### Community 14 - "Build & Automation Scripts"
Cohesion: 0.25
Nodes (6): __dirname, distDir, __filename, MIME_TYPES, rootDir, ROUTES

## Knowledge Gaps
- **276 isolated node(s):** `rewrites`, `name`, `private`, `version`, `type` (+271 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Auth & Personalization Core` to `Market & Finance Content`, `App Infrastructure & Foundation`, `Admin Dashboard Functions`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `rewrites`, `name`, `private` to the rest of the system?**
  _276 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth & Personalization Core` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Market & Finance Content` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `App Infrastructure & Foundation` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Static Pages & CMS Integration` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Project Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._