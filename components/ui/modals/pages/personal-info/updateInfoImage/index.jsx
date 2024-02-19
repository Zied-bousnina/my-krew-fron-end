import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Fileinput from "@/components/ui/Fileinput";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "@/components/ui/loaders/pageloader";
import Icon from "@/components/ui/Icon";
import { consultantService } from "@/_services/consultant.service";

const UpdateInfoImage = ({ refresh }) => {
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
    if(validateFileInput()){
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      consultantService
        .updateConsultantProfileImage(formData)
        .then((_) => {
          toast.success("Image mise à jour avec succès");
          onClose();
          refresh();
        })
        .catch((err) => {
          console.log(err)
          toast.error("Erreur lors de la mise à jour de l'image");
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
      <div
        onClick={onOpen}
        className="p-2 rounded-full bg-[#f6f4ef] text-[#513514] cursor-pointer"
      >
        <Icon icon="heroicons:pencil-square" width={22} />
      </div>
      <Modal
        title="Changer l'image personnelle"
        labelclassName="btn-outline-dark"
        activeModal={activeModal}
        onClose={onClose}
      >
        <div>
          <label className="form-label">Nouvelle image</label>
          <Fileinput
            name="image"
            label="choisir une image"
            placeholder="image"
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
            Enregistrer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateInfoImage;
