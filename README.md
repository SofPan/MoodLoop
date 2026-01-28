# MoodLoop 🌿

A personal mood and wellness tracking application built with Next.js, TypeScript, and PostgreSQL. Track your daily mood, sleep patterns, weather, and activities to discover what influences your mental wellbeing.

## Features

- **Daily Mood Tracking**: Log your mood on a 5-point emoji scale
- **Wellness Metrics**: Track sleep hours, weather conditions, and daily activities
- **Data Visualization**: Interactive charts showing mood trends over time
- **Insights Dashboard**: View statistics like average mood and entry counts
- **Expandable Entry Cards**: Click to view full details of past entries
- **Edit & Delete**: Modify or remove entries as needed
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Charts**: Recharts
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/moodloop.git
cd moodloop
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```env
DATABASE_URL="your-supabase-connection-string"
```

4. Set up the database
```bash
npx prisma migrate dev
npx prisma generate
```

5. Create a demo user (for single-user MVP)
```bash
npx prisma studio
```
Add a user with email and name, then copy the generated UUID to use in your API routes.

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure
```
moodloop/
├── app/
│   ├── api/
│   │   └── entries/          # API routes for CRUD operations
│   ├── components/           # React components
│   ├── contexts/             # React Context (EntriesContext)
│   ├── interfaces/           # TypeScript interfaces
│   ├── utils/                # Utility functions (date helpers)
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts            # Prisma client singleton
├── prisma/
│   └── schema.prisma        # Database schema
└── public/
```

## Key Components

- **EntryForm**: Collapsible drawer for creating/editing entries
- **MoodChart**: Line chart visualization of mood trends
- **EntryList**: Grid display of all entries with month grouping
- **EntryCard**: Individual entry cards with expand/collapse
- **EntriesContext**: Global state management for entries data

## Database Schema

The app uses two main models:

- **User**: Basic user information
- **Entry**: Daily mood entries with mood rating (1-5), sleep hours, weather, activities array, and timestamps

## Features in Detail

### Mood Tracking
5-level emoji scale representing moods from "Awful" to "Great". Quick visual feedback makes daily logging easy.

### Data Visualization
Interactive line chart showing mood trends over customizable time periods (7, 14, 30 days, or custom range). Includes statistics like average mood and total entries.

### Activity Tags
Free-text tagging system supports comma-separated input. Track patterns between activities and mood states.

### Responsive Drawer Form
Slide-out form doesn't disrupt the main view. Pre-populates when editing existing entries.

## Development Journey

Built as a portfolio project over 3-4 weeks, following an MVP approach:
- Week 1: Project setup, entry form, database integration
- Week 2: Entry list, view/expand functionality, context setup
- Week 3: Edit/delete features, data visualization, date handling refactor
- Week 4: Polish, mobile responsiveness, deployment prep

## Future Enhancements

- [ ] Multi-user authentication (NextAuth.js)
- [ ] Additional chart types (activity correlations, sleep patterns)
- [ ] PWA features

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue.

## License

MIT License - feel free to use this code for your own projects.

## Acknowledgments

Built with guidance from Claude (Anthropic) using a plain-english-first approach to maximize learning and ownership of the codebase.

---

**Note**: This is currently a single-user MVP. Multi-user authentication will be added in a future version.