import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { FC, useState } from "react";
import { informationOrderDefaultDataAtom } from "../atoms";
import {
  ModalCreateInfoOrder,
  TableInformationOrderClient,
} from "../components";

export const InformationOrderClient: FC = () => {
  const informationOrders = useAtomValue(informationOrderDefaultDataAtom);

  const [createModalOpen, setCreateModalOpen] = useState(true);

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
          <Button onClick={() => setCreateModalOpen(true)}>+ Agregar Nuevo</Button>
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
