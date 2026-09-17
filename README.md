# Which Workplace Personality Are You?

A 10-question personality quiz (Navigator / Firefighter / Connector / Detective /
Maverick / Chameleon) built with Next.js. Every completed quiz is saved to a
Postgres database, and `/stats` shows the live distribution of results across
everyone who has taken it \u2014 handy for revealing on screen at a live event.

## What's inside

- `app/page.tsx` \u2014 the quiz itself (landing \u2192 10 questions \u2192 result reveal)
- `app/stats/page.tsx` \u2014 aggregate results page (`/stats`)
- `app/api/results/route.ts` \u2014 saves a completed quiz to the database
- `app/api/stats/route.ts` \u2014 JSON endpoint for aggregate counts
- `lib/questions.ts`, `lib/personalities.ts` \u2014 all quiz content, edit freely
- `lib/db.ts` \u2014 database access via `@vercel/postgres`

No personal data is required to take the quiz \u2014 the name field is optional and
only used to label that person's own result on screen.

## 1. Run it locally

```bash
npm install
npm run dev
```

The app will try to reach a Postgres database as soon as you submit a result
(saving happens quietly in the background, so the quiz still works without a
database \u2014 you just won't see anything on `/stats`). To connect a real
database locally, see step 2, then either:

- run `vercel link` and `vercel env pull .env.local` once the project is
  connected to Vercel (this pulls in `POSTGRES_URL` automatically), or
- copy `.env.example` to `.env.local` and paste in a connection string
  yourself.

## 2. Add a database (once, in Vercel)

1. Push this project to a GitHub repo and import it in
   [vercel.com/new](https://vercel.com/new).
2. In your new Vercel project, go to the **Storage** tab \u2192 **Create
   Database** \u2192 choose **Postgres** (this provisions a Neon-backed
   Postgres database and is on Vercel's free tier for small projects).
3. Click **Connect** to your project. Vercel automatically adds the
   `POSTGRES_URL` (and related) environment variables \u2014 you don't need to
   copy/paste anything.
4. Redeploy (Vercel will usually do this for you automatically after
   connecting storage).

The `quiz_results` table is created automatically the first time someone
completes the quiz \u2014 there's no manual migration step.

## 3. Deploy

```bash
npx vercel        # first deploy / preview
npx vercel --prod # production deploy
```

or just push to your connected GitHub repo and let Vercel's Git integration
build and deploy it.

## Customizing the quiz

- Edit questions and answer options in `lib/questions.ts`.
- Edit personality names, taglines, descriptions, and colors in
  `lib/personalities.ts`.
- Scoring logic (tallying answers into a primary + secondary personality)
  lives in `lib/score.ts` and needs no changes if you just edit content.

## Data stored per submission

Each row in `quiz_results` contains: an optional display name, the computed
primary and secondary personality, the full score breakdown, the raw list of
answers (question id + personality type chosen), and a timestamp. There's no
way to edit or delete a submission from the UI \u2014 do that directly in your
database provider's dashboard if you ever need to.
