const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const rootPdfPath = path.join(__dirname, '../../AI_DEVELOPER_ROADMAP.pdf');
const publicPdfPath = path.join(__dirname, '../../frontend/public/AI_DEVELOPER_ROADMAP.pdf');

function createRoadmapPDF(outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 50, left: 45, right: 45 },
      bufferPages: true
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Color Palette
    const colors = {
      primaryDark: '#0f172a',      // Slate 900
      secondaryDark: '#1e293b',    // Slate 800
      accentBlue: '#2563eb',       // Blue 600
      accentCyan: '#0284c7',       // Sky 600
      accentPurple: '#7c3aed',     // Violet 600
      accentGreen: '#059669',      // Emerald 600
      accentAmber: '#d97706',      // Amber 600
      textPrimary: '#0f172a',      // Slate 900
      textSecondary: '#475569',    // Slate 600
      textMuted: '#64748b',        // Slate 500
      bgCard: '#f8fafc',           // Slate 50
      bgCardBorder: '#e2e8f0',     // Slate 200
      cardHighlight: '#f1f5f9',    // Slate 100
      white: '#ffffff'
    };

    const pageWidth = doc.page.width;
    const contentWidth = pageWidth - 90; // 45 left + 45 right

    // Helper: Draw Section Header
    function drawSectionHeader(title, iconText, badgeText = null) {
      if (doc.y > 680) {
        doc.addPage();
      }
      const y = doc.y;
      
      // Left accent bar
      doc.rect(45, y + 2, 4, 18).fill(colors.accentBlue);
      
      // Title
      doc.font('Helvetica-Bold').fontSize(13).fillColor(colors.primaryDark);
      doc.text(iconText ? `${iconText}  ${title}` : title, 56, y + 3, { continued: false });
      
      if (badgeText) {
        const badgeWidth = doc.widthOfString(badgeText, { font: 'Helvetica-Bold', size: 8 }) + 12;
        const badgeX = 45 + contentWidth - badgeWidth;
        doc.roundedRect(badgeX, y + 2, badgeWidth, 16, 4).fillAndStroke('#eff6ff', '#bfdbfe');
        doc.font('Helvetica-Bold').fontSize(8).fillColor(colors.accentBlue);
        doc.text(badgeText, badgeX, y + 6, { width: badgeWidth, align: 'center' });
      }

      doc.y = y + 26;
      // Divider line
      doc.moveTo(45, doc.y).lineTo(45 + contentWidth, doc.y).lineWidth(0.5).strokeColor(colors.bgCardBorder).stroke();
      doc.y += 8;
    }

    // Helper: Draw Table
    function drawTable(headers, rows, colWidths, colAligns = []) {
      const startX = 45;
      const rowHeight = 22;
      
      // Check if table needs new page
      const estimatedHeight = 24 + rows.length * 30;
      if (doc.y + estimatedHeight > 750 && rows.length > 2) {
        doc.addPage();
      }

      let y = doc.y;

      // Header Row Background
      doc.roundedRect(startX, y, contentWidth, 22, 4).fill(colors.secondaryDark);
      
      // Header Text
      let curX = startX;
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.white);
      headers.forEach((h, i) => {
        const align = colAligns[i] || 'left';
        doc.text(h, curX + 6, y + 6, { width: colWidths[i] - 12, align });
        curX += colWidths[i];
      });

      y += 24;

      // Rows
      rows.forEach((row, rIdx) => {
        // Calculate max line height needed for this row
        let maxLines = 1;
        row.forEach((cell, cIdx) => {
          const lines = doc.heightOfString(cell, { width: colWidths[cIdx] - 12, font: 'Helvetica', size: 8 }) / 10;
          if (lines > maxLines) maxLines = Math.ceil(lines);
        });
        const currentHeight = Math.max(22, maxLines * 11 + 8);

        if (y + currentHeight > 760) {
          doc.addPage();
          y = doc.y;
        }

        // Row background
        if (rIdx % 2 === 0) {
          doc.rect(startX, y, contentWidth, currentHeight).fill('#f8fafc');
        } else {
          doc.rect(startX, y, contentWidth, currentHeight).fill('#ffffff');
        }

        // Row border bottom
        doc.moveTo(startX, y + currentHeight).lineTo(startX + contentWidth, y + currentHeight).lineWidth(0.5).strokeColor('#e2e8f0').stroke();

        // Row Content
        curX = startX;
        row.forEach((cell, cIdx) => {
          const isFirstCol = cIdx === 0;
          const align = colAligns[cIdx] || 'left';
          
          if (isFirstCol) {
            doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.primaryDark);
          } else {
            doc.font('Helvetica').fontSize(8).fillColor(colors.textSecondary);
          }
          doc.text(cell, curX + 6, y + 5, { width: colWidths[cIdx] - 12, align });
          curX += colWidths[cIdx];
        });

        y += currentHeight;
      });

      doc.y = y + 12;
    }

    // Helper: Draw Roadmap Card
    function drawPhaseCard(phaseNum, title, timing, status, items) {
      const cardY = doc.y;
      const isCompleted = status.includes('COMPLETED');
      const headerBg = isCompleted ? '#f0fdf4' : '#f8fafc';
      const borderColor = isCompleted ? '#86efac' : '#cbd5e1';
      const badgeBg = isCompleted ? '#dcfce7' : '#eff6ff';
      const badgeTextCol = isCompleted ? '#15803d' : '#2563eb';

      let cardHeight = 32 + (items.length * 15) + 8;
      if (doc.y + cardHeight > 750) {
        doc.addPage();
      }

      const y = doc.y;
      // Main Card Box
      doc.roundedRect(45, y, contentWidth, cardHeight, 6).fillAndStroke(colors.white, borderColor);
      doc.roundedRect(45, y, contentWidth, 26, 6).fill(headerBg);
      doc.rect(45, y + 18, contentWidth, 8).fill(headerBg); // fill bottom corners of header
      doc.moveTo(45, y + 26).lineTo(45 + contentWidth, y + 26).lineWidth(0.5).strokeColor(borderColor).stroke();

      // Phase Header Text
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(colors.primaryDark);
      doc.text(`PHASE ${phaseNum}: ${title.toUpperCase()}`, 56, y + 8);

      // Timing & Status Badge
      const statusText = `${timing}  •  ${status}`;
      const badgeWidth = doc.widthOfString(statusText, { font: 'Helvetica-Bold', size: 7.5 }) + 14;
      const badgeX = 45 + contentWidth - badgeWidth - 10;
      doc.roundedRect(badgeX, y + 5, badgeWidth, 16, 4).fill(badgeBg);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(badgeTextCol);
      doc.text(statusText, badgeX, y + 9, { width: badgeWidth, align: 'center' });

      // Items
      let itemY = y + 33;
      items.forEach(item => {
        const itemDone = item.startsWith('[x]');
        const text = item.replace(/^\[[ x]\]\s*/, '');
        
        // Checkmark / circle icon
        if (itemDone) {
          doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.accentGreen);
          doc.text('√', 58, itemY);
          doc.font('Helvetica-Bold').fontSize(8).fillColor(colors.primaryDark);
        } else {
          doc.font('Helvetica').fontSize(8.5).fillColor(colors.accentBlue);
          doc.text('>', 58, itemY);
          doc.font('Helvetica').fontSize(8).fillColor(colors.textSecondary);
        }
        
        doc.text(text, 72, itemY + 0.5, { width: contentWidth - 36 });
        itemY += 14;
      });

      doc.y = y + cardHeight + 8;
    }

    // ==========================================
    // PAGE 1: HEADER & OVERVIEW
    // ==========================================

    // Top Header Banner
    doc.roundedRect(45, 40, contentWidth, 90, 8).fill(colors.primaryDark);
    
    // Decorative Accent Line
    doc.rect(45, 40, 6, 90).fill(colors.accentBlue);

    // Header Content
    doc.font('Helvetica-Bold').fontSize(17).fillColor(colors.white);
    doc.text('COMPLETE AI & GenAI DEVELOPER ROADMAP', 65, 54);
    
    doc.font('Helvetica').fontSize(10).fillColor('#94a3b8');
    doc.text('From MERN Full-Stack Developer to High-Paying AI Systems Engineer', 65, 75);

    // Meta Badges inside banner
    const metaY = 96;
    doc.roundedRect(65, metaY, 130, 18, 4).fill(colors.secondaryDark);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#38bdf8');
    doc.text('TARGET: Ritik Varun', 72, metaY + 5);

    doc.roundedRect(205, metaY, 130, 18, 4).fill(colors.secondaryDark);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#4ade80');
    doc.text('YEAR: 2026 Industry Spec', 212, metaY + 5);

    doc.roundedRect(345, metaY, 150, 18, 4).fill(colors.secondaryDark);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#fbbf24');
    doc.text('STACK: LangChain • Gemini • RAG', 352, metaY + 5);

    doc.y = 145;

    // Introduction Box
    doc.roundedRect(45, doc.y, contentWidth, 42, 6).fillAndStroke('#f0fdf4', '#bbf7d0');
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#166534');
    doc.text('EXECUTIVE SUMMARY & CAREER OBJECTIVE', 56, doc.y + 8);
    doc.font('Helvetica').fontSize(8).fillColor('#14532d');
    doc.text('This roadmap defines the concrete step-by-step technological transition from traditional Full-Stack web engineering to Production GenAI Architecture, Autonomous Agents, Dynamic Vector RAG, and Multimodal Voice Systems.', 56, doc.y + 20, { width: contentWidth - 22 });

    doc.y = 200;

    // SECTION: 6-LAYER ARCHITECTURE
    drawSectionHeader('The 6-Layer Architecture of Production AI Apps', '[ARCH]');

    const layers = [
      ['Layer 1: Intelligent Frontend & Streaming UI', 'Next.js 16 (App Router), Vercel AI SDK, React useChat / useCompletion hooks, Dynamic Generative UI.'],
      ['Layer 2: Agent Orchestration & State Machines', 'LangChain.js, LangGraph (Cyclic Multi-Agent state graphs), CrewAI for multi-role workflows.'],
      ['Layer 3: Dynamic Context RAG & Vector Memory', 'LlamaIndex, MongoDB Atlas Vector Search, Pinecone Serverless, ChromaDB, Hybrid Search.'],
      ['Layer 4: Foundation LLM Engines', 'Google Gemini 3.6 / 2.0 Flash (2M context), OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, DeepSeek R1.'],
      ['Layer 5: Local & Private Self-Hosted Models', 'Ollama (LLaMA 3.3, DeepSeek, Mistral), vLLM GPU inference server, Hugging Face Transformers.'],
      ['Layer 6: Production Observability & Tracing', 'LangSmith (Trace prompts & agent actions), Langfuse (Token cost & latency analytics), Helicone.']
    ];

    drawTable(
      ['Architecture Layer', 'Production Tech Stack & Key Functionality'],
      layers,
      [170, contentWidth - 170]
    );

    // SECTION 1: AI AGENTS & LLM FRAMEWORKS
    drawSectionHeader('Category 1: AI Agent & LLM Orchestration Frameworks', '[CAT 1]', 'CRITICAL FOUNDATION');

    const agentRows = [
      ['LangChain.js', 'Core Framework', 'Chains LLMs with memory, dynamic database tools, output parsers, and external APIs.'],
      ['LangGraph', 'Multi-Agent', 'Builds state machines, cyclic workflows, error correction loops, and human-in-the-loop agents.'],
      ['LlamaIndex', 'RAG Leader', 'Specialized for enterprise document ingestion, PDF parsing, chunking, and knowledge graphs.'],
      ['CrewAI', 'Team Agents', 'Multi-agent role-playing framework where autonomous AI agents collaborate as an engineering team.'],
      ['Vercel AI SDK', 'Next.js UI', 'React hooks for token-by-token streaming, markdown rendering, tool invocations, and generative UI.']
    ];

    drawTable(
      ['Framework', 'Category', 'Role in Modern AI Applications'],
      agentRows,
      [110, 95, contentWidth - 205]
    );

    // ==========================================
    // PAGE 2: VECTOR DBS, MODELS & LOCAL AI
    // ==========================================
    doc.addPage();

    // SECTION 2: VECTOR DATABASES
    drawSectionHeader('Category 2: Vector Databases & Long-Term Memory', '[CAT 2]', 'AI LONG-TERM MEMORY');

    const vectorRows = [
      ['MongoDB Atlas Vector Search', 'Cloud Native (MERN)', 'Directly builds vector embeddings into existing MongoDB Atlas collections. No extra DB needed!'],
      ['Pinecone', 'Managed Serverless', 'Ultra-fast production vector database with sub-50ms query latency and automatic scaling.'],
      ['ChromaDB', 'Local / Embedded', 'Lightweight open-source embedded vector store; zero configuration needed for local prototypes.'],
      ['Qdrant / Weaviate', 'Production Open Source', 'Advanced vector search engines with rich metadata payload filtering and hybrid search algorithms.']
    ];

    drawTable(
      ['Database', 'Deployment Type', 'Core Advantage & Best Use Case'],
      vectorRows,
      [145, 110, contentWidth - 255]
    );

    // SECTION 3: FOUNDATION MODEL APIS
    drawSectionHeader('Category 3: Foundation Model APIs & Inference Providers', '[CAT 3]', 'CORE INTELLIGENCE');

    const modelRows = [
      ['Google Gemini 3.6 / Flash', 'Google', '2,000,000 Tokens', 'Multimodal (Video, Audio, Code), ultra-fast response, high rate limits.'],
      ['GPT-4o & GPT-4o-mini', 'OpenAI', '128,000 Tokens', 'Industry-standard structured JSON output and reliable function calling.'],
      ['Claude 3.5 Sonnet', 'Anthropic', '200,000 Tokens', '#1 model for code generation, software architecture, and complex refactoring.'],
      ['DeepSeek R1 / V3', 'DeepSeek / Groq', '64,000 Tokens', 'State-of-the-art step-by-step mathematical reasoning at 90% lower cost.'],
      ['Groq LPU Engine', 'GroqCloud', '128,000 Tokens', 'Specialized LPU chips delivering 500+ tokens/sec for instant streaming responses.']
    ];

    drawTable(
      ['Model / Engine', 'Provider', 'Context', 'Key Strengths & Ideal Application'],
      modelRows,
      [125, 80, 85, contentWidth - 290]
    );

    // SECTION 4: LOCAL AI & PRIVATE MODELS
    drawSectionHeader('Category 4: Local AI, Private Models & Voice AI', '[CAT 4]', 'PRIVACY & EDGE');

    const localVoiceRows = [
      ['Ollama', 'Local LLM Host', 'Runs LLaMA 3.3, Mistral, and DeepSeek locally on CPU/GPU with one terminal command.'],
      ['vLLM', 'Production GPU Server', 'High-throughput PagedAttention server used to deploy private LLMs on AWS/GCP/RunPod.'],
      ['Hugging Face Transformers', 'Model Hub & SDK', 'Ecosystem of 500k+ models for tokenizers, classification, fine-tuning, and embeddings.'],
      ['OpenAI Whisper', 'Speech-to-Text', 'Translates and transcribes real-time microphone audio into accurate text in 90+ languages.'],
      ['ElevenLabs', 'Text-to-Speech', 'Generates human-realistic emotional speech and voice clones for AI conversational agents.'],
      ['LiveKit / WebRTC', 'Real-Time Voice', 'Ultra-low latency (<300ms) full-duplex conversational voice bots with interruption handling.']
    ];

    drawTable(
      ['Technology', 'Domain', 'Capabilities & Production Role'],
      localVoiceRows,
      [135, 105, contentWidth - 240]
    );

    // ==========================================
    // PAGE 3: ACTION PLAN & CHECKLIST
    // ==========================================
    doc.addPage();

    drawSectionHeader('5-Phase Action Plan & Milestones for Ritik Varun', '[PLAN]', 'STEP-BY-STEP ROADMAP');

    drawPhaseCard(
      1,
      'LangChain Foundations & Dynamic Context RAG',
      'Completed',
      'COMPLETED (Active on Portfolio)',
      [
        '[x] Integrated LangChain.js and Google Gemini 3.6 Flash in Express backend.',
        '[x] Connected dynamic MongoDB Atlas RAG context to feed all live projects to the AI.',
        '[x] Autonomous Tool Calling: Configured AI to automatically open live project links and download CV.',
        '[x] Built AI Assistant interface customized to the portfolio matte-black and silver theme.'
      ]
    );

    drawPhaseCard(
      2,
      'Streaming UI & Next.js AI SDK',
      'Weeks 1 - 2',
      'UPCOMING FOCUS',
      [
        '[ ] Install @ai-sdk/react and learn useChat / useCompletion hooks in Next.js.',
        '[ ] Implement word-by-word streaming responses for zero perceived latency.',
        '[ ] Create Generative UI components where AI responses render dynamic React cards.'
      ]
    );

    drawPhaseCard(
      3,
      'Advanced Enterprise RAG with MongoDB Vector Search',
      'Weeks 3 - 4',
      'DATABASE & MEMORY',
      [
        '[ ] Create Vector Search Index on MongoDB Atlas using text-embedding-004.',
        '[ ] Learn LlamaIndex for document chunking, PDF parsing, and semantic similarity search.',
        '[ ] Build a "Chat with PDF" resume analyzer or automated project recommender.'
      ]
    );

    drawPhaseCard(
      4,
      'Multi-Agent Workflows with LangGraph & CrewAI',
      'Weeks 5 - 6',
      'AUTONOMOUS AGENTS',
      [
        '[ ] Master LangGraph state graphs: nodes, edges, cycles, and memory checkpoints.',
        '[ ] Build a multi-agent development team (Code Generator + Reviewer + Auto-Tester).',
        '[ ] Deploy CrewAI autonomous web-research and content automation agents.'
      ]
    );

    drawPhaseCard(
      5,
      'Local Models, Voice AI & Production Observability',
      'Weeks 7 - 8',
      'PRODUCTION GRADE',
      [
        '[ ] Set up Ollama with LLaMA 3.3 and build an offline private chat application.',
        '[ ] Connect LangSmith or Langfuse for prompt versioning, latency, and token cost tracking.',
        '[ ] Integrate Whisper STT and ElevenLabs TTS to create a two-way voice assistant.'
      ]
    );

    // SUMMARY BOX
    const boxY = doc.y + 4;
    doc.roundedRect(45, boxY, contentWidth, 58, 6).fillAndStroke(colors.primaryDark, colors.accentBlue);
    
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#38bdf8');
    doc.text('TARGET OUTCOME: CERTIFIED AI SYSTEMS ENGINEER', 56, boxY + 10);

    doc.font('Helvetica').fontSize(8).fillColor('#cbd5e1');
    doc.text('Upon completing these 5 phases, Ritik will stand out in the top 1% of Full-Stack developers by combining MERN + Next.js mastery with Autonomous Agents, Vector Search, and Production AI Observability.', 56, boxY + 24, { width: contentWidth - 22 });

    // ==========================================
    // FOOTER & PAGE NUMBERING ON ALL PAGES
    // ==========================================
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      
      // Footer Divider
      doc.moveTo(45, 800).lineTo(45 + contentWidth, 800).lineWidth(0.5).strokeColor('#cbd5e1').stroke();
      
      // Footer Text Left
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(colors.textMuted);
      doc.text('Ritik Varun • AI & GenAI Developer Master Roadmap', 45, 808);
      
      // Footer Text Center
      doc.font('Helvetica').fontSize(7.5).fillColor(colors.textMuted);
      doc.text('Confidential & Personalized Guide', 45, 808, { width: contentWidth, align: 'center' });

      // Footer Text Right (Page Number)
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(colors.accentBlue);
      doc.text(`Page ${i + 1} of ${range.count}`, 45, 808, { width: contentWidth, align: 'right' });
    }

    doc.end();

    stream.on('finish', () => resolve(outputPath));
    stream.on('error', (err) => reject(err));
  });
}

async function main() {
  console.log('Generating AI Developer Roadmap PDF...');
  
  // Generate in root directory
  await createRoadmapPDF(rootPdfPath);
  console.log(`Successfully generated root PDF: ${rootPdfPath}`);

  // Also copy/generate in frontend/public so user can view/download in browser anytime
  await createRoadmapPDF(publicPdfPath);
  console.log(`Successfully generated public PDF: ${publicPdfPath}`);
}

main().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
