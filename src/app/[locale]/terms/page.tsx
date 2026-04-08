import LegalTextPage from "@/components/legal/LegalTextPage";

const content = `Effective Date: April 7, 2026
Website: pdfezy.com
1. Acceptance of Terms
By accessing or using pdfezy.com (the "Site") and any of its tools or services (the "Services"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please discontinue use of our Site immediately.
These Terms apply to all visitors, registered users, and anyone who accesses or uses our Services.
2. About PdfEzy
PdfEzy provides online PDF tools and document management solutions designed to help individuals and businesses create, convert, edit, sign, and manage PDF files efficiently and securely.
3. Eligibility
To use our Services, you must:
Be at least 16 years of age
Have the legal capacity to enter into a binding agreement
Not be prohibited from using our Services under applicable laws in your jurisdiction
By using pdfezy.com, you represent and warrant that you meet all of the above requirements.
4. User Accounts
Account Creation Some features of our Services require you to register for an account. When creating an account, you agree to:
Provide accurate, current, and complete information
Keep your login credentials confidential
Notify us immediately of any unauthorized use of your account
Accept responsibility for all activity that occurs under your account
Account Termination We reserve the right to suspend or terminate your account at any time if we believe you have violated these Terms or engaged in any conduct that is harmful to PdfEzy or other users.
5. Acceptable Use
You agree to use pdfezy.com only for lawful purposes and in a manner consistent with these Terms. You must not:
Upload, process, or distribute files that are illegal, harmful, defamatory, obscene, or infringe on the rights of others
Attempt to gain unauthorized access to any part of our Site or servers
Use our Services to transmit malware, viruses, or any malicious code
Scrape, crawl, or extract data from our Site without prior written consent
Reverse engineer, decompile, or disassemble any part of our software
Use our Services in any way that could damage, overburden, or impair our infrastructure
Resell or commercially exploit our Services without authorization
Violate any applicable local, national, or international laws or regulations
6. Your Files and Content
Ownership You retain full ownership of any files and documents you upload to pdfezy.com. We do not claim any intellectual property rights over your content.
License to Process By uploading files to our platform, you grant PdfEzy a limited, non-exclusive license to access and process those files solely for the purpose of delivering the requested service.
Your Responsibility You are solely responsible for the content of files you upload. You represent and warrant that:
You have the legal right to upload and process the files
Your files do not violate any third-party intellectual property, privacy, or other rights
Your files do not contain illegal or harmful content
File Deletion Uploaded files are automatically deleted from our servers within 24 hours of processing. We do not store your documents beyond what is necessary to complete the requested task.
7. Intellectual Property
All content on pdfezy.com - including but not limited to logos, text, graphics, software, and user interface design - is the property of PdfEzy and is protected by applicable intellectual property laws.
You may not copy, reproduce, distribute, or create derivative works from any part of our Site without our express written permission.
8. Subscription Plans and Payments
Paid Plans Some features of PdfEzy are available through paid subscription plans. By subscribing, you agree to pay the applicable fees as described at the time of purchase.
Billing Subscriptions are billed on a recurring basis (monthly or annually, depending on the plan selected). You authorize us to charge your chosen payment method at the start of each billing cycle.
Cancellations You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of the current billing period. We do not offer refunds for unused portions of a subscription unless required by law.
Price Changes We reserve the right to modify our pricing at any time. We will notify you in advance of any changes that affect your subscription.
9. Disclaimer of Warranties
Our Services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, PdfEzy disclaims all warranties, including but not limited to:
Fitness for a particular purpose
Merchantability
Non-infringement
Uninterrupted or error-free operation of the Site
We do not guarantee that our Services will meet your specific requirements or that any errors will be corrected.
10. Limitation of Liability
To the maximum extent permitted by applicable law, PdfEzy and its affiliates, officers, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
Your use of or inability to use our Services
Unauthorized access to or alteration of your files or data
Any errors, interruptions, or technical issues with the Site
Any third-party content or conduct on the platform
Our total liability to you for any claim arising from these Terms or your use of our Services shall not exceed the amount you paid us in the three months preceding the claim.
11. Indemnification
You agree to indemnify, defend, and hold harmless PdfEzy and its affiliates, officers, employees, and partners from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or related to:
Your use of our Services
Your violation of these Terms
Your violation of any third-party rights
Any content you upload or process through our platform
12. Third-Party Services
Our Site may include links to or integrations with third-party websites and services. These are provided for your convenience and do not constitute an endorsement. PdfEzy is not responsible for the content, availability, or privacy practices of any third-party services.
13. Privacy
Your use of pdfezy.com is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy at pdfezy.com/privacy-policy to understand our practices.
14. Modifications to the Service
We reserve the right to modify, suspend, or discontinue any part of our Services at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of our Services.
15. Changes to These Terms
We may update these Terms from time to time. When we do, we will update the effective date at the top of this page. Continued use of our Services after any changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
16. Governing Law
These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
17. Severability
If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
18. Entire Agreement
These Terms, together with our Privacy Policy, constitute the entire agreement between you and PdfEzy regarding your use of our Services and supersede all prior agreements or understandings.
19. Contact Us
If you have any questions or concerns about this Privacy Policy, please contact us at:
hello@pdfezy.com`;

export default function TermsPage() {
  return <LegalTextPage title="Terms of Use" content={content} />;
}
