import "../components/Review.scss"
import ReviewDetail from "./ReviewDetail";
import Star from "./Star";
const Review = ({productId}) => {
    const getAllReviewOfProduct = ()=>{
        
    }
    return (
        <>
            <div className="review-list">
                <div className="rating-overall">
                    <div className="overall">
                        <span className="product-rate">4.8/5</span>
                        <div className="icon">
                            <Star percentage={75}/>
                        </div>
                    </div>
                    <div className="type-of-rating">
                        <span className="type btn">Tất cả</span>
                        <span className="type btn">5 sao (123)</span>
                        <span className="type btn">4 sao (123)</span>
                        <span className="type btn">3 sao (123)</span>
                        <span className="type btn">2 sao (123)</span>
                        <span className="type btn">1 sao (123)</span>
                    </div>
                </div>

                <div className="reviews">
                    <ReviewDetail />
                </div>
            </div>
        </>
    )
}
export default Review;