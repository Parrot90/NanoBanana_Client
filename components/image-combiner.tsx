"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Upload, Download, Sparkles, ImageIcon, Edit, Zap, Shuffle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dithering } from "@paper-design/shaders-react"
import { ApiKeySettings } from "@/components/api-key-settings"
import { apiStorage } from "@/lib/api-storage"

type Mode = "text-to-image" | "image-editing"

interface GeneratedImage {
  url: string
  prompt: string
  description?: string
}

const randomPrompts = [
  "A cyberpunk cityscape with neon lights reflecting on wet streets at midnight",
  "A majestic dragon soaring through clouds above ancient mountain peaks",
  "A cozy coffee shop in a treehouse with fairy lights and hanging plants",
  "An underwater palace made of coral with bioluminescent sea creatures",
  "A steampunk airship floating above Victorian London in golden hour",
  "A magical forest with glowing mushrooms and ethereal mist",
  "A futuristic space station orbiting a purple nebula",
  "A vintage diner on Route 66 with classic cars parked outside",
  "A crystal cave with rainbow light refractions and floating gems",
  "A Japanese garden in autumn with koi pond and red maple trees",
  "A post-apocalyptic library overgrown with vines and nature",
  "A floating island with waterfalls cascading into clouds below",
  "A neon-lit arcade from the 80s with retro gaming machines",
  "A medieval castle on a cliff during a thunderstorm",
  "A bioluminescent alien jungle with exotic flora and fauna",
  "A cozy cabin in snowy mountains with smoke from the chimney",
  "A surreal desert with giant clock towers and melting timepieces",
  "A Victorian greenhouse filled with exotic plants and butterflies",
  "A cybernetic wolf howling at a digital moon in cyberspace",
  "A floating market in Venice with gondolas and colorful awnings",
  "A crystal palace made of ice with aurora borealis overhead",
  "A retro-futuristic diner on Mars with Earth visible in the sky",
  "A mystical portal in an ancient stone circle at dawn",
  "A steampunk laboratory with brass instruments and glowing vials",
  "A underwater city with glass domes and swimming mermaids",
  "A giant tree house city connected by rope bridges",
  "A neon samurai in a rain-soaked Tokyo alleyway",
  "A magical bookstore where books float and pages turn themselves",
  "A desert oasis with palm trees and a crystal-clear spring",
  "A space elevator reaching from Earth to a orbital station",
  "A haunted mansion with glowing windows on a foggy night",
  "A robot garden where mechanical flowers bloom with LED petals",
  "A pirate ship sailing through clouds in the sky",
  "A crystal dragon perched on a mountain of gemstones",
  "A cyberpunk street market with holographic vendors",
  "A fairy tale cottage with a thatched roof and flower garden",
  "A futuristic subway station with levitating trains",
  "A magical academy floating in the clouds with flying students",
  "A bioluminescent coral reef city with mermaid inhabitants",
  "A steampunk clocktower with gears visible through glass panels",
  "A post-apocalyptic greenhouse dome in a wasteland",
  "A dragon's hoard in a crystal cave filled with treasure",
  "A cybernetic forest where trees have circuit board bark",
  "A floating monastery on a mountain peak above the clouds",
  "A retro space diner with alien customers and robot waiters",
  "A magical winter wonderland with ice sculptures and snow fairies",
  "A underwater volcano with thermal vents and exotic sea life",
  "A steampunk carnival with mechanical rides and brass decorations",
  "A crystal city built inside a massive geode",
  "A cyberpunk rooftop garden with neon plants and digital rain",
  "A medieval tavern with a roaring fireplace and wooden beams",
  "A space whale swimming through a nebula of stars",
  "A magical potion shop with floating ingredients and glowing bottles",
  "A post-apocalyptic overgrown subway station with nature reclaiming it",
  "A crystal bridge spanning between two floating islands",
  "A cybernetic phoenix rising from digital flames",
  "A cozy lighthouse on a rocky coast during a storm",
  "A steampunk airship dock with multiple vessels and brass fittings",
  "A magical mirror maze with reflections showing different worlds",
  "A bioluminescent mushroom forest with glowing spores floating",
  "A futuristic greenhouse on Mars growing Earth plants",
  "A dragon sleeping on a pile of books in an ancient library",
  "A cyberpunk street art mural that moves and changes colors",
  "A floating tea house above cherry blossom trees in spring",
  "A crystal waterfall flowing upward into the sky",
  "A steampunk submarine exploring an underwater canyon",
  "A magical snow globe containing a miniature winter village",
  "A post-apocalyptic rooftop garden with solar panels and plants",
  "A cybernetic butterfly garden with holographic flowers",
  "A medieval blacksmith shop with glowing forge and sparks",
  "A space elevator cable stretching into a starry sky",
  "A magical treehouse library with books growing on branches",
  "A bioluminescent cave system with underground rivers",
  "A steampunk observatory with a massive brass telescope",
  "A crystal palace floating in aurora-filled skies",
  "A cyberpunk food truck serving neon-colored dishes",
  "A cozy bookshop cat cafe with felines reading books",
  "A post-apocalyptic wind farm with nature growing around turbines",
  "A magical ice skating rink with frozen waterfalls as backdrop",
  "A underwater steampunk city with brass submarines",
  "A dragon's nest built in the crown of a giant tree",
  "A cybernetic garden where flowers bloom in binary patterns",
  "A floating wizard tower surrounded by levitating rocks",
  "A crystal mine with workers harvesting rainbow gems",
  "A steampunk train station with ornate Victorian architecture",
  "A magical aurora dancing over a frozen lake",
  "A bioluminescent alien forest with singing plants",
  "A post-apocalyptic arcade where nature has taken over the games",
  "A cyberpunk temple with holographic monks meditating",
  "A cozy hobbit hole with round doors and flower gardens",
  "A crystal cathedral with stained glass windows casting rainbow light",
  "A steampunk circus with mechanical performers and brass instruments",
  "A magical bookstore where stories come alive and walk around",
]

