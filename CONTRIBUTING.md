# Contributing to CodeFlow

First off, thank you for considering contributing to CodeFlow! It's people like you that make CodeFlow such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, code snippets)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, browser, Node version, etc.)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any similar features** in other projects (if applicable)
- **Include mockups or examples** if possible

### 🔨 Pull Requests

#### Getting Started

1. **Fork the repository** and clone your fork
   ```bash
   git clone https://github.com/YOUR-USERNAME/LiveWire.git
   cd LiveWire
   ```

2. **Create a new branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   Branch naming conventions:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation updates
   - `refactor/` - Code refactoring
   - `test/` - Adding or updating tests

3. **Set up your development environment**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

#### Development Workflow

1. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Keep commits focused and atomic

2. **Test your changes**
   ```bash
   # Run tests
   npm run test
   
   # Run linting
   npm run lint
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```
   
   Commit message format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template completely
   - Link any related issues

#### Pull Request Guidelines

- **Keep PRs focused** - One feature/fix per PR
- **Update documentation** - Update README or docs if needed
- **Add tests** - Ensure new features are tested
- **Follow code style** - Match the existing code style
- **Write clear descriptions** - Explain what and why, not just how
- **Respond to feedback** - Be open to suggestions and changes

### 📝 Code Style Guidelines

#### TypeScript/JavaScript

- Use TypeScript for type safety
- Use functional components with hooks (React)
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names
- Use arrow functions for callbacks
- Add JSDoc comments for complex functions

```typescript
/**
 * Calculates the total lines of code in a file
 * @param fileContent - The content of the file
 * @returns The number of lines
 */
const calculateLines = (fileContent: string): number => {
  return fileContent.split('\n').length;
};
```

#### React Components

- Use functional components
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use meaningful component and prop names
- Add prop types/interfaces

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

#### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Use responsive prefixes (`sm:`, `md:`, `lg:`)
- Keep custom CSS minimal
- Use CSS variables for theme values

### 🧪 Testing

- Write tests for new features
- Update tests when modifying existing features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

```typescript
describe('FileManager', () => {
  it('should create a new file', () => {
    const fileManager = new FileManager();
    const file = fileManager.createFile('test.ts');
    expect(file.name).toBe('test.ts');
  });
});
```

### 📚 Documentation

- Update README.md if you add features
- Add JSDoc comments to functions
- Update TypeScript interfaces
- Add inline comments for complex logic
- Create new documentation files if needed

## Project Structure

```
LiveWire/
├── client/           # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│
├── server/           # Backend application
│   ├── src/
│   │   ├── types/       # TypeScript types
│   │   └── server.ts    # Main server
```

## Getting Help

- Check existing [issues](https://github.com/Harjotraith04/LiveWire/issues)
- Join our discussions
- Ask questions in issue comments
- Reach out to maintainers

## Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes
- Project documentation

## Development Tips

### Running in Development Mode

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Building for Production

```bash
# Build frontend
cd client
npm run build

# Build backend
cd server
npm run build
```

### Common Issues

**Port already in use**
```bash
# Find and kill process on port 3000
npx kill-port 3000
```

**Dependencies issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Questions?

Feel free to open an issue with the `question` label if you have any questions!

---

Thank you for contributing to CodeFlow! 🚀
