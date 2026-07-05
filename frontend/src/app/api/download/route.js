import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const filename = url.split('/').pop() || 'resume.pdf';

    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Proxy download failed:', error);
    // If proxy fails, redirect to the URL directly as fallback
    return NextResponse.redirect(url);
  }
}
