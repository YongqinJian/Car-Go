import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewCarInput {

    @Field()
    name: string;

    @Field(type => Int)
    @
    monthlyPrice: number;

    @Field(type => Int)
    dailyPrice: number;

    @Field()
    gas: string;

    @Field()
    mileage: string;

    @Field()
    gearType: string;

    @Field()
    thumbnailUrl: string;

}