import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Fileinput from "@/components/ui/Fileinput";
import Textinput from "@/components/ui/Textinput";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "@/components/ui/loaders/pageloader";
import Icon from "@/components/ui/Icon";
import { consultantService } from "@/_services/consultant.service";
import Button from "@/components/ui/Button";
import { Menu } from "@headlessui/react";
import ButtonLoader from "@/components/ui/loaders/buttonLoader";
import { socket } from "@/socket";
const Adddocument = ({ setToggleDropdown, toggleDropdown, data, refresh }) => {
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [craFile, setCraFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState(null);

  const [inputFileName, setinputFileName] = useState(null);
  const [craCreated, setCraCreated] = useState([]);
  const [craCreatedLoading, setCraCreatedLoading] = useState(false);





  const onClose = () => {
    setActiveModal(false);
    setToggleDropdown(!toggleDropdown);
  };
  const onOpen = () => {
    setActiveModal(true);
  };
  //*handle changeFile state
  const handleCraFileChange = (e) => {
    setError(null);
    setCraFile(e.target.files[0]);
  };

  //*validate file input
  const validateFileInput = () => {
    if (!craFile) {
      setError("Ce champ est obligatoire");
      return false;
    }
    return true;
  };
  const validateInput = () => {
    if (!inputFileName) {
      setErrorInput("Ce champ est obligatoire");
      return false;
    }
    return true;
  };
  const onchangeInput = (e) => {
  setErrorInput(null); // Resetting error state on input change
  setinputFileName(e.target.value); // Updating the state with the input's new value
};
  const handleSubmit = () => {
    console.log("submit", data)
    if (validateFileInput() && validateInput()) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("document", craFile);
      formData.append("documentName", inputFileName);
      formData.append("consultantId", data);
      consultantService
        .addDocument(formData, data)
        .then((_) => {

          onClose();
          toast.success("Document créé avec succès");
          refresh();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erreur lors de la creation de CRA");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <>

          <div>
            <ToastContainer />
            <div onClick={onOpen}>
              <div
                className={`${"hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"}
                      w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
                      first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
              >
                <span className="text-base">
                  <Icon icon="heroicons:arrow-up-tray" width={15} />
                </span>
                <span>Ajouter un nouveau document</span>
              </div>
            </div>

            <Modal
              title="Ajouter un nouveau document"
              labelclassName="btn-outline-dark"
              activeModal={activeModal}
              onClose={onClose}
            >
             <div>
                <label className="form-label">Fichier </label>
                <Textinput
    id="firstName"
    name="firstName"
    placeholder="Nom"
    value={inputFileName} // Use the state variable here
    onChange={onchangeInput} // Attach the onchangeInput function here
  />
                {!!errorInput && (
                  <p className="text-danger-500 text-sm mt-2">{errorInput}</p>
                )}
              </div>
              <div>
                <label className="form-label">Fichier </label>
                <Fileinput
                  name="CRA "
                  label="choisir un fichier "
                  placeholder="Fichier "
                  selectedFile={craFile}
                  className={`pl-3 ${!!error && "border-2 border-danger-500"} `}
                  onChange={handleCraFileChange}
                />
                {!!error && (
                  <p className="text-danger-500 text-sm mt-2">{error}</p>
                )}
              </div>

              <div className="flex items-center justify-end mt-4">
                <button
                  className="btn btn-dark  text-center rounded-xl"
                  onClick={isLoading ? () => {} : handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? <ButtonLoader /> : "Enregistrer"}
                </button>
              </div>
            </Modal>
          </div>

    </>
  );
};

export default Adddocument;
