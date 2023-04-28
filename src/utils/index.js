import fs from 'fs/promises';

export default readerFile = async () => {
  const data = await fs.readFile('./src/app/api/posts/posts.json');
  return JSON.parse(data);
};
