import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// We'll read these from process.env when we run the script, which means you need to pass them or use dotenv in the script.
// To keep it simple, we expect them in the environment or fallback to empty (which will throw).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(url, key);
const contentPath = join(process.cwd(), 'visual-data', 'content.json');

let content;
try {
  content = JSON.parse(readFileSync(contentPath, 'utf8'));
} catch (e) {
  console.error("Failed to read visual-data/content.json", e);
  process.exit(1);
}

async function update() {
  console.log("Pushing content to Supabase...");
  const { data, error } = await supabase
    .from('content_store')
    .update({ data: content })
    .eq('id', 'main')
    .select();
    
  if (error) {
    console.error("Error updating Supabase:", error);
  } else {
    console.log("Successfully updated Supabase! Rows affected:", data?.length);
  }
}

update();
