import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ICar } from "../../../typings/car";
import { Car } from "../../components/car";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";
import carService from "../../services/carService";
import { Dispatch } from "@reduxjs/toolkit";
import { GetCars_cars } from "../../services/carService/__generated__/GetCars";
import { setTopCars } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectTopCars } from "./selectors";
import { createSelector } from "reselect";

const TopCarContainer = styled.div`
    ${tw`
        max-w-screen-lg
        w-full
        flex
        flex-col
        items-center
        justify-center
        pr-4
        pl-4
        md:pl-0
        md:pr-0
        mb-10
    `};  
`;

// Sharable component
const Title = styled.h1`
  ${tw`
    text-2xl
    md:text-5xl
    text-black
    font-extrabold
    md:font-black
    md:leading-normal
  `};  
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
  `};  
`;

const EmptyCars = styled.div`
    ${tw`
        flex
        w-full
        justify-center
        items-center
        text-sm
        text-gray-500
    `};
`;

const actionDispatch = (dispatch: Dispatch) => ({
    setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars)),
});

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
    topCars
}));



export function Topcars() {


    const [current, setCurrent] = useState(0);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    const { topCars } = useSelector(stateSelector);
    const { setTopCars } = actionDispatch(useDispatch());

    const fetchTopCars = async () => {
        const cars = await carService.getCars().catch((err) => {
            console.log("Error: ", err);
        });

        console.log("Cars: ", cars);
        if (cars)
            setTopCars(cars);
    };


    // const testCar: ICar = {
    //     name: "Audi S3 Car",
    //     mileage: "10k",
    //     thumbnailSrc:
    //         "https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg",
    //     dailyPrice: 70,
    //     monthlyPrice: 1600,
    //     gearType: "Auto",
    //     gas: "Petrol",
    // };

    // const testCar2: ICar = {
    //     name: "HONDA cITY 5 Seater Car",
    //     mileage: "20k",
    //     thumbnailSrc:
    //         "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
    //     dailyPrice: 50,
    //     monthlyPrice: 1500,
    //     gearType: "Auto",
    //     gas: "Petrol",
    // };

    useEffect(() => {
        fetchTopCars();
    }, []);

    const isEmptyTopCars = !topCars || topCars.length === 0;

    const cars = !isEmptyTopCars && topCars.map((car) => <Car {...car} thumbnailSrc={car.thumbnailUrl} />) || [];

    // const cars = [
    //     (<Car {...testCar} />), (<Car {...testCar} />),
    //     (<Car {...testCar2} />), (<Car {...testCar2} />),
    //     (<Car {...testCar} />), (<Car {...testCar2} />)
    // ];

    // if (isEmptyTopCars) return null;

    return <TopCarContainer>
        <Title>Explore Our Featured Deals</Title>
        {isEmptyTopCars && <EmptyCars>No Cars To Show!</EmptyCars>}
        {!isEmptyTopCars && <CarsContainer>
            <Carousel value={current} onChange={setCurrent}
                slides={cars}

                // Setting up how many component to show in a slides
                plugins={[
                    "clickToChange",
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 3,
                        },
                    },
                ]}

                // set breaking points for difference resolution, px is below and inclusive
                breakpoints={{
                    // for 640 px
                    640: {
                        plugins: [
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 1,
                                }
                            }
                        ]
                    },
                    // for 900 px
                    900: {
                        plugins: [
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 2,
                                }
                            }
                        ]
                    }
                }}
            />

            <Dots value={current} onChange={setCurrent} number={isMobile ? cars.length : Math.ceil(cars.length / 3)} />

        </CarsContainer>}
    </TopCarContainer>;
};