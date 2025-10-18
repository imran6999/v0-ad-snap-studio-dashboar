import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Zap, Star, Target } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Total Projects",
    value: "24",
    change: "+12%",
    icon: Zap,
  },
  {
    name: "Ads Generated",
    value: "1,429",
    change: "+23%",
    icon: TrendingUp,
  },
  {
    name: "Avg Ads Score",
    value: "8.7",
    change: "+0.4",
    icon: Star,
  },
  {
    name: "Avg Product Shot Score",
    value: "9.2",
    change: "+0.6",
    icon: Target,
  },
]

const recentProjects = [
  {
    name: "Summer Sale Campaign",
    status: "Active",
    ads: 24,
    views: "12.4K",
    date: "2 hours ago",
  },
  {
    name: "Product Launch 2024",
    status: "Draft",
    ads: 12,
    views: "8.2K",
    date: "5 hours ago",
  },
  {
    name: "Holiday Special",
    status: "Active",
    ads: 36,
    views: "24.1K",
    date: "1 day ago",
  },
  {
    name: "Brand Awareness",
    status: "Completed",
    ads: 18,
    views: "15.7K",
    date: "3 days ago",
  },
]

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>
        <Link href="/generate">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Zap className="mr-2 h-4 w-4" />
            Generate New Ad
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-primary">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest ad campaigns and projects</CardDescription>
            </div>
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{project.ads} ads</span>
                    <span>•</span>
                    <span>{project.views} views</span>
                    <span>•</span>
                    <span>{project.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      project.status === "Active"
                        ? "bg-primary/10 text-primary"
                        : project.status === "Draft"
                          ? "bg-muted text-muted-foreground"
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    {project.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-lg">AI-Powered Generation</CardTitle>
            <CardDescription>Create stunning ads in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/generate">
              <Button className="w-full bg-gradient-to-r from-primary to-accent">Start Creating</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Browse Templates</CardTitle>
            <CardDescription>Choose from 100+ pre-made designs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              View Templates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analytics</CardTitle>
            <CardDescription>Track your campaign performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
