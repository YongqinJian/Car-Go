import { Query, Resolver } from "@nestjs/graphql";
import { CarsService } from "./cars.service";

@Resolver()

export class CarsResolver {

    constructor(private carsService: CarsService) {

    }

    @Query(returns => String)
    // exact name when you going to use the query
    public async cars(){
        return 'Hello and Welcome to CarGo shop!'
    }

}