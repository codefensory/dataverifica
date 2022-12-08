import { SimpleContainerView } from "@app/modules/shared/components";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { FC, useState } from "react";
import { informationOrderDefaultDataAtom } from "../atoms";
import {
  ModalCreateInfoOrder,
  TableInformationOrderAdmin,
} from "../components";

export const InformationOrderClient: FC = () => {
  const {
    data: informationOrders,
    isFetching,
    refetch,
  } = useAtomValue(informationOrderDefaultDataAtom);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <SimpleContainerView
      title="Peticiones"
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
      <Box mt="1rem">
        <TableInformationOrderAdmin informationOrders={informationOrders} />
      </Box>
      <ModalCreateInfoOrder
        onClose={() => setCreateModalOpen(false)}
        isOpen={createModalOpen}
      />
    </SimpleContainerView>
  );
};
