import { Injectable } from '@nestjs/common';
import { prisma } from 'src/main';
import * as path from 'path';
import * as fs from 'fs/promises';
import { cardsDashboardDTO, HistoricProductsDto } from './dto/create-image.dto';
import { Prisma } from '@prisma/client';

type ImageWithResults = Prisma.ImagesGetPayload<{
  include: {
    Image_Results: true;
    Inspections: true;
  };
}>;

@Injectable()
export class ImagesService {
  async findAll() {
    return await prisma.images.findMany();
  }

  async findOne(filename: string) {
    return await prisma.images.findUnique({
      where: { fileName: filename },
    });
  }

  async findImageReact(filename: string): Promise<string> {
    const parentDirectory = path.join(__dirname, '..', '..');
    console.log(parentDirectory);

    try {
      const filePath = path.resolve(parentDirectory, 'images', filename);

      const imageBuffer = await fs.readFile(filePath);

      const base64String = imageBuffer.toString('base64');

      return `data:image/bmp;base64,${base64String}`;
    } catch (error) {
      console.log(
        'Erro ao encontrar ou converter a imagem para Base64: ' + error.message,
      );
      throw new Error(
        'Erro ao encontrar ou converter a imagem para Base64: ' + error.message,
      );
    }
  }

  async findImage(filename: string): Promise<string> {
    const parentDirectory = path.join(__dirname, '..', '..');
    console.log(parentDirectory);

    try {
      const filePath = path.resolve(parentDirectory, 'images', filename);

      const imageBuffer = await fs.readFile(filePath);

      const base64String = imageBuffer.toString('base64');

      return base64String;
    } catch (error) {
      console.log(
        'Erro ao encontrar ou converter a imagem para Base64: ' + error.message,
      );
      throw new Error(
        'Erro ao encontrar ou converter a imagem para Base64: ' + error.message,
      );
    }
  }

  async convertBase64ToImageFile(
    base64String: string,
    filename: string,
  ): Promise<Buffer> {
    try {
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
      const sanitizedBase64 = base64Data.replace(/\s/g, '');
      const buffer = Buffer.from(sanitizedBase64, 'base64');

      const tempDirectory = path.join(__dirname, '..', '..', 'temp');
      const tempPath = path.join(tempDirectory, filename);

      await fs.mkdir(tempDirectory, { recursive: true });
      await fs.writeFile(tempPath, buffer);

      console.log('Arquivo temporário salvo em:', tempPath);

      return buffer;
    } catch (error) {
      console.error('Erro ao processar a imagem:', error.message);
      throw new Error(`Erro ao processar a imagem: ${error.message}`);
    }
  }

  // async getHistoricDashboard(): Promise<HistoricProductsDto[]> {
  //   const startOfDay = new Date();
  //   startOfDay.setHours(0, 0, 0, 0); // Início do dia

  //   const endOfDay = new Date();
  //   endOfDay.setHours(23, 59, 59, 999); // Final do dia

  //   console.log('test1');
  //   const images = await prisma.images.findMany({
  //     where: {
  //       Inspections: {
  //         createdAt: {
  //           gte: startOfDay, // Maior ou igual ao início do dia
  //           lte: endOfDay, // Menor ou igual ao final do dia
  //         },
  //       },
  //     },
  //     take: 1000, // Limite de 1000 registros
  //     orderBy: {
  //       Inspections: {
  //         createdAt: 'desc', // Ordena pelos mais recentes com base na data
  //       },
  //     },
  //     include: {
  //       Image_Results: true, // Inclui os resultados das imagens
  //       Products: true, // Inclui o relacionamento com Products
  //       Inspections: true, // Inclui o relacionamento com Inspections
  //     },
  //   });

  //   console.log('test2');

  //   console.log(images);

  //   // Mapeia os resultados para o DTO
  //   return images.map((image: ImageWithResults) => {
  //     console.log('test3');

  //     const overallResult = image.overallResult;

