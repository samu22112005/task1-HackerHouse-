import { StudioState, SoloMember, TeamMember, PassTheme } from '@/types/builder';

function getThemeColors(theme: PassTheme = 'jungle') {
  if (theme === 'sunset') {
    return {
      bgInner: '#C2410C',
      bgMid: '#7C2D12',
      bgOuter: '#451A03',
      cardFill: 'rgba(124, 45, 18, 0.94)',
      cardBorder: '#FF4500',
      accentYellow: '#FFD23F',
      accentSecondary: '#FF007A',
      signText: 'GOA SUNSET',
      signColor: '#FF4500',
    };
  } else if (theme === 'midnight') {
    return {
      bgInner: '#1E1B4B',
      bgMid: '#0F172A',
      bgOuter: '#020617',
      cardFill: 'rgba(15, 23, 42, 0.95)',
      cardBorder: '#FF007A',
      accentYellow: '#38BDF8',
      accentSecondary: '#FF007A',
      signText: 'GOA NIGHT RAVE',
      signColor: '#FF007A',
    };
  }
  // Default 'jungle'
  return {
    bgInner: '#14532D',
    bgMid: '#0B3D2E',
    bgOuter: '#062018',
    cardFill: 'rgba(27, 67, 50, 0.94)',
    cardBorder: '#2E5A46',
    accentYellow: '#FFD23F',
    accentSecondary: '#10B981',
    signText: 'GOA BEACH 2026',
    signColor: '#FF007A',
  };
}

function drawSunburstRays(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
  const sunX = width / 2;
  const sunY = height * 0.25;
  const rays = 18;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < rays; i++) {
    const angle = (i * Math.PI * 2) / rays;
    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(sunX + Math.cos(angle) * width, sunY + Math.sin(angle) * height);
    ctx.stroke();
  }
  ctx.restore();
}

function drawVectorPalmAccents(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Left Palm Silhouette
  ctx.strokeStyle = '#0B3D2E';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.quadraticCurveTo(80, height - 300, 110, height - 550);
  ctx.stroke();

  ctx.strokeStyle = '#FFD23F';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 8]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Left Fronds
  const leftFronds = [
    "M110,height-550 Q30,height-630 -30,height-580",
    "M110,height-550 Q50,height-680 -10,height-720",
    "M110,height-550 Q160,height-680 230,height-660",
    "M110,height-550 Q190,height-600 250,height-530"
  ];
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#04382A';
  leftFronds.forEach((d) => {
    ctx.beginPath();
    ctx.moveTo(110, height - 550);
    ctx.quadraticCurveTo(40, height - 640, -40, height - 580);
    ctx.stroke();
  });

  // Right Palm Silhouette
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#0B3D2E';
  ctx.beginPath();
  ctx.moveTo(width, height);
  ctx.quadraticCurveTo(width - 80, height - 300, width - 110, height - 550);
  ctx.stroke();

  ctx.strokeStyle = '#FFD23F';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 8]);
  ctx.stroke();
  ctx.restore();
}

function drawGoaBeachNeonBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string = 'GOA BEACH 2026', color: string = '#FF007A') {
  ctx.save();
  ctx.translate(x, y);

  // Dynamic Neon Sign Box
  ctx.fillStyle = color;
  ctx.strokeStyle = '#FFFDF7';
  ctx.lineWidth = 3;
  ctx.shadowBlur = 18;
  ctx.shadowColor = color;
  drawRoundedRect(ctx, 0, 0, 175, 36, 8);
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.font = '900 15px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText(text, 87.5, 24);

  ctx.restore();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawProceduralQR(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const cells = 9;
  const cellSize = size / cells;
  ctx.save();
  ctx.fillStyle = color;

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isCorner = 
        (r < 3 && c < 3) || 
        (r < 3 && c >= cells - 3) || 
        (r >= cells - 3 && c < 3);

      if (isCorner) {
        ctx.fillRect(x + c * cellSize, y + r * cellSize, cellSize * 0.9, cellSize * 0.9);
      } else if ((r * 4 + c * 7 + 13) % 5 < 3) {
        ctx.fillRect(x + c * cellSize + 1, y + r * cellSize + 1, cellSize * 0.8, cellSize * 0.8);
      }
    }
  }
  ctx.restore();
}

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  const bars = 28;
  const barW = w / bars;
  for (let i = 0; i < bars; i++) {
    if (i % 2 === 0 || i % 5 === 0) {
      ctx.fillRect(x + i * barW, y, barW * 0.7, h);
    }
  }
  ctx.restore();
}

