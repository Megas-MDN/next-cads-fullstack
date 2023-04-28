import readFile from '../../../utils/index';

export async function GET(res) {
  const posts = await readFile();
  const id = res.nextUrl.searchParams.get('id');
  if (id) return Response.json(posts.find((post) => +post.id === +id));
  return Response.json(posts);
}
