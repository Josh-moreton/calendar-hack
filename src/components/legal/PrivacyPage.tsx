/**
 * Privacy Policy Page
 */

import { Link } from "react-router-dom";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-600">
              Last updated: May 29, 2025
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
            </p>

            <h3>Personal Information</h3>
            <ul>
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Profile information and preferences</li>
              <li>Training data and workout information</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Usage data and analytics</li>
              <li>Device information and browser type</li>
              <li>IP address and location data (if permitted)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Personalize your training experience</li>
              <li>Send important notifications and updates</li>
              <li>Analyze usage patterns and performance</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul>
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist our operations</li>
              <li>When required by law or to protect rights and safety</li>
              <li>In connection with business transfers or mergers</li>
            </ul>

            <h2>4. Third-Party Integrations</h2>
            <p>
              When you connect third-party services (like Garmin Connect or Strava), we may access and store data from these services according to their APIs and your authorization. This data is used solely to provide our services to you.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide services. You may delete your account at any time, which will remove your personal data from our systems.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of certain communications</li>
              <li>Request data portability</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our service and updating the "last updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@stridr.app</li>
              <li>Address: [Your business address]</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
