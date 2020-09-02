import React from "react";
import cx from "classnames";
import "./Toolbar.css";
import { iconClassName } from "@blink-mind/renderer-react";
import { ToolbarItemOpen } from "./toolbar-item-open";
import { ToolbarItemLayout } from "./toolbar-item-layout";
import { ToolbarItemTheme } from "./toolbar-item-theme";
import { ToolbarItemExport } from "./toolbar-item-export";
import { ToolbarItemSearch } from "./toolbar-item-search";
import { ToolbarItemSave } from "./toolbar-item-save";
// import debug from "debug";
// const log = debug("app");

export class Toolbar extends React.PureComponent {
  render() {
    const props = this.props;

    const { onClickUndo, onClickRedo, canUndo, canRedo } = props;

    return (
      <>
        <ToolbarItemOpen {...props} />
        <ToolbarItemExport {...props} />
        <ToolbarItemSave {...props} />
        <ToolbarItemTheme {...props} />
        <ToolbarItemLayout {...props} />
        <ToolbarItemSearch {...props} />

        <div
          className={cx("bm-toolbar-item", iconClassName("undo"), {
            "bm-toolbar-item-disabled": !canUndo
          })}
          onClick={onClickUndo}
        />

        <div
          className={cx("bm-toolbar-item", iconClassName("redo"), {
            "bm-toolbar-item-disabled": !canRedo
          })}
          onClick={onClickRedo}
        />
      </>
    );
  }
}
