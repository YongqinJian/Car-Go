import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IButtonProps{
    theme: "filled" | "outlined";
    text: string;
}

const BaseButton = styled.button`
  ${tw`
    pl-5
    pr-5
    pt-3
    pb-3
    outline-none
    rounded-md
    text-white
    text-xs
    font-semibold
    border-transparent
  `} ;
`;


export function Button(props:IButtonProps){



};