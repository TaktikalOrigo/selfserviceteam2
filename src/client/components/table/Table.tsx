import React, { useState } from "react";
import Link from "next/link";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "~/client/components/table/Table.styles";

const s = compileStaticStylesheet(styles);

type DefinitionType = "fixed_width" | "minimum_width";

const getDefinitionType = (def: TableDefinition<any>): DefinitionType => {
  if (typeof (def as FixedWidthTableDefinition<any>).width === "number") {
    return "fixed_width";
  }
  return "minimum_width";
};

interface CommonTableDefinition<T> {
  name?: string;
  render: (item: T) => React.ReactNode;
  sortFn?: (a: T, b: T) => number;
  defaultSortBy?: "asc" | "desc";
  align?: "right";
}

interface FixedWidthTableDefinition<T> extends CommonTableDefinition<T> {
  width: number;
}

interface MinWidthTableDefinition<T> extends CommonTableDefinition<T> {
  minWidth: number;
}

type TableDefinition<T> = FixedWidthTableDefinition<T> | MinWidthTableDefinition<T>;

const getInitialSortBy = (props: TableProps<any>) => () => {
  for (let i = 0; i < props.definitions.length; i += 1) {
    if (props.definitions[i].defaultSortBy && typeof props.definitions[i].sortFn === "function") {
      return props.definitions[i].defaultSortBy === "desc" ? 1 : -1;
    }
  }

  return 1;
};

const getInitialSortIndex = (props: TableProps<any>) => () => {
  for (let i = 0; i < props.definitions.length; i += 1) {
    if (props.definitions[i].defaultSortBy && typeof props.definitions[i].sortFn === "function") {
      return i;
    }
  }

  return -1;
};

interface TableHeadProps<T> extends TableProps<T> {
  setSortIndex: (n: number) => void;
  sortIndex: number;
  sortBy: 1 | -1;
}

const TableHead = <T extends {}>(props: TableHeadProps<T>) => {
  return (
    <div
      className={s("head")}
      style={{ paddingLeft: props.paddingHorizontal, paddingRight: props.paddingHorizontal }}
    >
      {props.definitions.map((definition, i) => {
        switch (getDefinitionType(definition)) {
          case "fixed_width":
            return (
              <div
                key={i}
                style={{
                  flexBasis: (definition as FixedWidthTableDefinition<T>).width,
                  minWidth: (definition as FixedWidthTableDefinition<T>).width,
                  flexGrow: 0,
                }}
                className={s("head__item", {
                  sortable: !!definition.sortFn,
                  right: definition.align === "right",
                })}
                onClick={definition.sortFn ? () => props.setSortIndex(i) : undefined}
              >
                {definition.name || ""}
              </div>
            );
          case "minimum_width":
            return (
              <div
                key={i}
                style={{
                  minWidth: (definition as MinWidthTableDefinition<T>).minWidth,
                  flexBasis: (definition as MinWidthTableDefinition<T>).minWidth,
                  flexGrow: 1,
                }}
                className={s("head__item", {
                  sortable: !!definition.sortFn,
                  right: definition.align === "right",
                })}
                onClick={definition.sortFn ? () => props.setSortIndex(i) : undefined}
              >
                {definition.name || ""}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

interface TableProps<T> {
  items: T[];
  getKey: (item: T) => string;
  getHref?: (item: T) => string;
  onItemClick?: (item: T) => void;
  definitions: TableDefinition<T>[];
  paddingHorizontal?: number;
}

export const Table = <T extends {}>(props: TableProps<T>) => {
  const [sortBy, setSortBy] = useState<1 | -1>(getInitialSortBy(props));
  const [sortIndex, setSortIndex] = useState(getInitialSortIndex(props));

  const handleSetSortIndex = (newSortIndex: number) => {
    if (newSortIndex !== sortIndex) {
      setSortBy(1);
      setSortIndex(newSortIndex);
      return;
    }

    if (sortBy === 1) {
      setSortBy(-1);
      return;
    }

    setSortIndex(-1);
  };

  let items = props.items;

  if (sortIndex !== -1) {
    const sortFn = props.definitions[sortIndex].sortFn!;

    if (typeof sortFn === "function") {
      items = [...items].sort((a, b) => sortFn(a, b) * sortBy);
    }
  }

  const Item = (_props: React.HTMLProps<HTMLDivElement | HTMLAnchorElement> & { item: T }) => {
    if (!props.getHref) {
      return <div {...(_props as React.HTMLProps<HTMLDivElement>)} />;
    }
    return (
      <Link href={props.getHref(_props.item)}>
        <a {...(_props as React.HTMLProps<HTMLAnchorElement>)} />
      </Link>
    );
  };

  return (
    <>
      <div className={s("body")}>
        <div>
          <TableHead
            {...props}
            sortIndex={sortIndex}
            setSortIndex={handleSetSortIndex}
            sortBy={sortBy}
          />
          {items.map((item, itemIndex) => (
            <Item
              className={s("item", { clickable: !!(props.getHref || props.onItemClick) })}
              key={props.getKey(item)}
              item={item}
              onClick={props.onItemClick ? () => props.onItemClick!(item) : undefined}
            >
              {props.definitions.map((definition, i) => {
                switch (getDefinitionType(definition)) {
                  case "fixed_width": {
                    const isFirst = i === 0;
                    const isLast = i === props.definitions.length - 1;
                    const w =
                      (definition as FixedWidthTableDefinition<T>).width +
                      (isFirst || isLast ? props.paddingHorizontal || 0 : 0);
                    return (
                      <div
                        key={i}
                        style={{
                          flexBasis: w,
                          flexGrow: 0,
                          minWidth: w,
                          paddingLeft: i === 0 ? props.paddingHorizontal : 0,
                          paddingRight:
                            i === props.definitions.length - 1 ? props.paddingHorizontal : 0,
                        }}
                        className={s("cell", {
                          even: itemIndex % 2 === 0,
                          right: definition.align === "right",
                        })}
                      >
                        {definition.render(item)}
                      </div>
                    );
                  }
                  case "minimum_width": {
                    const isFirst = i === 0;
                    const isLast = i === props.definitions.length - 1;
                    const w =
                      (definition as MinWidthTableDefinition<T>).minWidth +
                      (isFirst || isLast ? props.paddingHorizontal || 0 : 0);
                    return (
                      <div
                        key={i}
                        style={{
                          minWidth: w,
                          flexBasis: w,
                          flexGrow: 1,
                          paddingLeft: i === 0 ? props.paddingHorizontal : 0,
                          paddingRight:
                            i === props.definitions.length - 1 ? props.paddingHorizontal : 0,
                        }}
                        className={s("cell", {
                          even: itemIndex % 2 === 0,
                          right: definition.align === "right",
                        })}
                      >
                        {definition.render(item)}
                      </div>
                    );
                  }
                  default:
                    return null;
                }
              })}
            </Item>
          ))}
        </div>
      </div>
    </>
  );
};
