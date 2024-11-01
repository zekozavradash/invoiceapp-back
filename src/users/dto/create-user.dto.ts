import { 
  IsString, 
  IsNotEmpty, 
  IsEmail, 
  IsNumber, 

  IsIn, 
  IsOptional 
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The unique identifier for the user.' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The full name of the user.' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'The email address of the user.' })
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  // Billing address properties
  @ApiProperty({ description: 'The street address of the billing location.' })
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ApiProperty({ description: 'The city of the billing location.' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'The postal code of the billing location.' })
  @IsString()
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({ description: 'The country of the billing location.' })
  @IsString()
  @IsNotEmpty()
  country: string;

  // Items properties
  @ApiProperty({ description: 'The name of the product.' })
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty({ description: 'The price of the product.' })
  @IsNumber()
  @IsNotEmpty()
  itemPrice: number;

  @ApiProperty({ description: 'The quantity of the product.' })
  @IsNumber()
  @IsNotEmpty()
  itemQuantity: number;

  @ApiProperty({ description: 'The total price of the items.' })
  @IsNumber()
  @IsNotEmpty()
  itemTotal: number;

  @ApiProperty({ description: 'The date of the invoice.' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ 
    description: 'Payment terms in days.', 
    enum: [1, 7, 14, 30], 
  }) 
  @IsIn([1, 7, 14, 30])
  paymentTerms: number;

  @ApiProperty({ description: 'Description of the invoice.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Total amount of the invoice.' })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ 
    description: 'Current status of the invoice.', 
    enum: ['pending', 'paid', 'draft'], 
  })
  @IsIn(['pending', 'paid', 'draft'])
  status: string;

  @ApiProperty({ 
    description: 'An optional note for the invoice.', 
    required: false 
  })
  @IsOptional() 
  note?: string;

  @ApiProperty({ 
    description: 'An optional reference number for the invoice.', 
    required: false 
  })
  @IsOptional() 
  referenceNumber?: string;
}
