import SearchingForm from "../components/Layout/SearchingForm";
import MainLinkCard from "../components/MainLinkCard";
import "./HomePage.css";
import pillsImg from "../images/pills-img.jpg";
import tinctureImg from "../images/tincture-img.jpg";
import mixtureImg from "../images/mixture-img.jpg";
import gelImg from "../images/gel-img.jpg";

const HomePage = () => {
    return (
        <div>
            <div className="hero-wrapper">
                <div className="hero-container">
                    <h1>Welcome on Home Page!</h1>
                    <SearchingForm />
                </div>
            </div>
            <main>
                <section className="main-wrapper">
                    <h2>Choose category</h2>
                    <div className="categories-cards-container">
                        <MainLinkCard link={"/pills"} img={pillsImg} title={"Pills"} />
                        <MainLinkCard link={"/tincture"} img={tinctureImg} title={"Tincture"} />
                        <MainLinkCard link={"/mixture"} img={mixtureImg} title={"Mixture"} />
                        <MainLinkCard link={"/gel"} img={gelImg} title={"Gel"} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage;