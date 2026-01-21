export interface User {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  avatar_url: string;
  linkedin_url: string | null;
  twitter_url: string | null;
}
