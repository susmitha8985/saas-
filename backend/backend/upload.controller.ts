import { Controller, Post, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from '../prisma.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly prisma: PrismaService) {}

  // 📁 Student apna Resume (PDF) upload karega
  @Post('resume/:userId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Files is 'uploads' naam ke folder mein save hongi
      filename: (req, file, cb) => {
        // File ke naam ko thoda unique banate hain taaki do alag logon ki files mix na hon
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async uploadResume(@Param('userId') userId: string, @UploadedFile() file: any) {
    const fileUrl = `/uploads/${file.filename}`;
    
    // Database mein Profile ke andar us file ka URL save kar rahe hain
    await this.prisma.profile.update({
      where: { userId: userId },
      data: { resumeUrl: fileUrl },
    });
    
    return { message: 'Aapka Resume successfully upload ho gaya!', path: fileUrl };
  }
}
