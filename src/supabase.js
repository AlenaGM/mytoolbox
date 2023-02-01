import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cgjimtwnmnspqltboowq.supabase.co";
//const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnamltdHdubW5zcHFsdGJvb3dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjU5MDMsImV4cCI6MTk5MDY0MTkwM30.AFWFB6vviV-0PyQAYcWXcLNHs_OKhh5oPrvW4ha7ZXs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
