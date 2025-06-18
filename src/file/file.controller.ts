import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { constrainedMemory } from 'process';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /.(png|jpg|jpeg)$/ }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1000 }), // 1 MB
      ],
      exceptionFactory: () => {
        return new BadRequestException('Invalid request', { cause: [
          {
            property: 'file',
            constraints: {
              message: 'Uploaded file must be a JPEG or PNG file less than 1MB in size.',
            },
          }
        ]});
      }
    })
  ) file: Express.Multer.File) {
    return {
      filename: file.filename,
    };
  }
}
