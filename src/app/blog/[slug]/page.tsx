import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { blogPosts as staticPosts, categories } from '@/data/blog-posts';
import { blogStorage } from '@/lib/blog-storage';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const all = [...blogStorage.getAll(), ...staticPosts];
  const post = all.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Krystal Medical Centre',
    };
  }

  return {
    title: `${post.title} - Krystal Medical Centre`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const all = [...blogStorage.getAll(), ...staticPosts];
  const post = all.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get related posts (same category, excluding current post)
  const relatedPosts = all
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Get all unique tags
  const allTags = Array.from(new Set(all.flatMap(p => p.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600">
                {post.excerpt}
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-100 text-brand-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <div className="max-w-4xl mx-auto">
                <article className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>
                
                {/* Author Bio */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-brand-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.author}
                      </h3>
                      <p className="text-brand-700 font-medium">
                        {post.authorRole}
                      </p>
                      <p className="text-gray-600 mt-2">
                        Experienced medical professional dedicated to providing quality healthcare 
                        and sharing valuable health insights with our community.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Related Articles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-gray-900 hover:text-brand-700 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-2">
                            {formatDate(relatedPost.publishedAt)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar 
                categories={categories}
                recentPosts={all.slice(0, 5)}
                tags={allTags}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
