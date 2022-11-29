import { createContext, useContext, FC, Dispatch } from "react"
import { appStateReducer, AppState, List, Task } from "./appStateReducer"
import { Action } from "./actions"
import { useImmerReducer } from "use-immer"
import { DragItem } from "../DragItem"

type AppStateContextProps = {
    lists: List[] // Array of an object(List)
    draggedItem: DragItem | null
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

// Initial state store of our application
const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c1", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}


export const AppStateProvider: FC<any> = ({children}) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData)
  
    const { lists, draggedItem } = state

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }

    return (
        <AppStateContext.Provider value={{ lists, draggedItem, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}