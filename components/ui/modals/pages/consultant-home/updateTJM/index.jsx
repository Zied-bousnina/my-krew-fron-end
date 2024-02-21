import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Fileinput from "@/components/ui/Fileinput";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "@/components/ui/loaders/pageloader";
import Icon from "@/components/ui/Icon";
import { consultantService } from "@/_services/consultant.service";
import Button from "@/components/ui/Button";
import { Menu } from "@headlessui/react";
import ButtonLoader from "@/components/ui/loaders/buttonLoader";
import Textinput from "@/components/ui/Textinput";
import * as yup from "yup";
import { useFormik } from "formik";
import { missionService } from "@/_services/mission.service";

const validationScheme = yup.object({
  tjm: yup.number().required("Ce champ est obligatoire"),
});

const UpdateTJM = ({ data, setToggleDropdown, toggleDropdown,refresh }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setActiveModal(false);
    setToggleDropdown(!toggleDropdown);
  };
  const onOpen = () => {
    setActiveModal(true);
  };

  const formik = useFormik({
    initialValues: {
      tjm: data.tjm,
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      setIsLoading(true);
      missionService
        .updateTjm(data.id, values)
        .then((_) => {
            toast.success("TJM mis à jour avec succès");
            onClose();
            refresh()
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });


  return (
    <div>
      <ToastContainer />
      <div onClick={onOpen}>
        <div
          className={`${"hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"}
                      w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
                      first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
        >
          <span className="text-base">
            <Icon icon="heroicons:pencil-square" width={15} />
          </span>
          <span>mettre à jour TJM</span>
        </div>
      </div>

      <Modal
        title="mettre à jour TJM"
        labelclassName="btn-outline-dark"
        activeModal={activeModal}
        onClose={onClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <div dir="ltr">
            <label className="form-label">Nouveau TJM</label>
            <Textinput
              id="tjm"
              name="tjm"
              placeholder="tjm"
              type="number"
              defaultValue={data.tjm}
              value={formik.values.tjm}
              onChange={formik.handleChange}
              error={formik.touched.tjm && Boolean(formik.errors.tjm)}
              helperText={formik.touched.tjm && formik.errors.tjm}
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <button
              className="btn btn-dark  text-center rounded-xl"
              disabled={isLoading}
              type={isLoading ? "button" : "submit"}
            >
              {isLoading ? <ButtonLoader /> : "Enregistrer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateTJM;
