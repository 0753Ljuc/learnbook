import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CursorPointer } from "./styled.components";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../app/services/api";
import { useStateContext } from "./PostsManager";
import { Editable } from "./Editable";
import { Post } from "../../app/services/types";
import { TableRow, TableCell } from "@mui/material";

export const PostListItem = ({ post }: { post: Post }) => {
  const [deletePost] = useDeletePostMutation();
  const { showBackdrop, hideBackdrop, showSnackbar } = useStateContext();

  const onDelete = async (id: string) => {
    showBackdrop();
    try {
      await deletePost({ id }).unwrap();
    } catch (error) {
      showSnackbar("DELETE FAIL!");
    }
    hideBackdrop();
  };

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <Editable value={post.name} id={post.id} />
      </TableCell>
      <TableCell>{post.fetched_at}</TableCell>
      <TableCell>
        <CursorPointer>
          <DeleteForeverIcon
            color="info"
            titleAccess="delete"
            onClick={() => onDelete(post.id)}
          />
        </CursorPointer>
      </TableCell>
    </TableRow>
  );
};

export const _sourceCode = `
export const PostListItem = ({ post }: { post: Post }) => {
  const [deletePost] = useDeletePostMutation();
  const { showBackdrop, hideBackdrop, showSnackbar } = useStateContext();

  const onDelete = async (id: string) => {
    showBackdrop();
    try {
      await deletePost({ id }).unwrap();
    } catch (error) {
      showSnackbar("DELETE FAIL!");
    }
    hideBackdrop();
  };

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <Editable value={post.name} id={post.id} />
      </TableCell>
      <TableCell>{post.fetched_at}</TableCell>
      <TableCell>
        <CursorPointer>
          <DeleteForeverIcon
            color="info"
            titleAccess="delete"
            onClick={() => onDelete(post.id)}
          />
        </CursorPointer>
      </TableCell>
    </TableRow>
  );
};
`;
