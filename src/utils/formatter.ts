import estree from "prettier/plugins/estree";
import typescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
import type { BuiltInParserName } from "prettier";

export type SyntaxHighlighterFormatTypes = boolean | BuiltInParserName;

export const formatter = async (
  type: SyntaxHighlighterFormatTypes,
  source: string
) => {
  if (type === false) {
    return source;
  }

  return (
    await prettier.format(source, {
      parser: type,
      plugins: [estree, typescript],
      htmlWhitespaceSensitivity: "ignore",
    })
  ).trim();
};
