import logo from "@/assets/Logo0.svg";

const Header = () => {
    return(
        <header className="container m-auto flex justify-between py-7">
            <img src={logo} alt="E-STAD Logo" className="w-[3rem]"/>
            <h1>Header</h1>
        </header>
    )
}

export default Header;