"use client";
import { consultantService } from "@/_services/consultant.service";
import Loading from "@/app/loading";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import VirementTable from "@/components/partials/table/pages/consultant/virement/virementTable";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ConsultantVirementPage = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getConsultantVirement = () => {
    setIsLoading(true);
    consultantService
      .getConsultantVirements(userAuth.id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getConsultantVirement();
  }, []);
  return (
    <div className="lg:col-span-8 col-span-12 space-y-5">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex gap-6 items-center">
              <Icon icon="solar:money-bag-outline" width={35} />
              <h1 className="font-bold text-4xl">Mes Virements</h1>
            </div>
          </div>
          <Card>
            <BasicArea height={240} />
          </Card>

          <VirementTable title="Virement" virementData={data} />
        </div>
      )}
    </div>
  );
};

export default ConsultantVirementPage;
