import LegalTextPage from "@/components/legal/LegalTextPage";

const content = `Effective Date: April 7, 2026
Website: pdfezy.com
1. Introduction
Welcome to PdfEzy ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit pdfezy.com and use our PDF tools and services.
Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
2. Information We Collect
Information You Provide Directly
Name and email address when creating an account or contacting support
Billing and payment information when purchasing a plan
Files and documents you upload for processing
Information Collected Automatically
IP address and browser type
Pages visited and time spent on our site
Device information and operating system
Cookies and usage data
3. How We Use Your Information
We use the information we collect to:
Provide, operate, and maintain our PDF services
Process transactions and send related information
Respond to customer support inquiries
Improve and personalize your experience on our platform
Send administrative updates, security alerts, and service-related notices
Comply with legal obligations
4. Your Uploaded Files
We understand that the documents you upload may contain sensitive information. Please note:
Files uploaded for processing are used solely to perform the requested task
We do not access, read, or share your documents with third parties
Uploaded files are automatically deleted from our servers within 24 hours of processing
All file transfers are protected with HTTPS encryption
5. Sharing Your Information
We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
Service Providers: Trusted third-party vendors who assist in operating our platform, subject to confidentiality agreements
Legal Requirements: When required by law, court order, or governmental authority
Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction
6. Cookies
We use cookies and similar tracking technologies to enhance your experience on pdfezy.com. These include:
Essential Cookies: Necessary for the site to function properly
Analytics Cookies: Help us understand how visitors interact with our site
Preference Cookies: Remember your settings and preferences
You can control cookie settings through your browser at any time. Disabling certain cookies may affect the functionality of our services.
7. Data Security
We implement industry-standard security measures to protect your personal information, including:
HTTPS encryption for all data transfers
Secure servers with restricted access
Regular security audits and monitoring
While we take every precaution, no method of transmission over the internet is 100% secure. We encourage you to use our services responsibly.
8. Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. You may request deletion of your account and associated data at any time by contacting us.
9. Your Rights
Depending on your location, you may have the following rights regarding your personal data:
Access: Request a copy of the personal data we hold about you
Correction: Request that we correct inaccurate or incomplete information
Deletion: Request that we delete your personal data
Opt-Out: Unsubscribe from marketing communications at any time
Data Portability: Request a transfer of your data in a machine-readable format
To exercise any of these rights, please contact us at the details below.
10. Children's Privacy
PdfEzy is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete it promptly.
11. Third-Party Links
Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their privacy policies independently.
12. Changes to This Policy
We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
13. Contact Us
If you have any questions or concerns about this Privacy Policy, please contact us at:
hello@pdfezy.com`;

export default function PrivacyPage() {
  return <LegalTextPage title="Privacy Policy" content={content} />;
}
