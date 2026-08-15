import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { JobModule } from './job/job.module'; 
import { ApplicationModule } from './application/application.module';
import { UploadModule } from './upload/upload.module'; // <-- Yeh line zaroor aani chahiye

@Module({
  // Niche UploadModule switchboard mein fit kiya hua hai
  imports: [AuthModule, ProfileModule, JobModule, ApplicationModule, UploadModule], 
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}





