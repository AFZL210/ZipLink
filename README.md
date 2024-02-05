<h1 align="center">
            ✨ Welcome to ZipLink ✨
</h1>

<div align="center">

![Badge](https://img.shields.io/badge/Tech_Stack-MERN-yellow) ![Badge](https://img.shields.io/badge/Version-1.0-green) ![Badge](https://img.shields.io/badge/License-Apache_2.0-blue) ![Badge](https://img.shields.io/badge/Type-OpenSource-orange) ![Badge](https://img.shields.io/badge/For-Students-red) 

</div>


![Screenshot from 2024-02-03 18-27-07](https://github.com/AFZL210/ZipLink/assets/79896602/561f9138-d6e1-4fd6-be30-a3cf4e8accc8)


ZipLink is a feature-rich URL shortener and link management tool.

## ✨ Features

- [x] Public and Private Short Links
- [x] QR Codes
- [x] Analytics
- [x] Edit Links
- [x] Duplicate Links
- [x] Edit Profile 
- [ ] Link Expiry (coming soon)

## 📍 Demo

[home.webm](https://github.com/AFZL210/ZipLink/assets/79896602/8170d6c3-fe6b-49fe-888a-5fa24edc4f7c)


## 📍 Screenshots

![Dashboard](https://res.cloudinary.com/diijgtg7l/image/upload/v1698670172/Screenshot_from_2023-10-30_18-17-50_ammj6o.png)

![Analytics](https://res.cloudinary.com/diijgtg7l/image/upload/v1698670225/Screenshot_from_2023-10-30_18-18-21_kzckzd.png)


## 💻 Tech Stack

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Recoil](https://recoiljs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind](https://tailwindcss.com/)
- [shadcn/ui](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
- [Vercel](https://ui.shadcn.com/)


## 📁 Repository Structure

```bash
.
|____prisma
|____public
|  |___static
|____src
| |____app
| |____assets
| |____components
| | |____ui
| | |____dashboard
| | |____theme
| | |____home
| |____lib
|    |___types
|    |___utils.ts
| |____data
| |____hooks
| |____types
| |____store
```

- **`public/*`** - Static assets including images, fonts, audios, files, etc.
- **`src/app/*`** - Every page and api route in the website. Uses the new [App Router](https://beta.nextjs.org/docs/getting-started#introducing-the-app-router) from [Next.js](https://nextjs.org/) `13.+`
- **`src/assets/*`** - Fonts and static images used in different components
- **`src/components/ui/*`** - This contain all the common ui components
- **`src/data/*`** - JSON files containing data for projects
- **`src/lib/types/*`** - Some types definitions
- **`src/lib/utils.ts`** - More utilities functions but less complex than the ones in `lib`
_ **`src/store`** - recoil atoms and selectors

## Testing Credentials
- email: test@test.com
- password: test12345


## 🛠️ Run Locally

Clone the project

```bash
  git clone https://github.com/AFZL210/ZipLink
```

Go to the project directory

```bash
  cd ZipLink
```

Copy the contents of ```.env.example``` to ```.env``` and add your credentials

```bash
  cp .env.example .env
```

Install dependencies

```bash
  npm install
```


Start the dev server

```bash
  npm run dev
```

NOTE: In ```ZipLink/src/middleware.ts```, use ```process.env.COOKIE_NAME``` for deployment and ```process.env.DEV_COOKIE_NAME``` for development



## Deploy using docker
```docker build -t ziplink .```
```docker run -p 3000:3000 ziplink```
## Authors

- [@AFZL210](https://www.github.com/AFZL210)
