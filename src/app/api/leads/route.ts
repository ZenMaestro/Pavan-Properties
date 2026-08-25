import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { LeadModel } from '@/models/Lead';
import { sendLeadNotificationEmail } from '@/lib/email';

// GET /api/leads -> Retrieve all customer inquiries (Admin)
export async function GET(req: NextRequest) {
  try {
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json({
        success: true,
        source: 'static',
        count: 0,
        data: [],
      });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const leads = await LeadModel.find(query).sort({ createdAt: -1 }).lean();

    const formatted = leads.map((lead: any) => ({
      ...lead,
      id: lead._id ? lead._id.toString() : lead.id,
    }));

    return NextResponse.json({
      success: true,
      source: 'mongodb',
      count: formatted.length,
      data: formatted,
    });
  } catch (error: any) {
    console.error('Error fetching customer leads from MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST /api/leads -> Create new customer inquiry & dispatch email to propertiespavan@gmail.com
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, projectInterest, preferredDate, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and Phone number are required fields.' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    let savedLeadId = 'lead-' + Date.now();

    // 1. Save to MongoDB
    try {
      const mongooseInstance = await connectToDatabase();
      if (mongooseInstance) {
        const created = await LeadModel.create({
          name: name.trim(),
          phone: cleanPhone,
          email: (email || '').trim(),
          projectInterest: (projectInterest || 'General Inquiry').trim(),
          preferredDate: (preferredDate || '').trim(),
          message: (message || '').trim(),
          status: 'new',
          source: 'Website - Book Visit Form',
        });
        savedLeadId = created._id.toString();
        console.log('✅ Lead saved to MongoDB with ID:', savedLeadId);
      }
    } catch (dbErr: any) {
      console.warn('⚠️ MongoDB save warning (proceeding with email dispatch):', dbErr.message);
    }

    // 2. Dispatch Email Notification to propertiespavan@gmail.com
    try {
      await sendLeadNotificationEmail({
        name: name.trim(),
        phone: cleanPhone,
        email: (email || '').trim(),
        projectInterest: (projectInterest || 'General Inquiry').trim(),
        preferredDate: (preferredDate || '').trim(),
        message: (message || '').trim(),
      });
    } catch (emailErr: any) {
      console.warn('⚠️ Email dispatch warning:', emailErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your site visit request has been received. Pavan Kumar will contact you shortly.',
        leadId: savedLeadId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error processing lead submission:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
