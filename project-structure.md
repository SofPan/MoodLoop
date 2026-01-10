mood-tracker/
├── app/
│   ├── api/
│   │   └── entries/
│   │       ├── route.ts          # GET all, POST new
│   │       └── [id]/
│   │           └── route.ts      # GET one, PUT, DELETE
│   ├── page.tsx                  # Main dashboard
│   └── layout.tsx
├── components/
│   ├── EntryForm.tsx            # Form to add/edit entries
│   ├── MoodSelector.tsx         # Emoji mood picker
│   ├── EntryList.tsx            # List/calendar view
│   └── Chart.tsx                # Visualization (Week 3)
├── lib/
│   └── prisma.ts                # Prisma client singleton
├── prisma/
│   └── schema.prisma
└── .env