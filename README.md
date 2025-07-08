# GitHub Repository Explorer

A beautiful, production-ready React application for searching and exploring GitHub repositories with a modern, responsive design.

## Features

- **🔍 Repository Search**: Search GitHub repositories with debounced input
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **📄 Pagination**: Navigate through search results with elegant pagination
- **🔗 Repository Details**: Click on any repository to view detailed information
- **⚡ Loading States**: Smooth loading indicators and error handling
- **🎨 Modern UI**: Clean, Apple-inspired design with subtle animations
- **♿ Accessibility**: Built with accessibility best practices

## Architecture & Technology Stack

### Frontend Framework

- **React 18** with **TypeScript** for type safety and better developer experience
- **Vite** for fast development and optimized builds

### State Management

- **Context API + useReducer** for global state management
- Chosen for its simplicity and built-in React integration, perfect for this application's scale
- Clean separation of concerns with actions and reducers

### Routing

- **React Router v6** for client-side routing
- Seamless navigation between search results and repository details

### Styling

- **Tailwind CSS** for utility-first styling
- Custom color system with primary, secondary, and accent colors
- Responsive design with mobile-first approach
- Smooth transitions and hover effects

### API Integration

- **Native Fetch API** for HTTP requests
- Custom error handling for different API scenarios
- Debounced search to optimize API calls

### Code Organization

- **Modular architecture** with clear separation of concerns
- Components, hooks, services, and types in separate directories
- TypeScript interfaces for type safety

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd github-repository-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Tests
- `npx vitest run --coverage` - coverage

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   ├── RepositoryCard.tsx
│   ├── RepositoryList.tsx
│   └── SearchBar.tsx
├── context/            # React Context for state management
│   └── AppContext.tsx
├── hooks/              # Custom React hooks
│   └── useDebounce.ts
├── pages/              # Page components
│   ├── RepositoryDetailsPage.tsx
│   └── SearchPage.tsx
├── services/           # API integration
│   └── githubApi.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Key Features Explained

### Debounced Search

- Implemented custom `useDebounce` hook to prevent excessive API calls
- 300ms delay ensures smooth user experience while reducing API usage

### Error Handling

- Comprehensive error handling for different API scenarios
- Rate limiting detection with helpful user messages
- Network error handling with retry suggestions

### Responsive Design

- Mobile-first approach with breakpoints at 768px and 1024px
- Flexible grid layouts that adapt to different screen sizes
- Touch-friendly interface for mobile devices

### Performance Optimization

- Lazy loading of repository details
- Efficient state updates with useReducer
- Optimized re-renders with proper React patterns

## API Integration

The application uses the GitHub REST API v3:

- **Search Repositories**: `GET /search/repositories`
- **Repository Details**: `GET /repos/{owner}/{repo}`

### Rate Limiting

The GitHub API has rate limits for unauthenticated requests (60 requests/hour). The application handles this gracefully with informative error messages.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues & Future Improvements

### Current Limitations

- No authentication implementation (uses public API limits)
- Search results limited to 1000 repositories (GitHub API limitation)
- No advanced filtering options

### Potential Improvements

- Add authentication with Personal Access Token
- Implement advanced search filters (language, stars, etc.)
- Add repository comparison features
- Implement infinite scrolling as alternative to pagination
- Add dark mode support
- Cache search results for better performance

### Test report

Test Files 9 passed (9)
Tests 27 passed (27)
Start at 14:06:05
Duration 3.07s (transform 622ms, setup 1.11s, collect 2.72s, tests 1.31s, environment 6.52s, prepare 1.13s)

Coverage report from v8


File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
---------------------------------------------|---------|----------|---------|---------|----------------------
All files | 81.52 | 69.14 | 78.37 | 81.52 |  
 frontend-engineer-assignment | 0 | 0 | 0 | 0 |  
 eslint.config.js | 0 | 0 | 0 | 0 | 1-28  
 postcss.config.js | 0 | 0 | 0 | 0 | 1-6  
 tailwind.config.js | 0 | 0 | 0 | 0 | 1-8  
 vite.config.ts | 0 | 0 | 0 | 0 | 1-15  
 frontend-engineer-assignment/src | 0 | 33.33 | 33.33 | 0 |  
 App.tsx | 0 | 0 | 0 | 0 | 1-22  
 main.tsx | 0 | 0 | 0 | 0 | 1-10  
 vite-env.d.ts | 0 | 0 | 0 | 0 |  
 frontend-engineer-assignment/src/components | 95.98 | 81.39 | 86.66 | 95.98 |  
 ErrorMessage.tsx | 100 | 100 | 100 | 100 |  
 LoadingSpinner.tsx | 100 | 100 | 100 | 100 |  
 Pagination.tsx | 86.95 | 68.75 | 66.66 | 86.95 | 24-31,56,64,88,95  
 RepositoryCard.tsx | 100 | 50 | 100 | 100 | 43  
 RepositoryList.tsx | 100 | 100 | 100 | 100 |  
 SearchBar.tsx | 98.7 | 84.61 | 100 | 98.7 | 38  
 frontend-engineer-assignment/src/context | 76 | 45.45 | 100 | 76 | 22,24-30,32,34,38,40
frontend-engineer-assignment/src/hooks | 100 | 100 | 100 | 100 |  
 useDebounce.tsx | 100 | 100 | 100 | 100 |  
 frontend-engineer-assignment/src/pages | 98.8 | 69.23 | 100 | 98.8 |  
 RepositoryDetailsPage.tsx | 98.61 | 66.66 | 100 | 98.61 | 39,100  
 SearchPage.tsx | 100 | 100 | 100 | 100 |  
 frontend-engineer-assignment/src/services | 60.31 | 71.42 | 100 | 60.31 |  
 githubApi.ts | 60.31 | 71.42 | 100 | 60.31 | 20-36,40-47  
 frontend-engineer-assignment/src/types | 0 | 0 | 0 | 0 |  
 index.ts | 0 | 0 | 0 | 0 |  
 frontend-engineer-assignment/src/utils | 100 | 62.5 | 100 | 100 |  
 format.ts | 100 | 80 | 100 | 100 | 2  
 languageColors.ts | 100 | 33.33 | 100 | 100 | 24  
---------------------------------------------|---------|----------|---------|---------|--
