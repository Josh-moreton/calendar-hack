# GitHub Pages Deployment Setup

## 🚀 Your website is ready for GitHub Pages!

Your calendar application can absolutely work on GitHub Pages with the current setup. Here's what you need to do:

## ✅ Already Configured

- ✅ Vite build system (perfect for static hosting)
- ✅ Homepage field in package.json pointing to GitHub Pages URL
- ✅ Base path configured for production deployment
- ✅ GitHub Actions workflow for automatic deployment
- ✅ Supabase integration (works client-side)

## 📋 Setup Steps

### 1. Configure GitHub Repository Settings

1. Go to your GitHub repository: `https://github.com/joshua-moreton/stridr`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Add Repository Secrets

Go to **Settings** → **Secrets and variables** → **Actions** and add these secrets:

```
VITE_SUPABASE_URL=https://fohkeuowmgjnvvjzesiw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvaGtldW93bWdqbnZ2anplc2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTY3MzcsImV4cCI6MjA2NDA5MjczN30.XwzZqPvgToWy45fBaRsLwjuRq15YJs5CTH5nEnaRvjI
VITE_GARMIN_CONSUMER_KEY=your_consumer_key_here
VITE_GARMIN_REDIRECT_URI=https://joshua-moreton.github.io/stridr/garmin/callback
```

### 3. Update Supabase Configuration

In your Supabase dashboard (https://app.supabase.com):

1. Go to **Authentication** → **URL Configuration**
2. Add to **Redirect URLs**:
   ```
   https://joshua-moreton.github.io/stridr/
   https://joshua-moreton.github.io/stridr/auth/callback
   ```

### 4. Update Garmin Developer Portal

In your Garmin Developer Portal:

1. Update the OAuth Redirect URI to:
   ```
   https://joshua-moreton.github.io/stridr/garmin/callback
   ```

## 🔄 Deployment Process

Once configured, your site will automatically deploy when you:

1. Push to the `main` branch
2. The GitHub Action will:
   - Install dependencies
   - Run tests
   - Build the application with production environment variables
   - Deploy to GitHub Pages

## 🌐 Your Live URL

After deployment, your calendar application will be available at:
**https://joshua-moreton.github.io/stridr/**

## 🔧 Technical Notes

- **Static Hosting**: Works perfectly because it's a client-side React app
- **Supabase**: All authentication happens client-side, compatible with static hosting
- **Environment Variables**: Properly configured with `VITE_` prefix for client-side access
- **Routing**: React Router will work with the configured base path
- **Build Output**: Goes to `./dist` directory as expected by GitHub Pages

## 🚨 Security Considerations

- ✅ Supabase anonymous key is safe to expose (designed for client-side use)
- ✅ Garmin consumer key is safe to expose (OAuth public key)
- ❌ Never expose Garmin consumer secret (not needed for client-side OAuth)

## 🏃‍♂️ Next Steps

1. Commit and push the updated workflow file
2. Configure the GitHub repository settings
3. Add the repository secrets
4. Update Supabase and Garmin redirect URIs
5. Push to main branch to trigger deployment

Your calendar application will then be live on GitHub Pages with full authentication functionality!
