# Towntaste Mobile App

Towntaste is a mobile application designed to helping users discover and share the best local food experiences in their town. This project focuses on creating a secure and user-friendly platform for exploring restaurants and food spots.

## Table of Contents

- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**
  - User login
  - Account creation
  - Password reset via email token
  - Login attempt limits
- **Data Validation**
  - Input validation for secure and accurate data entry

## Upcoming Features

**Screens**

- Home Page with restaurant lists
- Profile Page
- Favorite Restaurants
- Favorite Foods
- Reviews
- Coupons
- Settings Page

  **User Authentication Improvement**

- OAuth
- Two-factor authentication
- Password reset via SMS

## Tech Stack

- **Frontend:** React Native, NativeWind (CSS)
- **Backend:** NodeJS
- **Database:** PostgreSQL
- **Languages:** TypeScript
- **Other Libraries:**
  - Formik for form handling
  - Yup for validation
  - Redux for state management
  - Expo for development and deployment

## Getting Started

### Prerequisites

- Node.js
- Expo CLI
- PostgreSQL

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/towntaste.git
   cd towntaste
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a .env file in the root directory and add the following:

   ```sh
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   EMAIL_SERVICE_API_KEY=your-email-service-api-key
   ```

4. Start the development server:

   ```sh
   expo start
   ```

## Folder Structure

```sh
.
├── frontend
│   ├── assets
│   ├── src
│   │   ├── components
│   │   ├── screens
│   │   ├── redux
│   │   ├── types
│   │   └── App.tsx
│   ├── tailwind.config.js
│   └── package.json
└── backend
    ├── src
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   ├── services
    │   └── app.ts
    ├── .env
    └── package.json
```

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository
2. Create your feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/your-feature)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
