import LegalTextPage from "@/components/legal/LegalTextPage";

const content = `Effective Date: April 7, 2026
Website: pdfezy.com
1. Subscription
The Service is offered on a subscription basis for a fee (Subscription). The subscription renews automatically until you cancel. By purchasing a trial or a Subscription, you agree that you will be charged the applicable Subscription Fee at the beginning of your subscription period and on each renewal date thereafter until you cancel, at the then-current Subscription Fee. The subscription period is either one month (a 28-day period) or one year (a 365-day period).
All prices applicable to you are stated on the payment page. Please read the payment page carefully before completing your purchase. We may charge any applicable fees in a single transaction or across a number of separate transactions.
2. Payment Method
Payment will be charged to the payment method you provided at the time of purchase. You authorize us (or our third-party payment processor) to automatically charge the applicable Subscription Fees on each renewal date to the payment method you provided until you cancel your Subscription.
You authorize PdfEzy to supply your payment details to a third-party payment provider for the purpose of processing your payments. Your credit or debit card provider may apply currency conversion fees or other charges when processing your payments. PdfEzy is not responsible for any such additional charges.
3. Paid Trial
We may offer a paid trial for a small initial fee to allow you to explore our Service.
If you do not cancel your trial within the 7-day trial period, you will be automatically charged the full Subscription Fee as indicated on the payment page at the end of the trial period.
We may also from time to time offer discounted promotions that automatically renew at the full, non-discounted price after the promotional period ends. The applicable pricing will always be disclosed clearly on the payment page.
4. Cancellation
Your subscription renews automatically at the end of each subscription period until you cancel. To avoid being charged for the next period, you must cancel before the end of your then-current subscription period.
You can cancel your Subscription in any of the following ways:
By logging into your account and navigating to My Account -> Membership -> Cancel Subscription
By contacting our customer support team via email at support@pdfezy.com
By reaching out through the live chat feature available on pdfezy.com
You will remain responsible for all Subscription Fees incurred for the then-current subscription period. If you cancel, your access to the Service will continue until the end of that period and will then terminate without further charges.
PdfEzy reserves the right to cancel your Subscription if you fail to pay your Subscription Fees, violate our Terms of Use, or for any other reason at our sole discretion.
5. Refunds
We provide refunds under certain conditions. If you request a refund within 7 days from the date of your registration on pdfezy.com, you may be eligible for a full or partial refund of the Subscription Fee paid for the then-current subscription period.
PdfEzy maintains the right to initiate special pricing, promotional memberships, and other limited programs at its sole discretion. Any promotional credits or incentive amounts applied to a customer's account by PdfEzy remain the property of PdfEzy at all times. Unless otherwise stated, such credits are valid for use within thirty (30) days and are non-refundable.
We reserve the right to refuse a refund if you have violated any provisions of our Terms of Use.
Note for Colombian Residents. If you are a customer located in Colombia, you have the right to request a refund in the following cases:
Fraudulent or Unauthorized Transactions: If a payment was made fraudulently or without your authorization
Incorrect Charges: If the amount charged differs from the price displayed on pdfezy.com at the time of purchase
Duplicate Charges: If you were charged more than once for the same subscription or service
To exercise any of these rights, contact us at support@pdfezy.com within five (5) business days from the date you became aware of the issue. We may request supporting documentation to process your claim. Once verified, a full refund for the affected transaction will be issued to the original payment method.
Please note that if prices are displayed in Colombian pesos (COP) but your payment is processed in another currency, the final charge may vary due to exchange rate differences. We recommend checking current exchange rates through official sources before completing your purchase.
Note for Brazilian Residents. If you are a customer located in Brazil, you have the right to cancel your purchase within seven (7) calendar days from the date you entered into the contract. To exercise this right, please contact us at support@pdfezy.com within the 7-day period. We may ask for your order details or other information necessary to verify and process your cancellation.
Note for EU/EEA Residents. If you are a consumer based in the EEA or Switzerland, you have a legal right to withdraw from contracts for the purchase of our Service. However, where you make a purchase of a single item of digital content (such as an individual PDF file), you expressly agree that such content is made available to you immediately, and you therefore lose your right of withdrawal and will not be eligible for a refund.
By signing up for our Subscription Service, which is provided on a continuous basis, you expressly request and consent to its immediate supply. If you exercise your right of withdrawal, we will deduct from your refund an amount proportionate to the Service already provided before you communicated your withdrawal.
Exercise of the Right of Withdrawal. Where your right of withdrawal has not been lost, the withdrawal period expires 14 days after the day you entered into the contract. To exercise this right, you must inform PdfEzy of your decision to withdraw by an unequivocal written statement sent to support@pdfezy.com before the withdrawal period expires.
Model Withdrawal Form
To: PdfEzy - support@pdfezy.com
I hereby give notice that I withdraw from my contract for the following service:
Received on:
Name:
Address:
Date:
6. Translations
Any translation of this Subscription Policy from the English version is provided for convenience only. In the event of any discrepancy in meaning, interpretation, or content between the English version and any translation, the English language version shall prevail.
7. Changes to This Policy
We may update this Subscription Policy from time to time. When we do, we will revise the effective date at the top of this page and notify active subscribers by email where appropriate. Your continued use of our Services after any changes constitutes your acceptance of the revised policy.
8. Contact Us
If you have any questions or concerns about this Privacy Policy, please contact us at:
hello@pdfezy.com`;

export default function SubscriptionTermsPage() {
  return <LegalTextPage title="Subscription Policy" content={content} />;
}
