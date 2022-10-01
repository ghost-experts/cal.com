import { GetServerSidePropsContext } from "next";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import Shell from "@calcom/ui/Shell";

import Pricing from "./Pricing";

function Upgrade({ plans }: { plans: [] }) {
  const { t } = useLocale();
  return (
    <div>
      <Shell heading={t("upgrade")} subtitle={t("select_upgrade_plan")}>
        <>Pro</>
        <Pricing plans={plans} />
      </Shell>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const STRIPE_MONTLY_PLAN_PRODUCT_ID = process.env.STRIPE_MONTLY_PLAN_PRODUCT_ID;
  const STRIPE_YEARLY_PLAN_PRODUCT_ID = process.env.STRIPE_YEARLY_PLAN_PRODUCT_ID;
  return {
    props: {
      plans: [
        { id: STRIPE_MONTLY_PLAN_PRODUCT_ID, type: "MONTHLY", price: 9 },
        { id: STRIPE_YEARLY_PLAN_PRODUCT_ID, type: "YEARLY", price: 99 },
      ],
    },
  };
};

export default Upgrade;
