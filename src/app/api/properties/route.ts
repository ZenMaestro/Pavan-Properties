import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';
import { PROJECTS } from '@/data/projects';

// GET /api/properties -> Returns all properties (Guaranteed HTTP 200)
export async function GET(req: NextRequest) {
  try {
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json({
        success: true,
        source: 'static-fallback',
        count: PROJECTS.length,
        data: PROJECTS,
      });
    }

    const projectsFromDb = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();

    if (!projectsFromDb || projectsFromDb.length === 0) {
      return NextResponse.json({
        success: true,
        source: 'static-fallback',
        count: PROJECTS.length,
        data: PROJECTS,
      });
    }

    const formatted = projectsFromDb.map((p: any) => ({
      ...p,
      id: p._id ? p._id.toString() : p.id,
    }));

    return NextResponse.json({
      success: true,
      source: 'mongodb',
      count: formatted.length,
      data: formatted,
    });
  } catch (error: any) {
    console.error('Error fetching properties from MongoDB, using fallback:', error);
    return NextResponse.json({
      success: true,
      source: 'static-fallback-error',
      count: PROJECTS.length,
      data: PROJECTS,
    });
  }
}

// POST /api/properties -> Add a new property (Admin)
export async function POST(req: NextRequest) {
  try {
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json(
        {
          success: false,
          error: 'MongoDB is not connected. Please ensure MONGODB_URI is set.',
        },
        { status: 503 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.location || !body.priceFrom) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, Location, and Price are required fields.',
        },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const existing = await ProjectModel.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `A property with slug "${slug}" already exists. Please choose a different name or slug.`,
        },
        { status: 409 }
      );
    }

    const newProject = await ProjectModel.create({
      ...body,
      slug,
      images: Array.isArray(body.images) && body.images.length > 0
        ? body.images
        : ['/projects/anvi-homes-1.jpg'],
      verifiedDocs: Array.isArray(body.verifiedDocs) ? body.verifiedDocs : [],
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      approvals: Array.isArray(body.approvals) ? body.approvals : [],
      specifications: Array.isArray(body.specifications) ? body.specifications : [],
      bankTieUps: Array.isArray(body.bankTieUps) ? body.bankTieUps : [],
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Property created successfully in MongoDB.',
        data: {
          ...newProject.toJSON(),
          id: newProject._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create property.',
      },
      { status: 500 }
    );
  }
}
