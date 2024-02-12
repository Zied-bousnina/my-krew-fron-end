"use client";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import VirementTable from "@/components/partials/table/pages/consultant/virement/virementTable";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import React from "react";

const ConsultantVirementPage = () => {
  return (
    <div className="lg:col-span-8 col-span-12 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex gap-6 items-center">
          <Icon icon="solar:money-bag-outline" width={35} />
          <h1 className="font-bold text-4xl">Mes Virements</h1>
        </div>
      </div>
      {/* </Card> */}
      <Card>
        <BasicArea height={240} />
      </Card>

      <VirementTable title="Virement" />
      {/* <p className="text-2xl font-bold">Mes Missions</p>
    {!isConsultLoading ? (
      selectedFilter == "Tous les Consultants" ? (  
        <CustomTable title="En attente" columns={COLUMNS} data={consultantV2} />
      ) : missionsPendingLoading ? (
        <Loading />
      ) : (
        <Missions consultants={missionsPending} />
      )
    ) : (
      <Loading />
    )} */}
    </div>
  );
};

export default ConsultantVirementPage;
