import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, PlayCircleIcon } from "lucide-react"
import Link from "next/link"

const Success = async ({ searchParams }: { searchParams: Promise<{ session_id: string }> }) => {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details } = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            Payment Successful!
          </h1>
          <p className="text-neutral-300 text-lg">
            Thank you for your purchase! A confirmation email has been sent to{' '}
            <span className="text-white font-medium">{customerEmail}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
            </Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              <PlayCircleIcon className="h-4 w-4" />
              Access My Courses
            </Link>
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-neutral-400">
            Need help? Contact us at{' '}
            <a href="mailto:support@gardens.com" className="text-white hover:text-green-400 underline">
              support@gardens.com
            </a>
          </p>
        </div>

      </div>
    )
  }

  return null
}

export default Success