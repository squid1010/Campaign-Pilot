# Frontend-Backend Integration Guide

This guide explains how to integrate the Next.js frontend with the FastAPI backend.

## Setup

### 1. Start Backend Server
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### 2. Start Frontend Server
```bash
npm run dev
```

## Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This environment variable is used by the frontend to determine where to send API requests.

## API Integration

### Current Implementation (Local)
The frontend currently generates campaigns locally using JavaScript logic in:
- `src/app/generate/page.tsx` - Main generator page
- `src/app/page.tsx` - Contains helper functions

### Backend Implementation
The backend implements the same campaign generation logic in:
- `backend/main.py` - FastAPI endpoints

## Switching to Backend API

To use the backend API instead of local generation, update the frontend:

### 1. Update `src/app/generate/page.tsx`
Replace the local `handleSubmit` function to make an API call:

```typescript
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName,
        productDescription,
        targetAudience,
        brandVoice,
        campaignGoals,
        successes,
        failures,
        selectedChannels,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate campaign');
    }

    const generated = await response.json();
    setResult(generated);

    // Save to history
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      inputs: {
        productName,
        productDescription,
        targetAudience,
        brandVoice,
        campaignGoals,
        successes,
        failures,
        selectedChannels,
      },
      result: generated,
    };
    const existing = localStorage.getItem('marketingHistory');
    const history = existing ? JSON.parse(existing) : [];
    history.push(entry);
    localStorage.setItem('marketingHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error generating campaign:', error);
    // Handle error - show toast or error message
  }
};
```

### 2. Remove Local Helper Functions
Once you switch to the API, you can remove these functions from the frontend since they're now handled by the backend:
- `normalizeTone`
- `chooseGoalFocus`
- `buildPerformanceInsight`
- `generateMarketingResult`

## API Endpoint Reference

### Generate Campaign
**Endpoint:** `POST /api/generate`

**Request Body:**
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

**Response:**
```json
{
  "overview": "string",
  "ideas": ["string", "string", "string"],
  "adCopy": "string",
  "socialPost": "string",
  "emailSubject": "string",
  "emailBody": "string"
}
```

### Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "service": "Campaign Pilot API"
}
```

## Error Handling

Add error handling to the frontend for failed API calls:

```typescript
try {
  const response = await fetch(`${apiUrl}/api/generate`, { ... });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate campaign');
  }
  
  const data = await response.json();
  setResult(data);
} catch (error) {
  console.error('Error:', error);
  // Show error message to user
  setError(error.message);
}
```

## CORS Configuration

The backend is configured to accept requests from the frontend. If you get CORS errors, check:

1. The `allow_origins` list in `backend/main.py`
2. The frontend URL matches one of the allowed origins
3. Make sure the API URL in the environment variable is correct

## Testing

### Test Backend API
```bash
curl -X POST "http://localhost:8000/api/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product",
    "productDescription": "A test product",
    "targetAudience": "test users",
    "brandVoice": "friendly",
    "campaignGoals": "increase sales",
    "successes": "positive feedback",
    "failures": "low engagement",
    "selectedChannels": ["Social media", "Email marketing"]
  }'
```

### Check Frontend Connection
Open browser console and verify `NEXT_PUBLIC_API_URL` is set correctly:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

## Production Deployment

For production:

1. Update `NEXT_PUBLIC_API_URL` to point to your production backend
2. Update CORS `allow_origins` in backend to match your frontend domain
3. Consider using environment variables for configuration
4. Use HTTPS for API calls
5. Implement authentication if needed

## Next Steps

1. Follow this guide to integrate the backend
2. Update environment variables
3. Test API calls from the frontend
4. Deploy both services to production
