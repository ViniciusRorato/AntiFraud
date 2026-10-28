import casos from '@/public/data/casos.json';
export async function GET() {
  return Response.json(casos);
}
