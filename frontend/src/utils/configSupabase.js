import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://prqcqivspianlvxbwbmd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycWNxaXZzcGlhbmx2eGJ3Ym1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxNDQ5NjQsImV4cCI6MTk4NTcyMDk2NH0.RXylRt4rTLnWT09NGApHK73B4fOzqvdSwFNYATjWNCI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase