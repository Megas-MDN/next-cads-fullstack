import postList from '../posts.json';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_KEY || 'seusecretdetoken';

export function GET(_res, { params: { id } }) {
  return Response.json(postList.filter((post) => +post.userId === +id));
}

export async function DELETE(res, { params: { id } }) {
  const token = res.headers.get('authorization');
  try {
    const decoded = jwt.verify(token, secret);
    if (+decoded.id !== +id)
      return new Response(
        JSON.stringify({ message: 'Nao autorizado', decoded }, null, 2),
        {
          status: 401,
        }
      );
    const notUser = postList.filter((post) => +post.userId !== +decoded.id);
    await fs.writeFile(
      './src/app/api/posts/posts.json',
      JSON.stringify(notUser, null, 2)
    );
    return Response.json({ message: `Posts do user ${id} deletado.` });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
