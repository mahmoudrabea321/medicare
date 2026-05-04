# MedCare Clinic (عيادة ميد كير)

A modern, responsive web application for a medical clinic, featuring an online appointment booking system powered by Firebase. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, professional design tailored for healthcare services.
- **Appointment Booking**: Patients can easily book appointments online with specific doctors and services.
- **Firebase Integration**: Secure data storage and retrieval using Google Firebase Firestore.
- **Responsive Design**: Fully functional and visually appealing on all devices (mobile, tablet, desktop).
- **Animations**: Smooth transitions and micro-interactions using Motion (Framer Motion).
- **RTL Language Support**: Designed and optimized for Arabic language (Right-to-Left).

## Tech Stack

- **Frontend**:
  - React 19
  - TypeScript
  - Vite
  - Tailwind CSS v4
  - React Router v6
  - Lucide React (Icons)
  - Motion (Animations)
- **Backend/Database**:
  - Firebase Firestore
  - Firebase Security Rules (Strictly typed and secured)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v18 or higher recommended)
- npm or yarn

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd medcare-clinic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your clinic's specific contact information and any necessary API keys.

4. **Firebase Configuration:**
   Ensure you have a Firebase project set up. The project uses Firebase Firestore for the appointment system. Your Firebase configuration should be present in `firebase-applet-config.json` (or securely loaded via environment variables if adapting for standard deployment).

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` folder containing the compiled assets, which can be deployed to any static hosting service in combination with the `public/.htaccess` file for routing.

## License

This project is licensed under the MIT License.
