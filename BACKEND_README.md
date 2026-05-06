# Campaign Pilot

Campaign Pilot helps you generate creative, effective marketing campaigns in minutes. Whether you're a small business owner or a marketing professional, our AI-powered tool makes it easier to brainstorm ideas, draft content, and build strategies that work.

## Project Structure

```
ai-marketing-app/
├── src/                    # Next.js frontend
│   └── app/
│       ├── page.tsx        # Homepage
│       ├── generate/       # Campaign generator page
│       ├── history/        # Campaign history page
│       └── layout.tsx      # Root layout
├── backend/                # FastAPI backend
│   ├── main.py            # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend documentation
├── docker-compose.yml      # Docker compose configuration
└── package.json            # Node.js dependencies
```

## Quick Start

### Option 1: Run with Docker Compose (Recommended)

```bash
docker-compose up
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Run Separately

#### Frontend (Next.js)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

#### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) for API documentation

## Features

- **Campaign Generator**: Input product details, audience, and goals to generate tailored marketing campaign ideas
- **Content Drafts**: Get ready-to-use ad copy, social media posts, and email templates
- **Campaign History**: View and review all past generated campaigns
- **Smart Analysis**: Learn from past campaign successes and failures to improve future strategies

## Frontend Pages

- `/` - Homepage with app introduction
- `/generate` - Campaign generator form
- `/history` - View past campaign generations

## Backend API Endpoints

- `GET /` - API status
- `GET /api/health` - Health check
- `POST /api/generate` - Generate campaign ideas
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation (ReDoc)

## Tech Stack

### Frontend
- **Next.js 16.2.4** - React framework
- **React 19.2.4** - UI library
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type safety

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Development

### Frontend Development
- Modify files in `src/app/` - hot reload enabled
- Run `npm run build` to create production build
- Run `npm run lint` to check code quality

### Backend Development
- Modify `backend/main.py` - auto-reload enabled with `--reload` flag
- Check API docs at http://localhost:8000/docs
- Test endpoints using Swagger UI or curl

## Building for Production

### Build Frontend
```bash
npm run build
npm start
```

### Build Backend Docker Image
```bash
cd backend
docker build -t campaign-pilot-api .
docker run -p 8000:8000 campaign-pilot-api
```

### Using Docker Compose
```bash
docker-compose up --build
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
FASTAPI_ENV=development
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:3000
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is private.
