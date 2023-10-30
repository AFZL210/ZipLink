# ZipLink

ZipLink is a feature-rich URL shortener and link management tool.


## Features

- Public and Private Short Links
- QR Codes
- Analytics
- Link Expiry


## Demo

[Screencast from 30-10-23 06:06:44 PM IST.webm](https://github.com/AFZL210/ZipLink/assets/79896602/70606406-85f1-4f92-ac3e-dd4f43597718)

## Screenshots

![Dashboard](https://res.cloudinary.com/diijgtg7l/image/upload/v1698670172/Screenshot_from_2023-10-30_18-17-50_ammj6o.png)

![Analytics](https://res.cloudinary.com/diijgtg7l/image/upload/v1698670225/Screenshot_from_2023-10-30_18-18-21_kzckzd.png)


## Tech Stack

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Vercel](https://vercel.com/)


## Run Locally

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
  npm run start
```

NOTE: In ```ZipLink/src/middleware.ts```, use ```process.env.COOKIE_NAME``` for deployment and ```process.env.DEV_COOKIE_NAME``` for development


## Authors

- [@AFZL210](https://www.github.com/AFZL210)
