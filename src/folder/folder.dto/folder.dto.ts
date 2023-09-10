import { IsNotEmpty, IsString } from 'class-validator';

export class createFolderDto {
  @IsString()
  folder_name: string;
  @IsNotEmpty()
  @IsString()
  collection_id: string;
}

export class updateFolderDto {
  @IsString()
  folder_id: string;
  @IsString()
  folder_name: string;
}
