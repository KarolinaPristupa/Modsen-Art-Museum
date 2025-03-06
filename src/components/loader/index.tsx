import style from './style.module.scss';

type LoaderProps = {
    isLoading: boolean;
    size?: number;
};

export const Loader = ({ isLoading, size = 80 }: LoaderProps) => {
    if (!isLoading) return null;

    return (
        <div className={style.container}>
            <div
                style={{ width: `${size}px`, height: `${size}px` }}
                data-testid='loader-container'
                className={style.loading_container} 
            >
                <div className={style.loading_progress} />
            </div>
        </div>
    );
};