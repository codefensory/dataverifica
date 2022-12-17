import { Button, HStack, Text } from "@chakra-ui/react";
import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

type ChooseFileInputProps = {
  name?: string;
  path?: string;
  onChange?: (files: FileList) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const ChooseFileInput: FC<ChooseFileInputProps> = (props) => {
  const [canOpenPath, setCanOpenPath] = useState(true);

  const [name, setName] = useState<string | undefined>(props.name);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setName(acceptedFiles[0].name);
      setCanOpenPath(false);
      props?.onChange?.(acceptedFiles);
    },
    [setName]
  );

  useEffect(() => {
    setName(props.name);
    setCanOpenPath(true);
  }, [props.name]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
  });

  return (
    <>
      <HStack
        w="full"
        p="4"
        borderRadius="12"
        border="2px dashed"
        borderColor={isDragActive ? "green" : "gray.300"}
        transition="border 300ms"
        {...getRootProps()}
      >
        <Button size="sm" onClick={() => open()}>
          Seleccionar archivo
        </Button>
        <Text
          color="gray.600"
          textDecor="underline"
          cursor="pointer"
          onClick={() => {
            if (canOpenPath) {
              window.open(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.path}`
              );
            }
          }}
        >
          {name}
        </Text>
      </HStack>
      <input {...getInputProps()} accept={props.accept} />
    </>
  );
};