  //     const failMessage = overallResult
  //       ? '-'
  //       : image.Image_Results.find((result) => !overallResult)?.failMessage ||
  //         '-';

  //     return {
  //       data: image.Inspections?.createdAt ?? new Date(), // Usa a data da tabela Inspections
  //       product: image.productId,
  //       inspectionID: image.Products?.kanban ?? '-',
  //       result: overallResult,
  //       failMessage: failMessage,
  //     };
  //   });
  // }

  // --- retorna os mil ultimos mesmo não sendo do dia de hoje
  async getHistoricDashboard(): Promise<HistoricProductsDto[]> {
    console.log('Iniciando consulta para todas as datas...');

    // Consulta ao banco de dados
    const images = await prisma.images.findMany({
      take: 500, // Limite de 1000 registros (ajuste conforme necessário)
      orderBy: {
        Inspections: {
          createdAt: 'desc', // Ordena pelos mais recentes com base na data
        },
      },
      include: {
        Image_Results: true, // Inclui os resultados das imagens
        Inspections: true, // Inclui o relacionamento com Inspections
      },
    });

    console.log('Consulta concluída:', images.length, 'imagens encontradas.');

    return images.map((image: ImageWithResults) => {
      const overallResult = image.overallResult;

      const failMessage = overallResult
        ? '-'
        : image.Image_Results.find((result) => !result.pass)?.failMessage ||
          '-';

      return {
        data: image.Inspections?.createdAt ?? new Date(), // Usa a data da tabela Inspections
        product: image.productId,
        inspectionID: image.inspectionId,
        result: overallResult ?? false,
        failMessage: failMessage,
      };
    });
  }

  async getCardsDashboard(): Promise<cardsDashboardDTO> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Início do dia

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Final do dia

    let currentState: string;
    let inspectionsToday: number;
    let totalTime: number;
    let totalFailsToday: number;

    try {
      [currentState, inspectionsToday, totalTime, totalFailsToday] =
        await Promise.all([
          this.getCurrentState(),
          this.getInspectionsToday(startOfDay, endOfDay),
          this.getTotalTimeToday(startOfDay, endOfDay),
          this.getTotalFailsToday(startOfDay, endOfDay),
        ]);
    } catch (error) {
      console.warn('Erro ao processar CSVs:', error);
    }

    return {
      currentState,
      inspectionsToday: inspectionsToday,
      totalTimeToday: totalTime,
      totalFailsToday: totalFailsToday,
    };
  }

  private async getCurrentState(): Promise<string> {
    //por enquanto retorna algo aleatório até o aurélio fazer o estado da máquina
    const states = [
      'Em operação',
      'Robô se movimentando',
      'Cognex capturando imagem',
      'Processando imagem',
      'Erro!',
    ];

    try {
      const randomIndex = Math.floor(Math.random() * states.length);

      return states[randomIndex];
    } catch (error) {
      console.log('Erro ao obter o estado atual:', error.message);
      return 'Erro ao obter estado';
    }
  }

  private async getInspectionsToday(
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<number> {
    try {
      const inspectionsToday = await prisma.inspections.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
      return 4;

      // return inspectionsToday;
    } catch (error) {
      console.log(
        'Erro ao obter o número de inspeções de hoje:',
        error.message,
      );
    }
  }

  private async getTotalTimeToday(
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<number> {
    try {
      const totalTimeToday = await prisma.cycle_Times.aggregate({
        _sum: {
          cycleTime: true,
        },
        where: {
          Inspections: {
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        },
      });

      const totalTime = totalTimeToday._sum.cycleTime || 0;
      return totalTime;
    } catch (error) {
      console.log('Erro ao calcular o tempo total de hoje:', error.message);
    }
  }

  private async getTotalFailsToday(
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<number> {
    try {
      const totalFailsToday = await prisma.images.count({
        where: {
          Inspections: {
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          overallResult: false, // Somente as reprovações
        },
      });
      return 2;

      return totalFailsToday;
    } catch (error) {
      console.log('Erro ao calcular o total de falhas de hoje:', error.message);
    }
  }
}
