import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // 1. User ki Profile dekhne ka function
  async getProfile(userId: string) {
    let profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    // Agar pehli baar profile dekh raha hai (bani nahi hai), toh khali return karo
    if (!profile) {
      return { message: "Profile abhi tak bani nahi hai, please update karein." };
    }
    return profile;
  }

  // 2. Profile Update (ya Create) karne ka function
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // Upsert ka matlab: Agar profile pehle se hai toh UPDATE karo, nahi toh nayi CREATE kar do
    const updatedProfile = await this.prisma.profile.upsert({
      where: { userId },
      update: { ...dto },
      create: {
        userId,
        ...dto,
      },
    });

    return { message: 'Profile successfully update ho gayi!', profile: updatedProfile };
  }
}
