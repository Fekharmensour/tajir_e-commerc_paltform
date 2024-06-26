import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  List,
  Backdrop,
  TextField,
} from "@mui/material";
import axios from "axios";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { UserProvider } from "../contexts/usercontext.jsx";
import Singlecart from "./Singlecart.jsx";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import Appbar from "./Appbar.jsx";
import { useCart } from "../contexts/cartcontext.jsx";
import cartphoto from "../assets/cart.svg";
import Cookies from "js-cookie";
import emotionReact_isolatedHnrs from "@emotion/react/_isolated-hnrs";
import toast from "react-hot-toast";
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};

function Cart() {
  const { total, carts, loading, setloading, setorder } = useCart();
  const [open, setopen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [phone , setphone] = useState(null);
  const cities = [
    "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Meniaa"
  ];
  let orderlist = new Set();
  let newcarts = carts.filter((item) => item.is_validate == 0);
  useEffect(() => {
    setloading(!loading);
  }, []);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  const handleorderlist = (e) => {
    console.log("hihhhhh");
    if (e.target.checked) {
      orderlist.add(e.target.id);
      console.log(orderlist);
    } else if (orderlist.has(e.target.id)) {
      orderlist.delete(e.target.id);
      console.log(orderlist);
    }
  };
  const handleorder = () => {
    for (const value of orderlist) {
      setorder(value);
    }
  };
  const hndleUdateAddress = async (e) =>{
    
    e.preventDefault();
    try{
      const res = await axios.post(`http://127.0.0.1:8000/api/profile/address`, 
      {"address" : selectedCity } ,
      config )
      if(res.status === 200){
        toast.success(res.data.message)
      }
    }catch (e){
      console.log(e);
    }
  }
  const validatePhone = (phone) => {
    const phoneRegex = /^(06|05|07)\d{8}$/;
    return phoneRegex.test(phone);
  };
  const hndleUdatePhone= async (e) =>{
    e.preventDefault();
    if (!validatePhone(phone)) {
      toast.error("Phone number is incorrect");
      return;
    }
    if (!validatePhone) {
      toast.error("phone incorrect")
    }
    try{
      const res = await axios.post(`http://127.0.0.1:8000/api/profile/phone`, 
      {"phone" : phone } ,
      config )
      if(res.status === 200){
        toast.success(res.data.message)
      }
    }catch (e){
      console.log(e);
    }
  }
  return (
    <>
      <Appbar></Appbar>
      <Container
        className=" h-full mt-[10vh] flex justify-between flex-col items-center rounded-2xl bg-white p-10 shadow-sm "
        maxWidth={"lg"}
      >
        {newcarts.length > 0 ? (
          <>
            <Box className="flex justify-between w-full">
              <List className=" flex flex-col items-center w-[90%] bg-white rounded-lg ">
                {newcarts.map((item, index) => (
                  <Singlecart
                    key={index}
                    name={item.name}
                    price={item.price}
                    qte={item.qte}
                    image={"http://127.0.0.1:8000/storage/" + item.image}
                    id={item.id}
                    is_ordered={item.is_ordered}
                    new_price={item.new_price}
                    value={item.discount}
                  />
                ))}
              </List>
              <Box className="w-[50%] flex flex-col gap-10 shadow-md m-1 p-5 h-full rounded-lg">
                <form
                  className="flex Group_form shadow-sm"
                  onSubmit={hndleUdateAddress}
                >
                  <select
                    className="input_copon"
                    required
                    defaultValue={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="" disabled selected >
                     <p className="text-gray-500"> Update Address </p>
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} value={city} className="">
                        {index+1} {city}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-orange-400 font-medium text-base rounded-3xl btn h-10"
                    style={{ textTransform: "none" }}
                  >
                    Update
                  </Button>
                </form>
                <form
                  className="flex Group_form shadow-sm"
                  onSubmit={hndleUdatePhone}
                >
                  <input
                    className="input_copon"
                    required
                    defaultValue={phone}
                    onChange={(e) => setphone(e.target.value)}
                    type="number"
                    placeholder="Update Phone .."
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-orange-400 font-medium  text-base  rounded-3xl btn  h-10    "
                    style={{ textTransform: "none" }}
                  >
                    update
                  </Button>
                </form>
                <Button
                  variant="contained"
                  className=" justify-between bg-orange-400 font-medium   rounded-lg  h-14 px-5 "
                  sx={{ textTransform: "none" }}
                  onClick={handleopen}
                >
                  <Typography fontSize={20}>Total : ${total} </Typography>
                  <Typography fontSize={20}>Checkout</Typography>
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <div className="flex justify-center items-center self-center size-[90vh]">
            <img src={cartphoto} className="opacity-75" />
          </div>
        )}
      </Container>
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box className="w-[40%] min-h-[30%] bg-white rounded-lg p-10 flex flex-col justify-between">
          <List>
            {carts.map((item, index) => (
              <>
                {item.is_ordered == 0 && (
                  <Box key={item.id} className="flex justify-between mb-5">
                    <Box>
                      <Typography color={"black"}>
                        {index + 1}. {item.name} , qte : {item.qte}
                      </Typography>
                      <img
                        src={"http://127.0.0.1:8000/storage/" + item.image}
                        className="w-20 rounded-lg"
                      />
                    </Box>
                    <input
                      type="checkbox"
                      id={item.id}
                      className="h-5 w-5"
                      onChange={handleorderlist}
                    ></input>
                  </Box>
                )}
              </>
            ))}
          </List>

          <Box className="self-end flex gap-5">
            <Button onClick={handleclose}>Cancel</Button>
            <Button
              onClick={handleorder}
              variant="contained"
              className="bg-orange-400 rounded-full"
            >
              Order
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </>
  );
}

export default Cart;
