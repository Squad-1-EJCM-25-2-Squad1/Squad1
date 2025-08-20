import Header from "../../components/header";
import noImage from "../../assets/home/noImage.png";
import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules';
import '../../globals.css'
import { Swiper, SwiperSlide } from 'swiper/react';
// Imports de estilos da bilbioteca de carrossel swiper
// Por algum motivo dá como erro mas não funcionam os estilos sem isso ¯\_(ツ)_/¯
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import ItemCard from "../../components/itemCard";
import { useState } from "react";
import ratingStar from "../../assets/home/ratingStar.svg";
import hollowStar from "../../assets/product/hollowStar.svg";
import ColorSelection from "../../components/colorSelection";
import SizeSelection from "../../components/sizeSelection";
import grayMinusSign from "../../assets/product/grayMinusSign.svg";
import blackMinusSign from "../../assets/product/blackMinusSign.svg";
import grayPlusSign from "../../assets/product/grayPlusSign.svg";
import blackPlusSign from "../../assets/product/blackPlusSign.svg";
import cart from "../../assets/sales/whiteCart.svg";
import share from "../../assets/product/share.svg";
import InfoIcons from "../../components/infoIcons";
import shippingIcon from "../../assets/home/shippingIcon.svg";
import returnsIcon from "../../assets/home/returnsIcon.svg";
import securityIcon from "../../assets/home/securityIcon.svg";
import RecommendationCard from "../../components/recommendationCard";

