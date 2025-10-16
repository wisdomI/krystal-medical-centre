import { NextRequest, NextResponse } from 'next/server';
import { blogStorage } from '@/lib/blog-storage';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(50),
  author: z.string().min(2),
  authorRole: z.string().min(2),
  category: z.enum(['news', 'health-tips', 'announcements', 'medical-updates']),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().optional(),
  readTime: z.number().min(1),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().optional(),
});

export async function GET() {
  const posts = blogStorage.getAll();
  return NextResponse.json({ posts }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = blogSchema.parse(body);
    const post = blogStorage.addPost(data);
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'issues' in e) {
      return NextResponse.json({ success: false, message: 'Invalid data', errors: (e as { issues: unknown }).issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to create post' }, { status: 500 });
  }
}


