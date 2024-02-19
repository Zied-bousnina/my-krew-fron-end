import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Fileinput from "@/components/ui/Fileinput";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "@/components/ui/loaders/pageloader";
import Icon from "@/components/ui/Icon";
import { consultantService } from "@/_services/consultant.service";
import Button from "@/components/ui/Button";

const UpdateInfoCIN = ({ refresh }) => {
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setActiveModal(false);
  };
  const onOpen = () => {
    setActiveModal(true);
  };
  //*handle changeFile state
  const handleImageFileChange = (e) => {
    setError(null);
    setImageFile(e.target.files[0]);
  };

  //*validate file input
  const validateFileInput = () => {
    if (!imageFile) {
      setError("Ce champ est obligatoire");
      return false;
    }
    return true;
  };

  const handleUpdate = () => {
    if (validateFileInput()) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      consultantService
        .updateConsultantCIN(formData)
        .then((_) => {
          toast.success("CIN mise à jour avec succès");
          onClose();
          refresh();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erreur lors de la mise à jour de CIN");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      {isLoading && <PageLoader />}
      <ToastContainer />
      <Button
        className="text-[#be6e25] text-sm font-light px-6 py-2 rounded-full bg-[#fff6df] "
        icon="heroicons:arrow-up-tray"
        iconPosition="right"
        iconClass="w-4"
        text="Remplacer"
        onClick={onOpen}
      />
      <Modal
        title="Changer CIN"
        labelclassName="btn-outline-dark"
        activeModal={activeModal}
        onClose={onClose}
      >
        <div>
          <label className="form-label">Nouvelle CIN</label>
          <Fileinput
            name="image"
            label="choisir une image"
            placeholder="CIN"
            selectedFile={imageFile}
            className={`pl-3 ${!!error && "border-2 border-danger-500"} `}
            onChange={handleImageFileChange}
            accept="image/*"
          />
          {!!error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            className="btn btn-dark  text-center rounded-xl"
            onClick={handleUpdate}
          >
            Remplacer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateInfoCIN;
