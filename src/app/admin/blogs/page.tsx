'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PostSummary {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to load');
      setPosts(data.posts);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
        <Link href="/admin" className="text-brand-700 hover:text-brand-800">Back to Dashboard</Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const payload = {
                title: String(formData.get('title') || ''),
                slug: String(formData.get('slug') || ''),
                excerpt: String(formData.get('excerpt') || ''),
                content: String(formData.get('content') || ''),
                author: String(formData.get('author') || ''),
                authorRole: String(formData.get('authorRole') || ''),
                category: String(formData.get('category') || 'news'),
                tags: String(formData.get('tags') || '')
                  .split(',')
                  .map(t => t.trim())
                  .filter(Boolean),
                featuredImage: String(formData.get('featuredImage') || ''),
                readTime: Number(formData.get('readTime') || 3),
                isPublished: true,
                isFeatured: false,
              };
              const res = await fetch('/api/blog', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
              });
              if (!res.ok) { alert('Failed to create post'); return; }
              form.reset();
              await load();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input name="title" placeholder="Title" className="border rounded-lg p-2" required />
            <input name="slug" placeholder="Slug (unique)" className="border rounded-lg p-2" required />
            <input name="author" placeholder="Author" className="border rounded-lg p-2" required />
            <input name="authorRole" placeholder="Author Role" className="border rounded-lg p-2" required />
            <select name="category" className="border rounded-lg p-2">
              <option value="news">News</option>
              <option value="health-tips">Health Tips</option>
              <option value="announcements">Announcements</option>
              <option value="medical-updates">Medical Updates</option>
            </select>
            <input name="tags" placeholder="Tags (comma separated)" className="border rounded-lg p-2" />
            <input name="featuredImage" placeholder="Featured Image URL" className="border rounded-lg p-2 md:col-span-2" />
            <input name="readTime" type="number" min={1} placeholder="Read time (mins)" className="border rounded-lg p-2" />
            <input name="excerpt" placeholder="Short Excerpt" className="border rounded-lg p-2 md:col-span-2" required />
            <textarea name="content" placeholder="HTML Content" className="border rounded-lg p-2 md:col-span-2" rows={6} required />
            <div className="md:col-span-2">
              <button type="submit" className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-lg">Publish</button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && posts.length === 0 && <p className="text-gray-600">No posts yet.</p>}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Published</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-t">
                    <td className="py-2 pr-4 font-medium text-gray-900">{post.title}</td>
                    <td className="py-2 pr-4 text-gray-600">{post.category}</td>
                    <td className="py-2 pr-4 text-gray-600">{new Date(post.publishedAt).toLocaleDateString()}</td>
                    <td className="py-2 pr-4 flex gap-2">
                      <Link href={`/blog/${post.slug}`} className="text-brand-700 hover:text-brand-800">View</Link>
                      <button
                        onClick={async () => {
                          const title = prompt('New title', post.title);
                          if (!title) return;
                          const res = await fetch(`/api/blog/${post.id}`, {
                            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title })
                          });
                          if (!res.ok) { alert('Update failed'); return; }
                          await load();
                        }}
                        className="text-gray-700 hover:text-gray-900"
                      >Edit</button>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this post?')) return;
                          const res = await fetch(`/api/blog/${post.id}`, { method: 'DELETE' });
                          if (!res.ok) { alert('Delete failed'); return; }
                          await load();
                        }}
                        className="text-red-600 hover:text-red-700"
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


