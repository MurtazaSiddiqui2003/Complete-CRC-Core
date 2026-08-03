# CRC Core — Next.js + Tailwind site with admin panel

This is the CRC Core site rebuilt from your HTML/CSS/JS files into a proper
Next.js app. Same look, same content, but now:

- Built with **Tailwind CSS** instead of one giant `style.css`
- Case studies, blog posts, FAQ, services, and testimonials are stored in a
  **database**, not hardcoded — so your boss can add/edit/delete them
  himself from a password-protected **admin panel** at `/admin`
- Organized into small, commented components instead of one 862-line HTML file

## How the project is organized

```
app/
  page.js              <- the homepage, just stacks all the sections together
  layout.js            <- loads fonts, sets the page title
  admin/               <- the admin panel pages (login, dashboard, editors)
  api/                 <- the backend routes the admin panel talks to
components/
  Hero.jsx, About.jsx, Services.jsx, etc.   <- one file per section
  admin/AdminEditor.jsx                     <- the reusable add/edit/delete screen
lib/
  mongodb.js           <- connects to your database
  auth.js              <- checks the admin password
  data.js              <- functions the homepage uses to read content
scripts/
  seed.js              <- loads your existing content into the database (run once)
```

Every component file is small and commented — open any one of them and
you'll see plain JSX with your real content, no magic. `AdminEditor.jsx`
is the one "clever" file: it's a single reusable form used by all 5 admin
pages, so there's only one place to fix things instead of five.

## What you need to set this up (2 free accounts)

### 1. MongoDB Atlas (the database) — free, no card needed
This stores your case studies, blog posts, FAQ, services, and testimonials.

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up
2. Create a free **M0** cluster (512MB storage — plenty for this site, $0/month forever)
3. Under **Database Access**, create a database user (username + password)
4. Under **Network Access**, click "Allow Access From Anywhere" (0.0.0.0/0) —
   simplest option since Vercel's servers don't have a fixed IP
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

### 2. Vercel (hosting) — you already have this from your other projects
Same as Sterling Bloom / CRC Core portfolio / Eisha's.

## Local setup (do this first, before deploying)

1. Copy the environment file and fill it in:
   ```
   cp .env.local.example .env.local
   ```
   Open `.env.local` and fill in:
   - `MONGODB_URI` — the connection string from Atlas step 5 above
   - `ADMIN_PASSWORD` — pick a password for your boss to log in with
   - `ADMIN_SESSION_SECRET` — run this and paste the result:
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. Install dependencies:
   ```
   npm install
   ```

3. Load your existing content (case studies, FAQ, services, blog posts)
   into the database — only need to run this once:
   ```
   npm run seed
   ```

4. Run it locally:
   ```
   npm run dev
   ```
   Visit `http://localhost:3000` for the site, and
   `http://localhost:3000/admin` for the admin panel.

## Deploying to Vercel

1. Push this project to a GitHub repo (same flow as your other projects)
2. Import it into Vercel
3. In Vercel's project settings → **Environment Variables**, add the same
   5 variables from your `.env.local` file
4. Deploy. That's it — Vercel builds and hosts it.
5. If you haven't already run `npm run seed` locally against your real
   Atlas database, run it now from your computer (it just needs your
   `.env.local` pointed at the real database).

## How your boss uses the admin panel

1. Go to `yoursite.com/admin`
2. Enter the password you set as `ADMIN_PASSWORD`
3. Pick a section (Case Studies, Blog, FAQ, Services, or Testimonials)
4. Add new items, edit existing ones, or delete them — changes show up on
   the live site immediately, no rebuild or redeploy needed

No coding knowledge needed on his end — it's just forms.

## Things worth knowing

- **Images/thumbnails**: to keep this simple, the admin panel takes a
  video/image **URL** rather than a file upload button. If you want true
  drag-and-drop image uploads later, the natural next step is adding
  Cloudinary (same as your Eisha's project) — happy to wire that in
  whenever you want it.
- **Contact form**: still uses the same Web3Forms key as before, no
  changes needed there.
- **Login security**: single shared password, not a full user system.
  If CRC Core ever needs multiple admin logins with different
  permissions, that's the point where it's worth upgrading to NextAuth
  (like your other CRC Core portfolio build).
