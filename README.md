# FafTech System Dashboard

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

A modern, professional admin dashboard for managing portfolio content, projects, articles, experiences, skills, and achievements. Built with React and TypeScript for optimal performance and developer experience.

## Features

### Core Modules
- **Dashboard** - Real-time analytics and overview
- **Project Repository** - Manage and showcase projects with rich metadata
- **Articles** - Content management system for blog posts and articles
- **Experiences** - Professional work history with images and skills
- **Skills** - Categorized skill management with proficiency tracking
- **Achievements** - Highlight accomplishments and certifications
- **Profile** - Personal information management
- **Contact** - Contact form and information
- **Settings** - Application configuration
- **Logs** - System activity monitoring

### Technical Highlights
- Modern React 19 with TypeScript
- Responsive design with Tailwind CSS
- Real-time data visualization with Recharts
- RESTful API integration
- Authentication and authorization
- Dark theme UI with glassmorphism effects

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend framework |
| TypeScript | Type-safe development |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| Recharts | Data visualization |

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd faftech-admin
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Project Structure

```
faftech-admin/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── ProjectRepository.tsx
│   ├── Articles.tsx
│   ├── Experiences.tsx
│   ├── Skills.tsx
│   └── ...
├── services/           # API services
│   └── api.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── vite.config.ts      # Vite configuration
```

## API Integration

The dashboard connects to a backend API for data management. Configure the API endpoint in `services/api.ts`.

### Authentication
The application uses token-based authentication stored in localStorage.

### Endpoints
- `/projects` - Project management
- `/articles` - Article management
- `/experiences` - Experience management
- `/skills` - Skill management
- `/achievements` - Achievement management
- `/profile` - Profile management
- `/contact` - Contact information

## Development

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain component modularity
- Keep styling consistent with Tailwind utilities

### Adding New Features
1. Create component in `components/` directory
2. Define types in `types.ts`
3. Add API service methods in `services/api.ts`
4. Register route in `App.tsx`

## Building for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist/` directory.

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome. Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository.

---

Built with modern web technologies for optimal performance and user experience.
