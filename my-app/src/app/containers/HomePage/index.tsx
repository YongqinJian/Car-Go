import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-ful
        h-full
        items-center
        overflow-x-hidden
        item
    `}
`;

export function HomePage(){
    return <PageContainer>
        Hello World!
    </PageContainer>
}