function drawWovenHeaderBorder(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  const colors = ['#FF007A', '#FFD23F', '#0B3D2E', '#14532D', '#E8C547'];
  const segmentW = 16;
  for (let i = 0; i < w; i += segmentW) {
    const col = colors[(i / segmentW) % colors.length];
    ctx.fillStyle = col;
    ctx.fillRect(x + i, y, segmentW, h);
  }
  ctx.restore();
}

function drawVerifiedStamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.15);

  ctx.strokeStyle = '#FF007A';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = 'bold 13px "Space Grotesk", monospace';
  ctx.fillStyle = '#FF007A';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL BUILDER', 0, -10);
  ctx.fillText('HHGOA 2026', 0, 8);
  ctx.fillText('GOA, INDIA', 0, 24);

  ctx.restore();
}

function drawStickerDecal(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  angleRad: number,
  bgColor: string = '#FF007A'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angleRad);

  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  const metrics = ctx.measureText(text);
  const w = metrics.width + 24;
  const h = 32;

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#FFFDF7';
  ctx.lineWidth = 2.5;
  drawRoundedRect(ctx, -w / 2, -h / 2, w, h, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText(text, 0, 5);

  ctx.restore();
}

function drawAvatarPlaceholder(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.save();
  ctx.fillStyle = '#14532D';
  ctx.strokeStyle = '#2E5A46';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, x, y, size, size, 24);
  ctx.fill();
  ctx.stroke();

  // Silhouette User Icon
  const cx = x + size / 2;
  const cy = y + size / 2;
  ctx.fillStyle = '#FFD23F';
  ctx.beginPath();
  ctx.arc(cx, cy - 20, Math.min(32, size * 0.15), 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + 50, Math.min(50, size * 0.25), Math.PI, 0);
  ctx.fill();

  // Subtext
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.textAlign = 'center';
  ctx.fillText('UPLOAD PORTRAIT', cx, y + size - 20);
  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

