/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type TreeNodeId = string | number;

export interface TreeNode {
  id: TreeNodeId;
  text: string;
  icon?: typeof import("svelte").SvelteComponent;
  disabled?: boolean;
  expanded?: boolean;
}

export interface TreeViewProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["ul"]> {
  /**
   * Provide an array of children nodes to render
   * @default []
   */
  children?: Array<TreeNode & { children?: TreeNode[] }>;

  /**
   * Set the current active node id
   * Only one node can be active
   * @default ""
   */
  activeId?: TreeNodeId;

  /**
   * Set the node ids to be selected
   * @default []
   */
  selectedIds?: TreeNodeId[];

  /**
   * Set the node ids to be expanded
   * @default []
   */
  expandedIds?: TreeNodeId[];

  /**
   * Specify the TreeView size
   * @default "default"
   */
  size?: "default" | "compact";

  /**
   * Specify the label text
   * @default ""
   */
  labelText?: string;

  /**
   * Set to `true` to visually hide the label text
   * @default false
   */
  hideLabel?: boolean;
}

export default class TreeView extends SvelteComponentTyped<
  TreeViewProps,
  {
    select: CustomEvent<TreeNode & { expanded: boolean; leaf: boolean }>;
    toggle: CustomEvent<TreeNode & { expanded: boolean; leaf: boolean }>;
    focus: CustomEvent<TreeNode & { expanded: boolean; leaf: boolean }>;
    keydown: WindowEventMap["keydown"];
  },
  { labelText: {} }
> {
  /**
   * Programmatically expand all nodes
   * @default () => { expandedIds = [...nodeIds]; }
   */
  expandAll: () => void;

  /**
   * Programmatically collapse all nodes
   * @default () => { expandedIds = []; }
   */
  collapseAll: () => void;

  /**
   * Programmatically expand a subset of nodes.
   * Expands all nodes if no argument is provided
   * @default () => { expandedIds = nodes .filter((node) => !filterNode(node)) .map((node) => node.id); }
   */
  expandNodes: (filterId?: (node: TreeNode) => boolean) => void;

  /**
   * Programmatically collapse a subset of nodes.
   * Collapses all nodes if no argument is provided
   * @default () => { expandedIds = nodes .filter((node) => !filterNode(node)) .map((node) => node.id); }
   */
  collapseNodes: (filterId?: (node: TreeNode) => boolean) => void;
}
