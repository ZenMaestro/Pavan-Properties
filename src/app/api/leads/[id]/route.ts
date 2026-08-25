import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { LeadModel } from '@/models/Lead';
import mongoose from 'mongoose';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/leads/[id] -> Update lead status / broker notes
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json(
        { success: false, error: 'Database not connected.' },
        { status: 503 }
      );
    }

    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Lead ID format.' },
        { status: 400 }
      );
    }

    const updated = await LeadModel.findByIdAndUpdate(
      id,
      {
        ...(body.status && { status: body.status }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Lead not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead status updated successfully.',
      data: updated.toJSON(),
    });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update lead.' },
      { status: 500 }
    );
  }
}

// DELETE /api/leads/[id] -> Delete a customer inquiry
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json(
        { success: false, error: 'Database not connected.' },
        { status: 503 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Lead ID format.' },
        { status: 400 }
      );
    }

    const deleted = await LeadModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Lead not found to delete.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead for "${deleted.name}" deleted successfully.`,
      deletedId: id,
    });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete lead.' },
      { status: 500 }
    );
  }
}
