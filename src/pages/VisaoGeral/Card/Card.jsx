import style from './Card.module.css';

const Card = ({ title, content, buttonText, kpi }) => {
    return (
        <div className={style.card}>
            <h2 className={style.title}>{title}</h2>
            <p className={style.content}>{content} {kpi} </p>
            <button className={style.button}>{buttonText}</button>
        </div>
    );
};

export default Card;