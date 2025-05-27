"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Sparkles, Globe, Users, Star } from "lucide-react"

export default function HomePage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    if (!name.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate names');
      }

      const params = new URLSearchParams({
        name: name.trim(),
        description: description.trim(),
      });
      router.push(`/result?${params.toString()}`);
    } catch (error) {
      console.error('Error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  }

  const traits = [
    "Adventurer 冒险家",
    "Creator 创造者",
    "Thinker 思考者",
    "Guardian 守护者",
    "Optimist 乐观者",
    "Leader 领导者",
  ]

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
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6 text-slate-300">
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Features
                </a>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  FAQ
                </a>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Pricing
                </a>
              </nav>
              <div className="flex items-center space-x-2 text-slate-300">
                <Globe className="w-4 h-4" />
                <span className="text-sm">English</span>
              </div>
              <Button
                variant="outline"
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Chinese Name AI</h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">Create meaningful Chinese names tailored for international friends</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30">
              ✨ AI Generated
            </span>
            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
              🎯 Personalized
            </span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
              📚 Cultural
            </span>
            <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
              🔊 Similar Sound
            </span>
          </div>
        </div>

        {/* Name Generator Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800 border-slate-600 p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-white text-lg font-medium mb-3">
                  Your Name <span className="text-orange-400">*</span>
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex, Sarah, Michael..."
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 text-lg py-3"
                />
              </div>

              <div>
                <label className="block text-white text-lg font-medium mb-3">
                  Describe Yourself <span className="text-slate-400">(optional)</span>
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. I'm an adventurous programmer who loves music"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
                />
                <p className="text-slate-400 text-sm mt-2">
                  💡 Tip: Describe your personality, hobbies, or profession to help AI generate a more suitable Chinese name
                </p>
              </div>

              <div>
                <label className="block text-white text-lg font-medium mb-3">Or Choose a Core Trait</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {traits.map((trait) => (
                    <button
                      key={trait}
                      onClick={() => setDescription(trait.split(" ")[1])}
                      className="p-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-slate-300 hover:text-white transition-all text-sm"
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!name.trim() || isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AI is generating your Chinese name...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate My Chinese Name</span>
                  </div>
                )}
              </Button>
            </div>
          </Card>

          {/* Example */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 mb-2">Example:</p>
            <p className="text-slate-300 italic">"Alex - I'm a designer who loves cats" → 艾乐轩 (Ài Lè Xuān)</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Personalized Matching</h3>
            <p className="text-slate-400">Generate Chinese names based on your personality and traits</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Cultural Meaning</h3>
            <p className="text-slate-400">Each name carries deep Chinese cultural significance</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Similar Sound</h3>
            <p className="text-slate-400">Maintains phonetic connection with your original name</p>
          </div>
        </div>
      </main>
    </div>
  )
}
