import { createClient } from '@supabase/supabase-js';
import { Lead } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if valid credentials are provided
const isConfigured = 
  supabaseUrl.length > 0 && 
  !supabaseUrl.includes('your-project-id') && 
  supabaseAnonKey.length > 0 && 
  !supabaseAnonKey.includes('your-anon-key');

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitLead(lead: Lead): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // If Supabase client is configured, write directly to Supabase Postgres leads table
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: lead.name,
            phone: lead.phone,
            email: lead.email || null,
            project_interest: lead.projectInterest || null,
            preferred_date: lead.preferredDate || null,
            message: lead.message || null,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase lead insert error:', error);
        // Fallback to local storage / API response if database error
        return saveLocalLead(lead);
      }

      return { success: true, id: data?.id };
    }

    // Server/Local fallback
    return saveLocalLead(lead);
  } catch (err: any) {
    console.error('Lead submission exception:', err);
    return saveLocalLead(lead);
  }
}

function saveLocalLead(lead: Lead): { success: boolean; id: string } {
  const mockId = 'lead-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('pavan_properties_leads') || '[]');
      existing.push({ ...lead, id: mockId, createdAt: new Date().toISOString() });
      localStorage.setItem('pavan_properties_leads', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage save skipped:', e);
    }
  }
  return { success: true, id: mockId };
}
