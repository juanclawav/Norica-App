import { ModalConfirmation } from "../../modals/ModalConfirmation";
import { ModalMessage } from "../../modals/ModalMessage";
import { ModalPage } from "../../modals/ModalPage";

interface Props {
  confirmSend: boolean;
  created: boolean;
  existError: boolean;
  setExistError: (param: boolean) => void;
  setConfirmSend: (param: boolean) => void;
  email: string;
  emailVerification: (param: boolean) => void;
  createNewUser: () => void;
}

export const RegisterPageMessages = ({
  confirmSend,
  created,
  existError,
  setExistError,
  setConfirmSend,
  email,
  emailVerification,
  createNewUser,
}: Props) => {
  return (
    <>
      {(confirmSend || created || existError) && (
        <ModalPage>
          <>
            {existError && (
              <ModalMessage
                action={setExistError}
                title="Error de Registro"
                message={`Los campos no fueron llenados correctamente
                o el usuario ya existe`}
              />
            )}
            {created && (
              <ModalMessage
                action={emailVerification}
                title="Verificación Exitosa"
                message={`Se envió un correo de confirmación a: ${email}`}
              />
            )}
            {confirmSend && (
              <ModalConfirmation
                actionOne={createNewUser}
                actionTwo={() => setConfirmSend(false)}
                title="Confirmar Registro"
                message={`Se registrará el siguiente email:\n${email}\n
                Se le notificará su registro por correo y por este medio.${" "}
                En caso de no recibir nada,${" "}revise sus datos e
                inténtelo nuevamente`}
              />
            )}
          </>
        </ModalPage>
      )}
    </>
  );
};
