import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import AuthButtons from "./AuthButtons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YearOptions from "../options/YearOptions";
import TypeOptions from "../options/TypeOptions";

const Navbar = () => {
  const [titleSearch, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://localhost:7188/books/search`, {
        params: {
          search: titleSearch,
          type: type,
          year: year,
        },
      });

      navigate("/search-results", { state: { results: response.data } });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const LogoSection = () => {
    return (
      <div className="w-[100px] flex items-center justify-center mr-[90px] ml-[60px]">
        <a href="/" className=" w-[50px] h-[50px]">
          <img className="object-fill w-full h-full" src={logo} alt="" />
        </a>
      </div>
    );
  };

  const OptionSection = () => {
    return (
      <div className="w-[270px] flex text-second text-[16px] h-[34px] items-center justify-start">
        <div className="w-full h-[50%] flex items-center">
          <h1 className="w-[30%]">Year</h1>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-third rounded-[8px] focus:outline-none focus:none focus:none-300 h-[25px] w-[70%]"
          >
            <option value="">Any</option>
            <YearOptions />
          </select>
        </div>
        <div className="w-full h-[50%] flex items-center ml-[10px]">
          <h1 className="w-[30%]">Type</h1>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-third rounded-[8px] focus:outline-none focus:none focus:none-300 h-[25px] w-[70%]"
          >
            <option value="">Any</option>
            <TypeOptions />
          </select>
        </div>
      </div>
    );
  };

  const SearchBarSection = () => {
    return (
      <>
        <input
          type="text"
          className="ml-[10px] h-[25px] w-[320px] bg-third rounded-[8px] pl-[10px]"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        ></input>
        <button
          onClick={handleSearch}
          className="ml-[10px] h-[30px] w-[30px] bg-second rounded-[8px] mr-[10px]"
        >
          <img src={search} alt="" className="w-full h-full" />
        </button>
      </>
    );
  };

  const MyReservationBtnSection = () => {
    return (
      <a href="/reservations">
        <button className="h-[34px] bg-third rounded-[8px] w-[160px] mr-[97px] text-[12px] font-bold">
          My Reservations
        </button>
      </a>
    );
  };

  const LeftSection = () => {
    return (
      <div className="basis-[60%] flex items-center justify-start">
        <LogoSection />
        <OptionSection />
        <SearchBarSection />
      </div>
    );
  };

  const RightSection = () => {
    return (
      <div className="basis-[40%] flex items-center justify-end">
        <AuthButtons />
        <MyReservationBtnSection />
      </div>
    );
  };

  return (
    <div className="w-full h-[120px] flex mb-[40px]">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default Navbar;
