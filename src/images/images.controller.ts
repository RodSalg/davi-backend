import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './images.service';
import {
  DownloadImageDto,
  HistoricProductsDto,
  cardsDashboardDTO,
} from './dto/create-image.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get('/historic/')
  async historicImages(): Promise<HistoricProductsDto[]> {
    return await this.imagesService.getHistoricDashboard();
  }

  @Get('/status-machine/')
  async statusMachine(): Promise<cardsDashboardDTO> {
    return await this.imagesService.getCardsDashboard();
  }

  @Get('/info/:filename')
  findOne(@Param('filename') filename: string) {
    return this.imagesService.findOne(filename);
  }

  @Get('/get-base-64/:filename')
  async findImage(@Param('filename') filename: string): Promise<string> {
    return await this.imagesService.findImage(filename);
  }

  @Get('/react/:filename')
  async findImageReact(@Param('filename') filename: string): Promise<string> {
    return await this.imagesService.findImageReact(filename);
  }

  @Post('download')
  @ApiBody({
    description: 'Base64 string of the image and desired filename',
    type: DownloadImageDto,
    examples: {
      example1: {
        summary: 'Exemplo válido',
        description: 'Um exemplo de string Base64 e nome de arquivo.',
        value: {
          base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
          filename: 'example.png',
        },
      },
    },
  })
  async downloadImage(
    @Body() downloadImageDto: DownloadImageDto,
    @Res() res: Response,
  ): Promise<void> {
    const { base64, filename } = downloadImageDto;

    try {
      // Converte Base64 para um buffer de arquivo
      const fileBuffer = await this.imagesService.convertBase64ToImageFile(
        base64,
        filename,
      );

      // Configura o cabeçalho para download
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${filename}`,
      });

      // Envia o buffer para o cliente
      res.send(fileBuffer);
    } catch (error) {
      console.error('Erro ao preparar o download:', error.message);
      res.status(500).send('Erro ao preparar o download.');
    }
  }

  // ========= Informações para dashboard
}
