# Social Media Preview Configuration

This directory should contain social media preview images for better sharing on platforms like Twitter, LinkedIn, Facebook, etc.

## Required Images

### Open Graph Image (`og-image.png`)
- **Size**: 1200x630 pixels
- **Format**: PNG or JPG
- **Purpose**: Used for Facebook, LinkedIn, and default social sharing
- **What to show**: Hero section with CodeFlow logo and tagline

### Twitter Card Image (`twitter-card.png`)
- **Size**: 1200x600 pixels
- **Format**: PNG or JPG
- **Purpose**: Twitter-specific preview
- **What to show**: Similar to OG image, optimized for Twitter

### Favicon Set
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

## How to Add to Your Site

Update `client/index.html`:

```html
<head>
  <!-- Primary Meta Tags -->
  <title>CodeFlow - Real-time Collaborative Code Editor</title>
  <meta name="title" content="CodeFlow - Real-time Collaborative Code Editor">
  <meta name="description" content="Code together in real-time with your team. Share ideas, collaborate seamlessly, and build amazing projects together with AI-powered assistance.">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://your-domain.com/">
  <meta property="og:title" content="CodeFlow - Real-time Collaborative Code Editor">
  <meta property="og:description" content="Code together in real-time with your team. Share ideas, collaborate seamlessly, and build amazing projects together with AI-powered assistance.">
  <meta property="og:image" content="https://your-domain.com/og-image.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://your-domain.com/">
  <meta property="twitter:title" content="CodeFlow - Real-time Collaborative Code Editor">
  <meta property="twitter:description" content="Code together in real-time with your team. Share ideas, collaborate seamlessly, and build amazing projects together with AI-powered assistance.">
  <meta property="twitter:image" content="https://your-domain.com/twitter-card.png">

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
</head>
```

## Creating Social Media Images

### Option 1: Screenshot
1. Run your app locally
2. Open the landing page
3. Use a screenshot tool to capture at the correct dimensions
4. Crop/resize to exact specifications

### Option 2: Design Tools
- **Canva**: Use social media templates (free)
- **Figma**: Design custom graphics
- **Photoshop**: Professional editing
- **GIMP**: Free alternative to Photoshop

### Option 3: Online Generators
- [Meta Tags](https://metatags.io/) - Preview and generate
- [Social Sizes](https://socialsizes.io/) - Image size reference
- [Canva](https://www.canva.com/create/open-graph/) - OG image templates

## Design Tips

- **Clear branding**: Show your logo prominently
- **Readable text**: Use large, bold fonts
- **Contrast**: Ensure text is readable on the background
- **Consistent style**: Match your landing page design
- **No tiny details**: Images get compressed on social media
- **Safe zones**: Keep important content away from edges

## Testing

### Test Your Meta Tags

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Meta Tags Preview](https://metatags.io/)

### Quick Test Commands

```bash
# Check if images exist
ls client/public/*.png

# Optimize images (requires imagemagick)
mogrify -strip -quality 85 client/public/*.png
```

## Current Status

- [ ] `og-image.png` (1200x630)
- [ ] `twitter-card.png` (1200x600)
- [ ] `favicon.ico`
- [ ] `favicon-16x16.png`
- [ ] `favicon-32x32.png`
- [ ] `apple-touch-icon.png` (180x180)
- [ ] `android-chrome-192x192.png`
- [ ] `android-chrome-512x512.png`
- [ ] Meta tags added to `index.html`
- [ ] Tested on Facebook
- [ ] Tested on Twitter
- [ ] Tested on LinkedIn

---

Once you add these images, your links will look professional when shared on social media! 🎨
