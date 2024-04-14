import { MenuCard } from '../components/MenuCard'

export const Home = () => {
    return (
        <>
            <section className='homeContainer'>
                <MenuCard image={'http...'} title={"Nueva venta"} className={"saleMenuCard"} />
                <MenuCard image={'http...'} title={"Nueva compra"} className={"buyMenuCard"} />
                <MenuCard image={'http...'} title={"Nueva devolución"} className={"returnMenuCard"} />
                <MenuCard image={'http...'} title={"Mantenimiento"} className={"maintenanceMenuCard"} />
                <MenuCard image={'http...'} title={"Reportes"} className={"reportsMenuCard"} />
            </section>
        </>
    )
}