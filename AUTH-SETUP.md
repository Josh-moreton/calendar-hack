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

## Database Schema Setup

Run this SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE public.user_preferences (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  theme TEXT DEFAULT 'light',
  notifications BOOLEAN DEFAULT true,
  timezone TEXT DEFAULT 'UTC',
  units TEXT DEFAULT 'metric',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create connected_services table for OAuth integrations
CREATE TABLE public.connected_services (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  service_name TEXT NOT NULL,
  service_user_id TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, service_name)
);

-- Set up Row Level Security policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own connected services" ON public.connected_services
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own connected services" ON public.connected_services
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');

  INSERT INTO public.user_preferences (id)
  VALUES (new.id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Setting Up Social Authentication

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Add redirect URI: `https://your-project.supabase.co/auth/v1/callback`
7. Copy Client ID and Client Secret to Supabase Authentication > Providers > Google

### Apple Sign In Setup

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create a new App ID with Sign In with Apple capability
3. Create a Services ID for web authentication
4. Configure domain and redirect URL
5. Generate a private key for Sign In with Apple
6. Add credentials to Supabase Authentication > Providers > Apple

### Strava OAuth Setup

1. Create a Strava API application at https://www.strava.com/settings/api
2. Set your website and authorization callback domain to your app's domain
3. Set callback URL to: `https://your-project.supabase.co/auth/v1/callback`
4. Get your Client ID and Client Secret
5. In Supabase, go to Authentication > Providers
6. Add a new provider with these settings:
   - Provider: Custom
   - Name: strava
   - Client ID: Your Strava Client ID
   - Client Secret: Your Strava Client Secret
   - Authorization URL: `https://www.strava.com/oauth/authorize`
   - Token URL: `https://www.strava.com/oauth/token`
   - User Info URL: `https://www.strava.com/api/v3/athlete`
   - Scopes: `read,activity:read`

## Row Level Security Policies

Your data is protected by Row Level Security (RLS) policies that ensure users can only access their own data. The policies created above handle:

- User profiles: Users can only view/edit their own profile
- User preferences: Users can only view/edit their own preferences
- Connected services: Users can only manage their own service connections

## Local Development

1. Install dependencies:

```bash
npm install @supabase/supabase-js
```

2. Start your development server:

```bash
npm run dev
```

3. The app will use your Supabase project for authentication

## Usage

The authentication system provides:

- User registration and login with email/password
- Social authentication with Google, Apple, and Strava
- Password reset functionality
- User profile management
- Protected routes that require authentication
- Integration with Garmin Connect and other fitness services

## Code Structure

- `src/lib/supabase.ts` - Supabase client configuration
- `src/@types/auth.ts` - Authentication type definitions
- `src/services/authService.ts` - Authentication service layer
- `src/contexts/AuthContext.tsx` - React context for auth state
- `src/components/auth/*` - Authentication UI components
- `src/components/ProtectedRoute.tsx` - Route protection component

## Troubleshooting

- **Supabase Connection Errors**: Ensure your environment variables are correctly set
- **Social Login Issues**: Check provider configuration in Supabase console
- **CORS Errors**: May occur with OAuth workflows; ensure domains are properly configured in provider settings
- **RLS Policy Issues**: Check that Row Level Security policies are properly configured
- **Database Permission Errors**: Ensure your anon key has the correct permissions
