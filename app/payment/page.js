import Payment from "@/components/Payment"

export default async function PaymentPage({ searchParams }) {
  const params = await searchParams;
  return (
    <Payment
      screeningId={params.screeningId}
      movieTitle={params.movie}
      movieImage={params.image}
      price={params.price}
      seats={params.seats}
    />
  )
}