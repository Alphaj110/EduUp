# EduConnect - Online Tutoring Platform

A modern React-based frontend for an online tutoring platform that connects students, parents, and teachers.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── layouts/         # Layout components
├── hooks/           # Custom React hooks
├── services/        # API service files
├── data/            # Dummy data
├── App.jsx          # Main app component with routing
└── main.jsx         # App entry point
```

## Features

- **Landing Page** - Platform introduction and CTAs
- **Authentication** - Login/Signup with role selection
- **Dashboards** - Role-specific dashboards (Student/Parent/Teacher)
- **Teacher Search** - Filter and browse teachers
- **Teacher Profiles** - Detailed teacher information
- **Booking System** - Schedule and book lessons
- **Payment Flow** - Complete payment process
- **Online Lessons** - Video session interface
- **Chatbot** - AI assistant with usage limits
- **Ratings** - Review system for teachers
- **Map View** - Geographic teacher search

## User Roles

- **Student** - Search teachers, book lessons, attend sessions
- **Parent** - Manage children's lessons and teachers
- **Teacher** - Manage availability, conduct lessons, track earnings

## Ready for Backend Integration

This is a frontend skeleton with dummy data. Connect to your backend API by updating the service files in `/src/services/`.
