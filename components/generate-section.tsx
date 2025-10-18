"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ImageIcon, Type, Palette, Check, Upload } from "lucide-react"

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

const productShotTemplates = [
  { id: 1, name: "Product Showcase", size: "1080x1080" },
  { id: 2, name: "Lifestyle Shot", size: "1200x800" },
  { id: 3, name: "Detail View", size: "800x800" },
  { id: 4, name: "360 View", size: "1080x1080" },
]

const packagingLevels = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "tertiary", label: "Tertiary" },
]

const packageTypes = [
  { id: "boxes", label: "Boxes" },
  { id: "bottles", label: "Bottles" },
  { id: "packet", label: "Packet" },
]

export function GenerateSection() {
  const [adsPrompt, setAdsPrompt] = useState("")
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([1])
  const [selectedStyle, setSelectedStyle] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userPlan] = useState<"starter" | "professional" | "business">("professional")

  const [productPrompt, setProductPrompt] = useState("")
  const [selectedProductTemplates, setSelectedProductTemplates] = useState<number[]>([1])
  const [isGeneratingProduct, setIsGeneratingProduct] = useState(false)
  const [productShotImage, setProductShotImage] = useState<string | null>(null)
  const [productShotDescription, setProductShotDescription] = useState("")

  const [packagePrompt, setPackagePrompt] = useState("")
  const [isGeneratingPackage, setIsGeneratingPackage] = useState(false)

  const [packagingLevel, setPackagingLevel] = useState("primary")
  const [packageType, setPackageType] = useState("boxes")
  const [productImage, setProductImage] = useState<string | null>(null)
  const [productInfo, setProductInfo] = useState("")
  const [designPrompt, setDesignPrompt] = useState("")

  const handleGenerateAds = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const handleGenerateProduct = () => {
    setIsGeneratingProduct(true)
    setTimeout(() => setIsGeneratingProduct(false), 2000)
  }

  const handleGeneratePackage = () => {
    setIsGeneratingPackage(true)
    setTimeout(() => setIsGeneratingPackage(false), 2000)
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

  const handleProductTemplateSelect = (templateId: number) => {
    if (userPlan === "starter") {
      setSelectedProductTemplates([templateId])
    } else {
      setSelectedProductTemplates((prev) =>
        prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId],
      )
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductShotImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductShotImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Generate</h1>
        <p className="text-muted-foreground">Create stunning content with AI in seconds</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Tabs defaultValue="ads" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ads">Generate Ads</TabsTrigger>
            <TabsTrigger value="product">Product Shots</TabsTrigger>
            <TabsTrigger value="package">Product Package</TabsTrigger>
          </TabsList>

          {/* Generate Ads Tab */}
          <TabsContent value="ads" className="space-y-6">
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
                  value={adsPrompt}
                  onChange={(e) => setAdsPrompt(e.target.value)}
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
                        selectedStyle === style.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
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
              onClick={handleGenerateAds}
              disabled={isGenerating || !adsPrompt || selectedTemplates.length === 0}
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
          </TabsContent>

          {/* Generate Product Shots Tab */}
          <TabsContent value="product" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Product Description
                </CardTitle>
                <CardDescription>Describe your product and the shot style you want</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="E.g., A sleek smartphone with a minimalist design, photographed on a white background with soft lighting..."
                  className="min-h-32 resize-none"
                  value={productPrompt}
                  onChange={(e) => setProductPrompt(e.target.value)}
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
                    ? "Choose your product shot format"
                    : "Choose one or more product shot formats (Professional/Business feature)"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {productShotTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleProductTemplateSelect(template.id)}
                      className={`relative rounded-lg border-2 p-4 text-left transition-all ${
                        selectedProductTemplates.includes(template.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {selectedProductTemplates.includes(template.id) && (
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
                  <Upload className="h-5 w-5" />
                  Upload Product Image
                </CardTitle>
                <CardDescription>Upload an image of your product to enhance the shot generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50">
                    <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Click to upload product image</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                    <input type="file" accept="image/*" onChange={handleProductShotImageUpload} className="hidden" />
                  </label>
                  {productShotImage && (
                    <div className="relative">
                      <img
                        src={productShotImage || "/placeholder.svg"}
                        alt="Product preview"
                        className="h-40 w-full rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setProductShotImage(null)}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Product Details & Prompt
                </CardTitle>
                <CardDescription>Describe how you want the product shots to look</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="E.g., Professional product photography with studio lighting, white background, multiple angles, lifestyle shots with the product in use, close-up details..."
                  className="min-h-32 resize-none"
                  value={productShotDescription}
                  onChange={(e) => setProductShotDescription(e.target.value)}
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerateProduct}
              disabled={
                isGeneratingProduct ||
                !productPrompt ||
                selectedProductTemplates.length === 0 ||
                !productShotDescription
              }
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              size="lg"
            >
              {isGeneratingProduct ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating product shots...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Product Shots
                </>
              )}
            </Button>
          </TabsContent>

          {/* Generate Product Package Tab */}
          <TabsContent value="package" className="space-y-6">
            {userPlan === "starter" ? (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-900">Upgrade Required</CardTitle>
                  <CardDescription className="text-yellow-800">
                    Product Package generation is only available on Professional and Business plans
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Packaging Level</CardTitle>
                      <CardDescription>Select packaging tier</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <select
                        value={packagingLevel}
                        onChange={(e) => setPackagingLevel(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors hover:border-primary/50 focus:border-primary focus:outline-none"
                      >
                        {packagingLevels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Package Type</CardTitle>
                      <CardDescription>Select package format</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <select
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors hover:border-primary/50 focus:border-primary focus:outline-none"
                      >
                        {packageTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Product Image
                    </CardTitle>
                    <CardDescription>Upload an image of your product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50">
                        <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Click to upload product image</span>
                        <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      {productImage && (
                        <div className="relative">
                          <img
                            src={productImage || "/placeholder.svg"}
                            alt="Product preview"
                            className="h-40 w-full rounded-lg object-cover"
                          />
                          <button
                            onClick={() => setProductImage(null)}
                            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      Product Information
                    </CardTitle>
                    <CardDescription>
                      Enter details to print on the package (brand name, description, etc.)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="E.g., Brand Name: Premium Co.&#10;Product: Organic Coffee Beans&#10;Weight: 250g&#10;Origin: Ethiopian Highlands&#10;Best Before: 12 months&#10;Ingredients: 100% Arabica Coffee Beans"
                      className="min-h-40 resize-none"
                      value={productInfo}
                      onChange={(e) => setProductInfo(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Design Prompt
                    </CardTitle>
                    <CardDescription>Describe how you want the package design to look</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="E.g., Modern minimalist design with gold accents, eco-friendly aesthetic, nature-inspired patterns, premium feel with matte finish..."
                      className="min-h-32 resize-none"
                      value={designPrompt}
                      onChange={(e) => setDesignPrompt(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      What's Included
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        Pro Feature
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>AI-generated product captions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Optimized call-to-action copy</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Relevant product tags and hashtags</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>SEO-optimized descriptions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleGeneratePackage}
                  disabled={isGeneratingPackage || !productImage || !productInfo || !designPrompt}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  size="lg"
                >
                  {isGeneratingPackage ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Generating package...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Product Package
                    </>
                  )}
                </Button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