// 1. SOLO BUILDER PASS RENDERER (1080x1080)
export async function renderBuilderPass(
  state: StudioState,
  canvas: HTMLCanvasElement
): Promise<string> {
  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  const solo = state.solo;
  const themeColors = getThemeColors(state.theme);

  // Background Fill
  const bgGrad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, width * 0.8);
  bgGrad.addColorStop(0, themeColors.bgInner);
  bgGrad.addColorStop(0.65, themeColors.bgMid);
  bgGrad.addColorStop(1, themeColors.bgOuter);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Retro Sunburst Rays Watermark
  drawSunburstRays(ctx, width, height, themeColors.accentYellow);

  // Topographic Lines Watermark
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  for (let r = 80; r < width * 0.95; r += 90) {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2.5, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Main Credential Card Frame
  const cardX = 70;
  const cardY = 70;
  const cardW = 940;
  const cardH = 940;
  const cardRadius = 32;

  ctx.save();
  ctx.fillStyle = themeColors.cardFill;
  ctx.strokeStyle = themeColors.cardBorder;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 35;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Handcrafted Woven Pattern Header Border
  drawWovenHeaderBorder(ctx, cardX, cardY, cardW, 10);

  // Header Branding (2:47PM STUDIO & HACKER HOUSE GOA)
  ctx.textAlign = 'left';
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('2:47PM STUDIO', cardX + 50, cardY + 65);

  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('HHGOA 2026', cardX + 270, cardY + 65);

  // Pink GOA BEACH Neon Signboard Badge
  drawGoaBeachNeonBadge(ctx, cardX + cardW - 365, cardY + 36, themeColors.signText, themeColors.signColor);

  // Devanagari Pink Badge Overlay
  ctx.save();
  ctx.fillStyle = '#FF007A';
  drawRoundedRect(ctx, cardX + cardW - 170, cardY + 36, 65, 36, 18);
  ctx.fill();
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText('गोवा', cardX + cardW - 138, cardY + 60);
  ctx.restore();

  // ID Badge (Right Aligned)
  ctx.font = 'bold 16px monospace';
  const idText = state.builderId || 'HHGOA-2026-EXP-XXXX';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.textAlign = 'right';
  ctx.fillText(idText, cardX + cardW - 50, cardY + 60);

  // Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 50, cardY + 95);
  ctx.lineTo(cardX + cardW - 50, cardY + 95);
  ctx.stroke();

  // Avatar Photo Box
  const avatarSize = 250;
  const avatarX = cardX + 60;
  const avatarY = cardY + 130;

  ctx.save();
  ctx.strokeStyle = themeColors.accentYellow;
  ctx.lineWidth = 4;
  ctx.shadowBlur = 20;
  ctx.shadowColor = themeColors.accentYellow;
  drawRoundedRect(ctx, avatarX - 4, avatarY - 4, avatarSize + 8, avatarSize + 8, 28);
  ctx.stroke();
  ctx.restore();

  if (solo.avatarUrl) {
    try {
      const img = await loadImage(solo.avatarUrl);
      ctx.save();
      drawRoundedRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 24);
      ctx.clip();
      ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
    } catch {
      drawAvatarPlaceholder(ctx, avatarX, avatarY, avatarSize);
    }
  } else {
    drawAvatarPlaceholder(ctx, avatarX, avatarY, avatarSize);
  }

  // Member Info
  const infoX = avatarX + avatarSize + 40;
  const infoY = avatarY + 45;

  ctx.textAlign = 'left';
  ctx.font = 'bold 54px "Cormorant Garamond", serif';
  ctx.fillStyle = solo.name ? '#FFFDF7' : '#D6DCCF';
  ctx.fillText(solo.name || 'Your Name Here', infoX, infoY + 10);

  // Builder Title (e.g. Neural Nomad)
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillStyle = themeColors.accentSecondary;
  ctx.fillText(`⚡ ${solo.title || 'Builder Title'}`, infoX, infoY + 50);

  // Role
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText(`Role: ${solo.role || 'Primary Role'}`, infoX, infoY + 90);

  // College & Location
  ctx.font = '20px "Inter", sans-serif';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText(`📍 ${solo.collegeOrOrg || 'College / Organization'}`, infoX, infoY + 130);
  ctx.fillText(`🏛️ ${solo.location || 'Goa, India'}`, infoX, infoY + 165);

  // Motto Box
  const mottoY = avatarY + avatarSize + 40;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = themeColors.cardBorder;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, cardX + 60, mottoY, cardW - 120, 64, 14);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'italic 22px "Cormorant Garamond", serif';
  ctx.fillStyle = solo.motto ? '#FFFDF7' : '#D6DCCF';
  ctx.fillText(`"${solo.motto || 'Your motto / tagline here'}"`, cardX + 80, mottoY + 40);

  // Tech Stack Badges
  const techY = avatarY + avatarSize + 135;
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('CAPABILITIES & STACK', cardX + 60, techY);

  let badgeX = cardX + 60;
  let badgeY = techY + 15;
  ctx.font = 'bold 19px "Inter", sans-serif';

  const stackList = solo.techStack.length > 0 ? solo.techStack : ['React', 'Next.js', 'AI', 'Select Stack'];
  stackList.forEach((tech) => {
    const textWidth = ctx.measureText(tech).width;
    const badgeW = textWidth + 36;
    const badgeH = 40;

    if (badgeX + badgeW > cardX + cardW - 220) {
      badgeX = cardX + 60;
      badgeY += 50;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.strokeStyle = themeColors.accentYellow;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFDF7';
    ctx.fillText(tech, badgeX + 18, badgeY + 26);

    badgeX += badgeW + 12;
  });

  // Hobbies & Passions Bar
  if (solo.hobbies && solo.hobbies.length > 0) {
    const hobbyY = badgeY + 58;
    ctx.font = 'bold 15px monospace';
    ctx.fillStyle = themeColors.accentSecondary;
    const hobbiesStr = solo.hobbies.map((h) => `🌴 ${h}`).join(' • ');
    ctx.fillText(`HOBBIES: ${hobbiesStr}`, cardX + 60, hobbyY);
  }

  // Draw Selected Fun Beach Stickers
  const stickersToDraw = state.selectedStickers && state.selectedStickers.length > 0 
    ? state.selectedStickers 
    : ['🥥 Coconut Powered', '⚡ 5 AM Shack Hack'];
  
  if (stickersToDraw[0]) {
    drawStickerDecal(ctx, stickersToDraw[0], cardX + cardW - 140, avatarY + 30, 0.12, '#FF007A');
  }
  if (stickersToDraw[1]) {
    drawStickerDecal(ctx, stickersToDraw[1], cardX + cardW - 130, avatarY + 80, -0.08, '#10B981');
  }
  if (stickersToDraw[2]) {
    drawStickerDecal(ctx, stickersToDraw[2], cardX + cardW - 145, avatarY + 130, 0.15, '#F59E0B');
  }

  // Stamp & Barcode & QR
  drawVerifiedStamp(ctx, cardX + cardW - 270, avatarY + avatarSize + 70, 50);

  const qrSize = 110;
  const qrX = cardX + cardW - qrSize - 50;
  const qrY = cardY + cardH - qrSize - 50;
  drawProceduralQR(ctx, qrX, qrY, qrSize, themeColors.accentYellow);

  drawBarcode(ctx, cardX + 60, cardY + cardH - 120, 220, 35, '#D6DCCF');

  // Footer Tagline
  ctx.font = 'bold 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.fillText('HHGOA.COM', cardX + 60, cardY + cardH - 45);

  ctx.font = 'bold 26px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('#FrameInGoa', cardX + 210, cardY + cardH - 45);

  return canvas.toDataURL('image/png');
}

