import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateApplicationDto } from './application.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  // 1. Student kisi job par apply karega
  async applyForJob(applicantId: string, dto: CreateApplicationDto) {
    const newApp = await this.prisma.application.create({
      data: {
        jobId: dto.jobId,
        applicantId: applicantId,
      },
    });
    return { message: 'Aapki Application successfully submit ho gayi!', application: newApp };
  }

  // 2. Student apni saari bheji hui applications dekh sake
  async getMyApplications(applicantId: string) {
    return this.prisma.application.findMany({
      where: { applicantId: applicantId },
      include: {
        job: true // Job ki detail bhi saath mein aayegi
      }
    });
  }

  // 3. Recruiter dekh sake ki kisne uski job par apply kiya hai
  async getJobApplications(jobId: string) {
    return this.prisma.application.findMany({
      where: { jobId: jobId },
      include: {
        applicant: {
          select: { email: true, profile: true } // Student ki profile detail dikhegi
        }
      }
    });
  }
}
