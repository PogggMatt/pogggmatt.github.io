/**
 * SHANIAO POKEMON SMP - WIKI SYSTEM CORE JS
 * Standalone Client-Side Logic & Simulators
 */

// Toast Notification Engine
function showToast(message, icon = '✅') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// 安全复制：file:// 下 clipboard API 不可用，走 textarea+execCommand 回退
function safeCopy(text) {
    return new Promise((resolve) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => resolve(fallbackCopy(text)));
            } else {
                resolve(fallbackCopy(text));
            }
        } catch (e) {
            resolve(fallbackCopy(text));
        }
    });
}
function fallbackCopy(text) {
    try {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.top = '0';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(el);
        return ok;
    } catch (e) {
        return false;
    }
}

// Copy Server IP
function copyServerIP() {
    const ip = "shaniao.usga.me";
    safeCopy(ip).then((ok) => {
        showToast(ok ? `服务器 IP: ${ip} 已复制！可直接在 Minecraft 中添加` : `复制失败，请手动输入 IP：${ip}`, ok ? '🎮' : '⚠️');
    });
}

// Copy Command Text
function copyCommand(text) {
    safeCopy(text).then((ok) => {
        showToast(ok ? `指令 [${text}] 已复制到剪贴板` : `复制失败，请手动输入指令：${text}`, ok ? '📋' : '⚠️');
    });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (toggleBtn && navbar) {
        toggleBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-menu-active');
        });
    }

    // FAQ Accordion & Live Filter
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                item.classList.toggle('open');
            });
        }
    });

    const faqInput = document.getElementById('faqSearchInput');
    if (faqInput) {
        faqInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            faqItems.forEach(item => {
                const title = item.querySelector('.faq-header').innerText.toLowerCase();
                const body = item.querySelector('.faq-body').innerText.toLowerCase();
                if (title.includes(query) || body.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

/* ==========================================================================
   GACHA SIMULATOR LOGIC (BASED ON EXACT SERVER CONFIG)
   Total Faces: 1782
   OP (Gold): 99 (5.6%)
   High (Purple): 305 (17.1%)
   Normal (White): 1378 (77.3%)
   ========================================================================== */
const GACHA_ITEMS = {
    gold: [
        "📡 宝可雷达 x20",
        "👑 金皇冠 (Gold Bottle Cap)",
        "🌟 大师球 (Master Ball)",
        "🌌 起源球 (Origin Ball)",
        "⚡ 超梦X/Y进化石",
        "🌑 究极奈克洛兹玛Z",
        "🔗 牵绊缰绳 / 基因之楔",
        "💎 金刚结晶 / 白玉宝珠 / 白金宝珠",
        "🔴 朱红宝珠 / 靛蓝宝珠",
        "🗡️ 腐朽的剑 / 腐朽的盾",
        "👑 蕾冠王冠冕 / 闪光蕾冠王冠冕",
        "🌊 海洋核心 / 大地核心 / 天空核心",
        "🪨 完美化石 / 起源化石 / 化石头盔",
        "🪈 天界之笛 / 时间之笛 / 空间之笛",
        "🥚 GS球 / 大木博士的信 / 会员卡",
        "☄️ 陨石结晶 / 捕梦网 / 月之羽翼",
        "🪶 虹色之翼 / 银色之翼 / 冰川/雷霆/余烬之羽",
        "🧬 远古DNA / 克隆催化剂 / 合成矩阵",
        "💠 红宝石之露 / 蓝宝石之露 / 原始宝石",
        "🔥 熔融地壳 / 寒冰/岩石/金属/电光/龙之遗物",
        "🌑 暗影之心 / 暗影灵魂石 / 污染碎片",
        "🏅 翡翠徽章 / 火箭装甲 / 小智帽"
    ],
    purple: [
        "⬜ 空白进化石 x127",
        "🧸 Airuhsea手办 / Damorgo手办",
        "⌚ 超级手环 / 超级钥石",
        "🥈 银皇冠(HP/攻击/防御/特攻/特防/速度)",
        "📿 Z手环 / Z强力手环",
        "💠 太晶珠 / 极巨腕带 / 许愿星",
        "🍄 极巨汤 / 极巨菇 / 极巨糖果 / 极巨蜂蜜",
        "💢 阿勃梭鲁/烈咬陆鲨/路卡利欧进化石Z",
        "⚡ 雷丘Z / 虫Z 等 87 种"
    ],
    white: [
        "💎 绿宝石 / 金锭 / 钻石 / 铁锭 x24",
        "🍬 经验糖 S/M/L x20",
        "🧪 经验之瓶 / 石英块 / 红线 x20",
        "🟧 下界合金锭 / 金苹果 x20",
        "🪨 煤炭块 x16",
        "🟨 金块 / 钻石块 / 绿宝石块 x12",
        "🟫 皮革 / 线 x8"
    ]
};

let simStats = { total: 0, gold: 0, purple: 0, white: 0 };

function rollGachaOnce() {
    const roll = Math.floor(Math.random() * 1782) + 1; // 1 ~ 1782
    simStats.total++;

    if (roll <= 99) {
        // Gold: 1-99
        simStats.gold++;
        const item = GACHA_ITEMS.gold[Math.floor(Math.random() * GACHA_ITEMS.gold.length)];
        return { tier: 'gold', name: item };
    } else if (roll <= 99 + 305) {
        // Purple: 100-404
        simStats.purple++;
        const item = GACHA_ITEMS.purple[Math.floor(Math.random() * GACHA_ITEMS.purple.length)];
        return { tier: 'purple', name: item };
    } else {
        // White: 405-1782
        simStats.white++;
        const item = GACHA_ITEMS.white[Math.floor(Math.random() * GACHA_ITEMS.white.length)];
        return { tier: 'white', name: item };
    }
}

function updateSimStatsUI() {
    const totalEl = document.getElementById('statTotal');
    const goldEl = document.getElementById('statGold');
    const purpleEl = document.getElementById('statPurple');
    const whiteEl = document.getElementById('statWhite');

    if (totalEl) totalEl.innerText = simStats.total;
    if (goldEl) {
        const rate = simStats.total > 0 ? ((simStats.gold / simStats.total) * 100).toFixed(1) : "0.0";
        goldEl.innerText = `${simStats.gold} (${rate}%)`;
    }
    if (purpleEl) {
        const rate = simStats.total > 0 ? ((simStats.purple / simStats.total) * 100).toFixed(1) : "0.0";
        purpleEl.innerText = `${simStats.purple} (${rate}%)`;
    }
    if (whiteEl) {
        const rate = simStats.total > 0 ? ((simStats.white / simStats.total) * 100).toFixed(1) : "0.0";
        whiteEl.innerText = `${simStats.white} (${rate}%)`;
    }
}

function simRoll(count) {
    const resultsContainer = document.getElementById('simResults');
    if (!resultsContainer) return;

    if (simStats.total === 0) {
        resultsContainer.innerHTML = '';
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const res = rollGachaOnce();
        const el = document.createElement('div');
        el.className = `sim-item ${res.tier}`;
        el.innerText = res.name;
        fragment.appendChild(el);
    }

    resultsContainer.prepend(fragment);
    updateSimStatsUI();
}

function resetSim() {
    simStats = { total: 0, gold: 0, purple: 0, white: 0 };
    const resultsContainer = document.getElementById('simResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<span style="color: var(--text-dim);">点击上方按钮模拟开箱，测试你的欧皇血统！</span>';
    }
    updateSimStatsUI();
}

// ==========================================================================
//   ACETERNITY-STYLE MOTION ENGINE v2 (追加)
//   Spotlight 光斑跟随 / Tilt 3D 倾斜 / 滚动渐入
// ==========================================================================
(function () {
    // 1. Spotlight：鼠标在卡片内移动时更新 --mx/--my
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.feature-card, .glass-panel, .sim-box').forEach((card) => {
            const r = card.getBoundingClientRect();
            if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
                card.style.setProperty('--mx', `${e.clientX - r.left}px`);
                card.style.setProperty('--my', `${e.clientY - r.top}px`);
            }
        });
    });

    // 2. Tilt：卡片跟随鼠标 3D 倾斜（桌面端，避免影响触屏）
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.feature-card').forEach((card) => {
            card.classList.add('tilt-card');
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-5px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // 3. 滚动渐入：给玻璃面板、卡片、流程节点加 reveal
    const revealEls = document.querySelectorAll('.glass-panel, .feature-card, .step-node, .hero-section, .callout');
    revealEls.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));

    // 4. 按钮点击涟漪
    document.querySelectorAll('.btn-primary, .btn-glass, .btn').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const r = this.getBoundingClientRect();
            const d = document.createElement('span');
            const size = Math.max(r.width, r.height);
            d.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.35);transform:translate(-50%,-50%) scale(0);animation:ripple .6s ease-out forwards;pointer-events:none;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(d);
            setTimeout(() => d.remove(), 650);
        });
    });
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = '@keyframes ripple { to { transform: translate(-50%,-50%) scale(2.6); opacity: 0; } }';
    document.head.appendChild(rippleStyle);
})();