// 2. TEAM EXPEDITION PASS RENDERER (1080x1080)
export async function renderTeamPass(
  state: StudioState,
  canvas: HTMLCanvasElement
): Promise<string> {
  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  const themeColors = getThemeColors(state.theme);

  // Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, width * 0.8);
  bgGrad.addColorStop(0, themeColors.bgInner);
  bgGrad.addColorStop(0.7, themeColors.bgMid);
  bgGrad.addColorStop(1, themeColors.bgOuter);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Retro Sunburst Rays Watermark
  drawSunburstRays(ctx, width, height, themeColors.accentYellow);

  // Main Card Box
  const cardX = 60;
  const cardY = 60;
  const cardW = 960;
  const cardH = 960;

  ctx.save();
  ctx.fillStyle = themeColors.cardFill;
  ctx.strokeStyle = themeColors.cardBorder;
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  drawWovenHeaderBorder(ctx, cardX, cardY, cardW, 10);

  // Header
  ctx.textAlign = 'left';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('👥 OFFICIAL HHGOA EXPEDITION TEAM PASS', cardX + 40, cardY + 55);

  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = themeColors.accentSecondary;
  ctx.textAlign = 'right';
  ctx.fillText(state.builderId || 'HHGOA-2026-TEAM', cardX + cardW - 40, cardY + 55);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardY + 80);
  ctx.lineTo(cardX + cardW - 40, cardY + 80);
  ctx.stroke();

  // Team Members Loop
  const members = state.teamMembers;
  const count = members.length || 2;
  const memberW = (cardW - 80 - (count - 1) * 20) / count;
  const memberH = 680;
  const startY = cardY + 110;

  for (let i = 0; i < count; i++) {
    const m = members[i] || { name: '', role: '', avatarUrl: null };
    const mx = cardX + 40 + i * (memberW + 20);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = themeColors.cardBorder;
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, mx, startY, memberW, memberH, 22);
    ctx.fill();
    ctx.stroke();

    // Member Photo
    const photoSize = Math.min(220, memberW - 40);
    const px = mx + (memberW - photoSize) / 2;
    const py = startY + 30;

    if (m.avatarUrl) {
      try {
        const img = await loadImage(m.avatarUrl);
        ctx.save();
        drawRoundedRect(ctx, px, py, photoSize, photoSize, 20);
        ctx.clip();
        ctx.drawImage(img, px, py, photoSize, photoSize);
        ctx.restore();
      } catch {
        drawAvatarPlaceholder(ctx, px, py, photoSize);
      }
    } else {
      drawAvatarPlaceholder(ctx, px, py, photoSize);
    }

    // Name & Title
    ctx.font = 'bold 28px "Cormorant Garamond", serif';
    ctx.fillStyle = m.name ? '#FFFDF7' : '#D6DCCF';
    ctx.textAlign = 'center';
    ctx.fillText(m.name || `Builder #${i + 1}`, mx + memberW / 2, py + photoSize + 45);

    ctx.font = 'bold 16px "Space Grotesk", sans-serif';
    ctx.fillStyle = themeColors.accentSecondary;
    ctx.fillText(m.title || 'Builder Title', mx + memberW / 2, py + photoSize + 75);

    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = themeColors.accentYellow;
    ctx.fillText(m.role || 'Primary Role', mx + memberW / 2, py + photoSize + 105);
  }

  // Footer Tagline
  ctx.textAlign = 'left';
  ctx.font = 'bold 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.fillText('HHGOA.COM', cardX + 40, cardY + cardH - 40);

  ctx.font = 'bold 26px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('#FrameInGoa', cardX + cardW - 220, cardY + cardH - 40);

  return canvas.toDataURL('image/png');
}

