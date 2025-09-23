import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API: Starting image generation request with Google Gemini")

    const formData = await request.formData()
    const mode = formData.get("mode") as string
    const prompt = formData.get("prompt") as string
    const apiKey = formData.get("apiKey") as string

    console.log("[v0] API: Mode:", mode)
    console.log("[v0] API: Prompt:", prompt)
    console.log("[v0] API: API Key provided:", !!apiKey)

    if (!mode || !prompt) {
      console.log("[v0] API: Missing required fields")
      return NextResponse.json({ error: "Mode and prompt are required" }, { status: 400 })
    }

    if (!apiKey) {
      console.log("[v0] API: Missing API key")
      return NextResponse.json({ error: "Google AI Studio API key is required" }, { status: 400 })
    }

    try {
      console.log("[v0] API: Using Gemini 2.5 Flash Image Preview for", mode, "mode")
      
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" })

      let geminiPrompt: any[]

      if (mode === "text-to-image") {
        // Text-to-image generation
        console.log("[v0] API: Generating image from text prompt")
        geminiPrompt = [
          {
            text: `Generate a high-quality, detailed image based on this description: ${prompt}. Create a visually appealing and artistic representation.`
          }
        ]
      } else if (mode === "image-editing") {
        // Image-to-image editing
        console.log("[v0] API: Processing image-to-image editing")

        const image1 = formData.get("image1") as File
        const image2 = formData.get("image2") as File
        const image1Url = formData.get("image1Url") as string
        const image2Url = formData.get("image2Url") as string

        if (!image1 && !image1Url) {
          console.log("[v0] API: No images provided for editing mode")
          return NextResponse.json({ error: "At least one image is required for image editing mode" }, { status: 400 })
        }

        console.log("[v0] API: Processing images")

        const geminiPromptParts: any[] = []

        // Helper function to convert URL to base64
        const urlToBase64 = async (url: string) => {
          const response = await fetch(url)
          const buffer = await response.arrayBuffer()
          const base64 = Buffer.from(buffer).toString("base64")
          const contentType = response.headers.get("content-type") || "image/jpeg"
          return { base64, contentType }
        }

        // Process first image
        if (image1) {
          const image1Buffer = await image1.arrayBuffer()
          const image1Base64 = Buffer.from(image1Buffer).toString("base64")
          
          geminiPromptParts.push({
            inlineData: {
              mimeType: image1.type,
              data: image1Base64
            }
          })
        } else if (image1Url) {
          try {
            const { base64, contentType } = await urlToBase64(image1Url)
            geminiPromptParts.push({
              inlineData: {
                mimeType: contentType,
                data: base64
              }
            })
          } catch (error) {
            console.error("[v0] API: Error fetching image1 from URL:", error)
            return NextResponse.json({ error: "Failed to fetch first image from URL" }, { status: 400 })
          }
        }

        // Process second image if provided
        if (image2) {
          const image2Buffer = await image2.arrayBuffer()
          const image2Base64 = Buffer.from(image2Buffer).toString("base64")
          
          geminiPromptParts.push({
            inlineData: {
              mimeType: image2.type,
              data: image2Base64
            }
          })
        } else if (image2Url) {
          try {
            const { base64, contentType } = await urlToBase64(image2Url)
            geminiPromptParts.push({
              inlineData: {
                mimeType: contentType,
                data: base64
              }
            })
          } catch (error) {
            console.error("[v0] API: Error fetching image2 from URL:", error)
            // Don't fail if second image fails, just continue with one image
            console.log("[v0] API: Continuing with single image")
          }
        }

        console.log("[v0] API: Images processed, generating edited result")

        // Create appropriate prompt based on number of images
        const hasSecondImage = (image2 || image2Url)
        const instructionText = hasSecondImage 
          ? `Based on these two input images, create a new image that follows this instruction: ${prompt}. Combine, edit, or transform the images according to the given prompt while maintaining high visual quality.`
          : `Based on this input image, create a new image that follows this instruction: ${prompt}. Edit, transform, or enhance the image according to the given prompt while maintaining high visual quality.`

        geminiPromptParts.push({
          text: instructionText
        })

        geminiPrompt = geminiPromptParts
      } else {
        console.log("[v0] API: Invalid mode:", mode)
        return NextResponse.json({ error: "Invalid mode. Must be 'text-to-image' or 'image-editing'" }, { status: 400 })
      }

      // Generate content with Gemini
      console.log("[v0] API: Sending request to Gemini model")
      const result = await model.generateContent(geminiPrompt)
      const response = await result.response
      console.log("[v0] API: Received response from Gemini")

      // Check if the response contains image data
      const candidates = response.candidates
      if (!candidates || candidates.length === 0) {
        throw new Error("No candidates returned from Gemini")
      }

      const candidate = candidates[0]
      if (!candidate.content || !candidate.content.parts) {
        throw new Error("No content parts in Gemini response")
      }

      // Look for image data in the response
      let imageUrl = null
      let description = ""

      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
          // Convert base64 to data URL
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
          console.log("[v0] API: Found inline image data")
          break
        } else if (part.text) {
          description += part.text
        }
      }

      if (!imageUrl) {
        // If no image was generated, provide informative error
        return NextResponse.json({
          error: "Gemini 2.5 Flash Image Preview did not return image data. The model may be experiencing issues or your request couldn't be processed.",
          description: description || "No description available",
          prompt: prompt,
          suggestion: "Please try again with a different prompt or check if your Google AI Studio account has image generation capabilities enabled."
        }, { status: 422 })
      }

      console.log("[v0] API: Successfully generated image with Gemini")

      return NextResponse.json({
        url: imageUrl,
        prompt: prompt,
        description: description || `Image generated with Google Gemini 2.5 Flash Image Preview (${mode} mode)`,
        provider: "google-ai"
      })

    } catch (error) {
      console.error("[v0] API: Google AI error:", error)
      
      // Provide more detailed error information
      let errorMessage = "Google AI Studio connection failed."
      let suggestion = "Please check your API key and try again."

      if (error instanceof Error) {
        if (error.message.includes('API key') || error.message.includes('Invalid API key')) {
          errorMessage = "Invalid Google AI Studio API key."
          suggestion = "Please verify your API key is correct and has the necessary permissions."
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
          errorMessage = "Google AI Studio quota exceeded."
          suggestion = "You may have reached your free tier limits. Try again later or upgrade your account."
        } else if (error.message.includes('model') || error.message.includes('not found')) {
          errorMessage = "The Gemini model may not be available or doesn't support image generation."
          suggestion = "Make sure you have access to the Gemini 2.5 Flash Image Preview model in your Google AI Studio account."
        } else if (error.message.includes('permission') || error.message.includes('forbidden')) {
          errorMessage = "Permission denied for Google AI Studio API."
          suggestion = "Check your API key permissions and ensure image generation is enabled for your account."
        }
      }

      return NextResponse.json({
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error occurred",
        suggestion: suggestion
      }, { status: 500 })
    }

  } catch (error) {
    console.error("[v0] API: Error generating image:", error)
    console.error("[v0] API: Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
