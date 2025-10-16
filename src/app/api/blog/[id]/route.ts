import { NextRequest, NextResponse } from 'next/server';
import { blogStorage } from '@/lib/blog-storage';
import { z } from 'zod';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogStorage.getById(id);
  if (!post) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, post });
}

const updateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  authorRole: z.string().optional(),
  category: z.enum(['news', 'health-tips', 'announcements', 'medical-updates']).optional(),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  readTime: z.number().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updates = updateSchema.parse(body);
    const post = blogStorage.update(id, updates);
    if (!post) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, post });
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'issues' in e) {
      return NextResponse.json({ success: false, message: 'Invalid data', errors: (e as { issues: unknown }).issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = blogStorage.delete(id);
  if (!deleted) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}


