import { Metadata } from 'next';
import { BlogList } from '@/components/blog/blog-list';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { blogPosts as staticPosts, categories } from '@/data/blog-posts';
import { blogStorage } from '@/lib/blog-storage';

export const metadata: Metadata = {
  title: 'Blog & News - Krystal Medical Centre',
  description: 'Stay updated with the latest health tips, medical news, and announcements from Krystal Medical Centre.',
};

export default function BlogPage() {
  const dynamicPosts = blogStorage.getAll();
  const blogPosts = [...dynamicPosts, ...staticPosts];
  const featuredPost = blogPosts.find(post => post.isFeatured);
  
  // Get recent posts (excluding featured)
  const recentPosts = blogPosts
    .filter(post => !post.isFeatured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Health Blog & News
            </h1>
            <p className="text-xl text-brand-100 leading-relaxed">
              Stay informed with the latest health tips, medical updates, and news from Krystal Medical Centre. 
              Our expert team shares valuable insights to help you maintain optimal health.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <BlogList posts={recentPosts} featuredPost={featuredPost} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar 
                categories={categories}
                recentPosts={blogPosts.slice(0, 5)}
                tags={allTags}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
