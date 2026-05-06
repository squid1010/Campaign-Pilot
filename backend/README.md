# Campaign Pilot Backend

FastAPI backend for Campaign Pilot - AI-powered marketing campaign generation API.

## Setup

### 1. Create virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the server
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Generate Campaign
- **POST** `/api/generate` - Generate marketing campaign ideas
  - Request body: `CampaignInput` (see models below)
  - Response: `MarketingIdea`

## Request/Response Models

### CampaignInput
```json
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

### MarketingIdea
```json
{
  "overview": "string",
  "ideas": ["string"],
  "adCopy": "string",
  "socialPost": "string",
  "emailSubject": "string",
  "emailBody": "string"
}
```

## Development

### Hot Reload
The server runs with `--reload` flag, so changes to `main.py` will automatically reload the server.

### Testing with curl
```bash
curl -X POST "http://localhost:8000/api/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Spark",
    "productDescription": "A social media scheduling tool",
    "targetAudience": "small business owners",
    "brandVoice": "friendly and professional",
    "campaignGoals": "increase sales",
    "successes": "email campaigns with high engagement",
    "failures": "social media posts with low reach",
    "selectedChannels": ["Social media", "Email marketing"]
  }'
```

## Environment Variables

Create a `.env` file if needed (see `.env.example`).

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (Next.js frontend)
- `http://localhost:3001`
- All origins (in development)

Update this in `main.py` for production.
