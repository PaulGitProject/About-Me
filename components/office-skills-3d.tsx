"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text, PresentationControls } from "@react-three/drei"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

function Model({ path, position, rotation, scale, hoverColor, ...props }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={ref}
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        {...props}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? hoverColor : "white"} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Word({ position }) {
  return (
    <Model position={[position, 0, 0]} rotation={[0, 0, 0]} scale={0.6} hoverColor="#185ABD">
      <Text position={[0, 0, 0.51]} fontSize={0.3} color="#185ABD" anchorX="center" anchorY="middle">
        W
      </Text>
    </Model>
  )
}

function Excel({ position }) {
  return (
    <Model position={[position, 0, 0]} rotation={[0, 0, 0]} scale={0.6} hoverColor="#107C41">
      <Text position={[0, 0, 0.51]} fontSize={0.3} color="#107C41" anchorX="center" anchorY="middle">
        X
      </Text>
    </Model>
  )
}

function PowerPoint({ position }) {
  return (
    <Model position={[position, 0, 0]} rotation={[0, 0, 0]} scale={0.6} hoverColor="#D24726">
      <Text position={[0, 0, 0.51]} fontSize={0.3} color="#D24726" anchorX="center" anchorY="middle">
        P
      </Text>
    </Model>
  )
}

function Canva({ position }) {
  return (
    <Model position={[position, 0, 0]} rotation={[0, 0, 0]} scale={0.6} hoverColor="#00C4CC">
      <Text position={[0, 0, 0.51]} fontSize={0.3} color="#00C4CC" anchorX="center" anchorY="middle">
        C
      </Text>
    </Model>
  )
}

export default function OfficeSkills3D() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4">{t.officeSkills}</h3>
      <p className="text-muted-foreground mb-6">{t.officeSkillsDesc}</p>

      <div className="h-[300px] w-full rounded-xl overflow-hidden border border-border bg-card/50">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Word position={-2.4} />
            <Excel position={-0.8} />
            <PowerPoint position={0.8} />
            <Canva position={2.4} />
          </PresentationControls>
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-medium text-[#185ABD]">Microsoft Word</div>
          <div className="text-sm text-muted-foreground text-center mt-2">{t.wordSkill}</div>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-medium text-[#107C41]">Microsoft Excel</div>
          <div className="text-sm text-muted-foreground text-center mt-2">{t.excelSkill}</div>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-medium text-[#D24726]">Microsoft PowerPoint</div>
          <div className="text-sm text-muted-foreground text-center mt-2">{t.powerpointSkill}</div>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-medium text-[#00C4CC]">Canva</div>
          <div className="text-sm text-muted-foreground text-center mt-2">{t.canvaSkill}</div>
        </div>
      </div>
    </div>
  )
}
