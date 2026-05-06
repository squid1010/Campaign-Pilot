from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import re

app = FastAPI(
    title="Campaign Pilot API",
    description="AI-powered marketing campaign generation API",
    version="1.0.0"
)

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class CampaignInput(BaseModel):
    productName: str
    productDescription: str
    targetAudience: str
    brandVoice: str
    campaignGoals: str
    successes: str
    failures: str
    selectedChannels: list[str]

class MarketingIdea(BaseModel):
    overview: str
    ideas: list[str]
    adCopy: str
    socialPost: str
    emailSubject: str
    emailBody: str

class CampaignResponse(BaseModel):
    id: str
    timestamp: str
    inputs: CampaignInput
    result: MarketingIdea

# Helper functions
def normalize_tone(voice: str) -> str:
    normalized = voice.lower()
    if re.search(r'friendly|warm|approachable|playful', normalized):
        return 'friendly and approachable'
    elif re.search(r'professional|confident|bold|authoritative', normalized):
        return 'professional and confident'
    elif re.search(r'luxury|premium|elegant|sophisticated', normalized):
        return 'luxurious and refined'
    elif re.search(r'fun|energetic|bold|vibrant', normalized):
        return 'energetic and bold'
    return 'clear and compelling'

def choose_goal_focus(goals: str) -> str:
    lower = goals.lower()
    if re.search(r'awareness|brand|reach|visibility', lower):
        return 'increase brand awareness and audience reach'
    elif re.search(r'sales|conversion|revenue|growth', lower):
        return 'drive conversions and boost sales'
    elif re.search(r'engagement|traffic|interaction', lower):
        return 'improve engagement and customer interaction'
    return 'support your campaign goals with measurable results'

def build_performance_insight(successes: str, failures: str) -> str:
    wins = successes.strip() or 'strong creative performance and positive customer feedback'
    losses = failures.strip() or 'campaigns that underperformed because of weak calls to action or unclear audience fit'
    return f"We analyzed your past marketing performance, noting {wins} while avoiding {losses}. This helps shape a campaign that leans into what worked and sidesteps prior mistakes."

def generate_marketing_result(
    productName: str,
    productDescription: str,
    targetAudience: str,
    brandVoice: str,
    campaignGoals: str,
    successes: str,
    failures: str,
    channels: list[str],
) -> MarketingIdea:
    productLabel = productName.strip() or 'your product'
    audienceLabel = targetAudience.strip() or 'your ideal customer'
    tone = normalize_tone(brandVoice)
    goalFocus = choose_goal_focus(campaignGoals)
    insight = build_performance_insight(successes, failures)
    selectedChannels = ', '.join(channels) if channels else 'social media and email marketing'

    ideas = [
        f"Create a {tone} campaign that positions {productLabel} as the solution for {audienceLabel}.",
        f"Use past success signals to highlight benefits, while testing a more direct call to action in {selectedChannels}.",
        "Build a short-form social sequence that turns key product features into snackable content for modern buyers.",
    ]

    adCopy = f"Discover {productLabel}, designed for {audienceLabel}. {productDescription.strip() or 'A compelling product that stands out in a crowded market.'} With a {tone} brand voice, this campaign aims to {goalFocus}."
    socialPost = f"Ready for better results? {productLabel} helps {audienceLabel} achieve more by focusing on what matters most. {campaignGoals.strip() or 'Get started today with smarter campaigns.'}"
    emailSubject = f"How {productLabel} helps {audienceLabel} achieve more"
    emailBody = f"""Hi there,

We analyzed your past campaign performance and built a plan that leans into what worked while avoiding previous pitfalls. {insight}

Our recommendation is to promote {productLabel} across {selectedChannels}, using a {tone} tone and messaging that speaks directly to {audienceLabel}. The campaign should focus on {goalFocus}.

Best,
The Campaign Pilot team"""

    return MarketingIdea(
        overview=f"Based on your input for {productLabel}, this campaign strategy combines product storytelling, audience targeting, and performance learnings to deliver a stronger marketing push.",
        ideas=ideas,
        adCopy=adCopy,
        socialPost=socialPost,
        emailSubject=emailSubject,
        emailBody=emailBody,
    )

# Routes
@app.get("/")
async def root():
    return {
        "message": "Campaign Pilot API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.post("/api/generate", response_model=MarketingIdea)
async def generate_campaign(input_data: CampaignInput) -> MarketingIdea:
    """Generate marketing campaign ideas based on input parameters."""
    result = generate_marketing_result(
        productName=input_data.productName,
        productDescription=input_data.productDescription,
        targetAudience=input_data.targetAudience,
        brandVoice=input_data.brandVoice,
        campaignGoals=input_data.campaignGoals,
        successes=input_data.successes,
        failures=input_data.failures,
        channels=input_data.selectedChannels,
    )
    return result

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "Campaign Pilot API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
