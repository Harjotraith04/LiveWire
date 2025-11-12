# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of CodeFlow
- Real-time collaborative code editor using Monaco Editor
- WebSocket-based synchronization with Socket.IO
- Multi-cursor support for tracking team members
- Built-in live chat functionality
- Integrated drawing board for diagrams and sketches
- AI-powered code assistance using Google Gemini AI
- File and folder management system
- Code execution support for multiple languages
- User presence indicators
- Multiple theme support (light/dark)
- Syntax highlighting for 50+ languages
- Professional landing page
- Room-based collaboration (no sign-up required)
- Download project functionality
- Responsive design for mobile and desktop

### Changed
- Rebranded from LiveWire to CodeFlow
- Updated logo and branding
- Enhanced landing page with modern design

### Fixed
- Logo rendering issues
- Navbar layout improvements
- Hero section centering and spacing

## [1.0.0] - 2025-01-XX (Planned)

### Added
- First stable release
- Complete documentation
- Production deployment
- Performance optimizations

### Security
- Security audit completed
- Vulnerability patches applied
- Secure WebSocket connections

---

## How to Update This Changelog

When making changes, add them under the `[Unreleased]` section using these categories:

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

When releasing a new version:
1. Move items from `[Unreleased]` to a new version section
2. Add the release date
3. Update version numbers in package.json
4. Create a Git tag for the release

Example:
```markdown
## [1.1.0] - 2025-02-15

### Added
- New feature X
- New feature Y

### Fixed
- Bug fix A
```

---

[Unreleased]: https://github.com/Harjotraith04/LiveWire/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Harjotraith04/LiveWire/releases/tag/v1.0.0
