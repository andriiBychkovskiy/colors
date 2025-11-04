# Kids Colors App - Deployment Guide

## 🚀 Deployment Commands

### Development

```bash
# Install dependencies
npm install

# Run frontend only
npm run dev

# Run JSON server only
npm run dev:server

# Run both frontend and backend together
npm run dev:full
```

### Production Build

```bash
# Build frontend for production
npm run build

# Build both frontend and prepare server
npm run build:full

# Start production server (JSON Server)
npm run start

# Preview production build with server
npm run preview:full
```

## 📁 Build Output

- Frontend build: `dist/` folder
- JSON Server: Uses `db.json` file

## 🌐 Deployment Options

### Option 1: Static Hosting + Separate API

1. **Frontend**: Deploy `dist/` folder to Netlify, Vercel, or GitHub Pages
2. **Backend**: Deploy JSON Server to Railway, Render, or Heroku

### Option 2: Full-Stack Hosting

1. Deploy entire project to platforms like:
   - Railway
   - Render
   - Heroku
   - DigitalOcean App Platform

### Option 3: Docker Deployment

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000 4173
CMD ["npm", "run", "preview:full"]
```

## 🔧 Environment Variables

Create a `.env` file for production:

```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=Kids Colors
```

## 📋 Pre-Deployment Checklist

- [ ] Fix JSON parsing errors in `db.json`
- [ ] Test production build locally
- [ ] Set up environment variables
- [ ] Configure CORS for API
- [ ] Test all features in production mode
- [ ] Optimize images and assets
- [ ] Set up monitoring and error tracking

## 🛠 Troubleshooting

### JSON Server Issues

- Ensure `db.json` is valid JSON
- Check port availability (default: 3000)
- Verify CORS settings for cross-origin requests

### Build Issues

- Run `npm run lint` to check for errors
- Ensure all dependencies are installed
- Check TypeScript compilation errors
