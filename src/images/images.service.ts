import { Injectable } from '@nestjs/common';
import { prisma } from 'src/main';
import * as path from 'path';
import * as fs from 'fs/promises';

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
}
