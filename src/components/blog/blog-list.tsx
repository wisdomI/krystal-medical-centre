import { BlogCard } from './blog-card';
import { BlogPost } from '@/types/blog';

interface BlogListProps {
  posts: BlogPost[];
  featuredPost?: BlogPost;
}

export function BlogList({ posts, featuredPost }: BlogListProps) {
  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {featuredPost && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <BlogCard post={featuredPost} featured />
        </div>
      )}
      
      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
