import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPost, BlogCategory } from '@/types/blog';

interface BlogSidebarProps {
  categories: BlogCategory[];
  recentPosts: BlogPost[];
  tags: string[];
}

export function BlogSidebar({ categories, recentPosts, tags }: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">{category.name}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.postCount}
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-brand-100 hover:text-brand-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="border-brand-100 bg-brand-100/50">
        <CardHeader>
          <CardTitle className="text-brand-900">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-brand-700 text-sm mb-4">
            Subscribe to our newsletter for the latest health tips and medical updates.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-brand-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
            <Button className="w-full bg-brand-700 hover:bg-brand-800">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
