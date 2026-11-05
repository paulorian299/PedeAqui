import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylfjmozppenlvidmbmeg.supabase.co';

const supabaseAnonKey = 'sb_publishable_TttFJew9x6kz33sCylNXYA_3T-KutG8';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);