
-- Create URLs table to store all shortened links
CREATE TABLE public.urls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  original_url TEXT NOT NULL,
  short_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  click_count INTEGER DEFAULT 0
);

-- Create table to track anonymous users' usage
CREATE TABLE public.anonymous_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ip_address, session_id)
);

-- Enable Row Level Security
ALTER TABLE public.urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymous_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for URLs table
-- Allow anyone to read URLs (needed for redirects)
CREATE POLICY "Anyone can view URLs for redirects" 
  ON public.urls 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to see their own URLs
CREATE POLICY "Users can view their own URLs" 
  ON public.urls 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow authenticated users to create URLs
CREATE POLICY "Authenticated users can create URLs" 
  ON public.urls 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Allow anyone to create anonymous URLs (for guest users)
CREATE POLICY "Allow anonymous URL creation" 
  ON public.urls 
  FOR INSERT 
  WITH CHECK (user_id IS NULL);

-- Allow users to update their own URLs (for click counting)
CREATE POLICY "Users can update their own URLs" 
  ON public.urls 
  FOR UPDATE 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for anonymous usage tracking
CREATE POLICY "Allow anonymous usage tracking" 
  ON public.anonymous_usage 
  FOR ALL 
  USING (true);

-- Create index for faster lookups
CREATE INDEX idx_urls_short_id ON public.urls(short_id);
CREATE INDEX idx_urls_user_id ON public.urls(user_id);
CREATE INDEX idx_anonymous_usage_ip ON public.anonymous_usage(ip_address);
