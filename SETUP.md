# Krystal Medical Centre Website - Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=appointments@krystalmedical.com

# Email Addresses for Notifications
APPOINTMENT_EMAIL=appointments@krystalmedical.com
CONTACT_EMAIL=info@krystalmedical.com

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Email Setup

### Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS`

### Alternative Email Providers
- **Outlook/Hotmail**: Use `smtp-mail.outlook.com` port 587
- **Yahoo**: Use `smtp.mail.yahoo.com` port 587
- **Custom SMTP**: Configure according to your provider's settings

## Features Implemented

### ✅ Completed Features

1. **Landing/Home Page**
   - Hero section with CTA buttons
   - Services overview with icons
   - Testimonials section
   - Statistics and trust signals
   - Why choose us section

2. **Appointment Booking System**
   - Comprehensive booking form with validation
   - Email notifications to patients and staff
   - Form validation using Zod schema
   - Responsive design

3. **Static Pages**
   - About Us: Mission, vision, leadership, history
   - Contact Us: Contact form, location info, map placeholder
   - Services: Detailed service descriptions with features
   - Blog: News and health tips with CMS-like structure

4. **Blog/News Section**
   - Blog listing page with categories
   - Individual blog post pages
   - Blog sidebar with categories and recent posts
   - SEO-optimized blog structure

5. **Admin Dashboard**
   - Appointment management interface
   - Status tracking (pending, confirmed, cancelled, completed)
   - Filtering and search functionality
   - Statistics overview

6. **Technical Features**
   - Responsive design (mobile, tablet, desktop)
   - SEO best practices with proper meta tags
   - Form validation and error handling
   - Email integration with Nodemailer
   - Modern UI components with Tailwind CSS

### 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form with Zod validation
- **Email**: Nodemailer for email notifications
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **UI Components**: Custom component library

### 📧 Email Integration

The system sends two types of emails:

1. **Patient Confirmation**: Sent to patients when they book an appointment
2. **Staff Notification**: Sent to staff email for appointment management

### 🎨 Design Features

- Modern, clean design with medical theme
- Blue color scheme representing trust and professionalism
- Responsive layout that works on all devices
- Accessible design with proper contrast and focus states
- Professional typography and spacing

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for touch interactions
- Readable text sizes on all devices

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create `.env.local` file with the configuration above

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Deployment

The website is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Digital Ocean App Platform

Make sure to set the environment variables in your deployment platform.

## Future Enhancements

### 🔮 Planned Features

1. **Database Integration**
   - PostgreSQL/MongoDB for data persistence
   - User authentication system
   - Patient records management

2. **Advanced Features**
   - Online payment integration
   - SMS notifications
   - Calendar integration
   - Patient portal
   - Telemedicine capabilities

3. **Analytics & Reporting**
   - Appointment analytics
   - Patient feedback system
   - Performance metrics

4. **Content Management**
   - Admin blog editor
   - Image upload system
   - SEO optimization tools

## Support

For technical support or questions about the implementation, please contact the development team.

---

**Built with ❤️ for Krystal Medical Centre**
