"""
Simple test script to validate the backend API
Run: python test_api.py
"""

import json
from main import generate_marketing_result

def test_campaign_generation():
    """Test the campaign generation logic."""
    
    result = generate_marketing_result(
        productName="Spark Social Scheduler",
        productDescription="A social media scheduling tool that helps small businesses manage their online presence",
        targetAudience="small business owners, social media managers",
        brandVoice="friendly and professional",
        campaignGoals="increase brand awareness and boost sales",
        successes="high engagement on LinkedIn posts",
        failures="low conversion on Twitter ads",
        channels=["Social media", "Email marketing"],
    )
    
    print("Campaign Generation Test")
    print("=" * 50)
    print(json.dumps({
        "overview": result.overview,
        "ideas": result.ideas,
        "adCopy": result.adCopy,
        "socialPost": result.socialPost,
        "emailSubject": result.emailSubject,
        "emailBody": result.emailBody,
    }, indent=2))
    print("\n✓ Test passed!")

if __name__ == "__main__":
    test_campaign_generation()
