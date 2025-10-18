"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreVertical, Search, Plus, FolderOpen, Calendar, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    name: "Summer Sale Campaign",
    description: "Seasonal promotion for summer collection",
    ads: 24,
    views: "12.4K",
    date: "May 15, 2024",
    status: "Active",
    thumbnail: "/summer-sale-ad.png",
  },
  {
    id: 2,
    name: "Product Launch 2024",
    description: "New product line announcement",
    ads: 12,
    views: "8.2K",
    date: "May 14, 2024",
    status: "Draft",
    thumbnail: "/product-launch-ad.png",
  },
  {
    id: 3,
    name: "Holiday Special",
    description: "End of year holiday promotions",
    ads: 36,
    views: "24.1K",
    date: "May 10, 2024",
    status: "Active",
    thumbnail: "/holiday-ad.jpg",
  },
  {
    id: 4,
    name: "Brand Awareness",
    description: "Building brand recognition campaign",
    ads: 18,
    views: "15.7K",
    date: "May 8, 2024",
    status: "Completed",
    thumbnail: "/brand-awareness-ad.jpg",
  },
  {
    id: 5,
    name: "Flash Sale Weekend",
    description: "48-hour limited time offers",
    ads: 8,
    views: "6.3K",
    date: "May 5, 2024",
    status: "Active",
    thumbnail: "/flash-sale-ad.png",
  },
  {
    id: 6,
    name: "Email Campaign",
    description: "Newsletter promotional graphics",
    ads: 15,
    views: "9.8K",
    date: "May 1, 2024",
    status: "Completed",
    thumbnail: "/email-campaign-ad.jpg",
  },
]

export function MyProjects() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Manage and organize your ad campaigns</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={project.thumbnail || "/placeholder.svg"}
                alt={project.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="mt-1">{project.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FolderOpen className="h-4 w-4" />
                      {project.ads} ads
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {project.views}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      project.status === "Active"
                        ? "bg-primary/10 text-primary"
                        : project.status === "Draft"
                          ? "bg-muted text-muted-foreground"
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {project.date}
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Open Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
