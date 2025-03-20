import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SpellCollection } from '@/types/spell';

// Função para ler o arquivo JSON de magias
async function getSpellsData(source: string) {
  // Carregar o índice para encontrar o arquivo correto
  const indexPath = path.join(process.cwd(), 'src/data/spells/index.json');
  const indexContent = await fs.promises.readFile(indexPath, 'utf8');
  const index = JSON.parse(indexContent);
  
  // Verificar se a fonte solicitada existe
  if (!index[source.toUpperCase()]) {
    throw new Error(`Fonte de magias "${source}" não encontrada`);
  }

  // Obter o nome do arquivo da fonte solicitada
  const spellsFileName = index[source.toUpperCase()];
  const spellsFilePath = path.join(process.cwd(), `src/data/spells/${spellsFileName}`);
  
  // Ler o arquivo de magias
  const spellsContent = await fs.promises.readFile(spellsFilePath, 'utf8');
  return JSON.parse(spellsContent);
}

// Função para obter as classes que podem usar cada magia
async function getSpellClasses() {
  try {
    const sourcesPath = path.join(process.cwd(), 'src/data/spells/sources.json');
    const sourcesContent = await fs.promises.readFile(sourcesPath, 'utf8');
    return JSON.parse(sourcesContent);
  } catch (error) {
    console.error('Erro ao carregar sources.json:', error);
    return {};
  }
}

// Função para enriquecer os dados das magias com informações de classes
async function enrichSpellsWithClassData(spellsData: SpellCollection): Promise<SpellCollection> {
  const sourcesData = await getSpellClasses();
  
  // Para cada magia, adicionar a informação de classes que podem usá-la
  for (const spell of spellsData.spell) {
    const spellName = spell.name;
    const spellSource = spell.source;
    
    // Buscar na fonte correta e pelo nome da magia
    if (sourcesData[spellSource] && sourcesData[spellSource][spellName]) {
      // Adicionar as classes à magia
      spell.classesWhoCanUse = sourcesData[spellSource][spellName].class || [];
    } else {
      spell.classesWhoCanUse = [];
    }
  }
  
  return spellsData;
}

// Rota GET para obter magias
export async function GET(request: NextRequest) {
  try {
    // Obter parâmetros da query
    const searchParams = request.nextUrl.searchParams;
    const source = searchParams.get('source') || 'PHB';
    
    // Carregar dados das magias
    const spellsData = await getSpellsData(source);
    
    // Enriquecer com informações de classes
    const enrichedSpellsData = await enrichSpellsWithClassData(spellsData);
    
    // Retornar os dados no formato JSON
    return NextResponse.json(enrichedSpellsData);
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    
    // Retornar erro 500 em caso de falha
    return NextResponse.json(
      { error: 'Erro ao carregar dados das magias', message: (error as Error).message },
      { status: 500 }
    );
  }
} 