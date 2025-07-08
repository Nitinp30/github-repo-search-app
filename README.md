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
- Add unit and integration tests

## License

This project is licensed under the MIT License.
