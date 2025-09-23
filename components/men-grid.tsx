"use client"

import { MEN_PROMPTS } from "@/data/men-prompts"
import { MenPromptCard } from "@/components/men-prompt-card"

export function MenGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {MEN_PROMPTS.map((item, idx) => (
        <MenPromptCard key={idx} image={item.image} prompt={item.prompt} />
      ))}
    </section>
  )
}
