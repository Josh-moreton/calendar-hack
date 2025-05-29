/**
 * Terms of Service Page
 */

import { Link } from "react-router-dom";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="mt-2 text-sm text-gray-600">
              Last updated: May 29, 2025
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Stridr ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Stridr is a training calendar application that helps runners create, manage, and track their training plans. The Service may include features such as:
            </p>
            <ul>
              <li>Training plan creation and customization</li>
              <li>Workout tracking and analytics</li>
              <li>Integration with fitness devices and platforms</li>
              <li>Progress monitoring and reporting</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h2>4. Data and Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Interfere with the Service's operation</li>
            </ul>

            <h2>6. Third-Party Integrations</h2>
            <p>
              The Service may integrate with third-party platforms such as Garmin Connect, Strava, and others. Your use of these integrations is subject to their respective terms of service.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              The Service is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective upon posting to the Service. Continued use constitutes acceptance of modified terms.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at legal@stridr.app.
            </p>
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
