# TimeKill - Modern Study Platform

TimeKill is a production-ready full-stack application that transforms your notes into interactive study materials. It uses advanced AI to extract term-definition pairs from your raw notes and provides multiple study modes to help you learn and retain information effectively.

## Features

- **Notes Parsing**: Paste raw notes and get organized flashcards and quiz questions
- **Multiple Study Modes**:
  - **Flashcards**: Classic flashcards with spaced repetition
  - **Quiz Mode**: Multiple choice, fill-in-the-blank, and true/false questions
  - **Learn Mode**: Adaptive learning focused on what you need to review
- **AI-powered Humanizer**: Transform AI-generated text to sound more natural
- **User Authentication**: Secure sign-up and login with [Clerk](https://clerk.com)
- **Subscription Management**: Premium features with [Stripe](https://stripe.com)
- **Persistence & Caching**: PostgreSQL database with Redis caching

## Tech Stack

- **Framework**: [Next.js v15](https://nextjs.org) (App Router)
- **Database**: [PostgreSQL](https://postgresql.org) with [Prisma ORM](https://prisma.io)
- **Authentication**: [Clerk](https://clerk.com)
- **Payments**: [Stripe](https://stripe.com)
- **Cache/Rate Limiting**: [Upstash Redis](https://upstash.com)
- **AI/LLM**: [Google Gemini API](https://ai.google.dev/gemini-api)
- **AI Detection**: [Sapling Detector API](https://sapling.ai)
- **UI**: [TailwindCSS](https://tailwindcss.com)
- **Testing**: [Vitest](https://vitest.dev)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Clerk, Stripe, Upstash Redis, Google Gemini, and Sapling API keys

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/timekill.git
cd timekill
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file with the required environment variables as specified in `.env.example`. You will need API keys for Clerk, Stripe, Gemini, Sapling, and Upstash Redis.

4. Set up the database:

```bash
# Push the Prisma schema to your database
npx prisma db push

# Generate Prisma client
npx prisma generate

# (Optional) Seed the database with sample data
npx prisma db seed
```

5. Start the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
# Run all tests with coverage
node run_tests.mjs

# Run in CI mode (lower coverage threshold)
node run_tests.mjs --ci-mode
```

For more detailed testing information, see [README_TESTS.md](./README_TESTS.md).

## Project Structure

The project follows a monorepo structure:

```
/
├── apps/
│   └── web/ - Frontend application
├── packages/
│   ├── core/ - Shared utilities and business logic
│   │   ├── lib/ - Core utilities
│   │   └── types/ - TypeScript types
│   └── api/ - Shared API utilities
├── prisma/ - Database schema and migrations
├── public/ - Static assets
├── src/ - Application source code
│   ├── app/ - Next.js App Router pages
│   │   ├── api/ - API routes
│   │   └── ...page directories
│   └── components/ - React components
├── tests/ - Test files
│   ├── unit/ - Unit tests
│   ├── integration/ - Integration tests
│   └── helpers/ - Test utilities and mocks
└── ... configuration files
```

## Deployment

### Vercel Deployment

The easiest way to deploy TimeKill is with Vercel:

1. Create a new project in Vercel and connect it to your GitHub repository
2. Configure environment variables in the Vercel dashboard
3. Deploy with the following settings:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

### Environment Variables

Set the following environment variables in your Vercel project settings or `.env.local` file:

```
# Database
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SIGNING_SECRET=

# Stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# API Keys for LLM services
GEMINI_API_KEY=

# AI Checkers
NEXT_PUBLIC_SAPLING_API_KEY=
PRIVATE_SAPLING_JKEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## API Documentation

The API routes follow RESTful principles. Main endpoints include:

- `POST /api/parse-notes`: Extract term-definition pairs from raw notes
- `POST /api/humanize`: Transform AI-generated text to sound more natural
- `POST /api/stripe/checkout`: Create a Stripe checkout session
- `POST /api/stripe/portal`: Access Stripe billing portal
- `POST /api/stripe/webhook`: Handle Stripe webhook events
- `POST /api/study-stats/:pairId`: Update study statistics for a pair

For a complete OpenAPI specification, see [openapi.yaml](./openapi.yaml).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes all tests and linting rules.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://prisma.io) - ORM
- [Clerk](https://clerk.com) - Authentication
- [Stripe](https://stripe.com) - Payments
- [Upstash Redis](https://upstash.com) - Redis
- [Google Gemini API](https://ai.google.dev/gemini-api) - AI/LLM
- [Sapling Detector API](https://sapling.ai) - AI detection