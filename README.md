# YouTube Ad Reaction Timer 🚀

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow?style=for-the-badge&logo=google-chrome)](https://developer.chrome.com/docs/extensions/)

Test your reflexes and compete with others to be the fastest YouTube ad skipper! This project combines a Chrome extension with a web application to track and compare reaction times when skipping YouTube ads.

## 🌟 Features

- 📊 Real-time reaction time tracking
- 🏆 Global leaderboard
- 📈 Personal statistics
- 🔐 Google authentication
- 📱 Responsive design
- ⚡ Fast and reliable

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Lucide Icons

- **Backend**
  - Supabase (PostgreSQL)

- **Chrome Extension**
  - Manifest V3
  - Content Scripts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Chrome browser
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/whyismynamerudy/youtube-skip-extension.git
cd youtube-skip-extension
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Configure environment variables
```bash
# In frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start development servers
```bash
# Start frontend
cd frontend
npm run dev

# Build extension
cd ..
npm run package-extension
```

### Installing the Extension

1. Download the extension from [our website](https://ytskip.whyismynamerudy.tech)
2. Extract the downloaded zip file
3. Open Chrome and navigate to `chrome://extensions`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the extracted folder

## 🔒 Security

- Row Level Security (RLS) policies protect user data
- Google OAuth authentication
- Secure API endpoints
- Content Security Policy headers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Supabase](https://supabase.com/) for the amazing backend services
- [Vercel](https://vercel.com/) for hosting
- All our contributors and users!

## 📧 Contact

Your Name - [@wimnr9745](https://x.com/wimnr9745)

Project Link: [https://github.com/whyismynamerudy/youtube-skip-extension](https://github.com/whyismynamerudy/youtube-skip-extension)