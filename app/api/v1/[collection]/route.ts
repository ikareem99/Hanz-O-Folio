import { NextRequest, NextResponse } from 'next/server';
import { getModel } from '@/lib/api-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const Model = await getModel(collection);
    
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Collection not found' }, { status: 404 });
    }

    const items = await Model.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const Model = await getModel(collection);
    
    if (!Model) {
      return NextResponse.json({ success: false, error: 'Collection not found' }, { status: 404 });
    }

    const body = await request.json();
    const newItem = await Model.create(body);
    
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
