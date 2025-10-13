import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Essential Health Tips for the Rainy Season',
    slug: '5-essential-health-tips-rainy-season',
    excerpt: 'Stay healthy during the rainy season with these practical tips to prevent common illnesses and maintain your well-being.',
    content: `
      <p>The rainy season brings relief from the heat but also increases the risk of various health issues. Here are five essential tips to keep you healthy:</p>
      
      <h3>1. Boost Your Immune System</h3>
      <p>Eat a balanced diet rich in vitamins C and D. Include citrus fruits, leafy greens, and consider supplements if needed. Regular exercise and adequate sleep are also crucial for maintaining a strong immune system.</p>
      
      <h3>2. Stay Hydrated</h3>
      <p>Even though it's raining, your body still needs proper hydration. Drink at least 8 glasses of water daily and avoid excessive consumption of caffeinated beverages.</p>
      
      <h3>3. Practice Good Hygiene</h3>
      <p>Wash your hands frequently, especially before eating. Keep your surroundings clean and dry to prevent the growth of mold and bacteria.</p>
      
      <h3>4. Protect Against Mosquitoes</h3>
      <p>Use mosquito repellents and ensure your environment is free from stagnant water where mosquitoes breed. Consider using mosquito nets while sleeping.</p>
      
      <h3>5. Dress Appropriately</h3>
      <p>Wear breathable, quick-dry clothing and always carry an umbrella. Keep your feet dry to prevent fungal infections.</p>
      
      <p>Remember, prevention is better than cure. If you experience any unusual symptoms, don't hesitate to consult with our medical professionals at Krystal Medical Centre.</p>
    `,
    author: 'Dr. Sarah Williams',
    authorRole: 'Chief Medical Officer',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    category: 'health-tips',
    tags: ['rainy season', 'health tips', 'prevention', 'immunity', 'hygiene'],
    readTime: 5,
    isPublished: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'New Cardiology Department Opens at Krystal Medical Centre',
    slug: 'new-cardiology-department-opens',
    excerpt: 'We are excited to announce the opening of our new state-of-the-art Cardiology Department with advanced diagnostic equipment.',
    content: `
      <p>We are thrilled to announce the opening of our new Cardiology Department at Krystal Medical Centre. This expansion represents our commitment to providing comprehensive cardiovascular care to our community.</p>
      
      <h3>What's New?</h3>
      <ul>
        <li>Advanced ECG and stress testing equipment</li>
        <li>Echocardiography services</li>
        <li>Cardiac rehabilitation programs</li>
        <li>Specialized consultation rooms</li>
      </ul>
      
      <h3>Our Cardiology Team</h3>
      <p>Led by Dr. Michael Adebayo, our experienced cardiology team is ready to provide expert care for various heart conditions including:</p>
      <ul>
        <li>Hypertension management</li>
        <li>Heart disease prevention</li>
        <li>Post-heart attack care</li>
        <li>Arrhythmia treatment</li>
      </ul>
      
      <h3>Appointment Booking</h3>
      <p>To schedule an appointment with our cardiology team, please call us at +234 902 745 9017 or book online through our appointment system.</p>
      
      <p>We look forward to serving your cardiovascular health needs with the highest standard of care.</p>
    `,
    author: 'Krystal Medical Centre',
    authorRole: 'Administration',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    category: 'announcements',
    tags: ['cardiology', 'new department', 'heart care', 'announcement'],
    readTime: 4,
    isPublished: true,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Understanding Diabetes: Prevention and Management',
    slug: 'understanding-diabetes-prevention-management',
    excerpt: 'Learn about diabetes types, prevention strategies, and effective management techniques to maintain optimal health.',
    content: `
      <p>Diabetes is a chronic condition that affects millions of people worldwide. Understanding the disease and how to manage it effectively is crucial for maintaining good health.</p>
      
      <h3>Types of Diabetes</h3>
      <p><strong>Type 1 Diabetes:</strong> An autoimmune condition where the body doesn't produce insulin. Usually diagnosed in children and young adults.</p>
      <p><strong>Type 2 Diabetes:</strong> The most common type, where the body becomes resistant to insulin or doesn't produce enough. Often related to lifestyle factors.</p>
      <p><strong>Gestational Diabetes:</strong> Develops during pregnancy and usually resolves after childbirth.</p>
      
      <h3>Prevention Strategies</h3>
      <ul>
        <li>Maintain a healthy weight</li>
        <li>Eat a balanced diet rich in fiber</li>
        <li>Exercise regularly</li>
        <li>Limit sugar and processed foods</li>
        <li>Get regular health check-ups</li>
      </ul>
      
      <h3>Management Tips</h3>
      <ul>
        <li>Monitor blood sugar levels regularly</li>
        <li>Follow your doctor's medication plan</li>
        <li>Maintain a consistent meal schedule</li>
        <li>Stay physically active</li>
        <li>Manage stress effectively</li>
      </ul>
      
      <h3>When to See a Doctor</h3>
      <p>If you experience symptoms like increased thirst, frequent urination, unexplained weight loss, or persistent fatigue, consult with our medical team for proper evaluation and management.</p>
      
      <p>At Krystal Medical Centre, we provide comprehensive diabetes care including regular monitoring, medication management, and lifestyle counseling.</p>
    `,
    author: 'Dr. Grace Okonkwo',
    authorRole: 'Endocrinologist',
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    category: 'health-tips',
    tags: ['diabetes', 'health management', 'prevention', 'chronic disease', 'endocrinology'],
    readTime: 7,
    isPublished: true,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'COVID-19 Safety Measures at Our Medical Centre',
    slug: 'covid-19-safety-measures',
    excerpt: 'Learn about the comprehensive safety measures we have implemented to ensure a safe environment for all patients and staff.',
    content: `
      <p>Your safety and health are our top priorities. We have implemented comprehensive safety measures to protect everyone at our medical centre during the ongoing COVID-19 pandemic.</p>
      
      <h3>Safety Protocols</h3>
      <ul>
        <li>Mandatory temperature checks at entry points</li>
        <li>Hand sanitizing stations throughout the facility</li>
        <li>Regular disinfection of all surfaces</li>
        <li>Social distancing measures in waiting areas</li>
        <li>Personal protective equipment for all staff</li>
      </ul>
      
      <h3>Appointment Guidelines</h3>
      <ul>
        <li>Pre-screening questions before appointments</li>
        <li>Limited capacity in waiting rooms</li>
        <li>Telemedicine options available</li>
        <li>Staggered appointment times</li>
      </ul>
      
      <h3>What We Ask of You</h3>
      <ul>
        <li>Wear a face mask at all times</li>
        <li>Maintain social distancing</li>
        <li>Use hand sanitizer frequently</li>
        <li>Reschedule if you feel unwell</li>
        <li>Arrive on time for appointments</li>
      </ul>
      
      <h3>Vaccination Information</h3>
      <p>We continue to encourage COVID-19 vaccination for eligible patients. Our medical team can provide information about vaccination schedules and address any concerns you may have.</p>
      
      <p>Thank you for your cooperation in helping us maintain a safe environment for everyone.</p>
    `,
    author: 'Krystal Medical Centre',
    authorRole: 'Administration',
    publishedAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    category: 'announcements',
    tags: ['covid-19', 'safety measures', 'health protocols', 'pandemic response'],
    readTime: 6,
    isPublished: true,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'The Importance of Regular Health Check-ups',
    slug: 'importance-regular-health-checkups',
    excerpt: 'Discover why regular health check-ups are crucial for maintaining good health and preventing serious medical conditions.',
    content: `
      <p>Regular health check-ups are one of the most important steps you can take to maintain your health and well-being. These preventive visits help identify potential health issues before they become serious problems.</p>
      
      <h3>Benefits of Regular Check-ups</h3>
      <ul>
        <li><strong>Early Detection:</strong> Identify health issues in their early stages when they're most treatable</li>
        <li><strong>Prevention:</strong> Take preventive measures based on your health status</li>
        <li><strong>Health Monitoring:</strong> Track changes in your health over time</li>
        <li><strong>Peace of Mind:</strong> Know your health status and address concerns</li>
      </ul>
      
      <h3>What to Expect During a Check-up</h3>
      <ul>
        <li>Review of your medical history</li>
        <li>Physical examination</li>
        <li>Blood pressure and vital signs check</li>
        <li>Laboratory tests as needed</li>
        <li>Discussion of lifestyle factors</li>
        <li>Health recommendations</li>
      </ul>
      
      <h3>Recommended Schedule</h3>
      <ul>
        <li><strong>Adults 18-39:</strong> Every 2-3 years</li>
        <li><strong>Adults 40-64:</strong> Every 1-2 years</li>
        <li><strong>Adults 65+:</strong> Annually</li>
        <li><strong>High-risk individuals:</strong> As recommended by your doctor</li>
      </ul>
      
      <h3>Preparing for Your Check-up</h3>
      <ul>
        <li>Bring a list of current medications</li>
        <li>Note any symptoms or concerns</li>
        <li>Bring insurance information</li>
        <li>Fast if blood tests are required</li>
      </ul>
      
      <p>At Krystal Medical Centre, we offer comprehensive health check-ups tailored to your age, gender, and risk factors. Schedule your appointment today to take charge of your health.</p>
    `,
    author: 'Dr. Sarah Williams',
    authorRole: 'Chief Medical Officer',
    publishedAt: '2023-12-28T11:30:00Z',
    updatedAt: '2023-12-28T11:30:00Z',
    category: 'health-tips',
    tags: ['health checkups', 'prevention', 'wellness', 'healthcare', 'routine care'],
    readTime: 6,
    isPublished: true,
    isFeatured: true,
  },
];

export const categories = [
  {
    id: 'news',
    name: 'News',
    slug: 'news',
    description: 'Latest news and updates from Krystal Medical Centre',
    postCount: 1,
  },
  {
    id: 'health-tips',
    name: 'Health Tips',
    slug: 'health-tips',
    description: 'Practical health advice and wellness tips',
    postCount: 3,
  },
  {
    id: 'announcements',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Important announcements and updates',
    postCount: 2,
  },
  {
    id: 'medical-updates',
    name: 'Medical Updates',
    slug: 'medical-updates',
    description: 'Medical news and research updates',
    postCount: 0,
  },
];