// 3. CIRCULAR PROFILE FRAME (1080x1080)
export async function renderProfileFrame(
  state: StudioState,
  canvas: HTMLCanvasElement
): Promise<string> {
  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  const centerX = width / 2;
  const centerY = height / 2;
  const avatarRadius = 380;
  const solo = state.solo;
  const themeColors = getThemeColors(state.theme);

  ctx.clearRect(0, 0, width, height);

  // Background Fill
  const bgGrad = ctx.createRadialGradient(centerX, centerY, 100, centerX, centerY, width / 2);
  bgGrad.addColorStop(0, themeColors.bgInner);
  bgGrad.addColorStop(0.7, themeColors.bgMid);
  bgGrad.addColorStop(1, themeColors.bgOuter);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Topographic Lines Watermark
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  for (let r = 100; r < width * 0.8; r += 100) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Avatar Photo Cropped in Circle
  if (solo.avatarUrl) {
    try {
      const img = await loadImage(solo.avatarUrl);
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, centerX - avatarRadius, centerY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
      ctx.restore();
    } catch {
      ctx.fillStyle = themeColors.bgMid;
      ctx.beginPath();
      ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.fillStyle = themeColors.bgMid;
    ctx.beginPath();
    ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 36px monospace';
    ctx.fillStyle = themeColors.accentYellow;
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PORTRAIT', centerX, centerY);
  }

  // Gold Ring Outer Frame
  ctx.save();
  ctx.strokeStyle = themeColors.accentYellow;
  ctx.lineWidth = 18;
  ctx.shadowBlur = 35;
  ctx.shadowColor = themeColors.accentYellow;
  ctx.beginPath();
  ctx.arc(centerX, centerY, avatarRadius + 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Handcrafted Woven Outer Ring Accent
  ctx.save();
  ctx.strokeStyle = '#FF007A';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 12]);
  ctx.beginPath();
  ctx.arc(centerX, centerY, avatarRadius + 28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Bottom Banner Stamp
  const bannerW = 640;
  const bannerH = 96;
  const bannerX = centerX - bannerW / 2;
  const bannerY = height - 170;

  ctx.fillStyle = themeColors.cardFill;
  ctx.strokeStyle = themeColors.accentYellow;
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, bannerX, bannerY, bannerW, bannerH, 48);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 34px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText('HHGOA 2026', centerX - 120, bannerY + 58);

  ctx.font = 'bold 36px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('#FrameInGoa', centerX + 120, bannerY + 58);

  return canvas.toDataURL('image/png');
}

