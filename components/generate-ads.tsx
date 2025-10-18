"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, ImageIcon, Type, Palette, Check } from "lucide-react"

const templates = [
  { id: 1, name: "Social Media Post", size: "1080x1080" },
  { id: 2, name: "Instagram Story", size: "1080x1920" },
  { id: 3, name: "Facebook Ad", size: "1200x628" },
  { id: 4, name: "Banner Ad", size: "728x90" },
]

const styles = [
  { id: 1, name: "Modern", color: "from-blue-500 to-purple-500" },
  { id: 2, name: "Minimal", color: "from-gray-400 to-gray-600" },
  { id: 3, name: "Vibrant", color: "from-pink-500 to-orange-500" },
  { id: 4, name: "Professional", color: "from-indigo-500 to-blue-500" },
]

export function GenerateAds() {
  const [prompt, setPrompt] = useState("")
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([1])
  const [selectedStyle, setSelectedStyle] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userPlan] = useState<"starter" | "professional" | "business">("professional")

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const handleTemplateSelect = (templateId: number) => {
    if (userPlan === "starter") {
      setSelectedTemplates([templateId])
    } else {
      setSelectedTemplates((prev) =>
        prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId],
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Generate Ads</h1>
        <p className="text-muted-foreground">Create stunning ads with AI in seconds</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Ad Description
            </CardTitle>
            <CardDescription>Describe what you want your ad to be about</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="E.g., A summer sale ad for a clothing brand with bright colors and beach vibes..."
              className="min-h-32 resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Template
              {userPlan !== "starter" && (
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Select Multiple
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {userPlan === "starter"
                ? "Choose your ad format"
                : "Choose one or more ad formats (Professional/Business feature)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`relative rounded-lg border-2 p-4 text-left transition-all ${
                    selectedTemplates.includes(template.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {selectedTemplates.includes(template.id) && (
                    <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className="font-medium text-foreground">{template.name}</div>
                  <div className="text-sm text-muted-foreground">{template.size}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Style
            </CardTitle>
            <CardDescription>Select your preferred aesthetic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    selectedStyle === style.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`mb-2 h-8 rounded bg-gradient-to-r ${style.color}`} />
                  <div className="font-medium text-foreground">{style.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {(userPlan === "professional" || userPlan === "business") && (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Ads Package
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  Pro Feature
                </span>
              </CardTitle>
              <CardDescription>Generate complete ad packages with captions, CTAs, and tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>AI-generated captions optimized for engagement</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Compelling call-to-action suggestions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Relevant hashtags and tags for maximum reach</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt || selectedTemplates.length === 0}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-spin" />
              Generating {selectedTemplates.length > 1 ? `${selectedTemplates.length} ads` : "ad"}...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate {selectedTemplates.length > 1 ? `${selectedTemplates.length} Ads` : "Ad"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
