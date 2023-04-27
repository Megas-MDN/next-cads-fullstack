import fs from 'fs/promises';

export async function GET() {
  const res = await (
    await fetch('https://jsonplaceholder.typicode.com/posts')
  ).json();
  await fs.writeFile(
    './src/app/api/posts/posts.json',
    JSON.stringify(res, null, 2)
  );
  return Response.json({ message: 'Arquivo restaurado com sucesso' });
}
