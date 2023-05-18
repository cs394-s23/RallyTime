function LikeButton({ likes, onClick }) {
    return (
        <div 
            className={`heart ${likes && likes.length > 0 ? 'filled' : ''}`} 
            onClick={onClick}
        ></div>
    );
}

export default LikeButton;

