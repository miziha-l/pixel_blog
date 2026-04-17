import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const messages = await prisma.guestbook.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    
    // Transform id to string to match existing interface
    const formattedMessages = messages.map(msg => ({
      ...msg,
      id: msg.id.toString()
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Failed to fetch guestbook messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, content, avatar } = body;

    if (!author || !content || !avatar) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const date = new Date().toISOString().split('T')[0];
    
    const result = await prisma.guestbook.create({
      data: {
        author,
        content,
        date,
        avatar
      }
    });

    return NextResponse.json(
      { 
        id: result.id.toString(),
        author,
        content,
        date,
        avatar
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to post guestbook message:', error);
    return NextResponse.json({ error: 'Failed to post message' }, { status: 500 });
  }
}