import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';
import mongoose from 'mongoose';
import { PROJECTS } from '@/data/projects';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/properties/[id] -> Get by ID or slug
export async function GET(req: NextRequest, context: RouteContext) {
  let propertyId = '';
  try {
    const { id } = await context.params;
    propertyId = id;

    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      const fallback = PROJECTS.find((p) => p.id === id || p.slug === id);
      if (fallback) {
        return NextResponse.json({ success: true, source: 'static-fallback', data: fallback });
      }
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    let project = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await ProjectModel.findById(id).lean();
    }
    if (!project) {
      project = await ProjectModel.findOne({ slug: id }).lean();
    }

    if (!project) {
      // Check static fallback
      const fallback = PROJECTS.find((p) => p.id === id || p.slug === id);
      if (fallback) {
        return NextResponse.json({ success: true, source: 'static-fallback', data: fallback });
      }
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    const formatted = {
      ...project,
      id: (project as any)._id ? (project as any)._id.toString() : (project as any).id,
    };

    return NextResponse.json({ success: true, source: 'mongodb', data: formatted });
  } catch (error: any) {
    console.error('Error fetching property by ID/slug, using fallback:', error);
    const fallback = PROJECTS.find((p) => p.id === propertyId || p.slug === propertyId) || PROJECTS[0];
    return NextResponse.json({ success: true, source: 'static-error-fallback', data: fallback });
  }
}

// PUT /api/properties/[id] -> Update a property
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json(
        { success: false, error: 'MongoDB is not connected. Check MONGODB_URI.' },
        { status: 503 }
      );
    }

    const body = await req.json();

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query._id = id;
    } else {
      query.slug = id;
    }

    const updated = await ProjectModel.findOneAndUpdate(query, body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Property not found to update.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Property updated successfully.',
      data: {
        ...updated.toJSON(),
        id: updated._id.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update property.' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] -> Delete a property
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json(
        { success: false, error: 'MongoDB is not connected. Check MONGODB_URI.' },
        { status: 503 }
      );
    }

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query._id = id;
    } else {
      query.slug = id;
    }

    const deleted = await ProjectModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Property not found to delete.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Property "${deleted.name}" deleted successfully from MongoDB.`,
      deletedId: deleted._id.toString(),
    });
  } catch (error: any) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete property.' },
      { status: 500 }
    );
  }
}
