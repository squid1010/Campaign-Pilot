# FastAPI Backend - Complete Setup Guide

## 📋 Summary

A complete FastAPI backend has been added to Campaign Pilot. The backend implements the same campaign generation logic as the frontend and provides REST API endpoints for generating marketing campaigns.

## 📁 New Files Created

### Backend Application
- `backend/main.py` - FastAPI application with all API endpoints
- `backend/config.py` - Configuration management using Pydantic
- `backend/requirements.txt` - Python dependencies
- `backend/.env.example` - Example environment variables
- `backend/.gitignore` - Git ignore patterns for Python

### Documentation & Setup
- `backend/README.md` - Backend-specific documentation
- `backend/setup.sh` - Automated setup script for Linux/macOS
- `backend/setup.bat` - Automated setup script for Windows
- `backend/test_api.py` - Test script to validate the backend
- `INTEGRATION_GUIDE.md` - Frontend-backend integration instructions

### Docker & Deployment
- `Dockerfile.frontend` - Docker image for Next.js frontend
- `docker-compose.yml` - Docker Compose configuration for both services
- `backend/Dockerfile` - Docker image for FastAPI backend

### Documentation
- `BACKEND_README.md` - Complete project documentation

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)
```bash
docker-compose up
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend
```bash
cd backend

# Linux/macOS
bash setup.sh

# Windows
setup.bat

# Or manually:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend
```bash
npm install
npm run dev
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Generate Campaign
```
POST /api/generate
Content-Type: application/json

{
  "productName": "string",
  "productDescription": "string",
  "targetAudience": "string",
  "brandVoice": "string",
  "campaignGoals": "string",
  "successes": "string",
  "failures": "string",
  "selectedChannels": ["string"]
}
```

### Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔧 Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Python 3.9+**

### Frontend
- **Next.js 16.2.4**
- **React 19.2.4**
- **Tailwind CSS 4**
- **TypeScript**

## 📝 Environment Variables

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

## ✅ Testing

### Test Backend
```bash
cd backend
source venv/bin/activate
python test_api.py
```

### Test with curl
```bash
curl -X POST "http://localhost:8000/api/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Spark",
    "productDescription": "A scheduling tool",
    "targetAudience": "small business owners",
    "brandVoice": "friendly",
    "campaignGoals": "increase sales",
    "successes": "good engagement",
    "failures": "low conversion",
    "selectedChannels": ["Social media", "Email marketing"]
  }'
```

## 📚 Documentation Files

- `README.md` - Project overview
- `backend/README.md` - Backend documentation
- `BACKEND_README.md` - Complete project setup guide
- `INTEGRATION_GUIDE.md` - Frontend-backend integration steps

## 🔄 Next Steps

1. **Choose deployment method**: Docker Compose or manual setup
2. **Start both services**: Backend on port 8000, Frontend on port 3000
3. **Test the API**: Visit http://localhost:8000/docs
4. **Integrate frontend** (optional): Follow INTEGRATION_GUIDE.md to use backend API in frontend
5. **Deploy**: Use Docker Compose or container orchestration for production

## 🐛 Troubleshooting

### Backend won't start
- Check Python 3.9+ is installed: `python --version`
- Verify all dependencies installed: `pip install -r requirements.txt`
- Check port 8000 is available

### CORS errors
- Ensure frontend URL is in `allow_origins` in `backend/main.py`
- Check `NEXT_PUBLIC_API_URL` environment variable

### API calls failing
- Verify backend is running: http://localhost:8000/api/health
- Check browser console for error messages
- Verify request format matches API schema

## 📧 Support

For issues or questions:
1. Check the backend logs
2. Review API documentation at http://localhost:8000/docs
3. Check INTEGRATION_GUIDE.md for integration issues

---

Backend setup complete! 🎉
