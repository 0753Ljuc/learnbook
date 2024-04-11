import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Post } from "../../app/services/types";
import { PostListItem } from "./PostListItem";

export const PostList = ({ posts }: { posts: Post[] }) => {
  const row: (keyof Post)[] = ["id", "name", "fetched_at"];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {row.map((v, i) => (
              <TableCell key={`table-head-${i}`}> {v} </TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, i) => (
            <PostListItem post={post} key={`table-body-${i}`} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const _sourceCode = `export const PostList = ({ posts }: { posts: Post[] }) => {
  const row: (keyof Post)[] = ["id", "name", "fetched_at"];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {row.map((v, i) => (
              <TableCell key={\`table-head-\${i}\`}> {v} </TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, i) => (
            <PostListItem post={post} key={\`table-body-\${i}\`} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
`;
