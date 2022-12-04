import {createClient} from "@supabase/supabase-js"
import * as dotenv from 'dotenv' 
dotenv.config()

const supabaseUrl = "https://prqcqivspianlvxbwbmd.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase