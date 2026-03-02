-- migrations/00_schema.sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade on update cascade,
  username text unique,
  full_name text,
  headline text,
  bio text,
  location text,
  avatar_url text,
  phone text,
  email text,
  linkedin_url text,
  github_url text,
  website_url text,
  social_links jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: projects
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  short_description text,
  description text,
  tech_stack text[] default '{}'::text[],
  role text,
  demo_url text,
  github_url text,
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: experiences
create table public.experiences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  company text not null,
  role text not null,
  duration text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: certificates
create table public.certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  issuer text not null,
  issue_date text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: awards
create table public.awards (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: skills
create table public.skills (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  skill_name text not null,
  category text,
  level integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: portfolio_views
create table public.portfolio_views (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------- Row Level Security (RLS) -----------------
-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.certificates enable row level security;
alter table public.awards enable row level security;
alter table public.skills enable row level security;
alter table public.portfolio_views enable row level security;

-- Profiles: Public can read, owners can write
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Projects: Public can read, owners can write
create policy "Projects are viewable by everyone." on public.projects for select using (true);
create policy "Users can insert own projects." on public.projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects." on public.projects for update using (auth.uid() = user_id);
create policy "Users can delete own projects." on public.projects for delete using (auth.uid() = user_id);

-- Experiences: Public can read, owners can write
create policy "Experiences are viewable by everyone." on public.experiences for select using (true);
create policy "Users can insert own experiences." on public.experiences for insert with check (auth.uid() = user_id);
create policy "Users can update own experiences." on public.experiences for update using (auth.uid() = user_id);
create policy "Users can delete own experiences." on public.experiences for delete using (auth.uid() = user_id);

-- Certificates: Public can read, owners can write
create policy "Certificates are viewable by everyone." on public.certificates for select using (true);
create policy "Users can insert own certificates." on public.certificates for insert with check (auth.uid() = user_id);
create policy "Users can update own certificates." on public.certificates for update using (auth.uid() = user_id);
create policy "Users can delete own certificates." on public.certificates for delete using (auth.uid() = user_id);

-- Awards: Public can read, owners can write
create policy "Awards are viewable by everyone." on public.awards for select using (true);
create policy "Users can insert own awards." on public.awards for insert with check (auth.uid() = user_id);
create policy "Users can update own awards." on public.awards for update using (auth.uid() = user_id);
create policy "Users can delete own awards." on public.awards for delete using (auth.uid() = user_id);

-- Skills: Public can read, owners can write
create policy "Skills are viewable by everyone." on public.skills for select using (true);
create policy "Users can insert own skills." on public.skills for insert with check (auth.uid() = user_id);
create policy "Users can update own skills." on public.skills for update using (auth.uid() = user_id);
create policy "Users can delete own skills." on public.skills for delete using (auth.uid() = user_id);

-- Portfolio views: Public can inert, only owners can view stats (or maybe keep it private?)
create policy "Anyone can insert a page view." on public.portfolio_views for insert with check (true);
create policy "Users can view their own portfolio views." on public.portfolio_views for select using (auth.uid() = profile_id);

-- Storage Buckets: Wait, storage cannot be created in direct SQL as easily without using auth. However, here are policies for buckets assuming we create "avatars", "projects", "certificates".
-- Let's assume bucket setup is manual in the Supabase UI.
-- For the sake of completeness, user needs to create the bucket 'user_uploads' in Supabase Storage.

-- Trigger to create a profile automatically when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
