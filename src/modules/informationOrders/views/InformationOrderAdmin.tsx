import { userIsAdminAtom } from "@app/modules/shared/atoms";
import { SimpleContainerView } from "@app/modules/shared/components";
import { Box, Button, IconButton, VStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { FC, useState } from "react";
import { informationOrderDefaultDataAtom } from "../atoms";
import {
  ModalCreateInfoOrder,
  TableInformationOrderAdmin,
} from "../components";

export const InformationOrderAdmin: FC = () => {
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
      subTitle="Lista de todas las peticiones que has solicitado"
      rightRenderHeader={
        <>
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
        </>
      }
    >
      <VStack mt="1rem" h="full" w="full">
        <Box flex="1" h="0" w="full">
          <TableInformationOrderAdmin
            isAdmin={isAdmin}
            informationOrders={informationOrders}
          />
        </Box>
        <Box w="full" h="3rem"></Box>
      </VStack>
      <ModalCreateInfoOrder
        onClose={() => setCreateModalOpen(false)}
        isOpen={createModalOpen}
      />
    </SimpleContainerView>
  );
};
