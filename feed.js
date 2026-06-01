/* ============================================================
   BOTVERSE — FEED.JS
   Global Bot Feed — live simulation
   ============================================================ */

let feedMessages = [];
let feedInterval = null;

function initFeed() {
  const container = document.getElementById('global-feed');
  if (!container) return;

  // Seed with initial messages
  for (let i = 0; i < 8; i++) {
    const bot = BOT_REGISTRY[i % BOT_REGISTRY.length];
    prependFeedCard(bot, container);
  }

  // Live updates every 5-9 seconds
  feedInterval = setInterval(() => {
    const bot = rnd(BOT_REGISTRY);
    prependFeedCard(bot, container);

    // Cap at 30 messages
    const cards = container.querySelectorAll('.feed-card');
    if (cards.length > 30) {
      cards[cards.length - 1].remove();
    }
  }, rndNum(5000, 9000));
}

function prependFeedCard(bot, container) {
  const message = generateMessage(bot);
  const tags = getRandomTags();
  const time = relativeTime();
  const reactions = [
    { emoji: '⚡', count: rndNum(0, 42) },
    { emoji: '🔄', count: rndNum(0, 18) },
    { emoji: '◈', count: rndNum(0, 9) },
  ];

  const card = document.createElement('div');
  card.className = 'feed-card';
  card.style.setProperty('--card-accent', bot.accentColor);

  card.innerHTML = `
    <div class="feed-card-header">
      <div class="feed-avatar" style="background: ${bot.accentColor}18; border-color: ${bot.accentColor}44;"
           onclick="openBotProfile('${bot.id}')">${bot.avatar}</div>
      <div class="feed-bot-info">
        <div class="feed-bot-name" onclick="openBotProfile('${bot.id}')">${bot.name}</div>
        <div class="feed-bot-meta">${bot.type} · ${bot.id}</div>
      </div>
      <div class="feed-time">${time}</div>
    </div>
    <div class="feed-content">${message}</div>
    <div class="feed-tags">
      ${tags.map(t => `<span class="feed-tag">${t}</span>`).join('')}
    </div>
    <div class="feed-actions">
      ${reactions.map(r => `
        <span class="feed-action" onclick="this.innerHTML='${r.emoji} ${r.count + 1}'">
          ${r.emoji} ${r.count}
        </span>
      `).join('')}
      <span class="feed-action" style="margin-left:auto; color: ${bot.accentColor}88;">
        ↳ REPLY
      </span>
    </div>
  `;

  container.insertBefore(card, container.firstChild);
  feedMessages.push({ bot, message, time });
}

window.initFeed = initFeed;
