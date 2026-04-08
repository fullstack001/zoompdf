import LegalTextPage from "@/components/legal/LegalTextPage";

const content = `Effective Date: April 7, 2026
Website: pdfezy.com
1. Introduction
This Cookie Policy explains how PdfEzy ("we," "our," or "us") uses cookies and similar tracking technologies when you visit pdfezy.com. It describes what these technologies are, why we use them, and your rights to control their use.
Please read this policy alongside our Privacy Policy and Terms of Use for a complete understanding of how we handle your data.
2. What Are Cookies?
Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to website owners.
Cookies can be:
Session Cookies: Temporary cookies that are deleted when you close your browser
Persistent Cookies: Cookies that remain on your device for a set period of time or until you delete them
First-Party Cookies: Set directly by pdfezy.com
Third-Party Cookies: Set by external services we use, such as analytics or payment providers
3. Why We Use Cookies
We use cookies to:
Ensure our website functions properly and securely
Remember your preferences and settings
Understand how visitors interact with our Site
Improve the performance and user experience of our Services
Deliver relevant information and support
Process secure transactions
4. Types of Cookies We Use
Essential Cookies These cookies are strictly necessary for pdfezy.com to function. Without them, certain features of our Site - such as logging in, uploading files, or processing documents - would not work. These cookies do not collect personal information and cannot be disabled.
Examples include:
Session management cookies
Security and authentication cookies
Load balancing cookies
Analytics and Performance Cookies These cookies help us understand how visitors use our Site by collecting anonymous information such as the number of visitors, pages viewed, and traffic sources. This helps us improve the way our Site works.
Examples include:
Google Analytics cookies
Page view and click tracking cookies
We ensure that any analytics data collected is anonymized and cannot be used to identify you personally.
Functional Cookies These cookies allow our Site to remember choices you make and provide enhanced, more personalized features. They may be set by us or by third-party providers whose services we use.
Examples include:
Language and region preference cookies
User interface customization cookies
Remembered login details (if you opt in)
Marketing and Targeting Cookies These cookies may be used to deliver advertisements and promotions that are relevant to you and your interests. They also help us measure the effectiveness of our marketing campaigns.
Examples include:
Retargeting cookies
Social media tracking pixels
Campaign performance cookies
We only use marketing cookies where permitted by applicable law and with your consent where required.
5. Third-Party Cookies
Some cookies on pdfezy.com are placed by third-party services that appear on our pages. These third parties may include:
Google Analytics - for website traffic and behavior analysis
Stripe or PayPal - for secure payment processing
Intercom or similar tools - for customer support and live chat
Social media platforms - for sharing and engagement features
These third parties have their own privacy and cookie policies, and we encourage you to review them. PdfEzy does not control third-party cookies and is not responsible for how those parties use them.
6. Cookie Duration
The cookies we use vary in how long they remain on your device:
Cookie Type
Duration
Session Cookies
Deleted when browser is closed
Authentication Cookies
Up to 30 days
Preference Cookies
Up to 12 months
Analytics Cookies
Up to 24 months
Marketing Cookies
Up to 12 months
7. Managing Your Cookie Preferences
You have the right to accept or decline cookies. There are several ways you can manage your cookie preferences:
Cookie Consent Banner When you first visit pdfezy.com, you will be presented with a cookie consent banner. You can choose to accept all cookies, reject non-essential cookies, or customize your preferences.
Browser Settings Most web browsers allow you to control cookies through their settings. You can typically:
View cookies that have been set
Block all or specific cookies
Delete cookies from your device
Set preferences for future cookie use
Below are links to cookie management guides for common browsers:
Google Chrome
Mozilla Firefox
Safari
Microsoft Edge
Please note that disabling certain cookies may affect the functionality of pdfezy.com and limit your access to some features.
Opt-Out of Analytics You can opt out of Google Analytics tracking by installing the Google Analytics Opt-Out Browser Add-on.
8. Do Not Track Signals
Some browsers offer a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no universal standard for how websites should respond to DNT signals. At this time, pdfezy.com does not alter its data collection practices in response to DNT signals, but we continue to monitor developments in this area.
9. Cookies and Sensitive Documents
We understand that the files you process through pdfezy.com may contain sensitive information. Please note that cookies are not used to access, read, or store the content of your uploaded documents. File processing is handled separately and securely, as outlined in our Privacy Policy.
10. Updates to This Cookie Policy
We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. When we do, we will update the effective date at the top of this page. We encourage you to review this policy periodically.
11. Contact Us
If you have any questions or concerns about this Privacy Policy, please contact us at:
hello@pdfezy.com`;

export default function CookiesPage() {
  return <LegalTextPage title="Cookie Policy" content={content} />;
}
