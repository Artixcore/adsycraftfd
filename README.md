# Adsycraft Frontend

Production-grade TypeScript frontend for managing Facebook Pages and Instagram Business accounts through the Adsycraft backend API.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Testing**: Playwright (E2E) + Vitest (Unit)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
adsycraftfd/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth routes (login, register)
│   ├── app/               # Protected dashboard routes
│   └── meta/              # OAuth callback handler
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Sidebar, Header)
│   ├── auth/              # Auth components
│   └── features/          # Feature-specific components
├── features/              # Feature modules
│   ├── auth/              # Authentication hooks & schemas
│   ├── connect-meta/      # Meta connection hooks
│   ├── content/           # Content management hooks
│   ├── inbox/             # Inbox hooks
│   ├── ads/              # Ads hooks
│   └── settings/          # Settings hooks
├── lib/                   # Utilities and API client
│   ├── api/              # API client & endpoints
│   ├── auth/             # Auth utilities
│   └── utils/            # Helper functions
├── contexts/              # React contexts (Auth, Workspace, Page)
└── types/                 # TypeScript type definitions
```

## Features

### Authentication
- User registration and login
- JWT token management
- Protected routes

### Meta Connection
- OAuth flow for connecting Facebook/Instagram accounts
- Page listing and connection

### Content Management
- Create post drafts (text, image, video, carousel)
- AI-assisted content generation
- Schedule posts
- Publish immediately
- View publish history

### Inbox Management
- View conversations and messages
- Send replies with tone selection
- Quick action templates
- AI suggestion mode
- Automation settings (manual/suggest/auto)

### Ads Management
- Create campaigns with wizard
- Set budget caps
- View campaign reports with charts
- Performance metrics

### Settings
- Workspace settings (brand voice, language, geo)
- Team member management
- Audit log viewer

## API Integration

The frontend communicates exclusively with the backend API. All API calls go through the typed client in `lib/api/client.ts`.

### Backend Endpoints Used

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/workspaces` - List workspaces
- `POST /api/v1/workspaces/switch` - Switch workspace
- `GET /api/v1/meta/login` - Get Meta OAuth URL
- `GET /api/v1/meta/pages` - List available pages
- `POST /api/v1/meta/pages/:id/connect` - Connect page
- `GET /api/v1/posts` - List drafts
- `POST /api/v1/posts` - Create draft
- `POST /api/v1/posts/:id/schedule` - Schedule post
- `POST /api/v1/posts/:id/publish` - Publish post
- `GET /api/v1/inbox/conversations` - List conversations
- `GET /api/v1/inbox/conversations/:id/messages` - Get messages
- `POST /api/v1/inbox/reply` - Send reply
- `GET /api/v1/ads/campaigns` - List campaigns
- `POST /api/v1/ads/campaigns` - Create campaign
- `GET /api/v1/ads/reports` - Get campaign reports
- `GET /api/v1/audit-logs` - Get audit logs

## Environment Variables

See `.env.local.example` for required environment variables.

## Testing

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### Unit Tests (Vitest)
```bash
npm run test
```

## Development Notes

- The frontend never calls Meta APIs directly - all requests go through the backend
- JWT tokens are stored in localStorage (fallback) - backend should support httpOnly cookies for production
- All API responses are validated with Zod schemas where critical
- Error handling is centralized through the API client interceptors
- Loading states and error boundaries are implemented throughout

## License

ISC
