# Qazaq Endowment

Qazaq Endowment is a multi-language crowdfunding web application for educational institutions built with Next.js. It utilizes Prisma as an ORM with a PostgreSQL database to manage user accounts and projects. 

[Visit Qazaq Endowment](https://qazaq-endowment.vercel.app)

## Features

- **Responsive Design:**  
  - Adaptive navigation bar with a mobile hamburger menu.
  - Hero section with animated texts and consistent layout for mobile and desktop.
  
- **Multi-Language Support:**  
  - English and Kazakh languages for all user-facing text.
  
- **User Registration:**  
  - Client-side and API-based validations.
  - Secure password handling using bcrypt.
  
- **Backend Integration:**  
  - PostgreSQL database powered by Prisma ORM.
  - REST API endpoints for user registration.
  
- **Deployment Ready:**  
  - Configured to work with Vercel.
  - Instructions for environment variable setup and production migrations.

## Technologies Used

- **Frontend:**  
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  
- **Backend:**  
  - [Prisma](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/) 
  
- **Authentication & Security:**  
  - [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
  
- **Deployment:**  
  - [Vercel](https://vercel.com/)
  - [Supabase](https://supabase.com)

## Getting Started

### Prerequisites

- Node.js (LTS version 14 or above)
- npm
- A PostgreSQL database instance 

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/qazaq-endowment.git
   cd qazaq-endowment
   ```

2. **Install Dependencies:**

   Using npm:
   ```bash
   npm install
   ```

3. **Environment Variables:**

   In your project settings or `.env` file, add:
    ```env
    DATABASE_URL="[your_DB_URL]"
    JWT_SECRET="[your_secret]"
    NEXT_PUBLIC_API_URL="[your_host_url]" 
    ```
    In development my <your_host_url> is usually `http://localhost:3000`

4. **Prisma Setup:**

   Generate the Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the Project Locally

```bash
npm run dev
```
Visit [http://localhost:[port]](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests. Please follow the established coding style and write tests for any new features.

## Plans

* Add admin role. Admins will have a panel in which they can verify/reject projects.
* Add payment method. Integrate with Kaspi, Freedom Pay or other API.
* Add notifications service. Notifications model and API is already implemented, now it should be connected with user's other actions.
