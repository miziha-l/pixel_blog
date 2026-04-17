import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const comments = await prisma.articleComment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    
    // Transform id to string to match existing interface
    const formattedComments = comments.map(msg => ({
      ...msg,
      id: msg.id.toString()
    }));

    return NextResponse.json(formattedComments);
  } catch (error) {
    console.error('Failed to fetch article comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, author, content, avatar } = body;

    if (!postId || !author || !content || !avatar) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const date = new Date().toISOString().split('T')[0];
    
    const result = await prisma.articleComment.create({
      data: {
        postId,
        author,
        content,
        date,
        avatar
      }
    });

    return NextResponse.json(
      { 
        id: result.id.toString(),
        postId,
        author,
        content,
        date,
        avatar
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to post article comment:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}