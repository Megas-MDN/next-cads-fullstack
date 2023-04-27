import jwt from 'jsonwebtoken';
// const PASS_BASE = '123456-';
const secret = process.env.JWT_KEY || 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

export async function POST(res) {
  const regex = /^123456-[0-9]/;
  const body = await res.json();
  if (!regex.test(body.password) || !/^[0-9]+$/.test(+body.userId))
    return Response.json({ message: 'Usuario nao autorizado' });
  const token = jwt.sign({ id: body.userId }, secret, jwtConfig);
  return Response.json({ token });
}
