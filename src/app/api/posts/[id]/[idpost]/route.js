import postList from '../../posts.json';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_KEY || 'seusecretdetoken';

export async function PUT(res, { params }) {
  try {
    const { title, body } = await res.json();
    const token = res.headers.get('authorization');
    const decoded = jwt.verify(token, secret);
    if (+decoded.id !== +params.id)
      return new Response(
        JSON.stringify({ message: 'Nao autorizado' }, null, 2),
        {
          status: 401,
        }
      );
    const postIndex = postList.findIndex((pst) => +pst.id === +params.idpost);
    if (postIndex < 0) return Response.json({ message: 'Post nao encontrado' });
    postList[postIndex].title = title;
    postList[postIndex].body = body;
    await fs.writeFile(
      './src/app/api/posts/posts.json',
      JSON.stringify([...postList], null, 2)
    );
    return Response.json({
      message: 'Post editado com sucesso',
      post: postList[postIndex],
    });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

export async function DELETE(res, { params }) {
  const token = res.headers.get('authorization');
  try {
    const decoded = jwt.verify(token, secret);
    if (+decoded.id !== +params.id)
      return new Response(
        JSON.stringify({ message: 'Nao autorizado' }, null, 2),
        {
          status: 401,
        }
      );
    const postIndex = postList.findIndex((pst) => +pst.id === +params.idpost);
    if (postIndex < 0) return Response.json({ message: 'Post nao encontrado' });
    const postDeleted = postList.splice(postIndex, 1);
    await fs.writeFile(
      './src/app/api/posts/posts.json',
      JSON.stringify([...postList], null, 2)
    );
    return Response.json({
      message: 'Post Deletado com sucesso',
      post: postDeleted,
    });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
