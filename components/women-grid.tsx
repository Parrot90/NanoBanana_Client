"use client"

import { WOMEN_PROMPTS } from "@/data/women-prompts"
import { WomenPromptCard } from "@/components/women-prompt-card"

export function WomenGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {WOMEN_PROMPTS.map((item, idx) => (
        <WomenPromptCard key={idx} image={item.image} prompt={item.prompt} />
      ))}
    </section>
  )
}
