import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card';
import Axios from "../components/Axios"
export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let { data } = await Axios.get("/fooddata");
            // console.log(response[0],response[1]);
            console.log(data, data?.category);
            setFoodItem(data.items);
            setFoodCat(data.category);
        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        loadData();
    }, [])




    return (
        <div>
            <div className='fs-4' style={{ width: "100%" }}>

                <div> <Navbar /> </div>
                <div>
                    <div id="carouselExampleCaptions" className="carousel slide crousel-fade" data-bs-ride="carousel">

                        <div className="carousel-inner" style={{ maxHeight: "480px", objectFit: "contain !import", objectPosition: "center" }}>
                            <div className="carousel-caption" style={{ zIndex: "9" }}>
                                <div className="d-flex justify-content-center " style={{ position: "relative", marginTop: "-10%" }}>
                                    <input className="form-control me-2" type="search" placeholder="Search your food" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img src="https://source.unsplash.com/random/300×700/?burger" className="d-block w-100" style={{ filter: "brigtness(0%)", objectFit: "fill", objectPosition: "center" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/300×700/?pizza" className="d-block w-100" style={{ filter: "brigtness(0%)", objectFit: "fill", objectPosition: "center" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/300×700/?paneer" className="d-block w-100" style={{ filter: "brigtness(0%)", objectFit: "fill", objectPosition: "center" }} alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div>
                    {foodCat?.map((data, i) =>{
                            return (
                                <div key={i} className='row mb-3'>
                                    <div key={data.id} className="fs-2 fst-italic m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr/>
                                    {foodItem !== [] ?( foodItem?.filter(
                                        (item) => (item.CategoryName === data.CategoryName) &&
                                         item.name.toLowerCase().includes(search.toLocaleLowerCase())
                                    )
                                            .map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id}
                                                     className="col-12 col-md-6 col-lg-4">
                                                        <Card
                                                            foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                        ></Card>
                                                    </div>
                                                );
                                            })
                                    ) : (
                                    <div>No Such Data </div>
                                    )}
                                </div>
                            );
                         })
                    }

                </div>
                <div><Footer /></div>

            </div>
        </div>
    );
};
