import { FolderService } from './folder.service';
import { createFolderDto, updateFolderDto } from './folder.dto/folder.dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
@WebSocketGateway({ namespace: 'folder' })
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      //console.log(socket.id);
      //console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: createFolderDto) {
    // this.server.emit('onMessage', {
    //   msg: 'New Message',
    //   content: body,
    // });
  }

  @SubscribeMessage('createFolder')
  @UsePipes(new ValidationPipe())
  async createFolder(@Body() body: createFolderDto) {
    await this.folderService
      .createFolder(body)
      .then((response) => {
        return this.server.emit('onMessage', {
          status: true,
          content: response,
        });
      })
      .catch((error) => {
        console.log(error, 'errr');
        return error;
      });
  }

  @SubscribeMessage('updateFolder')
  @UsePipes(new ValidationPipe())
  async updateFolder(@Body() body: updateFolderDto) {
    const response = await this.folderService.updateFolder(body);
    
    //     return !response
    //       ? false
    //       : this.server.emit('onMessage', {
    //           msg: 'New Message',
    //           content: response,
    //         });
  }

  @SubscribeMessage('deleteFolder')
  async deleteFolder(@Body() body: any) {
    const response = await this.folderService.deleteFolder(body);

    if (!response == null) {
      return this.server.emit('onMessage', {
        status: '',
        content: response,
      });
    } else {
      return false;
    }
  }
}
