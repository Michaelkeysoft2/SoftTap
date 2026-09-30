const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
    </linearGradient>
    <filter id="boltGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#f97316" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- Squircle Background -->
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)" />
  
  <!-- Subtle Glowing Rim -->
  <rect x="10" y="10" width="492" height="492" rx="105" fill="none" stroke="url(#orangeGrad)" stroke-width="8" stroke-opacity="0.45" />

  <!-- Soft Center Glow behind Monogram -->
  <circle cx="256" cy="256" r="170" fill="url(#glowGrad)" />

  <!-- S Letter (Polished, bold, modern geometry) -->
  <path d="M225 188 C225 142 192 124 152 124 C108 124 76 150 72 195 L120 198 C123 174 135 162 152 162 C167 162 176 170 176 183 C176 195 166 203 144 214 C98 236 72 260 72 305 C72 355 110 384 158 384 C206 384 242 354 245 304 L196 300 C194 326 178 342 157 342 C140 342 124 330 124 310 C124 290 138 280 165 267 C210 245 225 224 225 188 Z" 
        fill="#ffffff" />

  <!-- T Letter (Vibrant Electric Orange) -->
  <path d="M248 132 L436 132 L436 178 L368 178 L368 380 L316 380 L316 178 L248 178 Z" 
        fill="url(#orangeGrad)" />

  <!-- SoftTap Electric Lightning Tap Accent -->
  <polygon points="342,192 390,192 354,258 400,258 316,375 338,276 300,276" 
           fill="#ffffff" filter="url(#boltGlow)" />
  <polygon points="342,192 390,192 354,258 400,258 316,375 338,276 300,276" 
           fill="#fef08a" opacity="0.95" />
</svg>`;

async function generate() {
  const publicDir = path.resolve(__dirname, '../public');
  const appDir = path.resolve(__dirname, '../src/app');

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgIcon);
  fs.writeFileSync(path.join(appDir, 'apple-icon.svg'), svgIcon);

  await sharp(Buffer.from(svgIcon)).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(Buffer.from(svgIcon)).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(Buffer.from(svgIcon)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(Buffer.from(svgIcon)).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(Buffer.from(svgIcon)).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
  
  // Create .ico (using 32x32 PNG container or direct ICO)
  await sharp(Buffer.from(svgIcon)).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(Buffer.from(svgIcon)).resize(32, 32).png().toFile(path.join(appDir, 'favicon.ico'));

  console.log('ALL ICONS GENERATED SUCCESSFULLY!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
