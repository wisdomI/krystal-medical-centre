import { BlogPost } from '@/types/blog';

let serverPosts: BlogPost[] = [];

export class BlogStorage {
  addPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): BlogPost {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...post,
      id: `POST-${Date.now()}`,
      publishedAt: now,
      updatedAt: now,
    };
    serverPosts.unshift(newPost);
    return newPost;
  }

  getAll(): BlogPost[] {
    return [...serverPosts];
  }

  getById(id: string): BlogPost | undefined {
    return serverPosts.find(p => p.id === id);
  }

  update(id: string, updates: Partial<Omit<BlogPost, 'id' | 'publishedAt'>>): BlogPost | undefined {
    const idx = serverPosts.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    const updated: BlogPost = {
      ...serverPosts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    } as BlogPost;
    serverPosts[idx] = updated;
    return updated;
  }

  delete(id: string): boolean {
    const before = serverPosts.length;
    serverPosts = serverPosts.filter(p => p.id !== id);
    return serverPosts.length < before;
  }
}

export const blogStorage = new BlogStorage();


