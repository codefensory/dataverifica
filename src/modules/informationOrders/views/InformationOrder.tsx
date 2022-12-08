import { userIsAdminAtom } from "@app/modules/shared/atoms";
import { SimpleContainerView } from "@app/modules/shared/components";
import { Box, Button, Divider, IconButton, VStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { FC, useState } from "react";
import { informationOrderDefaultDataAtom } from "../atoms";
import { ModalCreateInfoOrder, TableInformationOrder } from "../components";

export const InformationOrder: FC = () => {
  const isAdmin = useAtomValue(userIsAdminAtom);

  const {
    data: informationOrders,
    isFetching,
    refetch,
  } = useAtomValue(informationOrderDefaultDataAtom);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <SimpleContainerView
      title="Peticiones"
      subTitle={
        isAdmin
          ? "Lista de todas las peticiones realizadas por lo usuarios"
          : "Lista de todas las peticiones que has solicitado"
      }
      rightRenderHeader={
        <>
          <IconButton
            colorScheme="gray"
            aria-label="refresh"
            isLoading={isFetching}
            onClick={() => refetch()}
          >
            <Image
              alt="refresh svg"
              src="/refresh.svg"
              width={16}
              height={16}
            />
          </IconButton>
          {!isAdmin && (
            <Button ml="4" onClick={() => setCreateModalOpen(true)}>
              + Agregar nuevo
            </Button>
          )}
        </>
      }
    >
      <VStack mt="1rem" h="full" w="full" spacing="0">
        <Box flex="1" h="0" w="full">
          <TableInformationOrder
            isAdmin={isAdmin}
            informationOrders={informationOrders}
          />
        </Box>
        <Divider />
        <Box w="full" h="3rem"></Box>
      </VStack>
      {!isAdmin && (
        <ModalCreateInfoOrder
          onClose={() => setCreateModalOpen(false)}
          isOpen={createModalOpen}
        />
      )}
    </SimpleContainerView>
  );
};
