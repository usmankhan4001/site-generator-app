import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/pages?route=/
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const route = searchParams.get('route');

    if (route) {
      const page = await prisma.page.findUnique({
        where: { route },
      });
      if (!page) {
        return NextResponse.json({ success: true, page: null, data: null });
      }
      return NextResponse.json({
        success: true,
        page: {
          ...page,
          data: page.data ? JSON.parse(page.data) : null,
        },
      });
    }

    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({
      success: true,
      pages: pages.map((p) => ({
        ...p,
        data: p.data ? JSON.parse(p.data) : null,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch page data' },
      { status: 500 }
    );
  }
}

// POST /api/pages - Upsert page puck data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { route, title, data } = body;

    if (!route) {
      return NextResponse.json(
        { success: false, error: 'Route parameter is required' },
        { status: 400 }
      );
    }

    const dataString = typeof data === 'string' ? data : JSON.stringify(data || {});

    const page = await prisma.page.upsert({
      where: { route },
      update: {
        title: title || route,
        data: dataString,
        puckData: dataString,
      },
      create: {
        route,
        title: title || route,
        data: dataString,
        puckData: dataString,
      },
    });

    return NextResponse.json({
      success: true,
      page: {
        ...page,
        data: page.data ? JSON.parse(page.data) : null,
        puckData: page.puckData ? JSON.parse(page.puckData) : null,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save page' },
      { status: 500 }
    );
  }
}
