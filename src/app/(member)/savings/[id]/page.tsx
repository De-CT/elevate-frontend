import SavingsSubscriptionDetails from "@/components/member/savings/SavingsSubscriptionDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SavingsSubscriptionDetails subscriptionId={id} />;
}
