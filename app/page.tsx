"use client"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-8 mb-4">
            <h1 className="text-5xl font-light tracking-[0.3em] text-gray-800">THRESHOLD</h1>
            <div className="flex flex-col items-start">
              <span className="text-sm italic text-gray-600">alexis musaelyan</span>
              <div className="w-32 h-px bg-gray-400 mt-1"></div>
            </div>
          </div>
          <p className="text-gray-600 italic">a living emotional habitat</p>
        </header>

        {/* Grid of rooms */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Top Row */}
          <Link href="/hallway">
            <Card className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] aspect-square bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                <div className="mb-8">
                  <div className="flex gap-2 mb-4">
                    <div className="w-12 h-16 bg-white/20 rounded-t-full"></div>
                    <div className="w-12 h-16 bg-white/30 rounded-t-full"></div>
                    <div className="w-12 h-16 bg-white/20 rounded-t-full"></div>
                  </div>
                  <div className="w-32 h-2 bg-white/30 rounded mb-2"></div>
                </div>
                <div className="text-white/90 text-lg font-light mb-2">welcome.</div>
                <div className="text-white/80 text-sm mb-6">you're not late.</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80">
                <div className="text-sm font-medium">threshold hallway</div>
                <div className="text-xs opacity-80">arrival space</div>
              </div>
            </Card>
          </Link>

          <Link href="/soundscape">
            <Card className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] aspect-square bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-black/40 rounded-full flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-white/70">
                    <span>pause</span>
                    <span>stop</span>
                  </div>
                </div>
                <div className="text-white/90 text-lg font-light mb-2">soundscape</div>
                <div className="text-white/70 text-xs">thank you for listening</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80">
                <div className="text-sm font-medium">the soundscape</div>
                <div className="text-xs opacity-80">sonic refuge</div>
              </div>
            </Card>
          </Link>

          {/* Middle Row */}
          <Link href="/mailroom">
            <Card className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] aspect-square bg-gradient-to-br from-amber-800 via-yellow-900 to-amber-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                <div className="mb-8">
                  <div className="grid grid-cols-3 gap-1 mb-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-6 h-4 bg-yellow-200/30 rounded-sm"></div>
                    ))}
                  </div>
                  <div className="w-2 h-8 bg-orange-300/40 rounded-full mx-auto"></div>
                </div>
                <div className="text-white/90 text-sm font-light mb-2">write a letter</div>
                <div className="text-white/70 text-xs">you'll never send</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80">
                <div className="text-sm font-medium">mail room</div>
                <div className="text-xs opacity-80">unsent letters</div>
              </div>
            </Card>
          </Link>

          <Link href="/library">
            <Card className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] aspect-square bg-gradient-to-br from-yellow-700 via-amber-600 to-orange-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                <div className="mb-6">
                  <div className="w-28 h-20 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-xs text-white/80 text-center leading-tight px-2">
                      <div className="text-[10px] mb-1">added at 3:08 a.m. / the sky was lavender</div>
                      <div className="italic text-[11px]">I miss who I was before I stopped trusting people.</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="w-1 h-1 bg-orange-300/60 rounded-full"></div>
                    <div className="w-1 h-1 bg-orange-300/60 rounded-full"></div>
                    <div className="w-1 h-1 bg-orange-300/60 rounded-full"></div>
                  </div>
                </div>
                <div className="text-white/70 text-xs">★ underlined by 54 readers</div>
                <div className="text-white/70 text-xs">📝 3 margin notes</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80">
                <div className="text-sm font-medium">library</div>
                <div className="text-xs opacity-80">communal journal</div>
              </div>
            </Card>
          </Link>

          {/* Bottom Row */}
          <Link href="/confessional">
            <Card className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] aspect-square bg-gradient-to-br from-amber-900 via-yellow-900 to-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                <div className="mb-8">
                  <div className="w-16 h-12 bg-black/40 rounded-lg mb-2 flex items-center justify-center">
                    <div className="w-8 h-6 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="w-12 h-3 bg-black/30 rounded-full mx-auto"></div>
                </div>
                <div className="text-white/90 text-sm font-light mb-2">leave a message</div>
                <div className="text-white/70 text-xs">you don't need answered</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80">
                <div className="text-sm font-medium">the confessional</div>
                <div className="text-xs opacity-80">voiced release</div>
              </div>
            </Card>
          </Link>

          <Link href="/garden">
            <Card className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] aspect-square bg-gradient-to-br from-green-800 via-amber-800 to-amber-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                <div className="mb-8">
                  <div className="relative">
                    <div className="w-16 h-8 bg-amber-700/40 rounded-full mb-2"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-3 h-6 bg-green-400/60 rounded-full"></div>
                      <div className="w-6 h-3 bg-green-300/40 rounded-full mx-auto -mt-1"></div>
                    </div>
                  </div>
                </div>
                <div className="text-white/90 text-sm font-light mb-1">you don't have to rush.</div>
                <div className="text-white/80 text-xs">you're still growing too.</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/80">
                <div className="text-sm font-medium">the garden</div>
                <div className="text-xs opacity-80">emotional release</div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
