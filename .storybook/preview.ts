import type { Preview } from "@storybook/react";
import { CustomCode } from "../src/components/CustomCode";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const preview: Preview = {
  parameters: {
    docs: {
      components: {
        code: CustomCode,
      },
    },

    options: {
      storySort: (a, b) => {
        const reduxTitleOrder = [
          "Topic/Redux/Introduction",
          "Topic/Redux/Redux Toolkit",
          "Topic/Redux/Middleware",
          "Topic/Redux/Redux Query",
        ];
        const orderA = reduxTitleOrder.indexOf(a.title);
        const orderB = reduxTitleOrder.indexOf(b.title);
        if (orderA === -1) {
          return 1;
        } else if (orderB === -1) {
          return -1;
        } else if (orderA === -1 && orderB === -1) {
          return a.id === b.id
            ? 0
            : a.id.localeCompare(b.id, undefined, { numeric: true });
        }
        return orderA - orderB;
      },
    },

    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
