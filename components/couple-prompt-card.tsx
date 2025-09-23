"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Clipboard, Sparkles } from "lucide-react"

export function CouplePromptCard({ image, prompt }: { image?: string; prompt: string }) {
  const router = useRouter()
  const { toast } = useToast()

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast({ title: "Copied", description: "Prompt copied to clipboard." })
    } catch {
      toast({ title: "Copy failed", description: "Could not copy the prompt.", variant: "destructive" })
    }
  }

  const generateWithPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      // ignore copy failure, still navigate
    }
    // Navigate to generate page with image-to-image mode for editing with reference image
    router.push(`/generate?mode=image-editing&p=${encodeURIComponent(prompt)}`)
  }

  return (
    <article className="bg-white/95 rounded-2xl shadow-sm border border-black/10 overflow-hidden flex flex-col">
      <div className="p-3">
        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
          <img
            src={image || "/placeholder.svg?height=600&width=480&query=couple%20portrait%20cinematic"}
            alt="Prompt reference"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="px-5 pb-5 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="rounded-full">
            Couple
          </Badge>
          <button
            onClick={copyPrompt}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition"
            aria-label="Copy prompt"
            title="Copy prompt"
          >
            <Clipboard className="h-4 w-4" />
          </button>
        </div>

        <p
          className="text-sm text-black/80"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 8,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {prompt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-black/50">AI Generated</div>
          <button
            onClick={copyPrompt}
            type="button"
            className="text-sm font-medium text-black/80 hover:text-black underline underline-offset-4"
          >
            Copy Prompt
          </button>
        </div>

        <Button
          onClick={generateWithPrompt}
          className="mt-4 w-full h-10 font-semibold bg-black text-white hover:bg-black/90"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate
        </Button>
      </div>
    </article>
  )
}