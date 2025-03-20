import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SpellCollection } from '@/types/spell';

// Função para obter todas as fontes disponíveis
async function getAllSources() {
  try {
    const indexPath = path.join(process.cwd(), 'src/data/spells/index.json');
    const indexContent = await fs.promises.readFile(indexPath, 'utf8');
    const index = JSON.parse(indexContent);
    
    // Converter as chaves do índice em um array de fontes
    return Object.keys(index).map(key => ({
      id: key,
      fileName: index[key]
    }));
  } catch (error) {
    console.error('Erro ao carregar index.json:', error);
    return [];
  }
}

// Função para ler o arquivo JSON de magias
async function getSpellsData(source: string) {
  try {
    // Carregar o índice para encontrar o arquivo correto
    const indexPath = path.join(process.cwd(), 'src/data/spells/index.json');
    const indexContent = await fs.promises.readFile(indexPath, 'utf8');
    const index = JSON.parse(indexContent);
    
    // Verificar se a fonte solicitada existe
    // Não converter para maiúsculas, usar o source diretamente
    if (!index[source]) {
      // Tentar buscar de forma case-insensitive
      const sourceKey = Object.keys(index).find(
        key => key.toLowerCase() === source.toLowerCase()
      );
      
      if (sourceKey) {
        source = sourceKey; // Usar a chave encontrada com o case correto
      } else {
        throw new Error(`Fonte de magias "${source}" não encontrada`);
      }
    }

    // Obter o nome do arquivo da fonte solicitada
    const spellsFileName = index[source];
    const spellsFilePath = path.join(process.cwd(), `src/data/spells/${spellsFileName}`);
    
    // Verificar se o arquivo existe antes de tentar lê-lo
    try {
      await fs.promises.access(spellsFilePath, fs.constants.F_OK);
    } catch {
      throw new Error(`Arquivo de magias para fonte "${source}" não encontrado (${spellsFileName})`);
    }
    
    // Ler o arquivo de magias
    try {
      const spellsContent = await fs.promises.readFile(spellsFilePath, 'utf8');
      
      // Tentar fazer o parse do JSON
      try {
        const spellsData = JSON.parse(spellsContent);
        
        // Verificar se o arquivo tem a estrutura esperada
        if (!spellsData.spell || !Array.isArray(spellsData.spell)) {
          throw new Error(`Arquivo de magias para fonte "${source}" tem formato inválido`);
        }
        
        return spellsData;
      } catch (parseError: unknown) {
        const message = parseError instanceof Error ? parseError.message : String(parseError);
        throw new Error(`Erro ao processar JSON para fonte "${source}": ${message}`);
      }
    } catch (readError: unknown) {
      const message = readError instanceof Error ? readError.message : String(readError);
      throw new Error(`Erro ao ler arquivo de magias para fonte "${source}": ${message}`);
    }
  } catch (error) {
    console.error(`Erro ao obter dados de magias para fonte "${source}":`, error);
    throw error;
  }
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
    
    // Verificar se é uma requisição para listar as fontes
    if (searchParams.get('listSources') === 'true') {
      const sources = await getAllSources();
      return NextResponse.json({ sources });
    }
    
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