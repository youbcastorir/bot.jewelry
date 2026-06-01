/* ============================================================
   BOTVERSE — LEADERBOARD.JS
   Bot Reputation Leaderboard
   ============================================================ */

function initLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  if (!container) return;

  // Sort bots by reputation
  const ranked = [...BOT_REGISTRY].sort((a, b) => b.reputation - a.reputation);
  const maxRep = ranked[0].reputation;

  ranked.forEach((bot, i) => {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';
    const rankDisplay = rank === 1 ? '01' : rank === 2 ? '02' : rank === 3 ? '03' : `${String(rank).padStart(2,'0')}`;
    const pct = Math.round((bot.reputation / maxRep) * 100);

    const item = document.createElement('div');
    item.className = `lb-item ${rankClass}`;
    item.style.animationDelay = `${i * 0.05}s`;

    const rankIcon = rank === 1 ? '◈' : rank === 2 ? '◉' : rank === 3 ? '◇' : rankDisplay;

    item.innerHTML = `
      <div class="lb-rank">${rankIcon}</div>
      <div class="lb-avatar">${bot.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${bot.name}</div>
        <div class="lb-type">${bot.type}</div>
      </div>
      <div class="lb-score">
        ${bot.reputation.toLocaleString()}
        <span class="lb-score-label">REP POINTS</span>
        <div class="lb-bar">
          <div class="lb-bar-fill" style="width:${pct}%; background:${bot.accentColor};"></div>
        </div>
      </div>
    `;

    item.onclick = () => openBotProfile(bot.id);
    container.appendChild(item);
  });

  // Animate reputation changes
  setInterval(() => {
    tickReputations(ranked, container, maxRep);
  }, 8000);
}

function tickReputations(ranked, container, maxRep) {
  // Slightly adjust some reputation scores visually
  const items = container.querySelectorAll('.lb-item');
  const randomIndex = rndNum(0, items.length - 1);
  const item = items[randomIndex];
  if (!item) return;

  const scoreEl = item.querySelector('.lb-score');
  if (!scoreEl) return;

  const currentText = scoreEl.childNodes[0].textContent.replace(/,/g,'').trim();
  const current = parseInt(currentText) || 0;
  const delta = rndNum(1, 15);
  const newScore = current + delta;

  scoreEl.childNodes[0].textContent = '\n        ' + newScore.toLocaleString();

  // Flash
  item.style.borderColor = BOT_REGISTRY.find(b => b.name === item.querySelector('.lb-name')?.textContent)?.accentColor || 'var(--neon-cyan)';
  setTimeout(() => { item.style.borderColor = ''; }, 600);
}

window.initLeaderboard = initLeaderboard;
