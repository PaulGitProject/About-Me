"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

// 3D Icon component that renders inside the Canvas
function Icon3D({ icon, color, isHovered, isDragging }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  // Animation for continuous rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.y += delta * 0.5

      // Additional rotation when hovered
      if (isHovered && !isDragging) {
        meshRef.current.rotation.x += delta * 0.3
      }

      // Scale effect when hovered
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, isHovered ? 1.2 : 1, 0.1)
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, isHovered ? 1.2 : 1, 0.1)
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, isHovered ? 1.2 : 1, 0.1)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
        {/* Icon text on the front face */}
        <mesh position={[0, 0, 0.76]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshBasicMaterial transparent opacity={0}>
            <canvasTexture attach="map" args={[createTextCanvas(icon, color)]} />
          </meshBasicMaterial>
        </mesh>
      </mesh>
      {isDragging && <OrbitControls enableZoom={false} />}
    </>
  )
}

// Helper function to create a canvas with text
function createTextCanvas(text, color) {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext("2d")

  // Background (transparent)
  context.fillStyle = "rgba(0, 0, 0, 0)"
  context.fillRect(0, 0, canvas.width, canvas.height)

  // Text
  context.font = "bold 80px Arial"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillStyle = "#ffffff"
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  return canvas
}

// Wrapper component that includes the Canvas
export default function Skill3DIcon({ icon, color, isHovered, isDragging }) {
  const controls = useAnimation()

  useEffect(() => {
    if (isHovered) {
      controls.start({
        boxShadow: `0 0 20px ${color}`,
        transition: { duration: 0.3 },
      })
    } else {
      controls.start({
        boxShadow: `0 0 5px ${color}`,
        transition: { duration: 0.3 },
      })
    }
  }, [isHovered, color, controls])

  return (
    <motion.div
      className="w-full h-full rounded-lg overflow-hidden"
      animate={controls}
      initial={{ boxShadow: `0 0 5px ${color}` }}
    >
      <Canvas>
        <Icon3D icon={icon} color={color} isHovered={isHovered} isDragging={isDragging} />
      </Canvas>
    </motion.div>
  )
}
