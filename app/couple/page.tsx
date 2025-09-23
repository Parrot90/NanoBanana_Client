"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CoupleGrid } from "@/components/couple-grid"
import { Dithering } from "@paper-design/shaders-react"
import { Button } from "@/components/ui/button"

export default function CouplePage() {
  return (
    <main className="h-screen bg-background overflow-hidden relative">
      {/* Animated background: matches ImageCombiner */}
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
      <div className="relative z-10 h-full p-6 flex items-start justify-center overflow-auto">
        <div className="w-full max-w-6xl">
          <div className="mb-4">
            <Button variant="outline" size="sm" asChild className="bg-transparent border-white/20 text-white hover:bg-white/10">
              <Link href="/browse" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Browse
              </Link>
            </Button>
          </div>
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-white">Couple Prompts</h1>
            <p className="text-sm text-white/60">A curated set of prompts for couples</p>
          </header>
          <CoupleGrid />
        </div>
      </div>
    </main>
  )
}
