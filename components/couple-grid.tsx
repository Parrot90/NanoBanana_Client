"use client"

import { COUPLE_PROMPTS } from "@/data/couple-prompts"
import { CouplePromptCard } from "@/components/couple-prompt-card"

export function CoupleGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {COUPLE_PROMPTS.map((item, idx) => (
        <CouplePromptCard key={idx} image={item.image} prompt={item.prompt} />
      ))}
    </section>
  )
}