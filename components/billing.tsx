import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard, Download, Calendar, X } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for individuals getting started",
    features: ["3 AI ads per month", "3 projects", "Basic templates", "720p exports"],
    limitations: ["No email support", "No ads package (captions, CTA, tags)"],
    current: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing businesses and teams",
    features: [
      "Unlimited AI generations",
      "Unlimited projects",
      "Premium templates",
      "Priority support",
      "4K exports",
      "Multiple template selection",
      "Ads package (captions, CTA, tags)",
      "Team collaboration",
      "Custom branding",
    ],
    limitations: [],
    current: true,
  },
  {
    name: "Business",
    price: "$199",
    period: "/month",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Advanced analytics",
      "White-label options",
      "Ads package (captions, CTA, tags)",
    ],
    limitations: [],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "May 1, 2024", amount: "$79.00", status: "Paid" },
  { id: "INV-002", date: "Apr 1, 2024", amount: "$79.00", status: "Paid" },
  { id: "INV-003", date: "Mar 1, 2024", amount: "$79.00", status: "Paid" },
  { id: "INV-004", date: "Feb 1, 2024", amount: "$79.00", status: "Paid" },
]

export function Billing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the Professional plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">$79.00</div>
              <p className="text-sm text-muted-foreground">per month • Renews on June 1, 2024</p>
            </div>
            <Button variant="outline">Manage Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Available Plans</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.current ? "border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5" : ""}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.current && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Current
                    </span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.limitations.length > 0 && (
                  <ul className="mt-3 space-y-3 border-t border-border pt-3">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-start gap-2">
                        <X className="h-5 w-5 shrink-0 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button
                  className={`mt-6 w-full ${
                    plan.current
                      ? "bg-gradient-to-r from-primary to-accent"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : plan.name === "Starter" ? "Downgrade" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/2025</div>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium text-foreground">{invoice.id}</div>
                    <div className="text-sm text-muted-foreground">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium text-foreground">{invoice.amount}</div>
                    <div className="text-sm text-primary">{invoice.status}</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
