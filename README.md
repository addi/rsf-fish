This project is available on [rsf.fish](https://rsf.fish) and uses the following tech:

- [Next.js](https://nextjs.org) - React Framework
- [Vercel](https://vercel.com) - Hosting
- [Neon](https://neon.tech) - Serverless Postgres hosting with branching
- [Pusher](https://neon.tech) - Serverless websocket hosting
- [Upstash](https://upstach.com) - Serverless Redis hosting
- [Drizzle](https://orm.drizzle.team) - Typescript ORM

## Getting Started

Fill out the .env file with

```bash
DATABASE_URL=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
KV_URL=
KV_REST_API_READ_ONLY_TOKEN=
KV_REST_API_TOKEN=
KV_REST_API_URL=
```

Then run the development server:

```bash
npm install
npm run dev

# or
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tutorials

- [Connect Vercel with the Neon Vercel Integration](https://neon.tech/docs/guides/vercel)
- [Drizzle with Neon Postgres](https://orm.drizzle.team/docs/tutorials/drizzle-with-neon)
- [Distributed Locking using Upstash Redis](https://upstash.com/blog/lock)
