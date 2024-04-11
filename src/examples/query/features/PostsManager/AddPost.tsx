import { TextField, Button } from "@mui/material";
import { useState, ChangeEventHandler, useEffect, useRef } from "react";
import { useAddPostMutation } from "../../app/services/api";
import { BaselineLayout } from "./styled.components";
import { useStateContext } from "./PostsManager";

export const AddPost = () => {
  const [name, setName] = useState("");
  const [textEmpty, setTextEmpty] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const [addPost, { isLoading }] = useAddPostMutation();
  const { showBackdrop, hideBackdrop, showSnackbar } = useStateContext();

  const onClick = async () => {
    if (!name) {
      return setTextEmpty(true);
    }
    showBackdrop();
    try {
      await addPost({ name }).unwrap();
      setName("");
    } catch (error) {
      showSnackbar("ADD POST FAIL!");
    }
    hideBackdrop();
  };

  const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    setName(target.value);
    setTextEmpty(false);
  };

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      e.code === "Enter" && onClick();
    };
    inputRef.current?.addEventListener("keydown", keydownHandler);
    return () => {
      inputRef.current?.removeEventListener("keydown", keydownHandler);
    };
  }, [onClick]);

  return (
    <BaselineLayout>
      <TextField
        inputRef={inputRef}
        label="New post name"
        variant="standard"
        error={textEmpty}
        helperText={textEmpty && "Empty post name."}
        value={name}
        onChange={onTextChange}
      />
      <Button size="small" onClick={onClick}>
        {isLoading ? "Adding..." : "Add Post"}
      </Button>
    </BaselineLayout>
  );
};

export const _sourceCode = `export const AddPost = () => {
  const [name, setName] = useState("");
  const [textEmpty, setTextEmpty] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const [addPost, { isLoading }] = useAddPostMutation();
  const { showBackdrop, hideBackdrop, showSnackbar } = useStateContext();

  const onClick = async () => {
    if (!name) {
      return setTextEmpty(true);
    }
    showBackdrop();
    try {
      await addPost({ name }).unwrap();
      setName("");
    } catch (error) {
      showSnackbar("ADD POST FAIL!");
    }
    hideBackdrop();
  };

  const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    setName(target.value);
    setTextEmpty(false);
  };

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      e.code === "Enter" && onClick();
    };
    inputRef.current?.addEventListener("keydown", keydownHandler);
    return () => {
      inputRef.current?.removeEventListener("keydown", keydownHandler);
    };
  }, [onClick]);

  return (
    <BaselineLayout>
      <TextField
        inputRef={inputRef}
        label="New post name"
        variant="standard"
        error={textEmpty}
        helperText={textEmpty && "Empty post name."}
        value={name}
        onChange={onTextChange}
      />
      <Button size="small" onClick={onClick}>
        {isLoading ? "Adding..." : "Add Post"}
      </Button>
    </BaselineLayout>
  );
};
`;
