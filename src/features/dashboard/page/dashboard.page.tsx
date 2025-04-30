
import { MenuDesktop, MenuMobile } from "@/components"



export const DashboardPage = () => {
    return(
        <main className="w-full h-screen bg-bg">
            {/* <MenuDesktop/> */}
            <MenuMobile/>
            <MenuDesktop/>
        </main>
    )
}