// Token Exchange Calculator
function calculateExchange() {
    const bpInput = document.getElementById('calcBP');
    const taskInput = document.getElementById('calcTasks');
    const resFigures = document.getElementById('calcResFigures');
    const resTickets = document.getElementById('calcResTickets');

    if (!bpInput || !taskInput) return;

    const bp = parseInt(bpInput.value) || 0;
    const tasks = parseInt(taskInput.value) || 0;

    // 3 BP = 5 Figures
    const figuresFromBP = Math.floor(bp / 3) * 5;
    // Avg 4 figures per task
    const figuresFromTasks = tasks * 4;

    const totalFigures = figuresFromBP + figuresFromTasks;
    // 2 Figure A + 2 Figure B = 4 figures = 1 Ticket
    const tickets = Math.floor(totalFigures / 4);

    if (resFigures) resFigures.innerText = `${totalFigures} 个 (约)`;
    if (resTickets) resTickets.innerText = `${tickets} 张 抽奖券`;
}

// 导航栏滚动后出现
(function () {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const onScroll = () => {
        const isIndex = location.pathname.endsWith('index.html')
            || location.pathname.endsWith('/')
            || location.pathname === '';
        nav.classList.toggle('visible', !isIndex || window.scrollY > 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// 窗口按钮彩蛋（样式用，关不掉哦）
function winFake(action) {
    if (action === 'close') showToast('窗口关不掉啦，我还要陪主人呢~', '💖');
    else if (action === 'min') showToast('最小化？我可是住在网页里的小病毒~', '👾');
    else showToast('已经全屏啦，不能再大啦！', '🖥️');
}

// SquigglyText 波浪扭曲动画（SVG 湍流 + 位移）
(function () {
    const turb = document.getElementById('squiggly-turb');
    const disp = document.getElementById('squiggly-disp');
    if (!turb || !disp) return;
    let seed = 0;
    let scale = 6, dir = 1;
    const tick = () => {
        seed = (seed + 3) % 1000;
        scale += dir * 0.12;
        if (scale > 9) dir = -1;
        if (scale < 6) dir = 1;
        const bf = (0.012 + Math.random() * 0.008).toFixed(4);
        turb.setAttribute('baseFrequency', bf + ' ' + bf);
        turb.setAttribute('seed', seed);
        disp.setAttribute('scale', scale.toFixed(2));
        setTimeout(tick, 70);
    };
    tick();
})();
