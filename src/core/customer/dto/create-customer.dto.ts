import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsEnum,
  ValidateIf,
} from 'class-validator';

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Enter a valid email address' })
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(20, { message: 'First name must not exceed 20 characters' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(20, { message: 'Last name must not exceed 20 characters' })
  lastName: string;

  @IsEnum(AuthProvider)
  @IsOptional()
  provider?: AuthProvider;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain: uppercase, lowercase, number, and special character',
  })
  password: string;

  @ValidateIf((o) => o.provider === AuthProvider.GOOGLE)
  @IsNotEmpty({ message: 'Google ID is required for Google authentication' })
  @IsString()
  googleId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  profilePicture?: string;

  get isEmailVerified(): boolean {
    return this.provider === AuthProvider.GOOGLE;
  }
}
