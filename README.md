# Chinese Name AI Generator

An AI-powered web application that generates meaningful Chinese names for international users using advanced AI technology.

## 🌟 Features

- **AI-Powered Generation**: Uses DeepSeek AI to create personalized Chinese names
- **Phonetic Similarity**: Maintains sound connection with original names
- **Cultural Significance**: Each name carries deep Chinese cultural meaning
- **Personalized Matching**: Considers user personality and traits
- **Modern UI**: Clean, responsive design optimized for user experience
- **Development Tools**: Integrated with Stagewise for enhanced development workflow

## 🚀 Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Integration**: DeepSeek API (via SiliconFlow)
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- DeepSeek API key from [SiliconFlow](https://api.siliconflow.cn/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ertyyy/chinese-name-generator.git
   cd chinese-name-generator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your DeepSeek API key:
   ```
   DEEPSEEK_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Configuration
The application uses the DeepSeek-R1-Distill-Qwen-7B model with the following settings:
- Max tokens: 8192
- Temperature: 0.6
- Thinking mode enabled
- Top-p: 0.7

### Environment Variables
Create a `.env.local` file with:
```env
DEEPSEEK_API_KEY=your_api_key_here
```

## 📱 Usage

1. **Enter Your Name**: Input your English/international name
2. **Describe Yourself** (Optional): Add personality traits or interests
3. **Choose Traits**: Select from predefined personality traits
4. **Generate**: Click to create personalized Chinese names
5. **Review Results**: View generated names with meanings and explanations
6. **Provide Feedback**: Like or dislike names to improve AI performance

## 🏗️ Project Structure

```
├── app/
│   ├── api/generate/     # API route for name generation
│   ├── result/           # Results page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/ui/        # Reusable UI components
├── lib/
│   └── deepseek.ts       # AI integration logic
├── hooks/                # Custom React hooks
└── styles/               # Additional styles
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
1. Build the project: `pnpm build`
2. Set environment variables on your platform
3. Deploy the `.next` output

## 🔒 Security

- API keys are stored in environment variables
- `.env.local` is excluded from git
- No sensitive data is exposed to the client
- Rate limiting recommended for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DeepSeek AI](https://www.deepseek.com/) for AI capabilities
- [SiliconFlow](https://api.siliconflow.cn/) for API access
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for components

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Ertyyy/chinese-name-generator/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

Made with ❤️ for connecting cultures through meaningful names 