import postsList from './posts.json';

export async function GET(res) {
  const posts = postsList;
  const id = res.nextUrl.searchParams.get('id');
  if (id) return Response.json(posts.find((post) => +post.id === +id));
  return Response.json(posts);
}
