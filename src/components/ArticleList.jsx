import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

function ArticleList({ items, renderItem, itemHeight = 112, getItemKey }) {
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 6,
  });

  return (
    <div className="list virtual" data-testid="article-list" ref={parentRef}>
      <div
        className="list-spacer"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          const key = getItemKey
            ? getItemKey(item, virtualRow.index)
            : (item?.id ?? virtualRow.index);

          return (
            <div
              key={key}
              data-testid="article-item"
              className="virtual-row"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {renderItem(item, virtualRow.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleList;