// 4. INSTAGRAM STORY FRAME (1080x1920 - 9:16)
export async function renderInstagramStory(
  state: StudioState,
  canvas: HTMLCanvasElement
): Promise<string> {
  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  const solo = state.solo;
  const themeColors = getThemeColors(state.theme);

  // Background Fill
  const bgGrad = ctx.createRadialGradient(width / 2, height / 3, 100, width / 2, height / 2, width);
  bgGrad.addColorStop(0, themeColors.bgInner);
  bgGrad.addColorStop(0.65, themeColors.bgMid);
  bgGrad.addColorStop(1, themeColors.bgOuter);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Topographic Watermark Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  for (let r = 120; r < height * 0.7; r += 140) {
    ctx.beginPath();
    ctx.arc(width / 2, height / 3, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Outer Story Card Container Frame
  const cardX = 60;
  const cardY = 80;
  const cardW = 960;
  const cardH = 1760;
  const cardRadius = 36;

  ctx.save();
  ctx.fillStyle = themeColors.cardFill;
  ctx.strokeStyle = themeColors.cardBorder;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 45;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Handcrafted Woven Pattern Header Border
  drawWovenHeaderBorder(ctx, cardX, cardY, cardW, 12);

  // Story Header Branding (2:47PM STUDIO & HACKER HOUSE GOA)
  ctx.textAlign = 'left';
  ctx.font = 'bold 32px "Space Grotesk", sans-serif';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('2:47PM STUDIO', cardX + 50, cardY + 80);

  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('HACKER HOUSE GOA 2026', cardX + 310, cardY + 80);

  // Devanagari Pink Badge Overlay ("गोवा")
  ctx.save();
  ctx.fillStyle = '#FF007A';
  drawRoundedRect(ctx, cardX + cardW - 320, cardY + 50, 76, 42, 21);
  ctx.fill();
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText('गोवा', cardX + cardW - 282, cardY + 78);
  ctx.restore();

  // Builder ID Tag (Right Aligned)
  ctx.font = 'bold 18px monospace';
  const idText = state.builderId || 'HHGOA-2026-EXP-XXXX';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.textAlign = 'right';
  ctx.fillText(idText, cardX + cardW - 50, cardY + 78);

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 50, cardY + 115);
  ctx.lineTo(cardX + cardW - 50, cardY + 115);
  ctx.stroke();

  // Avatar Photo Box (Center Aligned 480x480)
  const avatarSize = 480;
  const avatarX = (width - avatarSize) / 2;
  const avatarY = cardY + 160;

  ctx.save();
  ctx.strokeStyle = themeColors.accentYellow;
  ctx.lineWidth = 5;
  ctx.shadowBlur = 30;
  ctx.shadowColor = themeColors.accentYellow;
  drawRoundedRect(ctx, avatarX - 5, avatarY - 5, avatarSize + 10, avatarSize + 10, 36);
  ctx.stroke();
  ctx.restore();

  if (solo.avatarUrl) {
    try {
      const img = await loadImage(solo.avatarUrl);
      ctx.save();
      drawRoundedRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 32);
      ctx.clip();
      ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
    } catch {
      drawAvatarPlaceholder(ctx, avatarX, avatarY, avatarSize);
    }
  } else {
    drawAvatarPlaceholder(ctx, avatarX, avatarY, avatarSize);
  }

  // Builder Name
  const infoY = avatarY + avatarSize + 70;
  ctx.textAlign = 'center';
  ctx.font = 'bold 64px "Cormorant Garamond", serif';
  ctx.fillStyle = solo.name ? '#FFFDF7' : '#D6DCCF';
  ctx.fillText(solo.name || 'Your Name Here', width / 2, infoY);

  // Builder Title (e.g. ⚡ Neural Nomad)
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.fillStyle = themeColors.accentSecondary;
  ctx.fillText(`⚡ ${solo.title || 'Builder Title'}`, width / 2, infoY + 50);

  // Role
  ctx.font = 'bold 26px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText(`Role: ${solo.role || 'Primary Role'}`, width / 2, infoY + 95);

  // College & Location
  ctx.font = '24px "Inter", sans-serif';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText(`📍 ${solo.collegeOrOrg || 'College / Organization'}`, width / 2, infoY + 140);
  ctx.fillText(`🏛️ ${solo.location || 'Goa, India'}`, width / 2, infoY + 180);

  // Motto Box
  const mottoY = infoY + 220;
  const mottoW = cardW - 120;
  const mottoX = (width - mottoW) / 2;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = themeColors.cardBorder;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, mottoX, mottoY, mottoW, 76, 18);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'italic 26px "Cormorant Garamond", serif';
  ctx.fillStyle = solo.motto ? '#FFFDF7' : '#D6DCCF';
  ctx.fillText(`"${solo.motto || 'Your motto / tagline here'}"`, width / 2, mottoY + 46);

  // Capabilities & Tech Stack Chips
  const techY = mottoY + 130;
  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('CAPABILITIES & STACK', width / 2, techY);

  ctx.font = 'bold 22px "Inter", sans-serif';
  const stackList = solo.techStack.length > 0 ? solo.techStack : ['React', 'Next.js', 'AI', 'Select Stack'];
  let badgeX = cardX + 80;
  let badgeY = techY + 25;

  ctx.textAlign = 'left';
  stackList.forEach((tech) => {
    const textWidth = ctx.measureText(tech).width;
    const badgeW = textWidth + 40;
    const badgeH = 46;

    if (badgeX + badgeW > cardX + cardW - 80) {
      badgeX = cardX + 80;
      badgeY += 56;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.strokeStyle = themeColors.accentYellow;
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFDF7';
    ctx.fillText(tech, badgeX + 20, badgeY + 30);

    badgeX += badgeW + 14;
  });

  // Hobbies Line
  if (solo.hobbies && solo.hobbies.length > 0) {
    const hobbyY = badgeY + 68;
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = themeColors.accentSecondary;
    const hobbiesStr = solo.hobbies.map((h) => `🌴 ${h}`).join(' • ');
    ctx.fillText(`HOBBIES: ${hobbiesStr}`, width / 2, hobbyY);
  }

  // Stamp & Barcode & QR Code
  drawVerifiedStamp(ctx, width / 2 + 260, cardY + cardH - 220, 60);

  const qrSize = 130;
  const qrX = cardX + cardW - qrSize - 60;
  const qrY = cardY + cardH - qrSize - 60;
  drawProceduralQR(ctx, qrX, qrY, qrSize, themeColors.accentYellow);

  drawBarcode(ctx, cardX + 60, cardY + cardH - 140, 260, 42, '#D6DCCF');

  // Story Footer Tagline
  ctx.textAlign = 'left';
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.fillText('HHGOA.COM', cardX + 60, cardY + cardH - 50);

  ctx.font = 'bold 30px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('#FrameInGoa', cardX + 250, cardY + cardH - 50);

  return canvas.toDataURL('image/png');
}
