"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, ArrowLeft, Sparkles, Volume2 } from "lucide-react"

interface ChineseName {
  chinese: string
  pinyin: string
  meaning: string
  reason: string
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [names, setNames] = useState<ChineseName[]>([])
  const [feedback, setFeedback] = useState<{ [key: string]: "like" | "dislike" | null }>({})
  const [isLoading, setIsLoading] = useState(true)

  const userName = searchParams.get("name") || ""
  const userDescription = searchParams.get("description") || ""

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userName,
            description: userDescription,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate names');
        }

        const names = await response.json();
        setNames(names);
      } catch (error) {
        console.error('Error:', error);
        // You might want to show an error message to the user here
      } finally {
        setIsLoading(false);
      }
    };

    if (userName) {
      fetchNames();
    }
  }, [userName, userDescription]);

  const handleFeedback = (nameIndex: number, type: "like" | "dislike") => {
    setFeedback((prev) => ({
      ...prev,
      [nameIndex]: prev[nameIndex] === type ? null : type,
    }))
  }

  const playPronunciation = (pinyin: string) => {
    // Mock pronunciation function
    console.log(`Playing pronunciation for: ${pinyin}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Generating Chinese names for {userName}...</p>
          <p className="text-slate-400 mt-2">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Chinese Name AI</span>
            </div>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Generate Again
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Chinese Names for {userName}</h1>
          {userDescription && <p className="text-slate-300 mb-2">Based on description: "{userDescription}"</p>}
          <p className="text-slate-400">Choose your favorite name or give us feedback</p>
        </div>

        {/* Name Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {names.map((name, index) => (
            <Card
              key={index}
              className="bg-slate-800 border-slate-600 p-6 hover:bg-slate-700 transition-all"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{name.chinese}</h2>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <p className="text-orange-400 text-lg">{name.pinyin}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => playPronunciation(name.pinyin)}
                    className="text-slate-400 hover:text-orange-400 p-1"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-slate-300 font-medium">{name.meaning}</p>
              </div>

              <div className="mb-6">
                <p className="text-slate-400 text-sm leading-relaxed">{name.reason}</p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  size="sm"
                  variant={feedback[index] === "like" ? "default" : "outline"}
                  onClick={() => handleFeedback(index, "like")}
                  className={`${
                    feedback[index] === "like"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Like
                </Button>
                <Button
                  size="sm"
                  variant={feedback[index] === "dislike" ? "default" : "outline"}
                  onClick={() => handleFeedback(index, "dislike")}
                  className={`${
                    feedback[index] === "dislike"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Dislike
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Generate More Names</span>
            </div>
          </Button>

          <div className="text-slate-400 text-sm">
            <p>💡 Tip: Your feedback helps us improve our AI generation</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-slate-800 rounded-lg p-6 border border-slate-600">
          <h3 className="text-white text-lg font-medium mb-4">About Your Chinese Name</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div>
              <h4 className="font-medium text-white mb-2">Naming Principles</h4>
              <ul className="space-y-1">
                <li>• Similar pronunciation to original name</li>
                <li>• Reflects personal characteristics</li>
                <li>• Contains positive meanings</li>
                <li>• Aligns with Chinese culture</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Usage Suggestions</h4>
              <ul className="space-y-1">
                <li>• Suitable for formal occasions</li>
                <li>• Ideal for business communication</li>
                <li>• Easy to remember for Chinese friends</li>
                <li>• Shows cultural respect</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
