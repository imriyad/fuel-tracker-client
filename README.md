# Fuel Tracker Client

A production-ready React frontend for tracking fuel consumption and vehicle management, built with Vite, TypeScript, React Router, and TanStack Query.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **State Management**: TanStack Query for server state
- **Routing**: React Router v7
- **HTTP Client**: Axios with interceptors and error handling
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: ErrorBoundary component for graceful error recovery
- **Clean Architecture**: Organized folder structure with separation of concerns
- **Environment Configuration**: Environment variables for different environments
- **Responsive Design**: Tailwind CSS-ready structure

## 📁 Project Structure

```
fuel-tracker-client/
├── src/
│   ├── api/              # API configuration and endpoints
│   │   ├── axios.ts      # Axios instance with interceptors
│   │   └── endpoints.ts  # API endpoint definitions
│   ├── components/       # Reusable components
│   │   ├── Layout.tsx    # Main layout with navigation
│   │   └── ErrorBoundary.tsx  # Error boundary component
│   ├── context/          # React context providers
│   │   └── Router.tsx    # Router configuration
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.ts    # Authentication hooks
│   │   ├── useVehicles.ts    # Vehicle data hooks
│   │   └── useFuelEntries.ts # Fuel entry data hooks
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx
│   │   ├── FuelEntries.tsx
│   │   ├── Vehicles.tsx
│   │   ├── Statistics.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── NotFound.tsx
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # All type definitions
│   ├── utils/            # Utility functions
│   │   └── format.ts     # Formatting helpers
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── .env                  # Environment variables (gitignored)
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env` and configure your API settings:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your API configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_TITLE=Fuel Tracker
   VITE_API_TIMEOUT=30000
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔌 API Integration

The application is configured to work with a REST API. The base URL is configured via the `VITE_API_BASE_URL` environment variable.

### Available API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

#### Vehicles
- `GET /vehicles` - Get all vehicles
- `GET /vehicles/:id` - Get vehicle by ID
- `POST /vehicles` - Create new vehicle
- `PUT /vehicles/:id` - Update vehicle
- `DELETE /vehicles/:id` - Delete vehicle

#### Fuel Entries
- `GET /fuel-entries` - Get all fuel entries
- `GET /fuel-entries/:id` - Get fuel entry by ID
- `POST /fuel-entries` - Create new fuel entry
- `PUT /fuel-entries/:id` - Update fuel entry
- `DELETE /fuel-entries/:id` - Delete fuel entry

#### Statistics
- `GET /statistics/overview` - Get overview statistics
- `GET /statistics/fuel-efficiency` - Get fuel efficiency data
- `GET /statistics/cost-analysis` - Get cost analysis data

## 🎨 Customization

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/context/Router.tsx`
3. Update the navigation in `src/components/Layout.tsx` (if needed)

### Adding New API Endpoints

1. Define the endpoint in `src/api/endpoints.ts`
2. Create custom hooks in `src/hooks/` for data fetching
3. Use the hooks in your components

### Styling

The project uses Tailwind CSS classes for styling. To customize the design:
- Modify existing component classes
- Add custom styles in `src/styles/`
- Configure Tailwind in `tailwind.config.js` (if installed)

## 🔒 Environment Variables

- `VITE_API_BASE_URL` - Base URL for API calls
- `VITE_APP_TITLE` - Application title
- `VITE_API_TIMEOUT` - API request timeout in milliseconds

## 🧪 Type Definitions

All TypeScript types are defined in `src/types/index.ts`:
- User types (User, LoginCredentials, RegisterData)
- Vehicle types (Vehicle, CreateVehicleData, UpdateVehicleData)
- Fuel entry types (FuelEntry, CreateFuelEntryData, UpdateFuelEntryData)
- Statistics types (OverviewStats, FuelEfficiencyData, CostAnalysisData)
- Pagination types (PaginationParams, PaginatedResponse)
- API response types (ApiResponse, ApiError)

## 🐛 Error Handling

The application includes comprehensive error handling:
- **Axios Interceptors**: Automatic handling of HTTP errors (401, 403, 404, 500)
- **Error Boundary**: Catches React component errors and displays a friendly UI
- **TanStack Query**: Automatic retry logic and error states

## 📦 Dependencies

### Core Dependencies
- `react` - React library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing library
- `@tanstack/react-query` - Server state management
- `@tanstack/react-query-devtools` - React Query dev tools
- `axios` - HTTP client

### Development Dependencies
- `typescript` - TypeScript compiler
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Linting utility
- `@typescript-eslint/*` - TypeScript ESLint plugins

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.