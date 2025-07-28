import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('file')
@ApiTags('Cargar Imagen')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Subir archivo de imagen',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagen en formato JPG, PNG o WEBP',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Cargar Imagen A un Producto' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes()
  fileUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
            message: 'La imagen debe pesar menos de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) productId: string,
  ) {
    try {
      return this.fileUploadService.uploadProductImg(file, productId);
    } catch (er) {
      return {
        message: `Ocurrio un error al cargar la imagen error: ${er}`,
      };
    }
  }
}
