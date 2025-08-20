import Header from "../../components/header";
import noImage from "../../assets/home/noImage.png"
import arrow from "../../assets/home/arrow.svg"
import InfoIcons from "../../components/infoIcons";
import shippingIcon from "../../assets/home/shippingIcon.svg"
import returnsIcon from "../../assets/home/returnsIcon.svg"
import securityIcon from "../../assets/home/securityIcon.svg"
import CategoryCards from "../../components/categoryCards";
import ProductCards from "../../components/productCards";
import blackArrow from "../../assets/home/blackArrow.svg"
import Footer from "../../components/footer";

export default function Home(){
    return(
        <div>
            <Header/>

            <div className="flex h-100 lg:h-auto justify-center items-center w-full bg-[#F8F8F8]">
                <div className="w-1/3">
                    <img src={noImage} alt="" className="w-full h-auto opacity-5"/>
                </div>

                <div className="flex absolute flex-col justify-center w-full  md:max-xl:w-1/2 xl:w-1/3 gap-6 items-center z-10">
                    <label className="font-bold text-center text-5xl lg:text-7xl">Style Redefined</label>

                    <label className="text-xl text-center px-4 lg:text-2xl text-[#6B7280]">Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.</label>

                    <div className="flex flex-col w-full justify-center items-center gap-4 lg:flex-row">
                        <button className="flex justify-center gap-4 px-8 items-center w-9/12 md:w-[182px] h-[48px] text-lg text-[#F9FAFB] rounded-lg cursor-pointer bg-[#030711]">
                            Shop Now
                            <img src={arrow} alt=""/>
                        </button>

                        <button className="flex justify-center items-center w-9/12 md:w-[182px] h-[48px] text-lg text-[#030711] rounded-lg border-[#E5E7EB] border-1 cursor-pointer bg-[#FFFFFF]">
                            View Collection
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-16 px-4">
                <div className="flex flex-wrap justify-center gap-8 w-full py-16 bg-[#FCFCFD]">
                    <InfoIcons       
                        image = {shippingIcon}
                        title = "Free Shipping"
                        subtitle = "Free shipping on orders over $100"
                        hasBackground = {true}
                    />

                    <InfoIcons       
                        image = {returnsIcon}
                        title = "Easy Returns"
                        subtitle = "30-day hassle-free returns"
                        hasBackground = {true}
                    />

                    <InfoIcons       
                        image = {securityIcon}
                        title = "Secure Payment"
                        subtitle = "Your payment information is safe"
                        hasBackground = {true}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-center text-4xl font-bold">Shop by Category</label>

                    <label className="text-center text-xl">Explore our carefully curated collections for every style and occasion</label>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    <CategoryCards
                        title="Women's Fashion"
                        numOfItems={500}
                        image={noImage}
                    />

                    <CategoryCards
                        title="Men's Fashion"
                        numOfItems={350}
                        image={noImage}
                    />

                    <CategoryCards
                        title="Accessories"
                        numOfItems={200}
                        image={noImage}
                    />

                    <CategoryCards
                        title="Shoes"
                        numOfItems={180}
                        image={noImage}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-center text-4xl font-bold">Featured Products</label>

                    <label className="text-center text-xl">Handpicked favorites from our latest collection</label>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    <ProductCards
                        tag= "Best Seller"
                        title= "Vintage Denim Jacket"
                        image= {noImage}
                        rating= {4.8}
                        numOfReviews= {124}
                        price= {89}
                        oldPrice= {120}
                    />

                    <ProductCards
                        tag= "New"
                        title= "Oversized Blazer"
                        image= {noImage}
                        rating= {4.9}
                        numOfReviews= {89}
                        price= {145}
                    />

                    <ProductCards
                        tag= "Sale"
                        title= "Confort Slim Jeans"
                        image= {noImage}
                        rating= {4.7}
                        numOfReviews= {203}
                        price= {79}
                        oldPrice= {99}
                    />

                    <ProductCards
                        tag= "Premium"
                        title= "Silk Blouse"
                        image= {noImage}
                        rating= {4.8}
                        numOfReviews= {156}
                        price= {125}
                    />
                </div>

                    <button className="flex justify-center gap-4 items-center w-52 h-11 text-sm text-gray-950 font-semibold rounded-lg cursor-pointer bg-white border-1 border-[#E5E7EB]">
                        View All Products
                        <img src={blackArrow} alt=""/>
                    </button>
            </div>

            <div className="pt-16">
                <Footer
                        title = "Stay in Style"
                        subtitle = "Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips."
                        color = "#030711"
                    />
            </div>
        </div>
    )
}