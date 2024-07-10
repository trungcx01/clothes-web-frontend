import "../components/ReviewDetail.scss"
const ReviewDetail = () => {
    return (
        <>
            <div className="review">
                <div className="review-detail">
                    <div className="profile-image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWphenrFmicwysLQ7LtQdOxkPkS0EbrcckaA&s" alt=""></img>
                    </div>

                    <div className="review-info">
                        <span className="username">trungdeptrai01</span>
                        <div className="icon">
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>

                        <span className="review-date">12/03/2023 12:04</span>
                        <span className="review-content">Sản phẩm đẹp mình thấy tốt sợ với giá tiền , làm quà tặng siu xinh ,
                            mình không khéo tay còn làm được thì mọi người yên tâm nha lên muaaa</span>
                    </div>
                </div>
                <div className="action">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
                <div className="line"></div>
            </div>
        </>
    )
}

export default ReviewDetail;