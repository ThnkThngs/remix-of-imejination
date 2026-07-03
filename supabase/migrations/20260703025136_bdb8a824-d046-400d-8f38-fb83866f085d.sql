
-- Portfolio
CREATE TABLE public.portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  location text,
  description text,
  cover_image text,
  gallery_images text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio TO authenticated;
GRANT ALL ON public.portfolio TO service_role;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published portfolio" ON public.portfolio
  FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage portfolio" ON public.portfolio
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  image text,
  published boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published services" ON public.services
  FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage services" ON public.services
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Homepage (single row)
CREATE TABLE public.homepage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text,
  hero_subtitle text,
  hero_video text,
  hero_cta text,
  about_text text,
  statistics jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage TO authenticated;
GRANT ALL ON public.homepage TO service_role;
ALTER TABLE public.homepage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view homepage" ON public.homepage
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage homepage" ON public.homepage
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.homepage (hero_title, hero_subtitle, hero_cta, about_text, statistics)
VALUES (
  'Frames that sell the place, not the pixel.',
  'Imejination is a Malaysian photography studio elevating properties with stunning aerial and ground perspectives.',
  'Start a brief',
  'Imejination is a Malaysian photography studio elevating properties with stunning aerial and ground perspectives.',
  '[{"label":"Followers","value":"1.5K+"},{"label":"Recommend","value":"98%"}]'::jsonb
);

-- Leads: extend for new admin schema
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS service text,
  ADD COLUMN IF NOT EXISTS message text;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER portfolio_set_updated_at BEFORE UPDATE ON public.portfolio
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER services_set_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER homepage_set_updated_at BEFORE UPDATE ON public.homepage
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
