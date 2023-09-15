import { FieldValues, useForm } from "react-hook-form";
import { QuestionHireForm } from "../components/QuestionHireForm";
import { HireForm } from "../../models/formHireModel";
import { CustomButton } from "../components/CustomButton";
import { useStore } from "../../store/StoreProvider";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { testEmail } from "../../helpers/testerEmail";
import { setDateToString } from "../../helpers/dateHireForm";
import { MessagesHireForm } from "../components/MessagesHireForm";
import { questionsArrayHireForm } from "../../data/hireFormData";
import { buttonsHireForm } from "../../helpers/buttonsHireForm";
import {
  getUserFormDate,
  postUserFormDate,
  updateUserFormDate,
} from "../../firebase/usersForms";
import {
  descriptionValidator,
  evaluateJustLetters,
  evaluateLenght,
  evaluateSpell,
} from "../../helpers/validatorExpressionsHireForm";
import { validateNumber } from "../../helpers/numberValidator";

export const ContratanosPage = () => {
  const { register, handleSubmit, resetField, setValue, watch } =
    useForm<HireForm>();

  const [clickEmail, setClickEmail] = useState<boolean>(false);
  const [clickContactNumber, setClickContactNumber] = useState<boolean>(false);
  const [clickName, setClickName] = useState<boolean>(false);
  const [clickOrganizationName, setClickOrganizationName] =
    useState<boolean>(false);
  const [clickConstructionDescription, setClickConstructionDescription] =
    useState<boolean>(false);
  const [clickDate, setClickDate] = useState<boolean>(false);

  const SETTER_STATES = [
    setClickEmail,
    setClickContactNumber,
    setClickName,
    setClickOrganizationName,
    setClickConstructionDescription,
    setClickDate,
  ];

  const AUX_QUESTION_ARRAY = [...questionsArrayHireForm];
  AUX_QUESTION_ARRAY.map((item, index) => {
    item.setOnClick = SETTER_STATES[index];
  });
  const [dataHireForm, setDataHireForm] = useState(AUX_QUESTION_ARRAY);

  const clearData = () => {
    dataHireForm.map((item) =>
      resetField(
        item.id === "email"
          ? item.id
          : item.id === "name"
          ? item.id
          : item.id === "organizationName"
          ? item.id
          : item.id === "contactNumber"
          ? item.id
          : item.id === "constructionDescription"
          ? item.id
          : "date"
      )
    );
  };

  const BUTTONS = buttonsHireForm;
  BUTTONS[1].action = () => clearData();

  const { userEmail } = useStore();

  useEffect(() => {
    setValue("email", userEmail);
  }, []);

  const form = useRef<any>();
  const [findedError, setFindedError] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [wrongInputData, setWrongInputData] = useState<boolean>(false);
  const [formAlreadySent, setFormAlreadySent] = useState<boolean>(false);

  const email = watch("email");
  const contactNumber = watch("contactNumber");
  const name = watch("name");
  const constructionDescription = watch("constructionDescription");
  const date = watch("date");
  const organizationName = watch("organizationName");

  const getFormDate = async () => {
    try {
      return await getUserFormDate(userEmail);
    } catch (err) {
      setLoading(false);
      setFindedError(true);
    }
  };

  const postEmailFormDate = async (dateSubmit: string, data: FieldValues) => {
    try {
      return await postUserFormDate(userEmail, dateSubmit, data);
    } catch (err) {
      setLoading(false);
      setFindedError(true);
    }
  };

  const updateEmailFormDate = async (
    id: string,
    dateSubmit: string,
    data: FieldValues
  ) => {
    try {
      return await updateUserFormDate(id, userEmail, dateSubmit, data);
    } catch (err) {
      setLoading(false);
      setFindedError(true);
    }
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_844hpcg",
        "template_ng65n02",
        form.current,
        "ofLm4bGwFujNzVYd8"
      )
      .then(() => {
        setLoading(false);
        setEmailSent(true);
        clearData();
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
          setFindedError(true);
        }
      });
  };

  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<FieldValues>({});
  const [loading, setLoading] = useState<boolean>(false);

  const whenSubmit = async (data: FieldValues) => {
    const {
      email,
      contactNumber,
      name,
      constructionDescription,
      date,
      organizationName,
    } = data;
    setLoading(true);
    if (
      [
        email,
        contactNumber,
        name,
        constructionDescription,
        date,
        organizationName,
      ].includes("") ||
      dataHireForm.filter((item) => item.error).length !== 0
    ) {
      setLoading(false);
      setWrongInputData(true);
    } else {
      const todayDate = new Date();
      const NEW_DATE: string = setDateToString(todayDate);
      const userDataForm: any = await getFormDate();
      if (userDataForm !== null) {
        const existFormDate: [] = userDataForm.userForms.filter(
          (item: any) => item.dateSubmit === NEW_DATE
        );
        if (existFormDate.length !== 0) {
          setLoading(false);
          setFormAlreadySent(true);
        } else {
          await updateEmailFormDate(userDataForm?.id, NEW_DATE, data);
          if (!findedError) {
            sendEmail();
          }
        }
      } else {
        await postEmailFormDate(NEW_DATE, data);
        if (!findedError) {
          sendEmail();
        }
      }
    }
  };

  const confirmSubmit = (data: FieldValues) => {
    setConfirmation(false);
    whenSubmit(data);
  };

  useEffect(() => {
    const formData = [...dataHireForm];
    if (email) {
      if (!testEmail(email)) {
        formData[0].error = true;
        formData[0].messsageError = `* El email es invalido o fue escrito incorrectamente`;
      } else {
        formData[0].error = false;
        formData[0].messsageError = "";
      }
    } else {
      formData[0].error = false;
      formData[0].messsageError = "";
    }
    setDataHireForm(formData);
  }, [email, clickEmail]);

  useEffect(() => {
    const formData = [...dataHireForm];
    if (contactNumber) {
      if (!validateNumber(contactNumber, 8)) {
        formData[1].error = true;
        formData[1].messsageError =
          "* El número telefónico no es valido, debe ser boliviano";
      } else {
        formData[1].error = false;
        formData[1].messsageError = "";
      }
    } else {
      formData[1].error = false;
      formData[1].messsageError = "";
    }
    setDataHireForm(formData);
  }, [contactNumber, clickContactNumber]);

  useEffect(() => {
    const formData = [...dataHireForm];
    if (name) {
      if (
        !evaluateLenght(2, 100, name) ||
        !evaluateJustLetters(name) ||
        !evaluateSpell(name)
      ) {
        let auxErrorState: boolean = true;
        let textError: string = "";
        if (!evaluateLenght(2, 100, name)) {
          textError = `* El nombre del contacto debe de tener
          entre 2 - 100 caracteres`;
        }
        if (!evaluateJustLetters(name)) {
          textError = `* El nombre debe estar compuesto por letras del
            abecedario español, considerando que también puede agregar tildes`;
        }
        if (!evaluateSpell(name)) {
          textError = `* El nombre no puede terminar con espacios al final`;
        }
        formData[2].error = auxErrorState;
        formData[2].messsageError = textError;
      } else {
        formData[2].error = false;
        formData[2].messsageError = "";
      }
    }
    setDataHireForm(formData);
  }, [name, clickName]);

  useEffect(() => {
    const formData = [...dataHireForm];
    if (organizationName) {
      if (
        !evaluateLenght(1, 100, organizationName) ||
        !evaluateJustLetters(organizationName) ||
        !evaluateSpell(organizationName)
      ) {
        if (!evaluateLenght(1, 100, organizationName)) {
          formData[3].error = true;
          formData[3].messsageError = `* El nombre de la organizacion debe de tener
          entre 1 - 100 caracteres`;
        }
        if (!evaluateJustLetters(organizationName)) {
          formData[3].error = true;
          formData[3].messsageError = `* El nombre debe estar compuesto por letras del
          abecedario español, considerando que también puede agregar tildes`;
        }
        if (!evaluateSpell(organizationName)) {
          formData[3].error = true;
          formData[3].messsageError = `* El nombre no puede terminar con espacios al final`;
        }
      } else {
        formData[3].error = false;
        formData[3].messsageError = "";
      }
    } else {
      formData[3].error = false;
      formData[3].messsageError = "";
    }
    setDataHireForm(formData);
  }, [organizationName, clickOrganizationName]);

  useEffect(() => {
    const formData = [...dataHireForm];
    if (constructionDescription) {
      if (
        !descriptionValidator(constructionDescription) ||
        !evaluateLenght(2, 1000, constructionDescription)
      ) {
        if (!evaluateLenght(2, 1000, constructionDescription)) {
          formData[4].error = true;
          formData[4].messsageError =
            "* La descripcion debe tener entre 2 - 1000 caracteres";
        } else {
          formData[4].error = true;
          formData[4].messsageError =
            "* La descripcion no puede terminar con espacios al final";
        }
      } else {
        formData[4].error = false;
        formData[4].messsageError = "";
      }
    } else {
      formData[4].error = false;
      formData[4].messsageError = "";
    }
    setDataHireForm(formData);
  }, [constructionDescription, clickConstructionDescription]);

  useEffect(() => {
    const formData = [...dataHireForm];
    const todayDate: Date = new Date();
    if (date) {
      const formDate: Date = new Date(date);
      const differenceDays: number =
        (formDate.getTime() - todayDate.getTime()) / 1000 / 60 / 60 / 24;
      if (differenceDays < 30 || differenceDays > 90) {
        formData[5].error = true;
        formData[5].messsageError = `* La fecha de inicio de la construcción
          debe respetar el rango especificado`;
      } else {
        formData[5].error = false;
        formData[5].messsageError = "";
      }
      setDataHireForm(formData);
    } else {
      formData[5].error = false;
      formData[5].messsageError = "";
      setDataHireForm(formData);
    }
  }, [date, clickDate]);

  return (
    <>
      <MessagesHireForm
        findedError={findedError}
        emailSent={emailSent}
        wrongInputData={wrongInputData}
        confirmation={confirmation}
        loading={loading}
        formAlreadySent={formAlreadySent}
        setFindedError={setFindedError}
        clearData={clearData}
        setEmailSent={setEmailSent}
        setWrongInputData={setWrongInputData}
        confirmSubmit={confirmSubmit}
        setConfirmation={setConfirmation}
        setFormAlreadySent={setFormAlreadySent}
        dataForm={dataForm}
      />
      <section className="flex w-full justify-center">
        <form
          ref={form}
          onSubmit={handleSubmit((data) => {
            setConfirmation(true);
            setDataForm(data);
          })}
          className="w-[936px] h-max bg-white flex flex-col p-2 rounded-2xl"
        >
          <p className="text-lg font-semibold text-black text-center mt-3">
            Los servicios de la empresa operan unicamente en la ciudad de La Paz
            y El Alto a nivel Bolivia
          </p>
          <div className="h-max flex flex-wrap justify-around">
            {dataHireForm.map((item) => {
              if (item.id !== "date") {
                return (
                  <QuestionHireForm
                    key={item.id}
                    item={item}
                    register={register}
                  />
                );
              } else {
                let minDate: Date = new Date();
                let maxDate: Date = new Date();
                minDate.setDate(minDate.getDate() + 31);
                maxDate.setDate(maxDate.getDate() + 90);
                return (
                  <QuestionHireForm
                    key={item.id}
                    item={item}
                    register={register}
                    minDate={setDateToString(minDate)}
                    maxDate={setDateToString(maxDate)}
                  />
                );
              }
            })}
          </div>
          <div className="flex flex-row m-1 mt-4">
            {BUTTONS.map((item) => (
              <CustomButton
                key={item.textButton}
                action={item.action}
                textButton={item.textButton}
                normalBg={item.normalBg}
                hoverBg={item.hoverBg}
                activeBg={item.activeBg}
                textColor={item.textColor}
                typeButton={item.typeButton}
                width={"128px"}
                height={"48px"}
              />
            ))}
          </div>
        </form>
      </section>
    </>
  );
};
