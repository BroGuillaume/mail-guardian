const emails = [
  {
    subject: "PayPal Security Alert",
    sender: "security@paypal-alert.xyz",
    preview: "Your account has been suspended. Verify immediately...",
    content: `
Dear customer,

Your PayPal account has been temporarily suspended.
Please verify your credentials immediately using the link below:

http://paypal-secure-login.xyz

Thank you,
PayPal Security Team
    `
  },

  {
    subject: "Internship Interview Invitation",
    sender: "recruitment@company.com",
    preview: "We would like to schedule an interview next week...",
    content: `
Hello Francis,

We reviewed your application and would like to schedule an interview next week.
Please let us know your availability.

Best regards,
Recruitment Team
    `
  },

  {
    subject: "Your Package Delivery Attempt",
    sender: "delivery@parcel-center.net",
    preview: "We tried to deliver your package today...",
    content: `
Hello,

We attempted to deliver your package today but you were not home.
Please reschedule delivery using the link below:

https://parcel-center-delivery.com/reschedule

Thank you.
    `
  },

  {
    subject: "Unusual Login Attempt",
    sender: "no-reply@google-security.com",
    preview: "Someone tried to sign in to your account...",
    content: `
We detected an unusual login attempt on your Google account.
If this was not you, please secure your account immediately.

https://google-security-check.com

Google Account Protection
    `
  },

  {
    subject: "Invoice #2025-447 Available",
    sender: "billing@cloudhost.com",
    preview: "Your monthly invoice is ready...",
    content: `
Hello,

Your invoice for April 2026 is now available in your customer area.
Amount due: €12.99

Thank you for your trust.
CloudHost Billing
    `
  },

  {
    subject: "URGENT: Your Bank Account Is Locked",
    sender: "support@credit-agricole-secure.com",
    preview: "Immediate action required to unlock your account...",
    content: `
Dear customer,

Your Crédit Agricole account has been locked due to suspicious activity.
Please confirm your identity to restore access:

https://credit-agricole-verification.com

Bank Security Department
    `
  },

  {
    subject: "Your GitHub Password Was Changed",
    sender: "noreply@github.com",
    preview: "Your password was successfully updated...",
    content: `
Hi Francis,

Your GitHub password was successfully changed.
If you did not perform this action, please reset your password immediately.

GitHub Security
    `
  },

  {
    subject: "50% OFF on All Courses!",
    sender: "newsletter@learnfast.com",
    preview: "Special offer available this week only...",
    content: `
Hello!

Enjoy 50% OFF on all online courses this week only.
Upgrade your skills today!

LearnFast Team
    `
  },

  {
    subject: "Your Apple ID Receipt",
    sender: "no-reply@apple.com",
    preview: "Your receipt for your recent purchase...",
    content: `
Dear customer,

Here is the receipt for your recent purchase on the App Store.
If you did not authorize this transaction, report it immediately.

Apple Support
    `
  },

  {
    subject: "Crypto Investment Opportunity",
    sender: "advisor@crypto-future.io",
    preview: "Earn up to 300% ROI in 2 months...",
    content: `
Hello,

We offer a unique opportunity to invest in a high-growth crypto project.
Guaranteed returns up to 300%.

Join now:
http://crypto-future-invest.io
    `
  },

  {
    subject: "Your Doctor Appointment Reminder",
    sender: "contact@medicentre.fr",
    preview: "Your appointment is scheduled for tomorrow...",
    content: `
Bonjour Francis,

Ceci est un rappel pour votre rendez-vous médical prévu demain à 14h30.
Merci de venir 10 minutes en avance.

MediCentre
    `
  },

  {
    subject: "Microsoft Account Security Code",
    sender: "account-security@microsoft.com",
    preview: "Your verification code is 482991...",
    content: `
Your Microsoft verification code is: 482991

If you did not request this code, please secure your account.
    `
  },

  {
    subject: "Your Subscription Will Renew Soon",
    sender: "support@streamflix.com",
    preview: "Your subscription renews on May 3rd...",
    content: `
Hello,

Your StreamFlix subscription will renew automatically on May 3rd.
No action is required.

Thank you for watching!
    `
  },

  {
    subject: "Security Update Required",
    sender: "it-support@company-secure.net",
    preview: "Install the mandatory update before Friday...",
    content: `
Dear employee,

A mandatory security update must be installed before Friday.
Download the update here:

http://company-secure-update.net

IT Department
    `
  },

  {
    subject: "Your Resume Has Been Reviewed",
    sender: "jobs@techhire.com",
    preview: "We are pleased to inform you...",
    content: `
Hello Francis,

We reviewed your resume and would like to move forward with your application.
Please reply to schedule a call.

TechHire Recruitment
    `
  },

  {
    subject: "Your Amazon Order Has Shipped",
    sender: "shipment-tracking@amazon.com",
    preview: "Your order is on the way...",
    content: `
Hello,

Your Amazon order has shipped.
Track your package here:

https://amazon.com/track/123456
    `
  },

  {
    subject: "Password Reset Request",
    sender: "support@dropbox.com",
    preview: "Click the link to reset your password...",
    content: `
Hi,

We received a request to reset your Dropbox password.
If this was you, click the link below:

https://dropbox.com/reset-password

Dropbox Support
    `
  },

  {
    subject: "Your Account Will Be Deleted",
    sender: "admin@socialhub.net",
    preview: "Your account is scheduled for deletion...",
    content: `
Hello,

Your SocialHub account is scheduled for deletion due to inactivity.
Log in within 48 hours to keep your account.

SocialHub Team
    `
  },

  {
    subject: "Final Notice: Outstanding Payment",
    sender: "billing@energy-france.fr",
    preview: "Your last invoice remains unpaid...",
    content: `
Bonjour,

Votre dernière facture reste impayée.
Merci de régulariser votre situation dans les plus brefs délais.

Service Facturation
    `
  },

  {
    subject: "Confirm Your Email Address",
    sender: "no-reply@secure-mail.com",
    preview: "Please confirm your email to continue...",
    content: `
Hello,

Please confirm your email address by clicking the link below:

https://secure-mail.com/confirm/Francis

Thank you.
    `
  }
];

export default emails;
