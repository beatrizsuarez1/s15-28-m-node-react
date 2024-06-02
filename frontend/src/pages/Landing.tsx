import { NavBar } from "../components/landing/NavBar";
import BackgroundBanner from "../components/landing/BackgroundBanner";
import { Button } from "@mui/material";
import ElementsBanner from "../components/landing/ElementsBanner";
import Donut from "../components/landing/Donut ";

export default function Landing() {
    return (
        <div>
            <NavBar />
            <section className="w-full h-screen relative">
                <BackgroundBanner className="w-full h-screen" />
                <div className=" w-full h-full absolute top-0 flex items-center justify-center">
                    <div className=" basis-[50%] py-10 ml-5">
                        <h1 className="font-semibold text-gray-700 mb-7">
                            <span className="text-8xl float-none">
                                G
                                <span className="text-7xl">uardián del Tiempo</span>
                            </span><br />
                            <span className="text-7xl">
                                para {" "}
                                <span className="text-orange-500 font-bold">
                                    Freelancers
                                </span>
                            </span>
                        </h1>
                        <h3 className="w-[60%] text-gray-500 text-xl mb-16">
                            ¡Potencia tu éxito freelance y de desarrollo con nuestras herramientas!
                        </h3>
                        <div className="w-full h-12 flex justify-center ">
                            <Button sx={{
                                backgroundColor: '#f97316',
                                fontWeight: 700,
                                ":hover": {
                                    backgroundColor: '#ea580c'
                                }

                            }} variant="contained" size="large" href="./register">
                                Pruébelo gratis
                            </Button>
                            <div
                                className="w-32"

                            >
                                <Donut className="w-full -mt-16 h-32 ml-16" />
                            </div>

                        </div>


                    </div>

                    <div className=" basis-[50%] h-auto">
                        <ElementsBanner />
                    </div>
                </div>

            </section>

        </div>
    )
}