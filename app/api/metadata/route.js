// app/api/metadata/route.js

import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

const metadataFilePath = path.join(process.cwd(), 'public/media/metadata.json');

export async function GET() {
  try {
    const metadata = await fs.readJson(metadataFilePath);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
