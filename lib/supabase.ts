
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rnpvobbndmplfiorvcma.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_JkPrDlDGJ48UM-yqYlFB2Q_We7IiW_z'; // Public key provided by user

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const projectMetadata = {
  name: 'labourtsdashboard',
  id: 'rnpvobbndmplfiorvcma',
  region: 'ap-south-1', // Default for TS region usually
  status: 'Live'
};
