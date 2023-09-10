import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import {
  createCollectionDto,
  updateCollectionDto,
} from './collection.dto/collection.dto';

@Injectable()
export class CollectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCollection(body: createCollectionDto) {
    const collection_id = uuidv4();
    const user_workspace_id = '1';

    const isCreated = await this.prismaService.collection.create({
      data: {
        collection_id: collection_id,
        collection_name: body.collection_name,
        workspace: {
          connect: {
            workspace_id: user_workspace_id,
          },
        },
      },
    });
    console.log('created');

    if (!isCreated) {
      console.log('notcreated');
      return;
    } else {
      return isCreated;
    }
  }

  async updateCollection(body: updateCollectionDto) {
    console.log(body, 'update');
    const collection_id = body.collection_id;
    const collection_name = body.collection_name;
    const isUpdated = await this.prismaService.collection.update({
      where: {
        collection_id,
      },
      data: { collection_name: collection_name },
    });

    if (!isUpdated) {
      console.log('notUpdated');
      return;
    } else {
      return isUpdated;
    }
  }

  async deleteCollection(data: any) {
    const collection_id = data.collection_id;
    const isDeleted = await this.prismaService.collection.delete({
      where: {
        collection_id: collection_id,
      },
    });
    if (!isDeleted) {
      console.log('not Deleted');
      return;
    } else {
      return isDeleted;
    }
  }
}
