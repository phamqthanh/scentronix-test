import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import ActionMenu from "./action-menu";

const meta = {
  title: "components/ActionMenu",
  component: ActionMenu,
  parameters: { layout: "" },
  decorators: [(story) => <div className="py-4">{story()}</div>],
  tags: ["autodocs"],
  argTypes: {
    options: { description: "" },
  },
  args: { onClick: fn(), onClickOption: fn() },
} satisfies Meta<typeof ActionMenu>;
const DEFAULT_OPTIONS = [
  { id: "base", label: "Button text", subtitle: "Price" },
  {
    id: "full",
    label: "Button text",
    subtitle: "Price",
    description: "An optional description",
    tags: ["Optional tag"],
  },
  {
    id: "desc-only",
    label: "Button text",
    description: "Description only",
  },
  { id: "tag-only", label: "Button text", tags: ["Tag only"] },
];
export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    options: DEFAULT_OPTIONS,
  },
};
export const Usage: Story = {
  args: {
    options: [
      { id: 1, label: "50ml", subtitle: "€80" },
      { id: 2, label: "30ml", subtitle: "€60" },
      { id: 3, label: "5ml", subtitle: "€15", tags: ["3 x 5ml for €40"] },
    ],
  },
  decorators: [
    (story) => (
      <div className="h-screen flex py-4">
        <div>
          <article>
            <p className="max-w px-4 w-full sm:w-1/3 md:w-1/4">
              In the current example, there is not enough specific information
              regarding factors such as the position of the button, the size of
              components relative to the screen, or other detailed UI
              requirements. Therefore, I can only follow the instructions as
              outlined in the requirement document. Any additional details
              regarding layout, size, or positioning would need to be provided
              in order to implement the UI exactly as required.
            </p>
          </article>
        </div>
        <div className="h-full flex flex-col">
          <div className="h-1/4">{story()}</div>
          <div className="h-1/4">{story()}</div>
          <div className="h-1/4">{story()}</div>
        </div>
      </div>
    ),
  ],
};
