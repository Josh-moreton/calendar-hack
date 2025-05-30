/**
 * Privacy Policy Page
 * Comprehensive privacy policy for Stridr training app with Garmin integration
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
            <p className="mt-1 text-sm text-gray-500">
              Effective Date: May 29, 2025
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                About This Policy
              </h3>
              <p className="text-blue-800">
                Stridr ("we," "our," or "us") respects your privacy and is
                committed to protecting your personal data. This privacy policy
                explains how we collect, use, share, and protect your
                information when you use our running training application and
                related services, including integrations with third-party
                fitness platforms like Garmin Connect.
              </p>
            </div>

            <h2>1. Information We Collect</h2>
            <p>
              We collect several types of information to provide and improve our
              services:
            </p>

            <h3>1.1 Information You Provide Directly</h3>
            <ul>
              <li>
                <strong>Account Information:</strong> Name, email address,
                password, and profile details
              </li>
              <li>
                <strong>Training Preferences:</strong> Goals, experience level,
                preferred units, and training history
              </li>
              <li>
                <strong>Communication Data:</strong> Messages, feedback, and
                support requests you send to us
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details (processed
                securely by third-party payment processors)
              </li>
            </ul>

            <h3>1.2 Training and Activity Data</h3>
            <ul>
              <li>
                <strong>Workout Data:</strong> Training plans, completed
                workouts, performance metrics, and progress tracking
              </li>
              <li>
                <strong>Third-Party Fitness Data:</strong> Data imported from
                connected services (Garmin Connect, Strava, etc.)
              </li>
              <li>
                <strong>Device Data:</strong> Information from connected fitness
                devices and wearables
              </li>
              <li>
                <strong>Location Data:</strong> GPS routes and location
                information (only when explicitly authorized)
              </li>
            </ul>

            <h3>1.3 Automatically Collected Information</h3>
            <ul>
              <li>
                <strong>Usage Analytics:</strong> How you interact with our app,
                features used, and performance data
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, and operating system
              </li>
              <li>
                <strong>Cookies and Tracking:</strong> Session data,
                preferences, and analytics cookies
              </li>
              <li>
                <strong>Error Logs:</strong> Technical issues and crash reports
                to improve app stability
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
              <h3 className="text-blue-900 font-semibold mb-2">
                📋 Complete Data Usage Transparency
              </h3>
              <p className="text-blue-800">
                We believe in complete transparency about how your data is used.
                Below is a comprehensive list of every way we process your
                information. We will{" "}
                <strong>
                  never use your data for purposes not listed here
                </strong>{" "}
                without obtaining your explicit consent first.
              </p>
            </div>

            <p>We process your personal data for the following purposes:</p>

            <h3>2.1 Service Provision</h3>
            <ul>
              <li>Create and manage your account</li>
              <li>Generate personalized training plans and recommendations</li>
              <li>Sync and analyze your workout data</li>
              <li>Provide progress tracking and performance insights</li>
              <li>Enable integrations with third-party fitness platforms</li>
            </ul>

            <h3>2.2 Communication and Support</h3>
            <ul>
              <li>Send service-related notifications and updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Share important safety information or service changes</li>
              <li>
                Send optional marketing communications (with your consent)
              </li>
            </ul>

            <h3>2.3 Improvement and Analytics</h3>
            <ul>
              <li>Analyze usage patterns to improve our services</li>
              <li>Conduct research and development for new features</li>
              <li>Monitor and ensure service security and performance</li>
              <li>Prevent fraud and protect against security threats</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
              <h3 className="text-red-900 font-semibold mb-2">
                🚫 We Do NOT Sell Your Data
              </h3>
              <p className="text-red-800">
                <strong>
                  Stridr does not sell, rent, lease, or trade your personal
                  information or activity data to third parties for monetary or
                  other consideration.
                </strong>
                This includes all fitness data, training information, personal
                details, and usage analytics. We will never monetize your
                personal data.
              </p>
            </div>

            <p>
              We are committed to protecting your privacy. We only share your
              information in the following limited circumstances:
            </p>

            <h3>3.1 With Your Explicit Consent</h3>
            <ul>
              <li>
                When you authorize connections to third-party services (Garmin
                Connect, Strava, etc.)
              </li>
              <li>
                When you choose to share your training data or achievements
                publicly
              </li>
              <li>
                When you participate in community features or social sharing
              </li>
            </ul>

            <h3>3.2 Service Providers and Partners</h3>
            <ul>
              <li>
                <strong>Cloud Infrastructure:</strong> Secure hosting and data
                storage providers
              </li>
              <li>
                <strong>Authentication Services:</strong> Supabase for secure
                user authentication
              </li>
              <li>
                <strong>Analytics Providers:</strong> Aggregated, anonymized
                usage analytics
              </li>
              <li>
                <strong>Payment Processors:</strong> Secure payment processing
                (we do not store payment details)
              </li>
            </ul>

            <h3>3.3 Legal Requirements</h3>
            <ul>
              <li>
                When required by law, court order, or government regulation
              </li>
              <li>
                To protect our rights, property, or safety, or that of our users
              </li>
              <li>To prevent fraud, security threats, or illegal activities</li>
              <li>
                In connection with business transfers, mergers, or acquisitions
              </li>
            </ul>

            <h2>4. Third-Party Integrations and Activity Data</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <h3 className="text-green-900 font-semibold mb-2">
                🏃‍♂️ Garmin Connect Integration
              </h3>
              <p className="text-green-800">
                When you connect your Garmin account, we access and use your
                activity data solely to provide our training services. This
                includes workout imports, training plan synchronization, and
                performance analysis. We respect Garmin's data usage policies
                and your privacy preferences.
              </p>
            </div>

            <h3>4.1 What We Access</h3>
            <ul>
              <li>
                <strong>Workout Data:</strong> Training sessions, runs, and
                activity metrics
              </li>
              <li>
                <strong>Performance Metrics:</strong> Pace, distance, heart
                rate, and other fitness data
              </li>
              <li>
                <strong>Training History:</strong> Past workouts to inform
                training plan recommendations
              </li>
              <li>
                <strong>Device Information:</strong> Connected Garmin devices
                and their capabilities
              </li>
            </ul>

            <h3>4.2 How We Use This Data</h3>
            <ul>
              <li>
                Generate personalized training plans based on your fitness level
                and history
              </li>
              <li>Sync workouts to your Garmin device calendar</li>
              <li>Provide performance analysis and progress tracking</li>
              <li>
                Adjust training recommendations based on completed workouts
              </li>
              <li>
                Enable seamless integration between Stridr and your Garmin
                ecosystem
              </li>
            </ul>

            <h3>4.3 Data Control</h3>
            <ul>
              <li>You can disconnect third-party integrations at any time</li>
              <li>
                Disconnecting will stop new data access but may retain
                previously synced data
              </li>
              <li>
                You can request deletion of all imported data from your account
              </li>
              <li>
                We respect the privacy settings you've configured on third-party
                platforms
              </li>
            </ul>

            <h2>5. Data Security and Protection</h2>
            <p>
              We implement comprehensive security measures to protect your
              personal information:
            </p>

            <h3>5.1 Technical Safeguards</h3>
            <ul>
              <li>
                <strong>Encryption:</strong> All data is encrypted in transit
                and at rest using industry-standard protocols
              </li>
              <li>
                <strong>Secure Authentication:</strong> Multi-factor
                authentication and secure password policies
              </li>
              <li>
                <strong>Access Controls:</strong> Strict access controls and
                regular security audits
              </li>
              <li>
                <strong>Infrastructure Security:</strong> Secure cloud hosting
                with enterprise-grade security
              </li>
            </ul>

            <h3>5.2 Data Minimization</h3>
            <ul>
              <li>We only collect data necessary for our services</li>
              <li>
                Personal data is anonymized or pseudonymized when possible
              </li>
              <li>
                Regular data audits to ensure compliance with privacy principles
              </li>
            </ul>

            <h3>5.3 Security Limitations</h3>
            <p>
              While we implement strong security measures, no method of
              electronic transmission or storage is 100% secure. We cannot
              guarantee absolute security, but we continuously work to protect
              your information and will notify you of any security breaches as
              required by law.
            </p>

            <h2>6. Data Retention and Deletion</h2>
            <h3>6.1 Retention Periods</h3>
            <ul>
              <li>
                <strong>Active Accounts:</strong> Data retained while your
                account is active and for service provision
              </li>
              <li>
                <strong>Inactive Accounts:</strong> Data may be retained for up
                to 3 years after last activity
              </li>
              <li>
                <strong>Training Data:</strong> Workout and fitness data
                retained to maintain training history and insights
              </li>
              <li>
                <strong>Legal Requirements:</strong> Some data may be retained
                longer if required by law
              </li>
            </ul>

            <h3>6.2 Account Deletion</h3>
            <ul>
              <li>
                You can delete your account at any time through your profile
                settings
              </li>
              <li>
                Account deletion will remove your personal data within 30 days
              </li>
              <li>
                Some anonymized data may be retained for analytics and service
                improvement
              </li>
              <li>
                Backup systems may retain data for up to 90 days for recovery
                purposes
              </li>
            </ul>

            <h2>7. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>

            <h3>7.1 Access and Portability</h3>
            <ul>
              <li>
                <strong>Data Access:</strong> Request a copy of all personal
                data we hold about you
              </li>
              <li>
                <strong>Data Portability:</strong> Export your training data in
                standard formats
              </li>
              <li>
                <strong>Account Information:</strong> View and update your
                profile and preferences
              </li>
            </ul>

            <h3>7.2 Control and Deletion</h3>
            <ul>
              <li>
                <strong>Data Correction:</strong> Update or correct inaccurate
                personal information
              </li>
              <li>
                <strong>Data Deletion:</strong> Request deletion of your
                personal data (right to be forgotten)
              </li>
              <li>
                <strong>Processing Restriction:</strong> Limit how we process
                your data in certain circumstances
              </li>
              <li>
                <strong>Consent Withdrawal:</strong> Withdraw consent for data
                processing at any time
              </li>
            </ul>

            <h3>7.3 Communication Preferences</h3>
            <ul>
              <li>
                Opt out of marketing communications while keeping service
                notifications
              </li>
              <li>
                Choose your preferred communication channels and frequency
              </li>
              <li>
                Manage push notification settings through your device and app
                preferences
              </li>
            </ul>

            <h2>8. Cookies and Tracking Technologies</h2>
            <h3>8.1 Types of Cookies We Use</h3>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for basic app
                functionality and authentication
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                preferences
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how you
                use our app
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> From integrated services
                like Garmin Connect
              </li>
            </ul>

            <h3>8.2 Managing Cookies</h3>
            <ul>
              <li>Control cookie settings through your browser preferences</li>
              <li>
                Opt out of analytics cookies through your account settings
              </li>
              <li>
                Note that disabling essential cookies may affect app
                functionality
              </li>
            </ul>

            <h2>9. Children's Privacy</h2>
            <p>
              Stridr is not intended for children under the age of 16. We do not
              knowingly collect personal information from children under 16. If
              you believe a child has provided us with personal information,
              please contact us immediately, and we will take steps to remove
              such information and terminate the child's account.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Stridr operates globally, and your information may be processed
              and stored in countries other than your own, including the United
              States and European Union. We ensure that:
            </p>
            <ul>
              <li>
                Appropriate safeguards are in place for international data
                transfers
              </li>
              <li>
                We comply with applicable data protection laws and regulations
              </li>
              <li>
                Standard contractual clauses or adequacy decisions govern
                transfers where required
              </li>
              <li>
                Your data receives substantially similar protection regardless
                of location
              </li>
            </ul>

            <h2>11. Legal Basis for Processing (GDPR)</h2>
            <p>
              For users in the European Economic Area, we process your personal
              data based on the following legal grounds:
            </p>
            <ul>
              <li>
                <strong>Contract Performance:</strong> Processing necessary to
                provide our services
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Service improvement,
                security, and analytics
              </li>
              <li>
                <strong>Consent:</strong> Marketing communications and optional
                features
              </li>
              <li>
                <strong>Legal Compliance:</strong> Meeting regulatory and legal
                requirements
              </li>
            </ul>

            <h2>12. California Privacy Rights (CCPA)</h2>
            <p>
              California residents have additional privacy rights under the
              California Consumer Privacy Act:
            </p>
            <ul>
              <li>
                Right to know what personal information is collected and how
                it's used
              </li>
              <li>Right to delete personal information</li>
              <li>
                Right to opt-out of the sale of personal information (we do not
                sell personal information)
              </li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>

            <h2>12.1. Data Monetization and Sale Notification Policy</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <h3 className="text-green-900 font-semibold mb-2">
                ✅ Our Commitment to You
              </h3>
              <div className="text-green-800 space-y-2">
                <p>
                  <strong>Current Policy:</strong> Stridr does not and will not
                  sell your personal data or activity information.
                </p>
                <p>
                  <strong>Future Changes:</strong> If we ever consider any form
                  of data monetization that involves sharing your information
                  with third parties for their commercial benefit, we will:
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    Notify you at least 60 days in advance via email and app
                    notification
                  </li>
                  <li>
                    Provide clear opt-out mechanisms before any such changes
                    take effect
                  </li>
                  <li>
                    Allow you to download all your data before the policy change
                  </li>
                  <li>
                    Require explicit consent for any new data sharing practices
                  </li>
                  <li>
                    Offer a paid tier with no data sharing as an alternative
                  </li>
                </ul>
                <p>
                  <strong>Your Rights:</strong> You will always have the right
                  to opt-out of any data sharing or monetization practices.
                </p>
              </div>
            </div>

            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy periodically to reflect changes
              in our practices, services, or legal requirements. When we make
              material changes, we will:
            </p>
            <ul>
              <li>Update the "Last Updated" date at the top of this policy</li>
              <li>
                Notify you via email or app notification if you have an account
              </li>
              <li>
                For significant changes, obtain your consent where required by
                law
              </li>
              <li>Maintain previous versions for your reference</li>
            </ul>
            <p>
              Your continued use of our services after any changes constitutes
              acceptance of the updated policy.
            </p>

            <h2>14. Contact Information and Data Protection Officer</h2>
            <p>
              If you have questions, concerns, or requests regarding this
              privacy policy or your personal data, please contact us:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
              <h3 className="font-semibold mb-2">Contact Details</h3>
              <ul className="space-y-1">
                <li>
                  <strong>Email:</strong> privacy@stridr.dev
                </li>
                <li>
                  <strong>Data Protection:</strong> dpo@stridr.dev
                </li>
                <li>
                  <strong>Support:</strong> support@stridr.dev
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://stridr.dev/privacy"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    https://stridr.dev/privacy
                  </a>
                </li>
              </ul>
            </div>

            <h3>14.1 Response Times</h3>
            <ul>
              <li>General inquiries: Within 5 business days</li>
              <li>
                Data subject requests: Within 30 days (as required by law)
              </li>
              <li>Security concerns: Within 24 hours</li>
              <li>Urgent matters: Same business day</li>
            </ul>

            <h3>14.2 Supervisory Authority</h3>
            <p>
              If you're located in the European Economic Area and believe we
              haven't adequately addressed your concerns, you have the right to
              lodge a complaint with your local data protection supervisory
              authority.
            </p>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-blue-900 font-semibold mb-2">
                Questions About Activity Data?
              </h3>
              <p className="text-blue-800">
                For specific questions about how we use your training and
                activity data, especially data imported from Garmin Connect or
                other fitness platforms, please contact our Data Protection
                Officer at
                <a href="mailto:dpo@stridr.dev" className="underline">
                  dpo@stridr.dev
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                ← Back to Home
              </Link>
              <div className="text-sm text-gray-500">
                <p>
                  This policy is publicly available at:{" "}
                  <strong>https://stridr.dev/privacy</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
