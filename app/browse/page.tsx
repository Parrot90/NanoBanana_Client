"use client"

import { useState } from "react"
import { MenGrid } from "@/components/men-grid"
import { WomenGrid } from "@/components/women-grid"
import { CoupleGrid } from "@/components/couple-grid"
import { Dithering } from "@paper-design/shaders-react"
import { Button } from "@/components/ui/button"

type Category = "men" | "women" | "couple" | "all"

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const renderGrid = () => {
    switch (activeCategory) {
      case "men":
        return <MenGrid />
      case "women":
        return <WomenGrid />
      case "couple":
        return <CoupleGrid />
      case "all":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Men Prompts</h2>
              <MenGrid />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Women Prompts</h2>
              <WomenGrid />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Couple Prompts</h2>
              <CoupleGrid />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getTitle = () => {
    switch (activeCategory) {
      case "men":
        return "Men Prompts"
      case "women":
        return "Women Prompts"
      case "couple":
        return "Couple Prompts"
      case "all":
        return "All Prompts"
      default:
        return "Browse Prompts"
    }
  }

  const getDescription = () => {
    switch (activeCategory) {
      case "men":
        return "A curated set of prompts for men"
      case "women":
        return "A curated set of prompts for women"
      case "couple":
        return "A curated set of prompts for couples"
      case "all":
        return "Browse all available prompts across categories"
      default:
        return "Select a category to browse prompts"
    }
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background: matches other pages */}
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

      {/* Foreground content */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header with navigation */}
          <header className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white">{getTitle()}</h1>
              <p className="text-sm text-white/60">{getDescription()}</p>
            </div>
            
            {/* Navigation Bar */}
            <nav className="flex flex-wrap gap-3 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
                className={activeCategory === "all" ? "bg-white text-black" : "bg-transparent border-white/20 text-white hover:bg-white/10"}
              >
                All
              </Button>
              <Button
                variant={activeCategory === "men" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("men")}
                className={activeCategory === "men" ? "bg-white text-black" : "bg-transparent border-white/20 text-white hover:bg-white/10"}
              >
                Men
              </Button>
              <Button
                variant={activeCategory === "women" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("women")}
                className={activeCategory === "women" ? "bg-white text-black" : "bg-transparent border-white/20 text-white hover:bg-white/10"}
              >
                Women
              </Button>
              <Button
                variant={activeCategory === "couple" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("couple")}
                className={activeCategory === "couple" ? "bg-white text-black" : "bg-transparent border-white/20 text-white hover:bg-white/10"}
              >
                Couple
              </Button>
            </nav>
          </header>

          {/* Content Grid */}
          <div className="pb-6">
            {renderGrid()}
          </div>
        </div>
      </div>
    </main>
  )
}
