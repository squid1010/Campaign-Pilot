// Test script to verify brand profile functionality
const testProfile = {
  id: 'test-profile-1',
  name: 'Test Luxury Brand',
  description: 'A premium fashion brand',
  values: 'Quality, Sustainability, Innovation',
  personality: 'Elegant, Sophisticated, Modern',
  targetAudience: 'Affluent professionals aged 30-50',
  brandColors: '#000000, #FFFFFF, #FFD700',
  story: 'Founded in 2020, we create timeless pieces for the modern wardrobe.',
  tone: 'luxury',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Add test profile to localStorage
localStorage.setItem('brandProfiles', JSON.stringify([testProfile]));

console.log('Test profile added to localStorage');
console.log('Profile:', testProfile);