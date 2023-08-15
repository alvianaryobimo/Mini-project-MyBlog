import { Home } from "../components/homePage/body";
import { Footer } from "../components/homePage/footer";
import { Navbar } from "../components/navbar";

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <Home />
            {/* <Footer /> */}
        </>
    );
}