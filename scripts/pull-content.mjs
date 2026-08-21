import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(url, key);
const contentPath = join(process.cwd(), 'visual-data', 'content.json');

async function pull() {
  console.log("Pulling content from Supabase...");
  const { data, error } = await supabase
    .from('content_store')
    .select('data')
    .eq('id', 'main')
    .single();
    
  if (error) {
    console.error("Error fetching from Supabase:", error);
  } else if (data && data.data) {
    try {
      writeFileSync(contentPath, JSON.stringify(data.data, null, 2), 'utf8');
      console.log("Successfully updated visual-data/content.json from Supabase!");
    } catch (e) {
      console.error("Failed to write visual-data/content.json", e);
    }
  } else {
    console.log("No data found for id='main'");
  }
}

pull();