export default function Product(){
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const totalStars = 5;
    let rating = 4.8;
    let filledStars = Math.floor(rating);
    let hollowStars = totalStars - filledStars;

    const productQuantityAvailable = 12;

    let [productQuantity, setProductQuantity] = useState<number>(1);

    function handleSubtraction(){
        if(productQuantity > 1){
            setProductQuantity(productQuantity = productQuantity - 1);
        }
    }

    function handleAddition(){
        if(productQuantity < productQuantityAvailable){
            setProductQuantity(productQuantity = productQuantity + 1);
        }
    }

    const [selectedColor, setSelectedColor] = useState('#000000');

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
    };

    const [selectedSize, setSelectedSize] = useState("M")

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
    }

    return(
        <div className="flex flex-col">
            <Header/>

                <nav className="text-gray-500 text-sm font-normal my-8 mx-4">
                    <ol className="flex gap-1">
                        <li><button className="cursor-pointer">Home /</button></li>
                        <li><button className="cursor-pointer">Sale /</button></li>
                        <li className="text-gray-950"><button className="cursor-pointer"> Premium Cotton T-shirt</button></li>
                    </ol>
                </nav>

            <main className="relative flex flex-col py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
                    <div className="w-85 lg:w-100 xl:w-125 2xl:w-165 mx-auto mb-12">
                        <Swiper
                            style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            <SwiperSlide>
                                <ItemCard image={noImage} discount={41}/>
                            </SwiperSlide>

                            <SwiperSlide>
                                <ItemCard image={noImage} discount={41}/>
                            </SwiperSlide>
                        </Swiper>

                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src={noImage} alt=""/>
                            </SwiperSlide>
                            
                            <SwiperSlide>
                                    <img src={noImage}/>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <span className="px-3 py-1 border border-gray-200 rounded-full text-gray-950 text-xs font-semibold">Tops</span>

                                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-950 text-xs font-semibold">Limited Time</span>
                            </div>

                            <h1 className="text-gray-950 text-3xl font-bold">Premium Cotton T-Shirt</h1>

                            <span className="text-gray-500 text-base font-normal">STYLE Premium</span>
                        </div>

                        <div className="flex items-center">
                            <div className="flex mr-1">
                                {Array.from({length: filledStars}).map((_, index) => (
                                    <img src={ratingStar} key={index} className="w-5 h-5"/>
                                ))}

                                {Array.from({length: hollowStars}).map((_, index) => (
                                    <img src={hollowStar} key={index}/>
                                ))}
                            </div>

                            <span className="text-gray-950 text-base font-semibold mr-4">{rating}</span>

                            <span className="text-gray-500 text-base font-normal">(124 reviews)</span>
                        </div>

                        <div className="flex gap-4 items-center">
                            <span className="text-red-600 text-3xl font-bold">$29</span>

                            <span className="text-gray-500 text-xl font-normal line-through">$49</span>

                            <span className="bg-red-500 rounded-full px-3 py-1 text-gray-50 text-xs font-semibold">Save $20</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500"/>

                            <span className="text-green-600 text-base font-semibold">In stock (12 left)</span>
                        </div>

                        <div className="flex flex-col gap-6 border-y border-gray-300 py-4">
                            <div className="flex flex-col gap-3 text-gray-950 text-base font-semibold">
                                Color:

                                <div className="flex gap-3">
                                    <ColorSelection 
                                        bgColor = "#000000"
                                        onStock = {true}
                                        onClick={() => handleColorClick('#000000')}
                selectedColor={selectedColor}
                                    />

                                    <ColorSelection 
                                        bgColor = "#FFFFFF"
                                        onStock = {true}
                                        onClick={() => handleColorClick('#FFFFFF')}
                selectedColor={selectedColor}
                                    />

                                    <ColorSelection 
                                        bgColor = "#1E40AF"
                                        onStock = {true}
                                        onClick={() => handleColorClick('#1E40AF')}
                selectedColor={selectedColor}
                                    />

                                    <ColorSelection 
                                        bgColor = "#EF4343"
                                        onStock = {false}
                                        onClick={() => handleColorClick('#EF4343')}
                selectedColor={selectedColor}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 text-gray-950 text-base font-semibold">
                                Size:

                                <div className="flex gap-2">
                                    <SizeSelection
                                        size = "XS"
                                        onStock = {true}
                                        onClick={() => handleSizeClick("XS")}
                                        selectedSize={selectedSize}
                                    />

                                    <SizeSelection
                                        size = "S"
                                        onStock = {true}
                                        onClick={() => handleSizeClick("S")}
                                        selectedSize={selectedSize}
                                    />
                                    
                                    <SizeSelection
                                        size = "M"
                                        onStock = {true}
                                        onClick={() => handleSizeClick("M")}
                                        selectedSize={selectedSize}
                                    />

                                    <SizeSelection
                                        size = "L"
                                        onStock = {true}
                                        onClick={() => handleSizeClick("L")}
                                        selectedSize={selectedSize}
                                    />

                                    <SizeSelection
                                        size = "XL"
                                        onStock = {false}
                                        onClick={() => handleSizeClick("XL")}
                                        selectedSize={selectedSize}
                                    />
                                </div>

                                <button className="flex text-gray-950 text-sm font-semibold cursor-pointer">Size Guide</button>
                            </div>

                            <div className="flex flex-col gap-3 text-gray-950 text-base font-semibold">
                                Quantity

                                <div className="flex gap-3 items-center">
                                    <div className="flex justify-between items-center w-35 border border-gray-300 rounded-xl">
                                        <button onClick={handleSubtraction} className="p-3 cursor-pointer">
                                            {productQuantity === 1 && (
                                                <img src={grayMinusSign} alt=""/>
                                            )}

                                            {productQuantity > 1 && (
                                                <img src={blackMinusSign} alt=""/>
                                            )}
                                        </button>

                                        {productQuantity}

                                        <button onClick={handleAddition} className="p-3 cursor-pointer">
                                            {productQuantity === productQuantityAvailable && (
                                                <img src={grayPlusSign} alt=""/>
                                            )}

                                            {productQuantity < productQuantityAvailable && (
                                                <img src={blackPlusSign} alt=""/>
                                            )}
                                        </button>
                                    </div>
                                    
                                    <span className="text-gray-500 text-sm font-normal">Max {productQuantityAvailable} items</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <button className="flex flex-grow justify-center items-center gap-2 h-11 bg-black rounded-xl text-gray-50 text-sm font-semibold cursor-pointer">
                                    <img src={cart} alt=""/>

                                    Add to Cart
                                </button>

                                <button className="flex justify-center items-center w-20 h-11 border border-gray-300 rounded-xl cursor-pointer">
                                    <img src={share} alt=""/>
                                </button>
                            </div>

                            <button className="flex flex-grow h-11 justify-center items-center border border-gray-300 rounded-xl text-gray-950 text-sm font-semibold cursor-pointer">
                                Buy Now
                            </button>
                        </div>

                        <div className="flex justify-between lg:justify-around items-center w-full py-6 border-y border-gray-300 mb-16">
                            <InfoIcons       
                                image = {shippingIcon}
                                title = "Free Shipping"
                                subtitle = "On orders over $50"
                                hasBackground = {false}
                            />

                            <InfoIcons       
                                image = {returnsIcon}
                                title = "Easy Returns"
                                subtitle = "30-day return policy"
                                hasBackground = {false}
                            />

                            <InfoIcons       
                                image = {securityIcon}
                                title = "Secure Payment"
                                subtitle = "100% secure checkout"
                                hasBackground = {false}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 mb-16">
                    <div className="flex items-center p-1 bg-gray-100 rounded-lg justify-between h-8">
                        <button className="w-full h-full bg-white rounded-lg text-gray-950 text-sm font-semibold cursor-pointer">Description</button>

                        <button className="w-full h-full rounded-lg text-gray-500 text-sm font-semibold cursor-pointer">Specifications</button>

                        <button className="w-full h-full rounded-lg text-gray-500 text-sm font-semibold cursor-pointer">Reviews (124)</button>
                    </div>

                    <div className="flex flex-col p-6 border border-gray-300 rounded-xl gap-4">
                        <p className="text-gray-950 text-lg font-normal text-justify">Made from 100% premium organic cotton, this t-shirt offers exceptional comfort and style. The perfect addition to your wardrobe for both casual and semi-formal occasions.</p>
                        
                        <div className="flex flex-col gap-3">
                            <span className="text-gray-950 text-base font-semibold">Key Feature:</span>

                            <ul className="list-disc text-gray-950 text-base font-normal pl-5">
                                <li>100% Organic Cotton</li>
                                <li>Pre-shrunk fabric</li>
                                <li>Reinforced seams</li>
                                <li>Machine washable</li>
                                <li>Eco-friendly dyes</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h2 className="text-gray-950 text-2xl font-bold mb-8">You Might Also Like</h2>

                <div className="flex flex-wrap gap-6 justify-center">
                    <RecommendationCard
                        image = {noImage}
                        title = "Cotton Polo Shirt"
                        rating = {4.7}
                        price = {39}
                        oldPrice = {55}
                    />

                    <RecommendationCard
                        image = {noImage}
                        title = "Casual Henley"
                        rating = {4.6}
                        price = {35}
                    />   

                    <RecommendationCard
                        image = {noImage}
                        title = "Premium Hoodie"
                        rating = {4.8}
                        price = {79}
                        oldPrice = {99}
                    />           
                </div>

            </main>
        </div>
    )
}