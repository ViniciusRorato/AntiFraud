import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
  try {
    // Caminho absoluto para a pasta public/data no servidor
    const filePath = path.join(process.cwd(), 'public', 'data', 'casos.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erro ao ler casos.json:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar os dados de casos.' },
      { status: 500 }
    );
  }
}