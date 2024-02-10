"use client";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/table/team-table";
import { meets, files } from "@/constant/data";
import CalendarView from "@/components/partials/widget/CalendarView";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import TransactionsTable from "@/components/partials/table/transactions";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import FilterTableItem from "@/components/ui/FilterTableItem";
import { useEffect, useState } from "react";
import Input from "postcss/lib/input";
import GlobalFilter from "@/components/partials/table/GlobalFilter";
import InputBox from "@/components/ui/InputBox";
import Radio from "@/components/ui/Radio";
import ConfirmationPopup from "@/components/ui/ConfirmationPopup";
import Modal from "@/components/ui/Modal";
import { rhServices } from "@/_services/rh.service";
import Loading from "@/app/loading";
import Switch from "./Switch";


const ValidationInfoPerso = ({params}) => {
  const [selectedFilter, setSelectedFilter] = useState("Tous les Consultants");
  const [showConfirmationPopup, setConfirmationPopup] = useState(false);
const [infoPersoById, setinfoPersoById] = useState({})
const [infoIsloading, setinfoIsloading] = useState(false)
const setOnCloseConfirmationPopupHandler = () => setConfirmationPopup(false);
const [inputValue, setInputValue] = useState("");
const [switchValue, setSwitchValue] = useState(true);
const [comment, setcomment] = useState({

})
const [switchStates, setSwitchStates] = useState({});
const [comments, setComments] = useState({});
const onChange = (e, inputComment) => {
  setComments({ ...comments, [inputComment]: e.target.value });
  console.log("comments", comments);
};
const onSwitchChange = (inputComment) => {
  setSwitchStates((prevStates) => ({
    ...prevStates,
    [inputComment]: !prevStates[inputComment],
  }));

  // Clear the comment when the switch is turned off
  if (!switchStates[inputComment]) {
    setComments((prevComments) => ({
      ...prevComments,
      [inputComment]: "",
    }));
  }
};

const fetchinfoPersoById = async () => {
  setinfoIsloading(true)

  rhServices.getConsultantById(params.id).then((data) => {
    setinfoPersoById(data)
    setinfoIsloading(false)
  }
  )
  .catch(err=> {
    setinfoIsloading(false)
    console.log(err)
  }).finally(()=> {
    setinfoIsloading(false)
  }
  )
}

useEffect(() => {
  fetchinfoPersoById()
}, [])
const [updateIsloading, setupdateIsloading] = useState(false)
const updatePreregistrationClientInfo= async (id, data) => {
  setupdateIsloading(true)
  rhServices.updatePreregistrationClientInfo(id, data).then((data) => {
    setupdateIsloading(false)
    setConfirmationPopup(false)
    console.log(data)
  }
  )
  .catch(err=> {
    setupdateIsloading(false)
    setConfirmationPopup(false)
    // console.log(err)
  }).finally(()=> {
    setupdateIsloading(false)
    setConfirmationPopup(false)

  }
  )

}

const update=()=> {
  const data = {
    comments: comments
  }
  console.log(data.comments)
  updatePreregistrationClientInfo(params.id, comments)
  // setConfirmationPopup(false)

}

console.log("infoPersoById",infoPersoById?.[0])
const personalInfo = infoPersoById?.preRegister

const inputs = [
  {
    label: "Nom et Prénom :",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.firstName?.value + " " +infoPersoById?.[0]?.preRegister?.personalInfo?.lastName?.value ,
    commentaire:"firstName"
  },
  {
    label: "Adresse email :",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.email?.value,
    commentaire:"email"
  },
  {
    label: "Numéro de téléphone :",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.phoneNumber?.value,
    commentaire:"phoneNumber"
  },
  {
    label: "Lieu : ",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.location?.value,
    commentaire: "location"
  },
  {
    label: "Nationalité :",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.nationality?.value,
    commentaire: "nationality"
  },
  {
    label: "Num de sécurité sociale / AVS :",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.socialSecurityNumber?.value,
    commentaire: "socialSecurityNumber"

  },
{
  label:"Date de naissance  :",
  value:infoPersoById?.[0]?.preRegister?.personalInfo?.dateOfBirth?.value,
  commentaire: "dateOfBirth"


},
// {
//   label:"Numéro de téléphone :",
//   value: infoPersoById?.[0]?.preRegister?.personalInfo?.phoneNumber?.value,
//   commentaire:"phoneNumber"

// },
 {
  label:"RIB Document :",
  value:infoPersoById?.[0]?.preRegister?.personalInfo?.ribDocument?.value,
  commentaire:"ribDocument"
}

]
const inputsRightSide = [
  {
    label: "Pièce d'identité :",
    value: infoPersoById?.[0]?.preRegister?.personalInfo?.identificationDocument?.value  ,
    commentaire:"identificationDocument",
    image:true

  },
  {
    label:"Permis :",
    value:infoPersoById?.[0]?.preRegister?.personalInfo?.carInfo?.drivingLicense?.value ,
    commentaire:"carInfo",
    image:true
  }



]

const InputsClientLeftSide =  [
  {
    label: "Nom :",
    value:infoPersoById?.[0]?.preRegister?.missionInfo?.finalClient?.value,
    commentaire:"finalClient"


  },

    {
      label:"Société :",
      // value:
    }
]

  return (
    <>

        <Modal
        title="..."
        labelclassName="btn-outline-dark"
        activeModal={showConfirmationPopup}
        onClose={setOnCloseConfirmationPopupHandler}
      >
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-bold text-[32px] text-black-500">
              Confirmez Vos Informations
            </p>
            <div className="flex flex-col gap-2 text-center w-[350px] text-[18px] text-[#1E1E1E]">
              <p>
                Êtes-vous sûr de vouloir soumettre vos informations personnelles
                ?{" "}
              </p>
              <p className="text-[14px] text-[#1E1E1E]/50 px-6">
                Veuillez vérifier que toutes les données saisies sont correctes
                et à jour.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                text="Annuler"
                className="bg-[#1E1E1E] w-[168px] h-[49px] text-white"
                onClick={setOnCloseConfirmationPopupHandler}
              />

              <Button
                text={
                  updateIsloading ? (
                    <div className="flex items-center gap-2">
                      <span>En cours...</span>
                      <div className="animate-spin w-5 h-5 border-t-2 border-b-2 border-[#1E1E1E] rounded-full"></div>
                    </div>
                  ) : (
                    "Confirmer"
                  )
                }

                className="bg-[#C9E2C4] w-[168px] h-[49px] text-[#1E1E1E]"
                onClick={()=> {
                  update()
                }}
                disabled={updateIsloading}
              />
            </div>
          </div>
          </Modal>
{
  infoIsloading ?
  <Loading />:


      <div className="relative space-y-5">
        {/* <HomeBredCurbs title="Tableau de bord - RH" /> */}
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <div className="relative">
              {/* <div className="absolute left-0">
              <Image
                src="/assets/icons/search.svg"
                alt="search"
                className="w-5 h-5 "
              />
            </div> */}
              <GlobalFilter />
              <Button
                text="Rechercher"
                className="absolute right-2 top-2 bg-black-500 text-white text-[14px] font-semibold w-[120px] h-[35px] flex items-center justify-center rounded-[10px]"
              />
            </div>
            {/* </Card> */}
            <Card className="bg-white border border-[#EAE3D5]">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/assets/images/users/user-4.jpg"
                    alt="user"
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex flex-col items-start">
                    <p className="text-black-500 text-[16px] font-bold">
                      {infoPersoById?.[0]?.preRegister?.personalInfo?.firstName?.value + " " +infoPersoById?.[0]?.preRegister?.personalInfo?.lastName?.value}
                    </p>
                    <p className="text-[12px] text-black-500/50">{infoPersoById?.[0]?.preRegister?.personalInfo?.dateOfBirth?.value}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[13px] text-black-500/80">
                    {infoPersoById?.[0]?.preRegister?.missionInfo?.profession?.value}
                  </p>
                  <p className="text-[13px] text-black-500/80">
                  {infoPersoById?.[0]?.email}{" "}
                  </p>
                </div>

                <Button
                  text="Envoyer un email"
                  className=" bg-black-500 text-white text-[12px] font-semibold w-[130px] h-[35px] flex items-center justify-center rounded-[10px]"
                />
              </div>
            </Card>
            {/* Information personnel et du compte */}
            <Card
              title="Information personnel et du compte"
              className="border border-[#EAE3D5] bg-white text-bold"
            >
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                {inputs.map((input, index) => (
        <div key={index}>
          <label htmlFor={input.commentaire} className="font-bold text-[14px] text-[#6E7787]">
            {input.label} <span className="text-[#D8CCB2]">*</span>
          </label>

          <div className="flex gap-2 items-center">
            <div>
              <input
                id={input.label}
                readOnly={true}
                type="text"
                value={input.value}
                placeholder={""}
                onChange={() => {}}
                className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none`}
              />
              {!switchStates[input.commentaire] && (
                <>
                  <label htmlFor={input.commentaire} className="text-[12px] text-[#FF0000] font-bold">
                    Commentaire
                  </label>
                  <input
                    id={input.commentaire}
                    type="text"
                    value={comments[input.commentaire] || ""}
                    placeholder={"comment"}
                    name={input.commentaire}
                    onChange={(e) => {
                      onChange(e, input.commentaire);
                    }}
                    className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none `}
                  />
                </>
              )}
            </div>

            <Switch
              value={switchStates[input.commentaire] || false}
              onChange={() => onSwitchChange(input.commentaire)}
              activeClass="bg-[#2CE254]"
            />
          </div>
        </div>
      ))}

                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <label htmlFor="voiture" className="font-bold text-[14px]">
                      Voiture <span className="text-[#D8CCB2]">*</span>
                    </label>

                    <div className="flex gap-4">
                      <Radio
                        label="Oui"
                        name="Oui"
                        checked={!personalInfo?.personalInfo?.carInfo?.hasCar?.value }
                        // value="oui"
                      />
                      <Radio
                      checked={personalInfo?.personalInfo?.carInfo?.hasCar?.value  }
                       label="Non" name="Non" />
                    </div>
                  </div>
                  {inputsRightSide.map((input, index) => (
input.commentaire =="carInfo" ?
 !personalInfo?.personalInfo?.carInfo?.hasCar?.value&&
        (<div key={index}>
          <label htmlFor={input.commentaire} className="font-bold text-[14px] text-[#6E7787]">
            {input.label} <span className="text-[#D8CCB2]">*</span>
          </label>

          <div className="flex gap-2 items-center">
            <div>
              <Image
                  src={input.value}
                  alt={input.label}
                  width={276}
                  height={46}
                  className="rounded-md border border-[#EAE3D5] outline-none"
                  onClick={()=> { window.open(input.value, "_blank")}}
                />
              {!switchStates[input.commentaire] && (
                <>
                  <label htmlFor={input.commentaire} className="text-[12px] text-[#FF0000] font-bold">
                    Commentaire
                  </label>
                  <input
                    id={input.commentaire}
                    type="text"
                    value={comments[input.commentaire] || ""}
                    placeholder={"comment"}
                    name={input.commentaire}
                    onChange={(e) => {
                      onChange(e, input.commentaire);
                    }}
                    className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none `}
                  />
                </>
              )}
            </div>

            <Switch
              value={switchStates[input.commentaire] || false}
              onChange={() => onSwitchChange(input.commentaire)}
              activeClass="bg-[#2CE254]"
            />
          </div>
        </div>)
        :
           <div key={index}>
          <label htmlFor={input.commentaire} className="font-bold text-[14px] text-[#6E7787]">
            {input.label} <span className="text-[#D8CCB2]">*</span>
          </label>

          <div className="flex gap-2 items-center">
            <div>
            <Image
                  src={input.value}
                  alt={input.label}
                  width={276}
                  height={46}
                  className="rounded-md border border-[#EAE3D5] outline-none"
                  onClick={()=> { window.open(input.value, "_blank")}}
                />
              {!switchStates[input.commentaire] && (
                <>
                  <label htmlFor={input.commentaire} className="text-[12px] text-[#FF0000] font-bold">
                    Commentaire
                  </label>
                  <input
                    id={input.commentaire}
                    type="text"
                    value={comments[input.commentaire] || ""}
                    placeholder={"comment"}
                    name={input.commentaire}

                    onChange={(e) => {
                      onChange(e, input.commentaire);
                    }}
                    className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none `}
                  />
                </>
              )}
            </div>

            <Switch
              value={switchStates[input.commentaire] || false}
              onChange={() => onSwitchChange(input.commentaire)}
              activeClass="bg-[#2CE254]"
            />
          </div>
        </div>
      ))}
                  <Button
                    text="Terminer"
                    className="bg-black-500 text-white text-[12px] font-semibold w-[130px] h-[35px] flex items-center justify-center rounded-[10px] mt-10"
                    onClick={() => setConfirmationPopup(true)}
                  />
                </div>
              </div>
            </Card>
            {/* Information du client (pour la contractualisation) */}
            {/* <Card
              title="Information du client (pour la contractualisation)"
              className="border border-[#EAE3D5] bg-white text-bold"
            >
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                {InputsClientLeftSide.map((input, index) => (
        <div key={index}>
          <label htmlFor={input.commentaire} className="font-bold text-[14px] text-[#6E7787]">
            {input.label} <span className="text-[#D8CCB2]">*</span>
          </label>

          <div className="flex gap-2 items-center">
            <div>
              <input
                id={input.label}
                readOnly={true}
                type="text"
                value={input.value}
                placeholder={""}
                onChange={() => {}}
                className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none`}
              />
              {!switchStates[input.commentaire] && (
                <>
                  <label htmlFor={input.commentaire} className="text-[12px] text-[#FF0000] font-bold">
                    Commentaire
                  </label>
                  <input
                    id={input.commentaire}
                    type="text"
                    value={comments[input.commentaire] || ""}
                    placeholder={"comment"}
                    name={input.commentaire}
                    onChange={(e) => {
                      onChange(e, input.commentaire);
                    }}
                    className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none `}
                  />
                </>
              )}
            </div>

            <Switch
              value={switchStates[input.commentaire] || false}
              onChange={() => onSwitchChange(input.commentaire)}
              activeClass="bg-[#2CE254]"
            />
          </div>
        </div>
      ))}

                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <label htmlFor="voiture" className="font-bold text-[14px]">
                      Voiture <span className="text-[#D8CCB2]">*</span>
                    </label>

                    <div className="flex gap-4">
                      <Radio
                        label="Oui"
                        name="Oui"
                        checked={!personalInfo?.personalInfo?.carInfo?.hasCar?.value }
                        // value="oui"
                      />
                      <Radio
                      checked={personalInfo?.personalInfo?.carInfo?.hasCar?.value  }
                       label="Non" name="Non" />
                    </div>
                  </div>
                  {inputsRightSide.map((input, index) => (
input.commentaire =="carInfo" ?
 !personalInfo?.personalInfo?.carInfo?.hasCar?.value&&
        (<div key={index}>
          <label htmlFor={input.commentaire} className="font-bold text-[14px] text-[#6E7787]">
            {input.label} <span className="text-[#D8CCB2]">*</span>
          </label>

          <div className="flex gap-2 items-center">
            <div>
              <Image
                  src={input.value}
                  alt={input.label}
                  width={276}
                  height={46}
                  className="rounded-md border border-[#EAE3D5] outline-none"
                  onClick={()=> { window.open(input.value, "_blank")}}
                />
              {!switchStates[input.commentaire] && (
                <>
                  <label htmlFor={input.commentaire} className="text-[12px] text-[#FF0000] font-bold">
                    Commentaire
                  </label>
                  <input
                    id={input.commentaire}
                    type="text"
                    value={comments[input.commentaire] || ""}
                    placeholder={"comment"}
                    name={input.commentaire}
                    onChange={(e) => {
                      onChange(e, input.commentaire);
                    }}
                    className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none `}
                  />
                </>
              )}
            </div>

            <Switch
              value={switchStates[input.commentaire] || false}
              onChange={() => onSwitchChange(input.commentaire)}
              activeClass="bg-[#2CE254]"
            />
          </div>
        </div>)
        :
           <div key={index}>
          <label htmlFor={input.commentaire} className="font-bold text-[14px] text-[#6E7787]">
            {input.label} <span className="text-[#D8CCB2]">*</span>
          </label>

          <div className="flex gap-2 items-center">
            <div>
            <Image
                  src={input.value}
                  alt={input.label}
                  width={276}
                  height={46}
                  className="rounded-md border border-[#EAE3D5] outline-none"
                  onClick={()=> { window.open(input.value, "_blank")}}
                />
              {!switchStates[input.commentaire] && (
                <>
                  <label htmlFor={input.commentaire} className="text-[12px] text-[#FF0000] font-bold">
                    Commentaire
                  </label>
                  <input
                    id={input.commentaire}
                    type="text"
                    value={comments[input.commentaire] || ""}
                    placeholder={"comment"}
                    name={input.commentaire}

                    onChange={(e) => {
                      onChange(e, input.commentaire);
                    }}
                    className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none `}
                  />
                </>
              )}
            </div>

            <Switch
              value={switchStates[input.commentaire] || false}
              onChange={() => onSwitchChange(input.commentaire)}
              activeClass="bg-[#2CE254]"
            />
          </div>
        </div>
      ))}
                  <Button
                    text="Terminer"
                    className="bg-black-500 text-white text-[12px] font-semibold w-[130px] h-[35px] flex items-center justify-center rounded-[10px] mt-10"
                    onClick={() => setConfirmationPopup(true)}
                  />
                </div>
              </div>
            </Card> */}
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <Card
              title="Historique des demandes"
              className="border border-[#EAE3D5] bg-white relative"
            >
              <span className="absolute top-7 right-4 text-[13px] font-semibold text-[#D8CCB2] cursor-pointer hover:border-b hover:border-[#D8CCB2]">
                Voir tout {">"}
              </span>
              <MessageList />
            </Card>
            <Card
              title="Nos consultants"
              className="border border-[#EAE3D5] bg-white relative"
            >
              <span className="absolute top-7 right-4 text-[13px] font-semibold text-[#D8CCB2] cursor-pointer hover:border-b hover:border-[#D8CCB2]">
                Voir tout {">"}
              </span>
              <TaskLists />
            </Card>
          </div>
        </div>

      </div>
    }
    </>
  );
};

export default ValidationInfoPerso;
