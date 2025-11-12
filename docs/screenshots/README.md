# Screenshots Guide

This directory contains screenshots and images used in the README and documentation.

## Required Screenshots

To make your README look professional, add the following screenshots:

### 1. Hero Section (`hero.png`)
- **Description**: Landing page hero section
- **Recommended Size**: 1920x1080 or 1600x900
- **What to capture**: The beautiful landing page with logo, heading, and CTA button

### 2. Code Editor (`editor.png`)
- **Description**: Main collaborative code editor interface
- **Recommended Size**: 1920x1080 or 1600x900
- **What to capture**: 
  - Monaco editor with code
  - Multiple user cursors
  - File tree on the left
  - Live users list

### 3. Live Chat (`chat.png`)
- **Description**: Built-in chat feature
- **Recommended Size**: 800x600 or 1024x768
- **What to capture**:
  - Chat sidebar open
  - Messages from multiple users
  - User avatars

### 4. Drawing Board (`drawing.png`) [Optional]
- **Description**: Collaborative whiteboard feature
- **Recommended Size**: 1200x800
- **What to capture**:
  - Drawing canvas with diagrams
  - Drawing tools

### 5. AI Assistant (`ai-assistant.png`) [Optional]
- **Description**: AI-powered code suggestions
- **Recommended Size**: 1200x800
- **What to capture**:
  - AI panel open
  - Code suggestions
  - AI chat interface

## How to Add Screenshots

1. **Take Screenshots**
   - Run your application in development or production
   - Use a screenshot tool (Windows Snipping Tool, macOS Screenshot, or browser DevTools)
   - Capture the interface at the recommended sizes

2. **Optimize Images**
   - Compress images to reduce file size (use tools like TinyPNG or ImageOptim)
   - Keep file sizes under 500KB for each image
   - Use PNG format for better quality

3. **Add to Repository**
   ```bash
   # Place screenshots in this directory
   git add docs/screenshots/*.png
   git commit -m "docs: add screenshots for README"
   git push
   ```

4. **Update README**
   - The README already references these images
   - Make sure filenames match exactly

## Screenshot Tips

- **Clean UI**: Remove any test data or debugging information
- **High Resolution**: Use retina/high DPI displays if possible
- **Proper Lighting**: Use light theme for consistency (or dark if that's your brand)
- **Real Content**: Use realistic code examples, not Lorem Ipsum
- **Multiple Users**: Show the collaborative aspect with multiple cursors/users
- **Annotations**: Consider adding arrows or highlights to emphasize features

## Alternative: Use GIFs

For more engaging documentation, consider creating GIFs instead of static images:

- **Tools**: [Kap](https://getkap.co/), [ScreenToGif](https://www.screentogif.com/), [LICEcap](https://www.cockos.com/licecap/)
- **Max Size**: Keep under 5MB
- **Duration**: 5-10 seconds per GIF
- **FPS**: 15-24 fps is sufficient

Example GIF captures:
- Real-time typing synchronization between users
- File creation and navigation
- Chat messages appearing live
- AI code suggestions in action

## Current Status

- [ ] hero.png
- [ ] editor.png
- [ ] chat.png
- [ ] drawing.png
- [ ] ai-assistant.png

Once you add screenshots, check off the items above!
