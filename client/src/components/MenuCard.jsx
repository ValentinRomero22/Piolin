export const MenuCard = ({ image, title, className }) => {
    return (
        <article className={className}>
            <img src={image} alt={`Imagen de ${title}`} />
            <p>{title}</p>
        </article>
    )
}