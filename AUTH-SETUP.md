# Authentication System Setup Guide

This guide provides instructions for setting up and configuring the user authentication system for the training calendar app using Supabase.

## Prerequisites

Before you begin, you'll need:

1. A Supabase account (https://supabase.com/)
2. Node.js and npm installed
3. The training calendar app codebase

## Supabase Project Setup

1. **Create a Supabase Project**:
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Enter your project name and set a secure database password
   - Select the region closest to your users

2. **Enable Authentication Methods**:
   - In your Supabase project, navigate to "Authentication" > "Providers"
   - Enable the following providers:
     - Email/Password (enabled by default)
     - Google (requires OAuth client ID and secret from Google Cloud Console)
     - Apple (requires Apple Developer account)
     - For Strava, you'll need to set up a custom OAuth provider

3. **Set up Database Tables**:
   - Navigate to "SQL Editor" in your Supabase dashboard
   - Create necessary tables for user profiles and preferences (see SQL example below)
   - Set up Row Level Security (RLS) policies to protect your data

4. **Get Your Supabase Config**:
   - Go to Project Settings (gear icon) > API
   - Copy your project URL and anon public key
   - These will be used to initialize the Supabase client

## Environment Variables Setup

1. Add your Supabase credentials to the `.env` file:

```properties
# Supabase Configuration
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## Setting Up Strava OAuth

For Strava integration, you'll need to:

1. Create a Strava API application at https://www.strava.com/settings/api
2. Set your website and authorization callback domain
3. Get your Client ID and Client Secret
4. Configure a Custom OAuth Provider in Supabase:
   - Go to Authentication > Providers > Custom OAuth
   - Click "Add Provider"
   - Set "Strava" as the provider name
   - Add Client ID and Client Secret from Strava
   - Set Authorization URL to: `https://www.strava.com/oauth/authorize`
   - Set Token URL to: `https://www.strava.com/oauth/token`
   - Set User Info URL to: `https://www.strava.com/api/v3/athlete`
   - Configure the scopes: `read,activity:read`
   - Map required attributes (id, username, etc.)

## Firestore Security Rules

Here are recommended security rules for your Firestore database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own data
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Add more collection rules as needed
  }
}
```

## Local Development with Firebase Emulators (Optional)

For local development without affecting your production data:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
4. Select Emulators and follow the setup
5. Start the emulators: `firebase emulators:start`

## Usage

The authentication system provides:

- User registration and login with email/password
- Social authentication with Google, Apple, and Strava
- Password reset functionality
- User profile management
- Protected routes that require authentication
- Integration with Garmin Connect

## Code Structure

- `src/lib/firebase.ts` - Firebase configuration
- `src/@types/auth.ts` - Authentication type definitions
- `src/services/authService.ts` - Authentication service layer
- `src/contexts/AuthContext.tsx` - React context for auth state
- `src/components/auth/*` - Authentication UI components
- `src/components/ProtectedRoute.tsx` - Route protection component

## Troubleshooting

- **Firebase Initialization Errors**: Ensure your environment variables are correctly set
- **Social Login Issues**: Check provider configuration in Firebase console
- **CORS Errors**: May occur with OAuth workflows; ensure domains are properly configured
- **Emulator Connection Issues**: Check ports and firewall settings
