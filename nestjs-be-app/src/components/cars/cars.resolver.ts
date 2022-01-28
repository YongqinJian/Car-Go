import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CarsService } from "./cars.service";
import { NewCarInput } from "./dto/new-car.input";
import { Car } from "./entities/cars";

@Resolver()

export class CarsResolver {

    constructor(private carsService: CarsService) {

    }

    @Query(returns => [Car])
    // exact name when you going to use the query
    public async cars(): Promise<Car[]> {
        return await this.carsService.getAllCars().catch((err) => {
            throw err;
        });
    }

    @Mutation(returns => Car)
    public async addNewCar(@Args("newCarData") newCarInput: NewCarInput ): Promise<Car>{

    }

}