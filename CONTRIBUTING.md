# 🤝 Contributing to Caretaker Harp King PWA

Thank you for your interest in contributing to the **Caretaker Harp King Progressive Web App**! This project is open for non-commercial contributions under the CC-BY-NC-4.0 license.

## 🎵 About the Project

This PWA was created for **Susmith Louise** and the unique **Caretaker Harp King** music style - a one-man performance combining harmonica, guitar, vocals, shakers, cymbals, ghungroo, and percussive elements, all performed live without tech backings or loopers.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/susmithlouise/caretaker-harp-king.git
cd caretaker-harp-king

# Install dependencies
yarn install

# Setup data and themes (requires Algolia credentials)
yarn setup

# Start development server
yarn dev --port 8080
```

### Environment Setup
Create `.env.local` with your Algolia credentials:
```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
ALGOLIA_ADMIN_KEY=your_admin_key
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
```

## 🎯 How to Contribute

### 🐛 Bug Reports
- Use GitHub Issues to report bugs
- Include steps to reproduce
- Provide browser/device information
- Include screenshots if applicable

### ✨ Feature Requests
- Check existing issues first
- Describe the feature and its benefits
- Consider how it fits with the live music performance use case
- Respect the non-commercial nature of the project

### 🔧 Code Contributions

#### Areas for Contribution
1. **Performance Optimizations**
   - Bundle size reduction
   - Loading speed improvements
   - Memory usage optimization

2. **Accessibility Improvements**
   - Screen reader support
   - Keyboard navigation
   - Color contrast enhancements

3. **Mobile Experience**
   - Touch interactions
   - Responsive design improvements
   - PWA enhancements

4. **Admin Features**
   - Drag & drop request reordering
   - Advanced poll creation
   - Analytics enhancements

5. **Bonus Features**
   - Gamification elements
   - Dedication board view
   - Avatar system integration

#### Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code
   - Follow existing naming conventions
   - Use Prettier for formatting
   - Write meaningful commit messages

2. **Component Structure**
   - Keep components focused and reusable
   - Use proper TypeScript types
   - Follow the existing folder structure
   - Include proper error handling

3. **Testing**
   - Test on multiple browsers
   - Verify mobile responsiveness
   - Check PWA functionality
   - Ensure accessibility standards

4. **Performance**
   - Optimize bundle size
   - Use lazy loading where appropriate
   - Minimize re-renders
   - Follow Next.js best practices

### 🎨 Design Guidelines

#### Spotify-Style Interface
- Maintain dark theme consistency
- Use green (#1DB954) for primary actions
- Keep the professional table layout
- Preserve hover interactions

#### Theme System
- Respect the existing theme structure
- Ensure new themes work with both light/dark modes
- Test color accessibility
- Maintain the Wakanda Forever tribute theme

## 📝 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the guidelines above
4. **Test thoroughly** across different devices and browsers
5. **Commit with descriptive messages**
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Create a Pull Request** with:
   - Clear description of changes
   - Screenshots/videos if UI changes
   - Testing notes
   - Reference to related issues

## 🎵 Music Content Guidelines

### Song Data
- The song list represents Susmith Louise's repertoire
- New songs should be added through proper channels
- Respect copyright and licensing of musical content
- Maintain the existing categorization system

### Performance Features
- Consider the live performance context
- Features should enhance audience engagement
- Admin features should be performer-friendly
- Maintain the real-time nature of live music

## 🌟 Recognition

### Contributors
- All contributors will be recognized in the README
- Significant contributions may be highlighted
- Community contributions help grow the project

### Attribution
- Maintain attribution to Susmith Louise
- Credit the Caretaker Harp King brand
- Respect the non-commercial license terms

## 📞 Contact

### Project Creator
- **Artist**: Susmith Louise
- **Instagram**: @Susmith Louise
- **Support**: PhonePe/GPay +91 9562180666

### Community
- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for general questions
- **Social**: Follow @Susmith Louise for updates

## 🎭 Special Notes

### Black Panther Tribute
The "Wakanda Forever" theme is a tribute to the Black Panther movie and its cultural impact. Contributions that enhance this theme or add similar cultural tributes are welcome.

### Live Music Focus
Remember that this app is designed for **live music performances**. All features should enhance the connection between performer and audience in real-time settings.

---

**Thank you for contributing to the Caretaker Harp King community!**

**Wakanda Forever!** 🖤💜 **Long Live the King!** 👑🎵