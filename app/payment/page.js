import Payment from "@/components/Payment"

export default async function PaymentPage({ searchParams }) {
  const params = await searchParams;
  return (
    <Payment
      movieTitle={params.movie}
      movieImage={params.image}
      price={params.price}
      seats={params.seats}
    />
  )
}