export function ImageCombiner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get initial mode and prompt from URL parameters
  const initialMode = (searchParams?.get('mode') as Mode) || "text-to-image"
  const initialPrompt = searchParams?.get('p') || (
    initialMode === "text-to-image"
      ? "A beautiful landscape with mountains and a lake at sunset"
      : "Edit these images to create a cohesive artistic composition"
  )
  
  const [mode, setMode] = useState<Mode>(initialMode)
  const [image1, setImage1] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [image1Preview, setImage1Preview] = useState<string>("")
  const [image2Preview, setImage2Preview] = useState<string>("")
  const [image1Url, setImage1Url] = useState<string>("")
  const [image2Url, setImage2Url] = useState<string>("")
  const [useUrls, setUseUrls] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showApiSettings, setShowApiSettings] = useState(false)
  const [prompt, setPrompt] = useState(initialPrompt)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Check for existing API key
    const hasStoredApiKey = apiStorage.isSet()
    setHasApiKey(hasStoredApiKey)
    if (!hasStoredApiKey) {
      setShowApiSettings(true)
    }
    
    // Handle URL parameters for mode and prompt
    const params = new URLSearchParams(window.location.search)
    const urlMode = params.get("mode") as Mode
    const urlPrompt = params.get("p")
    
    if (urlMode && (urlMode === "text-to-image" || urlMode === "image-editing")) {
      setMode(urlMode)
    }
    
    if (urlPrompt && urlPrompt.trim()) {
      setPrompt(urlPrompt)
    }
    
    // Clean the URL so params don't linger
    if (urlMode || urlPrompt) {
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [])

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length)
    const randomPrompt = randomPrompts[randomIndex]
    setPrompt(randomPrompt)
  }

  useEffect(() => {
    return () => {
      // Cleanup function remains empty since progress is now controlled in generateImage
    }
  }, [isLoading])

  const handleImageUpload = (file: File, imageNumber: 1 | 2) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (imageNumber === 1) {
        setImage1(file)
        setImage1Preview(result)
      } else {
        setImage2(file)
        setImage2Preview(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent, imageNumber: 1 | 2) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file, imageNumber)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, imageNumber)
    }
  }

  const handleUrlChange = (url: string, imageNumber: 1 | 2) => {
    if (imageNumber === 1) {
      setImage1Url(url)
      setImage1Preview(url)
      setImage1(null)
    } else {
      setImage2Url(url)
      setImage2Preview(url)
      setImage2(null)
    }
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    // Don't reset the prompt - preserve user's input when switching modes
    setGeneratedImage(null)
    if (newMode === "text-to-image") {
      setImage1(null)
      setImage2(null)
      setImage1Preview("")
      setImage2Preview("")
      setImage1Url("")
      setImage2Url("")
      setUseUrls(false)
    }
  }

  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = url
    })
  }

  const generateImage = async () => {
    if (mode === "image-editing" && !useUrls && !image1) return
    if (mode === "image-editing" && useUrls && !image1Url.trim()) return
    if (mode === "text-to-image" && !prompt.trim()) return

    setIsLoading(true)
    setGeneratedImage(null)
    setImageLoaded(false)
    setProgress(0)
    setShowAnimation(true)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) {
          // Very slow progress after 96% to add more time
          return Math.min(prev + 0.1, 98)
        } else if (prev >= 90) {
          // Slower after 90%
          return prev + 0.3
        } else if (prev >= 75) {
          // Moderate speed between 75-90%
          return prev + 0.6
        } else if (prev >= 50) {
          // Good speed in middle range
          return prev + 0.9
        } else if (prev >= 25) {
          // Moderate initial progress
          return prev + 1.1
        } else {
          // Faster initial progress
          return prev + 1.3
        }
      })
    }, 100) // Slightly longer interval for more duration

    try {
      const config = apiStorage.getConfig()
      if (!config) {
        throw new Error("Google AI Studio API key is required. Please configure your API key first.")
      }

      const formData = new FormData()
      formData.append("mode", mode)
      formData.append("prompt", prompt)
      formData.append("apiKey", config.apiKey)

      if (mode === "image-editing") {
        if (useUrls) {
          if (image1Url) formData.append("image1Url", image1Url)
          if (image2Url) formData.append("image2Url", image2Url)
        } else {
          if (image1) formData.append("image1", image1)
          if (image2) formData.append("image2", image2)  // Optional second image
        }
      }

      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to generate image: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      clearInterval(progressInterval)

      setProgress(99)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(100)

      // Handle both regular images and data URLs from different providers
      if (data.url.startsWith('data:')) {
        // For data URLs (base64 images from Google AI), no need to preload
        setGeneratedImage(data)
        setIsLoading(false)
        setShowAnimation(false)
        setProgress(0)
        setImageLoaded(true)
      } else {
        // For regular URLs (from Fal AI), preload the image
        await preloadImage(data.url)
        setImageLoaded(true)

        setGeneratedImage(data)
        setIsLoading(false)
        setShowAnimation(false)
        setProgress(0)
      }
    } catch (error) {
      clearInterval(progressInterval)
      setProgress(0)
      setShowAnimation(false)
      console.error("Error generating image:", error)
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
      setIsLoading(false)
    }
  }

  const downloadImage = async () => {
    if (generatedImage) {
      try {
        let blob: Blob

        if (generatedImage.url.startsWith('data:')) {
          // Handle data URL (base64) - convert to blob
          const response = await fetch(generatedImage.url)
          blob = await response.blob()
        } else {
          // Handle regular URL
          const response = await fetch(generatedImage.url)
          blob = await response.blob()
        }

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `nano-banana-${mode}-result.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Error downloading image:", error)
        // Fallback to opening in new tab if download fails
        window.open(generatedImage.url, "_blank")
      }
    }
  }

  const canGenerate = hasApiKey && (
    mode === "text-to-image"
      ? prompt.trim().length > 0
      : useUrls
        ? image1Url.trim().length > 0 && prompt.trim().length > 0  // Only require first image for image editing
        : image1 !== null && prompt.trim().length > 0              // Only require first image for image editing
  )

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <Dithering
          colorBack="#00000000"
          colorFront="#614B00"
          speed={0.43}
          shape="wave"
          type="4x4"
          pxSize={3}
          scale={1.13}
          style={{
            backgroundColor: "#000000",
            height: "100vh",
            width: "100vw",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 lg:p-6">
        <div className="max-w-7xl w-full">
          <div className="bg-black/70 backdrop-blur-sm border-0 p-6 lg:p-8 rounded-xl min-h-[calc(100vh-8rem)]">
            <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/starter')}
                  className="text-white hover:bg-white/10 p-2"
                  title="Back to browse prompts"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-white">v0 Nano Banana Starter</h1>
                  <p className="text-sm text-green-400 mt-1">Powered by Google Gemini 2.5 Flash Image Preview</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiSettings(!showApiSettings)}
                className="bg-transparent border-white/20 text-white hover:bg-white/5 w-fit"
              >
                {hasApiKey ? "Google AI Configured" : "Configure Google AI"}
              </Button>
            </div>

            {showApiSettings && (
              <div className="mb-6 lg:mb-8">
                <ApiKeySettings 
                  onApiKeyChange={(hasKey) => {
                    setHasApiKey(hasKey)
                    // Don't auto-close the modal when API key is saved
                    // Let user manually close it by clicking the button again
                  }} 
                />
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5" />
                    Input
                  </h3>
                  <div className="inline-flex bg-black/50 border border-gray-600 rounded overflow-hidden">
                    <button
                      onClick={() => handleModeChange("text-to-image")}
                      className={cn(
                        "flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all",
                        mode === "text-to-image"
                          ? "bg-white text-black"
                          : "text-gray-300 hover:text-white hover:bg-gray-700",
                      )}
                    >
                      <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">Text-to-Image</span>
                      <span className="sm:hidden">Text</span>
                    </button>
                    <button
                      onClick={() => handleModeChange("image-editing")}
                      className={cn(
                        "flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all",
                        mode === "image-editing"
                          ? "bg-white text-black"
                          : "text-gray-300 hover:text-white hover:bg-gray-700",
                      )}
                    >
                      <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">Image-to-Image</span>
                      <span className="sm:hidden">Edit</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      {mode === "text-to-image" ? "Describe your image" : "Editing instructions"}
                    </label>
                    <Button
                      onClick={getRandomPrompt}
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-sm bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Random
                    </Button>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      mode === "text-to-image"
                        ? "Describe the image you want to generate..."
                        : "Describe how to edit the images..."
                    }
                    className="w-full h-24 lg:h-32 p-3 lg:p-4 bg-black/50 border border-gray-600 rounded resize-none focus:outline-none focus:ring-2 focus:ring-white text-white text-sm lg:text-base transition-colors"
                  />
                </div>

                <div className="min-h-[10rem]">
                  {mode === "image-editing" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex bg-black/50 border border-gray-600 rounded overflow-hidden">
                          <button
                            onClick={() => setUseUrls(false)}
                            className={cn(
                              "px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all",
                              !useUrls ? "bg-white text-black" : "text-gray-300 hover:text-white",
                            )}
                          >
                            Files
                          </button>
                          <button
                            onClick={() => setUseUrls(true)}
                            className={cn(
                              "px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all",
                              useUrls ? "bg-white text-black" : "text-gray-300 hover:text-white",
                            )}
                          >
                            URLs
                          </button>
                        </div>
                      </div>

                      {useUrls ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <input
                              type="url"
                              value={image1Url}
                              onChange={(e) => handleUrlChange(e.target.value, 1)}
                              placeholder="Image 1 URL"
                              className="w-full p-3 lg:p-4 bg-black/50 border border-gray-600 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-white rounded transition-colors"
                            />
                          </div>
                          <div>
                            <input
                              type="url"
                              value={image2Url}
                              onChange={(e) => handleUrlChange(e.target.value, 2)}
                              placeholder="Image 2 URL"
                              className="w-full p-3 lg:p-4 bg-black/50 border border-gray-600 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-white rounded transition-colors"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 mb-6">
                          <p className="text-sm text-gray-400 mb-4">
                            Upload at least one image to edit. You can use one or two images - the second image is optional.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                              className={cn(
                                "w-full h-40 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-white transition-all bg-black/20 hover:bg-black/30",
                                image1Preview && "border-solid border-white bg-black/30",
                              )}
                              onDrop={(e) => handleDrop(e, 1)}
                              onDragOver={(e) => e.preventDefault()}
                              onClick={() => document.getElementById("file1")?.click()}
                            >
                              {image1Preview ? (
                                <div className="w-full h-full p-3">
                                  <img
                                    src={image1Preview || "/placeholder.svg"}
                                    alt="Image 1"
                                    className="w-full h-full object-contain rounded"
                                  />
                                </div>
                              ) : (
                                <div className="text-center text-gray-300">
                                  <Upload className="w-8 h-8 mx-auto mb-3" />
                                  <p className="text-sm font-medium mb-1">Upload Image 1</p>
                                  <p className="text-xs text-gray-400">Click or drag & drop</p>
                                </div>
                              )}
                              <input
                                id="file1"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, 1)}
                                aria-label="Upload first image"
                              />
                            </div>

                            <div
                              className={cn(
                                "w-full h-40 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-white transition-all bg-black/20 hover:bg-black/30",
                                image2Preview && "border-solid border-white bg-black/30",
                                !image2Preview && "opacity-50",
                              )}
                              onDrop={(e) => handleDrop(e, 2)}
                              onDragOver={(e) => e.preventDefault()}
                              onClick={() => document.getElementById("file2")?.click()}
                            >
                              {image2Preview ? (
                                <div className="w-full h-full p-3">
                                  <img
                                    src={image2Preview || "/placeholder.svg"}
                                    alt="Image 2"
                                    className="w-full h-full object-contain rounded"
                                  />
                                </div>
                              ) : (
                                <div className="text-center text-gray-300">
                                  <Upload className="w-8 h-8 mx-auto mb-3" />
                                  <p className="text-sm font-medium mb-1">Upload Image 2 (Optional)</p>
                                  <p className="text-xs text-gray-400">Click or drag & drop</p>
                                </div>
                              )}
                              <input
                                id="file2"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileSelect(e, 2)}
                                aria-label="Upload second image (optional)"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  onClick={generateImage}
                  disabled={!canGenerate || isLoading}
                  className="w-full h-11 lg:h-12 text-sm lg:text-base font-semibold bg-white text-black hover:bg-gray-200 rounded disabled:bg-gray-600 disabled:text-gray-400 transition-all"
                >
                  {isLoading ? (
                    <>{mode === "text-to-image" ? "Generating with Gemini..." : "Processing with Gemini..."}</>
                  ) : !hasApiKey ? (
                    <>Configure Google AI Key First</>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>

              {/* Result Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <ImageIcon className="w-5 h-5" />
                    Result
                  </h3>
                  {generatedImage && (
                    <Button
                      onClick={downloadImage}
                      variant="outline"
                      size="sm"
                      className="text-sm h-8 px-3 bg-transparent border-gray-600 text-white hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-center min-h-[20rem] lg:min-h-[24rem]">
                  {isLoading ? (
                    <div className="w-full h-full flex flex-col items-center justify-center px-4">
                      <div className="w-full max-w-sm">
                        <div className="relative h-8 bg-black/50 border border-gray-600 rounded overflow-hidden">
                          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent_0%,transparent_49%,#333_49%,#333_51%,transparent_51%),repeating-linear-gradient(0deg,transparent_0%,transparent_49%,#333_49%,#333_51%,transparent_51%)] bg-[length:8px_8px]" />
                          
                          <div 
                            className="absolute top-0 left-0 h-full transition-all duration-100 ease-out bg-[repeating-linear-gradient(90deg,#735B00_0px,#735B00_6px,#8B6914_6px,#8B6914_8px),repeating-linear-gradient(0deg,#735B00_0px,#735B00_6px,#8B6914_6px,#8B6914_8px)] bg-[length:8px_8px]"
                            style={{ width: `${progress}%` }}
                          />

                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-mono text-white/80">{Math.round(progress)}%</span>
                          </div>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-sm font-medium text-white animate-pulse">
                            {mode === "text-to-image" ? "Generating..." : "Running..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <div className="w-full h-full flex flex-col">
                      <div className="flex-1 flex items-center justify-center mb-4">
                        <div className="w-full h-full max-h-96 flex items-center justify-center p-2">
                          <img
                            src={generatedImage.url || "/placeholder.svg"}
                            alt="Generated"
                            className={`w-full h-auto max-w-full max-h-96 object-contain rounded shadow-lg transition-all duration-500 ${
                              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-black/50 border border-gray-600 rounded max-h-32 overflow-y-auto">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          <span className="font-semibold text-white block mb-2">Prompt:</span> 
                          <span className="break-words whitespace-pre-wrap">{generatedImage.prompt}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 border border-gray-600 rounded flex items-center justify-center bg-black/50">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400">Ready to generate</p>
                    </div>
                  )}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
