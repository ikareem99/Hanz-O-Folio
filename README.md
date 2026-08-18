# Hanzala Kareem's Portfolio & CMS

A modern, fast, and fully-featured personal portfolio and content management system. Built with [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), and [MongoDB](https://www.mongodb.com/).

## 🚀 Features

### Public Site
- **Dynamic Showcase:** Beautifully rendered UI displaying Experience, Tools, Projects, and Blog Posts.
- **Rich Text & Markdown:** Projects and Blog posts are formatted elegantly using `@tailwindcss/typography` prose classes.
- **Contact Form:** A "Let's Work Together" form that saves submissions securely.
- **Performance & SEO:** Implements JSON-LD schema markup (`ProfilePage`, `CollectionPage`, `Blog`, `Person`), proper OpenGraph tags, and is highly optimized.

### Custom Admin Dashboard & CMS
- **Secure Authentication:** JWT-based login system for the `/admin` portal.
- **Content Management:** Fully custom CRUD (Create, Read, Update, Delete) interfaces to manage:
  - **Projects**
  - **Experience**
  - **Tools**
  - **Blog Posts**
- **No-Code Editor:** Integrated WYSIWYG rich text editor (`react-quill-new` + `marked`) allowing for drag-and-drop markdown imports, raw pasting, and sticky toolbars.
- **Messages Inbox:** A dedicated panel to view, sort, and reply to all contact form submissions.
- **Spam Protection:** Multi-layered defense on the contact form featuring:
  - **MongoDB Rate Limiting:** Limits IP addresses to 3 submissions per hour, utilizing a TTL index to auto-clean old records.
  - **Honeypot Trap:** Automatically blocks automated web crawlers and spam bots.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router / React 19)
- **Database**: MongoDB (Mongoose)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Rich Text Editor**: React Quill New
- **Icons**: Lucide React
- **UI Components**: Radix UI

## ⚙️ Getting Started

### 1. Environment Variables
Create a `.env.local` file in the root of your project and configure the following variables:
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_jwt_key
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the dashboard.

## 🚢 Deployment
Since this is a standard Next.js application, it will deploy seamlessly on [Vercel](https://vercel.com/new) without requiring custom configuration. Just ensure you add the environment variables in your Vercel project settings!
