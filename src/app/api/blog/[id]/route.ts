import { NextRequest, NextResponse } from 'next/server';
import { blogStorage } from '@/lib/blog-storage';
import { z } from 'zod';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = blogStorage.getById(params.id);
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updates = updateSchema.parse(body);
    const post = blogStorage.update(params.id, updates);
    if (!post) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, post });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ success: false, message: 'Invalid data', errors: e.issues }, { status: 400 });
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const deleted = blogStorage.delete(params.id);
  if (!deleted) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}


