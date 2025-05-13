import Slider from 'react-slick';
import sliderSettings from "../../utils/sliderSettings";

const SlideHome = () => {
    return (
        <div className="w-full overflow-hidden mt-10">
            <Slider {...sliderSettings}>
                <div className="bg-blue-500 text-white text-2xl p-40 flex items-center justify-center text-center">
                    Promoção de Cestas
                </div>
                <div className="bg-green-500 text-white text-2xl p-40 flex items-center justify-center text-center">
                    Frete Grátis para SP
                </div>
                <div className="bg-red-500 text-white text-2xl p-40 flex items-center justify-center text-center">
                    Descontos da Semana
                </div>
            </Slider>
        </div>
    )
}
export default SlideHome