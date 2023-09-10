import { Injectable } from '@nestjs/common';
import { createFolderDto, updateFolderDto } from './folder.dto/folder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FolderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFolder(body: createFolderDto) {
    const folder_id = uuidv4();
    const isCreated = await this.prismaService.folder.create({
      data: {
        folder_id: folder_id,
        folder_name: body.folder_name,
        Collection: {
          connect: {
            collection_id: body.collection_id,
          },
        },
      },
    });

    if (!isCreated) {
      console.log('not created folder');
      return;
    } else {
      return isCreated;
    }
  }
  async updateFolder(body: updateFolderDto) {
    const isUpdated = await this.prismaService.folder.update({
      where: {
        folder_id: body.folder_id,
      },
      data: { folder_name: body.folder_name },
    });
  }
  async deleteFolder(body: any) {
    const isDeleted = await this.prismaService.folder.delete({
      where: {
        folder_id: body.folder_id,
      },
    });

    if (!isDeleted == null) {
      return isDeleted;
    } else {
      return false;
    }
  }
}
