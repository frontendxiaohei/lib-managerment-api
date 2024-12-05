import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageStretegy } from '../../my-file-storage'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads',
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
    storage: storageStretegy,
    fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }

  @Get('list')
  async list() {
    return this.bookService.list();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookService.findById(+id);
  }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }
}
