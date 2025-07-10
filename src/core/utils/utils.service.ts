import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}
