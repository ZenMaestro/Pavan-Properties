import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';
import { PROJECTS } from '@/data/projects';

// POST /api/properties/seed -> Seeds initial projects to MongoDB
export async function POST(req: NextRequest) {
  try {
    const mongooseInstance = await connectToDatabase();

    if (!mongooseInstance) {
      return NextResponse.json(
        {
          success: false,
          error: 'MongoDB is not connected. Please ensure MONGODB_URI is set in .env.local.',
        },
        { status: 503 }
      );
    }

    // Check count of existing projects
    const existingCount = await ProjectModel.countDocuments();

    let inserted = [];
    for (const proj of PROJECTS) {
      const exists = await ProjectModel.findOne({ slug: proj.slug });
      if (!exists) {
        // Remove 'id' so MongoDB assigns fresh _id
        const { id, ...rest } = proj;
        const created = await ProjectModel.create(rest);
        inserted.push(created.name);
      }
    }

    const totalCount = await ProjectModel.countDocuments();

    return NextResponse.json({
      success: true,
      message: `Database seed complete. Inserted ${inserted.length} default projects. Total active in MongoDB: ${totalCount}.`,
      inserted,
      totalCount,
    });
  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed MongoDB database.' },
      { status: 500 }
    );
  }
}
