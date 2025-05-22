# TimeKill Pricing Strategy

## Overview
This document outlines a strategic pricing plan for TimeKill, focusing on a low-cost $3/month Pro tier that maximizes user adoption while maintaining sustainable revenue.

## Current State Analysis
- **Current Pro Price**: $9.99/month (too high for student market)
- **Core Value**: AI-powered document-to-study-set conversion + humanization
- **Main Costs**: Gemini AI API calls, Sapling AI detection API
- **Target Users**: Students, professionals studying for certifications

## Proposed Pricing Structure

### Free Plan ($0/month)
**Purpose**: Hook users and demonstrate value

**Limits**:
- 5 document limit per conversion
- 5,000 character limit per conversion
- Unlimited pairs per Set
- 20 can create Study Sets per month
- 10 humanizer credits per month

**Why These Limits**:
- 5 conversions = enough to try the product seriously
- 5,000 characters = sufficient for most documents while encouraging upgrade
- 10 humanizer credits = taste of the feature without significant cost

### Pro Plan ($2.99/month)
**Purpose**: Primary revenue driver with broad appeal

**Features**:
- Unlimited documents per conversion
- Unlimited pairs per Set
- Unlimited character limit per conversion
- Unlimited Study Sets per month
- 50 humanizer credits per month

**Why $2.99**:
- Low enough for students on tight budgets
- High perceived value vs. cost
- Easy impulse purchase decision
- Psychological pricing below $3
- 3x+ conversion rate potential vs. $9.99

### Power Plan ($8/month)
**Purpose**: Capture heavy users and power users

**Features**:
- Unlimited documents per conversion
- Unlimited pairs per Set
- Unlimited character limit per conversion
- Unlimited humanizer credits
- Advanced humanizer settings (iterations, similarity thresholds)
- Study analytics and progress tracking
- Priority support
- Early access to new features
- Team sharing features (future)

## Revenue Projections

### Conservative Estimates
- Free users: 10,000 active monthly
- Pro users: 1,000 (10% conversion at $3 = achievable)
- Power users: 100 (1% of free users)

**Monthly Revenue**: (1,000 × $3) + (100 × $8) = $3,800

### Optimistic Estimates
- Free users: 25,000 active monthly
- Pro users: 3,750 (15% conversion at $3)
- Power users: 375 (1.5% of free users)

**Monthly Revenue**: (3,750 × $3) + (375 × $8) = $14,250

## Implementation Strategy

### Phase 1: Migrate Current Users
1. Grandfather existing $9.99 Pro users for 6 months
2. Offer them option to downgrade to $3 plan with slightly reduced limits
3. Most will stay on grandfathered plan or switch to $3

### Phase 2: Adjust Free Limits
1. Reduce free tier limits gradually over 30 days
2. Email communication about "optimization for sustainability"
3. Offer Pro users who downgraded a free month to try new limits

### Phase 3: Introduce Power Tier
1. Launch Power tier 60 days after Pro price change
2. Target heavy Pro users with usage data
3. Position as "unlimited everything" tier

## Cost Management

### API Cost Optimization
- **Gemini API**: ~$0.001 per conversion (estimate)
- **Sapling API**: ~$0.002 per humanizer credit (estimate)
- **Pro user costs**: Max ~$0.30/month per user
- **Gross margin**: ~90% at $3/month

### Rate Limiting Strategy
- Keep current 50 requests/hour to prevent abuse
- Implement monthly usage counters with reset logic
- Add queue system for Pro users during high traffic

## Feature Differentiation

### Study Modes Gating
- **Free**: Flashcards only
- **Pro**: + Quiz mode with multiple choice, fill-in-blank
- **Power**: + Learn mode with spaced repetition algorithms

### Export Features
- **Free**: Basic CSV export only
- **Pro**: + Anki-compatible format
- **Power**: + Notion integration, PDF export with formatting

### Analytics
- **Free**: Basic "cards studied" count
- **Pro**: Weekly progress reports
- **Power**: Detailed analytics dashboard with retention curves

## Competitive Analysis

### Direct Competitors
- **Anki**: Free but complex, $25 iOS app
- **Quizlet**: $4/month for Plus features
- **RemNote**: $6/month for Pro

### Positioning
TimeKill at $3/month sits perfectly between free tools and premium offerings, with AI as the key differentiator.

## Key Success Metrics

### Month 1-3 Goals
- 30% of current Pro users stay/convert
- 5% free-to-Pro conversion rate
- <20% churn rate

### Month 6 Goals
- 15% free-to-Pro conversion rate
- Break-even on current costs
- 2% free-to-Power conversion rate

### Year 1 Goals
- 20% free-to-paid overall conversion
- $10k+ monthly recurring revenue
- Feature parity with major competitors

## Risk Mitigation

### If $3 Proves Too Low
- A/B test $4 and $5 price points
- Add usage-based overages ($1 per 50 extra conversions)
- Introduce annual discount (2 months free)

### If Conversion Rates Are Low
- Temporarily reduce free limits further
- Add more Pro-only features (custom themes, progress sharing)
- Implement referral credits program

## Conclusion

The $3 Pro tier strategy prioritizes user adoption and market penetration over short-term revenue maximization. With strong retention and word-of-mouth growth typical at this price point, TimeKill can build a large user base that supports sustainable long-term revenue growth.

The key is making the upgrade decision a "no-brainer" for anyone who finds value in the free tier, while keeping costs low enough to maintain healthy margins.