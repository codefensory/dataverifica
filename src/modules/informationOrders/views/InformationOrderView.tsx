import { userIsAdminAtom } from "@app/modules/shared/atoms";
import {
  SimpleContainerView,
  Pagination,
} from "@app/modules/shared/components";
import { Box, Button, Divider, IconButton, VStack } from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { FC, useState } from "react";
import { informationOrderDataAtom, informationOrderPageAtom } from "../atoms";
import {
  ModalCompleteInfoOrder,
  ModalCreateBulkInfoOrder,
  ModalCreateInfoOrder,
  TableInformationOrder,
} from "../components";

export const InformationOrderView: FC = () => {
  const isAdmin = useAtomValue(userIsAdminAtom);

  const [page, setPage] = useAtom(informationOrderPageAtom);

  const {
    data: informationOrdersPages,
    isLoading,
    isFetching,
    refetch,
  } = useAtomValue(informationOrderDataAtom);

  const informationOrders = informationOrdersPages?.pages[0]?.orders;

  const totalPages = informationOrdersPages?.pages[0]?.pages;

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [createBulkModalOpen, setCreateBulkModalOpen] = useState(false);

  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const [infoOrderIndex, setInfoOrderIndex] = useState(0);

  const handlerEditClick = (index: number) => {
    setInfoOrderIndex(index);
    setCompleteModalOpen(true);
  };

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
            <>
              <Button ml="4" onClick={() => setCreateBulkModalOpen(true)}>
                + Agregar por lote
              </Button>
              <Button ml="4" onClick={() => setCreateModalOpen(true)}>
                + Agregar nuevo
              </Button>
            </>
          )}
        </>
      }
    >
      <VStack mt="1rem" h="full" w="full" spacing="0">
        <Box flex="1" h="0" w="full">
          <TableInformationOrder
            isAdmin={isAdmin}
            isLoading={isLoading}
            informationOrders={informationOrders}
            onClickEdit={handlerEditClick}
          />
        </Box>
        <Divider />
        <Box w="full" h="4rem">
          <Pagination
            currentPage={page}
            totalPages={totalPages ?? 0}
            onChange={setPage}
          />
        </Box>
      </VStack>
      {isAdmin ? (
        <ModalCompleteInfoOrder
          informationOrders={informationOrders?.[infoOrderIndex]}
          onClose={() => setCompleteModalOpen(false)}
          isOpen={completeModalOpen}
        />
      ) : (
        <>
          <ModalCreateInfoOrder
            onClose={() => setCreateModalOpen(false)}
            isOpen={createModalOpen}
          />
          <ModalCreateBulkInfoOrder
            onClose={() => setCreateBulkModalOpen(false)}
            isOpen={createBulkModalOpen}
          />
        </>
      )}
    </SimpleContainerView>
  );
};
