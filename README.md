# Personal Blog

This blog is a platform I created to share my personal writings and ideas in a simple, elegant, and functional manner.

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, ShadCN
- **Backend**: Hono.js
- **Database**: PostgreSQL (managed with Prisma ORM and migrations)
- **Deployment**: Cloudflare Pages (Frontend) and Workers (Backend)

## Features

- **User Authentication**: Includes persistent login and protected routes.
- **Dynamic Content**: Blogs and posts can be created, edited, and rendered in real time.
- **Rich Text Editor**: A customizable editor with utility tools for writing.
- **Responsive Design**: Fully responsive and mobile-friendly layout.
- **Theming**: Light and dark modes supported with toggle functionality.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Tholkappiar/Blog.git
   cd Blog
   ```
   
2. Install dependencies:
    ```bash
    cd frontEnd
    npm install
    cd ../backend
    npm install
    ```

3. Configure environment variables:
   - Add .env files for both frontend and backend with necessary API keys and database details.


4. Start the backend:
   ```bash
    npm run dev
    ```

5. Start the frontend:
   ```bash
    npm run dev
   ```
   
6. Access the blog at
   ```bash
   http://localhost:5173
   ```

## Deployment

The blog is deployed using Cloudflare Pages for the frontend and Cloudflare Workers for the backend.
