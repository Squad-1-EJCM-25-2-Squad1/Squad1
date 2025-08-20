import Footer from "../../components/footer";
import Header from "../../components/header";
import SaleInfo from "../../components/saleInfo";
import filter from "../../assets/sales/filter.svg"
import CheckBox from "../../components/checkBox";
import sizes from "../../data/sales/sizesData";
import grid from "../../assets/sales/grid.svg";
import list from "../../assets/sales/list.svg";
import SaleCard from "../../components/saleCard";
import saleProducts from "../../data/sales/saleProductsData";
import noImage from "../../assets/home/noImage.png"
import { useState } from "react";
import whiteGrid from "../../assets/sales/whiteGrid.svg";
import whiteList from "../../assets/sales/whiteList.svg";

export default function Sales(){
    const [gridView, setGridView] = useState<boolean>(true)
    return(
        <div className="flex flex-col min-h-screen">
                <Header/>

                <div className="flex flex-grow flex-col">
                    <div className="flex flex-col py-20 px-4 gap-8 bg-gradient-to-l from-[#AF1F5F] to-[#BF3636]">
                        <div className="flex flex-col items-center gap-6">
                            <label className="text-white text-5xl font-bold text-center">MEGA SALE</label>

                            <label className="text-white text-xl font-normal text-center md:w-1/2 lg:w-1/3">Up to 70% off on selected items. Limited time offer - don't miss out!</label>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-center gap-4">
                            <button className="py-2 px-6 text-red-600 text-lg font-semibold text-center rounded-full bg-white cursor-pointer">Free Shipping on all sale items</button>

                            <button className="py-2 px-6 text-red-600 text-lg font-semibold text-center rounded-full bg-white cursor-pointer">Extra 10% off for members</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-4">
                        <div className="grid grid-cols-2 p-4 lg:grid-cols-4 lg:px-32 2xl:px-69 gap-8">
                            <SaleInfo
                                title="70%"
                                subtitle="Max Discount"
                            />

                            <SaleInfo
                                title="500+"
                                subtitle="Items on Sale"
                            />

                            <SaleInfo
                                title="48h"
                                subtitle="Time Left"
                            />

                            <SaleInfo
                                title="Free"
                                subtitle="Shipping"
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 lg:px-32 2xl:px-69">
                            <div className="lg:w-64 flex flex-col gap-8">
                                <div className="flex gap-2 lg:hidden text-gray-950 text-base font-semibold">
                                    <img src={filter} alt=""/>
                                    Filters
                                </div>
                                
                                <div className="flex flex-col gap-3 text-gray-950 text-lg font-semibold">
                                    Category

                                    <CheckBox
                                        name="category"
                                        value="Tops"
                                    />
                                    <CheckBox
                                        name="category"
                                        value="Bottoms"
                                    />
                                    <CheckBox
                                        name="category"
                                        value="Dresses"
                                    />
                                    <CheckBox
                                        name="category"
                                        value="Shoes"
                                    />
                                    <CheckBox
                                        name="category"
                                        value="Accessories"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 text-gray-950 text-lg font-semibold">
                                    Size

                                    <div className="grid grid-cols-3 gap-10">
                                        <div className="flex flex-col gap-2">
                                            {sizes.slice(0, 6).map((size, index) => (
                                            <CheckBox
                                                key={index}
                                                name={size.name}
                                                value={size.value}
                                            />
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {sizes.slice(6, 11).map((size, index) => (
                                            <CheckBox
                                                key={index}
                                                name={size.name}
                                                value={size.value}
                                            />
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {sizes.slice(11, 16).map((size, index) => (
                                            <CheckBox
                                                key={index}
                                                name={size.name}
                                                value={size.value}
                                            />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-64 flex flex-col gap-3 text-gray-950 text-lg font-semibold">
                                    Price Range

                                    <select id="price-range" name="price-range" className="font-bold text-sm py-2 px-3 border-1 border-gray-300 rounded-xl text-gray-950 shadow-sm focus:outline-none cursor-pointer">
                                        <option value="all" className="font-bold">All Prices</option>
                                        <option value="0-10" className="font-bold">$0 - $10</option>
                                        <option value="10-30" className="font-bold">$10 - $30</option>
                                        <option value="30-100" className="font-bold">$30 - $100</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <div className="flex flex-col lg:flex-row justify-between">
                                    <div className="flex flex-col">
                                        <label className="text-gray-950 text-2xl font-bold">Sale Items</label>

                                        <label className="text-gray-500 text-base font-normal">6 products found</label>
                                    </div>
                                    
                                    <div className="flex gap-4 items-center">
                                        <select id="sale-items" name="sale-items" className="w-48 h-10 font-bold text-sm py-2 px-3 border-1 border-gray-300 rounded-xl text-gray-950 shadow-sm focus:outline-none cursor-pointer">
                                            <option value="featured" className="font-bold">Featured</option>
                                        </select>
                                        
                                        <div className="flex gap-1 items-center">
                                        {gridView &&(
                                            <>
                                                <button className="cursor-pointer">
                                                    <img src={whiteGrid} alt="" className="bg-black p-3 rounded-xl w-10 h-10
                                                    transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-70"/>
                                                </button>

                                                <button onClick={() => setGridView(false)} className="cursor-pointer">
                                                    <img src={list} alt="" className="bg-white border border-gray-300 p-3 rounded-xl w-10 h-10
                                                    transition duration-300 ease-in-out filter brightness-100 hover:brightness-95"/>
                                                </button>
                                            </>
                                        )}
                                        {!gridView &&(
                                            <>
                                                <button onClick={() => setGridView(true)} className="cursor-pointer">
                                                    <img src={grid} alt="" className="bg-white border border-gray-300 p-3 rounded-xl w-10 h-10
                                                    transition duration-300 ease-in-out filter brightness-100 hover:brightness-95"/>
                                                </button>

                                                <button className="cursor-pointer">
                                                    <img src={whiteList} alt="" className="bg-black p-3 rounded-xl w-10 h-10
                                                    transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-70"/>
                                                </button>
                                            </>
                                        )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-8">
                                    {saleProducts.map((product, index) => (
                                        <SaleCard
                                            key={index}
                                            infoTag={product.infoTag}
                                            title={product.title}
                                            image= {noImage}
                                            categoryTag={product.categoryTag}
                                            rating={product.rating}
                                            numOfReviews={product.numOfReviews}
                                            price={product.price}
                                            oldPrice={product.oldPrice}
                                        />
                                    ))}
                                </div>
                            </div>    
                        </div>       
                    </div>         
                </div>

                <Footer
                    title = "Don't Miss Future Sales!"
                    subtitle = "Subscribe to our newsletter and be the first to know about exclusive sales and special offers."
                    color = "#AF1F5F"
                    color2= "#BF3636"
                />
        </div>
    )
}