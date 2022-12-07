import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { FC, useState } from "react";
import { informationOrderDefaultDataAtom } from "../atoms";
import {
  ModalCreateInfoOrder,
  TableInformationOrderClient,
} from "../components";

export const InformationOrderClient: FC = () => {
  const {
    data: informationOrders,
    isFetching,
    refetch,
  } = useAtomValue(informationOrderDefaultDataAtom);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Box minW="60rem">
      <HStack justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Heading as="h2" size="md" color="text.dark">
            Peticiones
          </Heading>
          <Text color="gray.500">
            Lista de todas las peticiones que has solicitado
          </Text>
        </VStack>
        <Box>
          <IconButton
            colorScheme="gray"
            aria-label="refresh"
            isLoading={isFetching}
            mr="4"
            onClick={() => refetch()}
          >
            <Image
              alt="refresh svg"
              src="/refresh.svg"
              width={16}
              height={16}
            />
          </IconButton>
          <Button onClick={() => setCreateModalOpen(true)}>
            + Agregar Nuevo
          </Button>
        </Box>
      </HStack>
      <Box mt="1rem">
        <TableInformationOrderClient informationOrders={informationOrders} />
      </Box>
      <ModalCreateInfoOrder
        onClose={() => setCreateModalOpen(false)}
        isOpen={createModalOpen}
      />
    </Box>
  );
};
