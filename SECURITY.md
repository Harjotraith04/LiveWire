# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of CodeFlow seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed

### Please DO:

1. **Email us directly** at [your-email@example.com] with:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Any suggested fixes (if applicable)

2. **Allow us time to respond** - We will acknowledge your email within 48 hours and provide a more detailed response within 7 days.

3. **Work with us** - We may ask for additional information or guidance.

## What to Expect

- **Confirmation**: We'll confirm receipt of your vulnerability report
- **Assessment**: We'll assess the vulnerability and determine its severity
- **Fix Development**: We'll work on a fix
- **Disclosure**: Once fixed, we'll disclose the vulnerability details (with your permission to credit you)
- **Recognition**: We'll add you to our security hall of fame (if you wish)

## Security Best Practices

When using CodeFlow:

### For Users
- Use strong, unique room IDs
- Don't share room IDs publicly
- Be cautious about what code you share
- Log out when finished with a session

### For Self-Hosters
- Keep dependencies up to date
- Use HTTPS in production
- Set strong environment variables
- Implement rate limiting
- Use a firewall
- Regular security audits
- Keep Node.js updated

### For Contributors
- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for secrets
- Review code for security vulnerabilities
- Follow secure coding practices
- Validate and sanitize all user inputs
- Use parameterized queries (if applicable)

## Known Security Considerations

### Current Limitations

1. **Room Access**: Anyone with a room ID can join - implement authentication for private rooms
2. **Code Visibility**: All room members can see all code - be careful with sensitive information
3. **Chat Messages**: Not encrypted end-to-end - avoid sharing sensitive data in chat

### Planned Security Enhancements

- [ ] Optional password protection for rooms
- [ ] User authentication and authorization
- [ ] End-to-end encryption for chat
- [ ] Role-based access control
- [ ] Session timeout mechanisms
- [ ] Rate limiting for API endpoints
- [ ] Content Security Policy (CSP) headers

## Security Updates

We will announce security updates through:

- GitHub Security Advisories
- Release notes
- Email notifications (for serious vulnerabilities)

## Third-Party Dependencies

We regularly update our dependencies to include security patches. You can check for known vulnerabilities using:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Compliance

CodeFlow is designed with security in mind but is provided "as is" without warranty. Organizations should:

- Conduct their own security assessments
- Implement additional security measures as needed
- Comply with their own security policies
- Perform regular security audits

## Contact

For security concerns: [your-email@example.com]

For general support: Open an issue on GitHub

---

Thank you for helping keep CodeFlow and its users safe! 🔒
