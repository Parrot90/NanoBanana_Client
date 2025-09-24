"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShinyButton } from "@/components/shiny-button"
import { Dithering } from "@paper-design/shaders-react"
import Link from "next/link"
import { ApiKeySettings } from "@/components/api-key-settings"
import { apiStorage } from "@/lib/api-storage"
import "./welcome.css"

export default function StarterPage() {
  const router = useRouter()
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showApiSettings, setShowApiSettings] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasStoredApiKey = apiStorage.isSet()
      setHasApiKey(hasStoredApiKey)
    }
  }, [])

  return (
    <main className="relative min-h-dvh bg-background overflow-hidden">
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
      <section className="relative z-10 flex items-center justify-center min-h-dvh p-6">
        <div className="w-full max-w-6xl mx-auto text-center bg-black/70 backdrop-blur-sm rounded-xl border border-border/50 p-8">
          {/* Icon-like badge */}
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-2xl flex items-center justify-center purple-badge">
              <Sparkles className="size-7 text-white" aria-hidden="true" />
              <span className="sr-only">Nano Banana Starter</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6 px-4">
            <h1 className="welcome-title text-white font-bold text-center leading-tight">
              Nano Banana Prompt Library & Generator
            </h1>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Select a category to get started {!hasApiKey && (
              <button
                onClick={() => setShowApiSettings(!showApiSettings)}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                (Configure API first)
              </button>
            )}
          </p>

          {showApiSettings && (
            <div className="mt-6 mb-6">
              <ApiKeySettings 
                onApiKeyChange={(hasKey) => {
                  setHasApiKey(hasKey)
                  // Don't auto-close the modal - let user close it manually
                }}
                onClose={() => setShowApiSettings(false)}
              />
            </div>
          )}

          <div className="mt-6 grid gap-3">
            {/* Category placeholders for future wiring */}
            <Button variant="outline" size="lg" asChild className="justify-center bg-transparent">
              <Link href="/men" aria-label="Go to Men prompts">
                Men
              </Link>
            </Button>
            {/* Keep others disabled for now */}
            <Button variant="outline" size="lg" asChild className="justify-center bg-transparent">
              <Link href="/women" aria-label="Go to Women prompts">
                Women
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="justify-center bg-transparent">
              <Link href="/couple" aria-label="Go to Couple prompts">
                Couple
              </Link>
            </Button>
          </div>

          {/* Primary CTA: animated Reactbits-style button */}
          <div className="mt-6">
            <ShinyButton
              size="lg"
              onClick={() => router.push("/generate")}
              aria-label="Generate with Nano Banana Starter"
            >
              Generate
            </ShinyButton>
          </div>

          <div className="mt-6 space-y-2">
            <button
              type="button"
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/browse")}
            >
              Or browse all prompts
            </button>
            {hasApiKey && (
              <div>
                <button
                  type="button"
                  className="text-xs text-muted-foreground/70 hover:text-muted-foreground underline underline-offset-2"
                  onClick={() => setShowApiSettings(!showApiSettings)}
                >
                  API Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
