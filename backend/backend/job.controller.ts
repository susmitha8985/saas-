import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // 1. Nayi Job post karne ka Route (POST /jobs/user-id)
  @Post(':userId')
  createJob(
    @Param('userId') userId: string,
    @Body() dto: CreateJobDto,
  ) {
    return this.jobService.createJob(userId, dto);
  }

  // 2. Saari jobs dekhne ka Route (GET /jobs)
  @Get()
  getAllJobs() {
    return this.jobService.getAllJobs();
  }

  // 3. Kisi ek specific job ki detail dekhne ka Route (GET /jobs/detail/job-id)
  @Get('detail/:jobId')
  getJobById(@Param('jobId') jobId: string) {
    return this.jobService.getJobById(jobId);
  }
}
