import { Input } from "@mui/material";
import { Post } from "../../app/services/types";
import { CursorPointer, EditableWrapper } from "./styled.components";
import { useUpdatePostMutation } from "../../app/services/api";
import { useStateContext } from "./PostsManager";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useRef, useState } from "react";

export const Editable = ({ value, id }: { value: string; id: Post["id"] }) => {
  const submitStatusRef = useRef<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const [updatePost] = useUpdatePostMutation();
  const { showBackdrop, hideBackdrop, showSnackbar } = useStateContext();

  const submitChange = async () => {
    submitStatusRef.current = true;
    showBackdrop();
    try {
      await updatePost({ id, name: inputRef.current?.value ?? "" }).unwrap();
      setIsEditing(false);
    } catch (error) {
      showSnackbar(`UPDATE id:${id} FAIL!`);
    }
    submitStatusRef.current = false;
    hideBackdrop();
  };

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.select();
        inputRef.current.onblur = () => {
          !submitStatusRef.current && setIsEditing(false);
        };
        const keydownHandler = (e: KeyboardEvent) => {
          e.code === "Enter" && submitChange();
        };
        inputRef.current.addEventListener("keydown", keydownHandler);
        return () => {
          inputRef.current?.removeEventListener("keydown", keydownHandler);
        };
      }
    }
  }, [isEditing, submitChange]);

  return (
    <div>
      {isEditing ? (
        <EditableWrapper>
          <Input size="small" inputRef={inputRef} defaultValue={value} />
          <CursorPointer onMouseDown={submitChange}>
            <CheckBoxIcon />
          </CursorPointer>
        </EditableWrapper>
      ) : (
        <CursorPointer>
          <span onClick={() => setIsEditing(true)}>{value}</span>
        </CursorPointer>
      )}
    </div>
  );
};

export const _sourceCode = `export const Editable = ({ value, id }: { value: string; id: Post["id"] }) => {
  const submitStatusRef = useRef<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const [updatePost] = useUpdatePostMutation();
  const { showBackdrop, hideBackdrop, showSnackbar } = useStateContext();

  const submitChange = async () => {
    submitStatusRef.current = true;
    showBackdrop();
    try {
      await updatePost({ id, name: inputRef.current?.value ?? "" }).unwrap();
      setIsEditing(false);
    } catch (error) {
      showSnackbar(\`UPDATE id:\${id} FAIL!\`);
    }
    submitStatusRef.current = false;
    hideBackdrop();
  };

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.select();
        inputRef.current.onblur = () => {
          !submitStatusRef.current && setIsEditing(false);
        };
        const keydownHandler = (e: KeyboardEvent) => {
          e.code === "Enter" && submitChange();
        };
        inputRef.current.addEventListener("keydown", keydownHandler);
        return () => {
          inputRef.current?.removeEventListener("keydown", keydownHandler);
        };
      }
    }
  }, [isEditing, submitChange]);

  return (
    <div>
      {isEditing ? (
        <EditableWrapper>
          <Input size="small" inputRef={inputRef} defaultValue={value} />
          <CursorPointer onMouseDown={submitChange}>
            <CheckBoxIcon />
          </CursorPointer>
        </EditableWrapper>
      ) : (
        <CursorPointer>
          <span onClick={() => setIsEditing(true)}>{value}</span>
        </CursorPointer>
      )}
    </div>
  );
};
`;
