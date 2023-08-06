import { DragVerticalOutline } from "@/core/icons/drag-vertical-outline";
import { Order, TileProps } from "@/types";
import { ReactNode, useRef, useState } from "react";
import { DndProvider, XYCoord, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Identifier } from "dnd-core";
import { useResumeContext } from "../context/resume-context";

type Types = "employ" | "social" | "education" | "skill";

type OrderFunc = (order: Order<any>[], currentIndex: number, newIndex: number) => void;

interface DraggableListProps {
  list: Order<any>[];
  child: (props: TileProps<any>) => JSX.Element;
  type: Types;
  reOrder: OrderFunc;
}

export function DraggableList(props: DraggableListProps) {
  const { list, child, reOrder, type } = props;

  return (
    <DndProvider backend={HTML5Backend}>
      {list
        .sort((a, b) => a.order - b.order)
        .map((order) => {
          const Comp = child;
          return (
            <DraggableItem list={list} key={order.order} order={order} type={type} reOrder={reOrder}>
              <Comp key={order.order} order={order} />
            </DraggableItem>
          );
        })}
    </DndProvider>
  );
}

function DraggableItem({
  list,
  order,
  children,
  type,
  reOrder,
}: {
  list: Order<any>[];
  reOrder: OrderFunc;
  order: Order<any>;
  children: ReactNode;
  type: Types;
}) {
  const { state } = useResumeContext();
  const [dragHash, setDragHash] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const elementName = `${type.toUpperCase()}_TILE`;

  const [{ handlerId }, drop] = useDrop<Order<any>, void, { handlerId: Identifier | null }>({
    accept: elementName,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;

      // setDragHash(order.hash);

      const dragIndex = item.order;
      const hoverIndex = order.order; // elements que o dragIndex passará por cima

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // setDragHash("");

      if (dragIndex !== undefined) {
        reOrder(list, dragIndex, hoverIndex);
      }

      item.order = hoverIndex;
    },
  });

  const [_, drag] = useDrag({
    type: elementName,
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  drag(drop(ref));

  return (
    <div
      id={order.hash}
      ref={ref}
      data-handler-id={handlerId}
      className={`flex items-center transition-all ${order.hash === dragHash ? "bg-red-500" : ""}`}
    >
      <DragVerticalOutline id={order.hash} width={"2em"} height={"1.2em"} className={`cursor-grab text-slate-500 `} />
      {children}
    </div>
  );
}
