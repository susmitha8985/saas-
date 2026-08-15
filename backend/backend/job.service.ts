import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJobDto } from './job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  // 1. Nayi Job post karne ka function (Recruiter ke liye)
  async createJob(postedById: string, dto: CreateJobDto) {
    const newJob = await this.prisma.job.create({
      data: {
        ...dto,
        postedById,
      },
    });
    return { message: 'Job successfully post ho gayi!', job: newJob };
  }

  // 2. Saari jobs dekhne ka function (Students ke liye)
  async getAllJobs() {
    return this.prisma.job.findMany({
      orderBy: { createdAt: 'desc' }, // Nayi jobs sabse upar aayengi
      include: {
        postedBy: {
          select: { email: true } // Kisne post ki, uski basic detail
        }
      }
    });
  }

  // 3. Kisi ek specific job ki detail dekhna
  async getJobById(jobId: string) {
    return this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        postedBy: {
          select: { email: true }
        }
      }
    });
  }
}
