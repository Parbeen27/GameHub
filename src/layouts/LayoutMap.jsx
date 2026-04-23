import AppLayout from "./AppLayout"
import AdminLayout from "./AdminLayout"
import AnalystLayout from "./AnalystLayout"

export const layoutMap = {
    user: <AppLayout/>,
    admin: <AdminLayout/>,
    analyst:<AnalystLayout/>
}