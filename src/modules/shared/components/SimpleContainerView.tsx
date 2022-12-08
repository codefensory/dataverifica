import { FC, PropsWithChildren, ReactNode } from "react";
import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";

type SimpleContianerViewProps = {
  title: string;
  subTitle?: string;
  rightRenderHeader?: ReactNode;
};

export const SimpleContainerView: FC<
  PropsWithChildren<SimpleContianerViewProps>
> = (props) => {
  return (
    <VStack w="full" h="80vh">
      <HStack justifyContent="space-between" w="full">
        <VStack alignItems="flex-start">
          <Heading as="h2" size="md" color="text.dark">
            {props.title}
          </Heading>
          {props.subTitle && <Text color="gray.500">{props.subTitle}</Text>}
        </VStack>
        <Box>{props.rightRenderHeader}</Box>
      </HStack>
      <Box mt="1rem" flex="1" h="0" w="full">{props.children}</Box>
    </VStack>
  );
};
