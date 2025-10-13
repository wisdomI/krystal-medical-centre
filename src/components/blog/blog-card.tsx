import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${featured ? 'border-brand-100 bg-brand-100/50' : ''}`}>
        <CardHeader>
          <div className="space-y-3">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <h3 className={`font-semibold text-gray-900 hover:text-brand-700 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
              {post.title}
            </h3>
            
            <p className="text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{post.author}</span>
            </div>
            
            <div className="flex space-x-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
