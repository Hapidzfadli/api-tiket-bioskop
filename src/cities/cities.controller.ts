import { Controller, Get } from '@nestjs/common'
import { CitiesService } from './cities.service'

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getCities() {
    return this.citiesService.getCities()
  }
}