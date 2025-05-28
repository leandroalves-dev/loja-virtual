import Slider from 'react-slick';
import sliderSettings from "../../utils/sliderSettings";

const SlideHome = () => {
    return (
        <div className="overflow-hidden mt-10 w-full">
            <Slider {...sliderSettings}>
                <div>
                    <img src="./banner_home_1.jpg" alt="Banner 1" className="block mx-auto" />
                </div>
                <div>
                    <img src="./banner_home_2.jpg" alt="Banner 2" className="block mx-auto" />
                </div>
                <div>
                    <img src="./banner_home_3.jpg" alt="Banner 3" className="block mx-auto" />
                </div>
            </Slider>
        </div>
    )
}
export default SlideHome