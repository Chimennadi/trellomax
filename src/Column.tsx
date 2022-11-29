import { useRef } from "react"
import { ColumnContainer, ColumnTitle } from "./styles"
import  AddNewItem  from "./AddNewItem"
import { useAppState } from "./state/AppStateContext"
import  Card  from "./Card"
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions"
import { useItemDrag } from "./utils/useItemDrag"
import { useDrop } from "react-dnd"
import { DragItem } from "./DragItem"
import { isHidden } from "./utils/isHidden"

type ColumnProps = {
    text: string,
    children?: React.ReactNode
    id: string
    draggedItem?: DragItem | null
    isPreview?: boolean
}

function Column ({ text, id, draggedItem, isPreview }: ColumnProps) {
    const { getTasksByListId, dispatch } = useAppState()

    const tasks = getTasksByListId(id)
    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover(item: DragItem) {
            if(item.type === "COLUMN") {
                if(item.id === id) {
                    return
                }
            } else {
                if(item.columnId === id) {
                    return
                }
                if(tasks.length) {
                    return
                }

                dispatch(
                    moveTask(item.id, null, item.columnId, id)
                )
                dispatch(setDraggedItem({...item, columnId: id }))
            }
        }
    })

    
    const drag = useItemDrag({ type: "COLUMN", id, text })
    
    drag(drop(ref))

    return (
        <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, "COULMN", id, isPreview)}>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(task => (
                <Card text={task.text} key={task.id} id={task.id} columnId={id} />
            ))}
            <AddNewItem 
                toggleButtonText="+ Add another task"
                onAdd={text => dispatch(addTask(text, id))}
                dark
            />
        </ColumnContainer>
    )
}

export default Column