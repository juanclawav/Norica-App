import { FieldValues } from "react-hook-form";
import { ModalConfirmation } from "../../modals/ModalConfirmation";
import { ModalLoading } from "../../modals/ModalLoading";
import { ModalMessage } from "../../modals/ModalMessage";
import { ModalPage } from "../../modals/ModalPage";

interface Props {
  loading: boolean;
  confirmation: boolean;
  process: boolean;
  errorUpdatingDB: boolean;
  sucess: boolean;
  messageText: string;
  totalPrice: number;
  confirmSubmit: (param: FieldValues) => void;
  dataForm: FieldValues;
  setConfirmation: (param: boolean) => void;
  setSucess: (param: boolean) => void;
  setErrorUpdatingDB: (param: boolean) => void;
}

export const CarritoPageMessages = ({
  loading,
  confirmation,
  process,
  errorUpdatingDB,
  sucess,
  messageText,
  totalPrice,
  confirmSubmit,
  dataForm,
  setConfirmation,
  setSucess,
  setErrorUpdatingDB,
}: Props) => {
  return (
    <>
      {(loading || confirmation || process || sucess || errorUpdatingDB) && (
        <ModalPage>
          <>
            {(loading || process) && <ModalLoading />}
            {confirmation && (
              <ModalConfirmation
                actionOne={() => {
                  confirmSubmit(dataForm);
                }}
                actionTwo={() => setConfirmation(false)}
                title={"¿Confirmar Compra?"}
                message={`Se comprarán los siguientes productos:
              ${messageText}
              Precio Total: ${totalPrice}
              `}
              />
            )}
            {sucess && (
              <ModalMessage
                action={() => setSucess(false)}
                title={"Compra exitosa"}
                message={"Los artículos fueron comprados exitosamente"}
              />
            )}
            {errorUpdatingDB && (
              <ModalMessage
                action={() => setErrorUpdatingDB(false)}
                title={"ERROR DE COMPRA"}
                message={
                  "Parece que algo salió mal, vuelva a intentarlo más tarde"
                }
              />
            )}
          </>
        </ModalPage>
      )}
    </>
  );
};
