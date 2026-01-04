import BrandLogo from "../assets/images/svg/brandLogo.svg";

const Navbar = () => {
  return (
    <div className="navbar w-full h-16 flex items-center px-6 justify-center pt-2">
      <div className="logo w-32 h-8 flex items-center justify-center w-full">
        <img src={BrandLogo} alt="Logo" />
      </div>
    </div>
  );
};

export default Navbar;