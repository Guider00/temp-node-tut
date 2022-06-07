import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
//import { style }


export const ItemBox = ({ index, moveItemBox }) => {

    // useDrag - item is dragable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // useDrop - drop area
    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            //testing
            //const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2
            //const hoverActualX = monitor.getClientOffset().x - hoverBoundingRect.right

            //if drag down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            //if drag up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            //testing
            //if drag left
            //if (dragIndex < hoverIndex && hoverActualX < hoverMiddleX) return

            //if drag right
            //if (dragIndex > hoverIndex && hoverActualX > hoverMiddleX) return

            moveItemBox(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    //join 2 ref together (dragable & dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    //make item being dragged transparent
    const opacity = isDragging ? 0 : 1
    return (
        <div ref={dragDropRef} style={{...style, opacity }}>
            
        </div>
    )

}
