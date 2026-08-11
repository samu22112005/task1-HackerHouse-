import { StudioState, SoloMember, TeamMember, PassTheme } from '@/types/builder';

function getThemeColors(theme: PassTheme = 'jungle') {
  if (theme === 'sunset') {
    return {
      bgInner: '#C2410C',
      bgMid: '#7C2D12',
      bgOuter: '#451A03',
      cardFill: 'rgba(67, 20, 10, 0.96)',
      cardBorder: '#FF4500',
      accentYellow: '#FFD23F',
      accentSecondary: '#FF007A',
      signText: 'GOA SUNSET 2026',
      signColor: '#FF4500',
    };
  } else if (theme === 'midnight') {
    return {
      bgInner: '#1E1B4B',
      bgMid: '#0F172A',
      bgOuter: '#020617',
      cardFill: 'rgba(10, 15, 30, 0.96)',
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
    cardFill: 'rgba(12, 45, 32, 0.96)',
    cardBorder: '#2E5A46',
    accentYellow: '#FFD23F',
    accentSecondary: '#10B981',
    signText: 'GOA BEACH 2026',
    signColor: '#FF007A',
  };
}

function drawSunburstRays(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
  const sunX = width / 2;
  const sunY = height * 0.22;
  const rays = 20;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.09;
  for (let i = 0; i < rays; i++) {
    const angle = (i * Math.PI * 2) / rays;
    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(sunX + Math.cos(angle) * width, sunY + Math.sin(angle) * height);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSegmentedCoconutPalm(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Stacked Segmented Brown Bark Trunk
  const segments = [
    { y: 350, w: 36, h: 35 },
    { y: 315, w: 34, h: 35 },
    { y: 280, w: 32, h: 35 },
    { y: 245, w: 30, h: 35 },
    { y: 210, w: 28, h: 35 },
    { y: 175, w: 26, h: 35 },
    { y: 140, w: 24, h: 35 },
    { y: 105, w: 22, h: 35 },
  ];

  segments.forEach((seg, i) => {
    ctx.fillStyle = i % 2 === 0 ? '#8B4513' : '#CD853F';
    ctx.strokeStyle = '#451A03';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, -seg.w / 2 + i * 2, seg.y, seg.w, seg.h, 6);
    ctx.fill();
    ctx.stroke();
  });

  // Green Crown Fronds
  ctx.fillStyle = '#22C55E';
  ctx.strokeStyle = '#14532D';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(15, 105);
  ctx.quadraticCurveTo(-20, 20, 0, -30);
  ctx.quadraticCurveTo(30, 20, 15, 105);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#16A34A';
  ctx.beginPath();
  ctx.moveTo(15, 105);
  ctx.quadraticCurveTo(-90, 30, -130, 60);
  ctx.quadraticCurveTo(-70, 90, 15, 105);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#15803D';
  ctx.beginPath();
  ctx.moveTo(15, 105);
  ctx.quadraticCurveTo(100, 30, 140, 70);
  ctx.quadraticCurveTo(70, 95, 15, 105);
  ctx.fill();
  ctx.stroke();

  // Coconuts Cluster
  ctx.fillStyle = '#78350F';
  ctx.strokeStyle = '#451A03';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(8, 100, 9, 0, Math.PI * 2);
  ctx.arc(20, 104, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawCurlingSurfWave(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Wave Tube Body
  ctx.fillStyle = '#0284C7';
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(10, 120);
  ctx.quadraticCurveTo(40, 10, 140, 5);
  ctx.quadraticCurveTo(220, 0, 260, 45);
  ctx.quadraticCurveTo(280, 80, 240, 100);
  ctx.quadraticCurveTo(200, 120, 150, 90);
  ctx.quadraticCurveTo(100, 60, 80, 80);
  ctx.quadraticCurveTo(50, 100, 10, 120);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // White Foam Crest
  ctx.fillStyle = '#FFFDF7';
  ctx.beginPath();
  ctx.moveTo(230, 20);
  ctx.quadraticCurveTo(260, -10, 290, 15);
  ctx.quadraticCurveTo(310, 40, 280, 70);
  ctx.quadraticCurveTo(250, 90, 230, 70);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Water Spray Droplets
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(315, 50, 4, 0, Math.PI * 2);
  ctx.arc(330, 70, 5, 0, Math.PI * 2);
  ctx.arc(305, 90, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawGoaBeachNeonBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string = 'GOA BEACH 2026', color: string = '#FF007A') {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = color;
  ctx.strokeStyle = '#FFFDF7';
  ctx.lineWidth = 2.5;
  ctx.shadowBlur = 12;
  ctx.shadowColor = color;
  drawRoundedRect(ctx, 0, 0, 160, 32, 8);
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 13px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText(text, 80, 21);

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
  const bars = 26;
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
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = 'bold 11px "Space Grotesk", monospace';
  ctx.fillStyle = '#FF007A';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL BUILDER', 0, -8);
  ctx.fillText('HHGOA 2026', 0, 8);
  ctx.fillText('GOA, INDIA', 0, 22);

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

  ctx.font = 'bold 14px "Space Grotesk", sans-serif';
  const metrics = ctx.measureText(text);
  const w = metrics.width + 22;
  const h = 30;

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#FFFDF7';
  ctx.lineWidth = 2.5;
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  drawRoundedRect(ctx, -w / 2, -h / 2, w, h, 15);
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
  ctx.font = 'bold 12px monospace';
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

// 1. SOLO BUILDER PASS RENDERER (1080x1080) - COMPLETELY REDESIGNED & UNCLUTTERED
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

  // Background Outer Fill
  const bgGrad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, width * 0.8);
  bgGrad.addColorStop(0, themeColors.bgInner);
  bgGrad.addColorStop(0.65, themeColors.bgMid);
  bgGrad.addColorStop(1, themeColors.bgOuter);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Retro Sunburst Rays Watermark
  drawSunburstRays(ctx, width, height, themeColors.accentYellow);

  // Segmented Coconut Palm & Curling Surf Wave Accents (Positioned cleanly behind card)
  drawSegmentedCoconutPalm(ctx, -10, 560, 0.8);
  drawCurlingSurfWave(ctx, 740, 750, 0.6);

  // Topographic Lines Watermark
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
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
  ctx.lineWidth = 3.5;
  ctx.shadowBlur = 40;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Handcrafted Woven Pattern Header Border
  drawWovenHeaderBorder(ctx, cardX, cardY, cardW, 10);

  // ---------------- HEADER ROW 1 (Branding & Neon Sign) ----------------
  ctx.textAlign = 'left';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('2:47PM STUDIO', cardX + 45, cardY + 52);

  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('HHGOA 2026', cardX + 245, cardY + 50);

  // GOA BEACH Neon Badge (Right Aligned Cleanly - No Overlap!)
  drawGoaBeachNeonBadge(ctx, cardX + cardW - 220, cardY + 30, themeColors.signText, themeColors.signColor);

  // Devanagari Pink Badge (Far Right)
  ctx.save();
  ctx.fillStyle = '#FF007A';
  drawRoundedRect(ctx, cardX + cardW - 55, cardY + 30, 50, 32, 16);
  ctx.fill();
  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.textAlign = 'center';
  ctx.fillText('गोवा', cardX + cardW - 30, cardY + 51);
  ctx.restore();

  // ---------------- HEADER ROW 2 (ID BAR - Clean Dedicated Line!) ----------------
  const idY = cardY + 88;
  ctx.textAlign = 'left';
  ctx.font = 'bold 15px monospace';
  const idText = state.builderId || 'HHGOA-2026-EXP-XXXX';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText(`CREDENTIAL ID: ${idText}`, cardX + 45, idY);

  ctx.textAlign = 'right';
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('EXPEDITION BATCH #01 • GOA INDIA', cardX + cardW - 45, idY);

  // Header Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 45, cardY + 104);
  ctx.lineTo(cardX + cardW - 45, cardY + 104);
  ctx.stroke();

  // ---------------- AVATAR PORTRAIT BOX (Left Column) ----------------
  const avatarSize = 230;
  const avatarX = cardX + 50;
  const avatarY = cardY + 130;

  ctx.save();
  ctx.strokeStyle = themeColors.accentYellow;
  ctx.lineWidth = 4;
  ctx.shadowBlur = 22;
  ctx.shadowColor = themeColors.accentYellow;
  drawRoundedRect(ctx, avatarX - 4, avatarY - 4, avatarSize + 8, avatarSize + 8, 26);
  ctx.stroke();
  ctx.restore();

  if (solo.avatarUrl) {
    try {
      const img = await loadImage(solo.avatarUrl);
      ctx.save();
      drawRoundedRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 22);
      ctx.clip();
      ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
    } catch {
      drawAvatarPlaceholder(ctx, avatarX, avatarY, avatarSize);
    }
  } else {
    drawAvatarPlaceholder(ctx, avatarX, avatarY, avatarSize);
  }

  // ---------------- MEMBER DETAILS (Right Column) ----------------
  const infoX = avatarX + avatarSize + 35;
  const infoY = avatarY + 30;

  // Name
  ctx.textAlign = 'left';
  ctx.font = 'bold 46px "Cormorant Garamond", serif';
  ctx.fillStyle = solo.name ? '#FFFDF7' : '#D6DCCF';
  ctx.fillText(solo.name || 'Your Name Here', infoX, infoY + 10);

  // Builder Title (Pill Badge Style)
  const titleText = `⚡ ${solo.title || 'Builder Title'}`;
  ctx.font = 'bold 17px "Space Grotesk", sans-serif';
  const titleWidth = ctx.measureText(titleText).width + 24;
  
  ctx.fillStyle = 'rgba(255, 0, 122, 0.2)';
  ctx.strokeStyle = themeColors.accentSecondary;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, infoX, infoY + 28, titleWidth, 32, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = themeColors.accentSecondary;
  ctx.fillText(titleText, infoX + 12, infoY + 50);

  // Role
  ctx.font = 'bold 19px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText(`Role: ${solo.role || 'Primary Role'}`, infoX, infoY + 95);

  // College & Location
  ctx.font = '17px "Inter", sans-serif';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText(`📍 ${solo.collegeOrOrg || 'College / Organization'}`, infoX, infoY + 130);
  ctx.fillText(`🏛️ ${solo.location || 'Goa, India'}`, infoX, infoY + 162);

  // ---------------- MOTTO BOX ----------------
  const mottoY = avatarY + avatarSize + 25;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.strokeStyle = themeColors.cardBorder;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, cardX + 50, mottoY, cardW - 100, 60, 14);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'italic 20px "Cormorant Garamond", serif';
  ctx.fillStyle = solo.motto ? '#FFFDF7' : '#D6DCCF';
  ctx.fillText(`"${solo.motto || 'Your motto / tagline here'}"`, cardX + 70, mottoY + 38);

  // ---------------- CAPABILITIES & STACK (Center Fill) ----------------
  const techY = mottoY + 80;
  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#D6DCCF';
  ctx.fillText('CAPABILITIES & STACK', cardX + 50, techY);

  let badgeX = cardX + 50;
  let badgeY = techY + 15;
  ctx.font = 'bold 17px "Inter", sans-serif';

  const stackList = solo.techStack.length > 0 ? solo.techStack : ['React', 'Next.js', 'AI', 'Select Stack'];
  stackList.forEach((tech) => {
    const textWidth = ctx.measureText(tech).width;
    const badgeW = textWidth + 32;
    const badgeH = 36;

    if (badgeX + badgeW > cardX + cardW - 180) {
      badgeX = cardX + 50;
      badgeY += 44;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.strokeStyle = themeColors.accentYellow;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFDF7';
    ctx.fillText(tech, badgeX + 16, badgeY + 24);

    badgeX += badgeW + 10;
  });

  // Hobbies Bar
  if (solo.hobbies && solo.hobbies.length > 0) {
    const hobbyY = badgeY + 48;
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = themeColors.accentSecondary;
    const hobbiesStr = solo.hobbies.map((h) => `🌴 ${h}`).join(' • ');
    ctx.fillText(`HOBBIES: ${hobbiesStr}`, cardX + 50, hobbyY);
  }

  // ---------------- FUN BEACH STICKERS (Slapped Cleanly on Motto Corner) ----------------
  const stickersToDraw = state.selectedStickers && state.selectedStickers.length > 0 
    ? state.selectedStickers 
    : ['🥥 Coconut Powered', '⚡ 5 AM Shack Hack'];
  
  if (stickersToDraw[0]) {
    drawStickerDecal(ctx, stickersToDraw[0], cardX + cardW - 140, mottoY + 30, 0.08, '#FF007A');
  }
  if (stickersToDraw[1]) {
    drawStickerDecal(ctx, stickersToDraw[1], cardX + cardW - 140, mottoY - 15, -0.05, '#10B981');
  }

  // ---------------- FOOTER ROW (Verified Stamp, Barcode, QR) ----------------
  const footerY = cardY + cardH - 110;

  // Verified Stamp (Placed in dedicated space!)
  drawVerifiedStamp(ctx, cardX + cardW - 280, footerY + 15, 46);

  // QR Code
  const qrSize = 100;
  const qrX = cardX + cardW - qrSize - 45;
  const qrY = footerY - 35;
  drawProceduralQR(ctx, qrX, qrY, qrSize, themeColors.accentYellow);

  // Barcode
  drawBarcode(ctx, cardX + 50, footerY - 15, 210, 32, '#D6DCCF');

  // Bottom Tagline
  ctx.textAlign = 'left';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFDF7';
  ctx.fillText('HHGOA.COM', cardX + 50, cardY + cardH - 35);

  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = themeColors.accentYellow;
  ctx.fillText('#FrameInGoa', cardX + 200, cardY + cardH - 35);

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

  // Builder Title
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
