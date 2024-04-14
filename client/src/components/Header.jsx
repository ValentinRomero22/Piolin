import { Outlet } from 'react-router-dom'

export const Header = () => {
    return (
        <>
            <header>
                <h1>PIOLIN</h1>
            </header>
            <Outlet />
        </>
    )
}