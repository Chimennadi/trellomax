import { DragItem } from "../DragItem"

export const isHidden = (draggedItem: DragItem | null | undefined, itemType: string, id: string, isPreview?: boolean): boolean => {
    return Boolean(!isPreview && draggedItem && draggedItem.type === itemType && draggedItem.id === id)
}