import { Link } from "react-router-dom";
import pageNotFoundImage from "../imgs/404.png";
import fulllogo from "../imgs/full-logo.png"

const PageNotFound = () =>{
    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img src={pageNotFoundImage} className="selcet-none border-2 border-grey w-72 aspect-square object-cover rounded-full "
            style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
            />

            <h1 className="text-4xl font-gelasio leading">Page not found</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">The page you are looking for does not exists. Head back to <Link to="/" className="text-black underline">home page</Link></p>

            <div className="mt-auto">
                <img src={fulllogo} className="h-8 object-contain vlock mx-auto select-none" />
                <p className="mt-5 text-dark-grey">Share and explore the thoughts</p>
            </div>
            
        </section>
    )
}
export default PageNotFound;