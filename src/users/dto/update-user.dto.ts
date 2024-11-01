import { 
  IsString, 
  IsOptional, 
  IsEmail, 
  IsNumber,  
  IsIn 
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'User ID', required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Full name of the user', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'Email address of the user', required: false })
  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  // Address properties
  @ApiProperty({ description: 'Street address of the user', required: false })
  @IsString()
  @IsOptional()
  streetAddress?: string; 

  @ApiProperty({ description: 'City of the user', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'Postal code of the user', required: false })
  @IsString()
  @IsOptional()
  postCode?: string;

  @ApiProperty({ description: 'Country of the user', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  // Item properties
  @ApiProperty({ description: 'Name of the item', required: false })
  @IsString()
  @IsOptional()
  itemName?: string; 

  @ApiProperty({ description: 'Price of the item', required: false })
  @IsNumber()
  @IsOptional()
  itemPrice?: number;

  @ApiProperty({ description: 'Quantity of the item', required: false })
  @IsNumber()
  @IsOptional()
  itemQuantity?: number;

  @ApiProperty({ description: 'Total cost of the item', required: false })
  @IsNumber()
  @IsOptional()
  itemTotal?: number; 

  @ApiProperty({ description: 'Date of the update', required: false })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiProperty({ description: 'Payment terms (in days)', enum: [1, 7, 14, 30], required: false })
  @IsIn([1, 7, 14, 30])
  @IsOptional()
  paymentTerms?: number;

  @ApiProperty({ description: 'Description of the user', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Total amount', required: false })
  @IsNumber()
  @IsOptional()
  total?: number;

  @ApiProperty({ description: 'Status of the user', enum: ['pending', 'paid', 'draft'], required: false })
  @IsIn(['pending', 'paid', 'draft'])
  @IsOptional()
  status?: string;
}
