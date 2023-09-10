import { IsNotEmpty, IsString } from 'class-validator';

export class createCollectionDto {
  @IsString()
  collection_name: string;
  @IsString()
  @IsNotEmpty()
  user_workspace_id: string;
}

export class updateCollectionDto {
  @IsString()
  collection_id: string;
  @IsString()
  collection_name: string;
}
