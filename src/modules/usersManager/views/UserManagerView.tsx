import { FC, useState } from "react";
import { Box, Button, Divider, IconButton, VStack } from "@chakra-ui/react";
import {
  SimpleContainerView,
  Pagination,
} from "@app/modules/shared/components";
import Image from "next/image";
import {
  adminPageAtom,
  adminsDataAtom,
  usersDataAtom,
  usersPageAtom,
} from "../atoms";
import { useAtom, useAtomValue } from "jotai";
import {
  ModalCreateUser,
  ModalDeleteUser,
  ModalUpdateUser,
  TableUser,
} from "../components";
import { deleteUser } from "../services";
import { adminsKey, usersKey } from "../utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type UserManagerViewProps = {
  isAdmin?: boolean;
};

export const UserManagerView: FC<UserManagerViewProps> = (props) => {
  const { isAdmin } = props;

  const queryClient = useQueryClient();

  const [page, setPage] = useAtom(isAdmin ? adminPageAtom : usersPageAtom);

  const {
    data: usersPages,
    isLoading,
    isFetching,
    refetch,
  } = useAtomValue(isAdmin ? adminsDataAtom : usersDataAtom);

  const users = usersPages?.pages[0]?.data;

  const totalPages = usersPages?.pages[0]?.pages;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [currentEditIndex, setCurrentEditIndex] = useState(0);

  const handleDelete = async () => {
    if (!users) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteUser(users[currentEditIndex].id);

      await queryClient.invalidateQueries(isAdmin ? adminsKey : usersKey);

      setIsDeleteModalOpen(false);

      toast.success("¡Usuario eliminado!");
    } catch (error) {
      toast.error("Hubo un error al eliminar al usuario");

      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SimpleContainerView
      title={isAdmin ? "Administradores" : "Usuarios (Clientes)"}
      subTitle={
        isAdmin
          ? "Lista de todos los administradores"
          : "Lista de todos los usuarios"
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
          <Button ml="4" onClick={() => setIsCreateModalOpen(true)}>
            + Agregar nuevo
          </Button>
        </>
      }
    >
      <VStack mt="1rem" h="full" w="full" spacing="0">
        <Box flex="1" h="0" w="full">
          <TableUser
            isLoading={isLoading}
            users={users}
            onClickEdit={(index) => {
              setCurrentEditIndex(index);

              setIsUpdateModalOpen(true);
            }}
            onDelete={(index) => {
              setCurrentEditIndex(index);

              setIsDeleteModalOpen(true);
            }}
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
      <ModalCreateUser
        isAdmin={isAdmin}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ModalUpdateUser
        isAdmin={isAdmin}
        user={users?.[currentEditIndex]}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
      <ModalDeleteUser
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
        onDelete={handleDelete}
      />
    </SimpleContainerView>
  );
};
