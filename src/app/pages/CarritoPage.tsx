import { useEffect, useMemo, useState } from "react";
import { useDispatch, useStore } from "../../store/StoreProvider";
import { Product } from "../../models/productModel";
import { EmptyCartPage } from "./EmptyCartPage";
import { ListAddedProducts } from "../components/ListAddedProducts";
import { getProducts, setProducts } from "../../firebase/products";
import { types } from "../../store/storeReducer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { BuyForm } from "../components/BuyForm";
import { FieldValues, useForm } from "react-hook-form";
import { BuyFormInterface } from "../../models/buyForm";
import { setDateToString } from "../../helpers/dateHireForm";
import {
  getUserProductList,
  postUserProductsList,
  updateUserProductsList,
} from "../../firebase/usersProducts";
import { CarritoPageMessages } from "../components/CarritoPageMessages";

export const CarritoPage = () => {
  const dispatch = useDispatch();
  const { addedProducts, userEmail } = useStore();
  const { saveDataLS } = useLocalStorage();

  const { register, handleSubmit, setValue, watch } =
    useForm<BuyFormInterface>();

  const name: string = watch("name");
  const email: string = watch("email");
  const address: string = watch("address");
  const contactNumber: string = watch("contactNumber");
  const nit: string = watch("nit");

  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [confirmation, setConfirmation] = useState<boolean>(false);

  const [process, setProcess] = useState<boolean>(false);

  const [sucess, setSucess] = useState<boolean>(false);

  const [findedError, setFindedError] = useState<boolean>(false);

  const [errorUpdatingDB, setErrorUpdatingDB] = useState<boolean>(false);

  const [dataForm, setDataForm] = useState<FieldValues>({});

  const messageText: string = useMemo(() => {
    let auxVar: string = "";
    if (cartProducts.length !== 0 && confirmation) {
      cartProducts.map((item) => {
        auxVar += "* " + item.name + " - " + item.quantityToBeBuyed + "\n";
      });
      return auxVar;
    } else {
      return "";
    }
  }, [confirmation]);

  const totalPrice: number = useMemo(() => {
    if (cartProducts.length !== 0) {
      return cartProducts.reduce((a, b) => {
        return a + b.price * (b.quantityToBeBuyed || 1);
      }, 0);
    } else {
      return 0;
    }
  }, [confirmation, cartProducts]);

  useEffect(() => {
    if (addedProducts.length !== 0) {
      setCartProducts(addedProducts);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const buyProducts = async () => {
    try {
      for (let index = 0; index < cartProducts.length; index++) {
        await setProducts(
          cartProducts[index].id,
          cartProducts[index].quantity,
          cartProducts[index].quantityToBeBuyed || 1
        );
      }
      const data = await getProducts();
      dispatch({ type: types.setProductsList, value: data });
      dispatch({ type: types.eraseAddedProducts });
      saveDataLS("addedProducts", { addedProducts: [] });
      setCartProducts([]);
      setProcess(false);
      setSucess(true);
    } catch (err) {
      console.error(err);
      setErrorUpdatingDB(true);
      setProcess(false);
      setSucess(false);
    }
  };

  const whenSubmit = async (data: FieldValues) => {
    setProcess(true);
    try {
      const todayDate = new Date();
      const NEW_DATE: string = setDateToString(todayDate);
      const userProductsListData = await getUserProductList(userEmail);
      const productsToSent = [
        ...cartProducts.map((item) => {
          const { description, id, name, imageUrl, price, quantityToBeBuyed } =
            item;
          return {
            id: id,
            description: description,
            name: name,
            imageUrl: imageUrl,
            price: price,
            quantityToBeBuyed: quantityToBeBuyed,
          };
        }),
      ];
      if (userProductsListData !== null) {
        await updateUserProductsList(
          userProductsListData?.id,
          userEmail,
          NEW_DATE,
          {
            ...data,
            cartProducts: productsToSent,
            totalPrice: totalPrice + " bs.",
          }
        );
      } else {
        await postUserProductsList(userEmail, NEW_DATE, {
          ...data,
          cartProducts: productsToSent,
          totalPrice: totalPrice + " bs.",
        });
      }
      await buyProducts();
    } catch (err) {
      console.error(err);
      setErrorUpdatingDB(true);
      setProcess(false);
      setSucess(false);
    }
  };

  const confirmSubmit = (data: FieldValues) => {
    setConfirmation(false);
    whenSubmit(data);
  };

  const sendingForm = (data: FieldValues) => {
    if (
      ![name, email, address, contactNumber, nit].includes("") &&
      !findedError
    ) {
      setConfirmation(true);
      setDataForm(data);
    } else {
      console.log("hola error");
    }
  };

  return (
    <>
      <CarritoPageMessages
        loading={loading}
        confirmation={confirmation}
        process={process}
        errorUpdatingDB={errorUpdatingDB}
        sucess={sucess}
        messageText={messageText}
        totalPrice={totalPrice}
        confirmSubmit={confirmSubmit}
        dataForm={dataForm}
        setConfirmation={setConfirmation}
        setSucess={setSucess}
        setErrorUpdatingDB={setErrorUpdatingDB}
      />
      <>
        {cartProducts.length !== 0 ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-row w-[75%] m-4">
              <h2 className=" texto text-2xl font-bold  text-black   ">
                Carrito
              </h2>
            </div>
            <div className=" flex flex-wrap w-[90%] justify-center  ">
              <section className=" flex flex-row rounded-[40px] h-[650px] bg-neutral-200 w-[90%] ">
                <section
                  className=" w-[50%] flex flex-wrap max-h-[700px] overflow-auto justify-center bg-neutral-500
                rounded-tl-[40px] rounded-bl-[40px] p-5"
                >
                  <ListAddedProducts
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                  />
                </section>
                <section className="w-[50%]">
                  <h1 className="text-3xl font-semibold mt-5 ml-8">
                    Total: {totalPrice}Bs.
                  </h1>
                  <section className=" ml-8 mt-5 mb-0 p-5 h-max mr-8 bg-white rounded-[40px]">
                    <BuyForm
                      setFindedError={setFindedError}
                      register={register}
                      setValue={setValue}
                      name={name}
                      email={email}
                      address={address}
                      contactNumber={contactNumber}
                      nit={nit}
                      handleSubmit={handleSubmit}
                      sendingForm={sendingForm}
                      cartProducts={cartProducts}
                      findedError={findedError}
                    />
                  </section>
                </section>
              </section>
            </div>
          </div>
        ) : (
          <EmptyCartPage />
        )}
      </>
    </>
  );
};
