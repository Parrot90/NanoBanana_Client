"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Key, ExternalLink, CheckCircle, XCircle, Star, X } from "lucide-react"
import { apiStorage } from "@/lib/api-storage"

interface ApiKeySettingsProps {
  onApiKeyChange?: (hasApiKey: boolean) => void
  onClose?: () => void
}

export function ApiKeySettings({ onApiKeyChange, onClose }: ApiKeySettingsProps) {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const config = apiStorage.getConfig()
    if (config) {
      setApiKey(config.apiKey)
      setIsValid(true)
      setIsSaved(true)
      // Only trigger callback on initial load if we have a valid saved config
      onApiKeyChange?.(true)
    } else {
      // No saved config, ensure callback reflects this
      onApiKeyChange?.(false)
    }
  }, [onApiKeyChange])

  const validateApiKey = async (key: string): Promise<boolean> => {
    if (!key || key.length < 5) return false
    
    try {
      // Google AI Studio keys typically start with "AIza" and are around 39 characters
      return key.startsWith("AIza") && key.length > 30
    } catch {
      return false
    }
  }

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value)
    setIsSaved(false)
    
    if (value) {
      setIsValidating(true)
      const valid = await validateApiKey(value)
      setIsValid(valid)
      setIsValidating(false)
      // Don't call onApiKeyChange here - only call it when user saves
    } else {
      setIsValid(null)
      onApiKeyChange?.(false)
    }
  }

  const handleSave = () => {
    if (isValid && apiKey) {
      apiStorage.setConfig({ provider: 'google-ai', apiKey })
      setIsSaved(true)
      onApiKeyChange?.(true)
    }
  }

  const handleClear = () => {
    setApiKey("")
    setIsValid(null)
    setIsSaved(false)
    apiStorage.remove()
    onApiKeyChange?.(false)
  }

  return (
    <Card className="w-full max-w-2xl bg-black/20 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Key className="w-5 h-5" />
            Google AI Studio API Configuration
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0 hover:bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <CardDescription className="text-white/60">
          Configure your Google AI Studio API key for free image generation with Gemini 2.5 Flash Image Preview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider Badge */}
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
          <Star className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-sm font-medium text-green-400">Google AI Studio (Free)</p>
            <p className="text-xs text-white/70">
              Free image generation with Gemini 2.5 Flash Image Preview
            </p>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-2">
          <Label htmlFor="google-api-key" className="text-white text-sm font-medium">
            Google AI Studio API Key
          </Label>
          <div className="relative">
            <Input
              id="google-api-key"
              type={showApiKey ? "text" : "password"}
              placeholder="Enter your Google AI Studio API key (starts with AIza...)..."
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="pr-20 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
            <div className="absolute right-1 top-1 flex items-center gap-1">
              {isValidating ? (
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
              ) : isValid !== null ? (
                <div className="w-8 h-8 flex items-center justify-center">
                  {isValid ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              ) : null}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="w-8 h-8 p-0 hover:bg-white/5"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4 text-white/60" />
                ) : (
                  <Eye className="w-4 h-4 text-white/60" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-white/60">
            Supports both text-to-image and image-to-image generation modes
          </p>
        </div>

        {/* Get API Key Link */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-white/60 mb-2">
            Don't have a Google AI Studio API key?
          </p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full bg-transparent border-white/20 text-white hover:bg-white/5"
          >
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Get Google AI Studio API Key (Free)
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={handleSave}
            disabled={!isValid || !apiKey || isSaved}
            className="flex-1 bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40"
          >
            {isSaved ? "Saved" : "Save API Key"}
          </Button>
          {apiKey && (
            <Button
              variant="outline"
              onClick={handleClear}
              className="bg-transparent border-white/20 text-white hover:bg-white/5"
            >
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
