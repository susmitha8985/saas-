import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // 1. Student Job par apply karega (POST /applications/apply/user-id)
  @Post('apply/:userId')
  applyForJob(
    @Param('userId') userId: string,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationService.applyForJob(userId, dto);
  }

  // 2. Student apni bheji hui applications dekhega (GET /applications/my/user-id)
  @Get('my/:userId')
  getMyApplications(@Param('userId') userId: string) {
    return this.applicationService.getMyApplications(userId);
  }

  // 3. Recruiter kisi job par aayi applications dekhega (GET /applications/job/job-id)
  @Get('job/:jobId')
  getJobApplications(@Param('jobId') jobId: string) {
    return this.applicationService.getJobApplications(jobId);
  }
}
