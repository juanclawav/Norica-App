import { ModalLoading } from "../../modals/ModalLoading";
import { ModalPage } from "../../modals/ModalPage";
import { ErrorPage } from "../pages/ErrorPage";

interface Props {
  loading: boolean;
  errorLoading: boolean;
}

export const WorksPageMessages = ({ loading, errorLoading }: Props) => {
  return (
    <>
      {loading || errorLoading ? (
        <>
          {loading && (
            <>
              <ModalPage>
                <ModalLoading />
              </ModalPage>
            </>
          )}
          {errorLoading && (
            <ErrorPage
              errorText={"¡Error 404! Vuelva a intentarlo más tarde"}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
