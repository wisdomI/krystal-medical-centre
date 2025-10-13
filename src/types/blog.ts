export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  category: 'news' | 'health-tips' | 'announcements' | 'medical-updates';
  tags: string[];
  featuredImage?: string;
  readTime: number; // in minutes
  isPublished: boolean;
  isFeatured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}
