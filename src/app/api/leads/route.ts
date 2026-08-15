import { NextResponse } from 'next/server';
import { submitLead } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectInterest, preferredDate, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and Phone number are required fields.' },
        { status: 400 }
      );
    }

    // Basic phone validation (at least 10 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    const result = await submitLead({
      name,
      phone: cleanPhone,
      email: email || '',
      projectInterest: projectInterest || '',
      preferredDate: preferredDate || '',
      message: message || ''
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
