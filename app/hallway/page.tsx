import { BackButton } from "@/components/BackButton"

export default function HallwayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500 flex items-center justify-center p-8">
      <BackButton />
      <div className="text-center text-white max-w-2xl">
        <div className="mb-12">
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-20 h-32 bg-white/20 rounded-t-full flex items-end justify-center pb-4">
              <div className="text-xs text-white/80">the</div>
            </div>
            <div className="w-20 h-32 bg-white/30 rounded-t-full flex items-end justify-center pb-4">
              <div className="text-xs text-white/80">pavilion</div>
            </div>
            <div className="w-20 h-32 bg-white/20 rounded-t-full flex items-end justify-center pb-4">
              <div className="text-xs text-white/80">of</div>
            </div>
          </div>
          <div className="w-64 h-4 bg-white/30 rounded mx-auto mb-8"></div>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-light">welcome.</h2>
          <p className="text-3xl font-light">you're not late.</p>
          <div className="mt-12">
            <div className="w-48 h-8 bg-white/20 rounded mx-auto flex items-center justify-center">
              <span className="text-sm">step inside when you're ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
