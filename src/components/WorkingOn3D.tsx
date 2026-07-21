import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const smoothstep = (a: number, b: number, t: number) => {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

const STATES = [
  { label: 'Poker',   desc: 'Reading the table, not just the cards.' },
  { label: 'App Dev', desc: 'Building tools that think.' },
  { label: 'Trading', desc: 'Markets as systems, not as noise.' },
]

interface SceneProps {
  progressRef: React.RefObject<number>
  labelRef:    React.RefObject<HTMLSpanElement | null>
  descRef:     React.RefObject<HTMLParagraphElement | null>
  pipsRef:     React.RefObject<HTMLDivElement | null>
}

// Fan pivot: cards rotate around a shared base point (like held in a hand).
// Each card is a straight rectangle; only its angle differs — no bowtie distortion.
const HALF_H = 0.53  // half of card height 1.06
const POKER_CARDS = Array.from({ length: 5 }, (_, i) => {
  const a = (i - 2) * 0.22                        // angles: -0.44 … +0.44 rad
  return {
    x: Math.sin(a) * HALF_H,                      // card center x after pivot rotation
    y: HALF_H * (Math.cos(a) - 1) + 0.1,          // tiny y-drop at edges; +0.1 centers fan
    z: i * 0.055,                                  // slight z-offset prevents z-fighting
    rz: a,
  }
})

const CODE_LAYERS = [
  { w: 2.8, y:  0.9, wire: false },
  { w: 2.1, y:  0.45, wire: true  },
  { w: 2.8, y:  0.0, wire: false },
  { w: 1.4, y: -0.45, wire: true  },
  { w: 2.8, y: -0.9, wire: false },
]

const BAR_HEIGHTS = [0.55, 1.05, 0.70, 1.65, 1.00, 1.35, 0.80]

function Scene({ progressRef, labelRef, descRef, pipsRef }: SceneProps) {
  const pokerRef   = useRef<THREE.Group>(null!)
  const codeRef    = useRef<THREE.Group>(null!)
  const financeRef = useRef<THREE.Group>(null!)
  const shadowRef  = useRef<THREE.Mesh>(null!)
  const lerpW      = useRef({ poker: 1, code: 0, finance: 0 })
  const lastState  = useRef(0)

  useFrame(({ clock }) => {
    const p = Math.max(0, Math.min(1, progressRef.current ?? 0))
    const t = clock.elapsedTime

    const tp = 1 - smoothstep(0.22, 0.42, p)
    const tc = smoothstep(0.28, 0.44, p) * (1 - smoothstep(0.58, 0.74, p))
    const tf = smoothstep(0.58, 0.76, p)

    lerpW.current.poker   = lerp(lerpW.current.poker,   tp, 0.07)
    lerpW.current.code    = lerp(lerpW.current.code,    tc, 0.07)
    lerpW.current.finance = lerp(lerpW.current.finance, tf, 0.07)

    const { poker, code, finance } = lerpW.current

    // Poker — subtle sway; X tilt is held by the group's initial rotation
    if (pokerRef.current) {
      pokerRef.current.visible = poker > 0.01
      if (pokerRef.current.visible) {
        pokerRef.current.scale.setScalar(0.85 + poker * 0.15)
        pokerRef.current.rotation.y = Math.sin(t * 0.38) * 0.12
        pokerRef.current.children.forEach(c => {
          ;((c as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = poker
        })
      }
    }

    // Faux shadow fades with poker weight
    if (shadowRef.current) {
      ;(shadowRef.current.material as THREE.MeshBasicMaterial).opacity = poker * 0.11
    }

    if (codeRef.current) {
      codeRef.current.visible = code > 0.01
      if (codeRef.current.visible) {
        codeRef.current.scale.setScalar(0.85 + code * 0.15)
        codeRef.current.rotation.x = Math.sin(t * 0.22) * 0.035
        codeRef.current.rotation.y = Math.sin(t * 0.33) * 0.09
        codeRef.current.children.forEach(c => {
          ;((c as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = code
        })
      }
    }

    if (financeRef.current) {
      financeRef.current.visible = finance > 0.01
      if (financeRef.current.visible) {
        financeRef.current.scale.setScalar(0.85 + finance * 0.15)
        financeRef.current.rotation.y = Math.sin(t * 0.28) * 0.1
        financeRef.current.children.forEach((c, i) => {
          const mesh = c as THREE.Mesh
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = finance
          mesh.scale.y = 1 + Math.sin(t * 0.5 + i * 0.9) * 0.04 * finance
        })
      }
    }

    // Label: direct DOM update — no React re-render
    const maxW = Math.max(poker, code, finance)
    if (maxW > 0.25) {
      let idx = 0
      if (code >= poker && code >= finance) idx = 1
      else if (finance >= poker && finance >= code) idx = 2

      if (idx !== lastState.current) {
        lastState.current = idx
        const s = STATES[idx]
        if (labelRef.current) labelRef.current.textContent = s.label
        if (descRef.current)  descRef.current.textContent  = s.desc
        if (pipsRef.current) {
          pipsRef.current.querySelectorAll('[data-pip]').forEach((el, i) => {
            el.classList.toggle('active', i === idx)
          })
        }
      }
    }
  })

  return (
    <>
      {/* Lighting: warm key from top-right-front; cool fill from left; soft bounce from below */}
      <ambientLight intensity={0.28} />
      <directionalLight position={[3, 5, 5]}  intensity={2.2} />
      <directionalLight position={[-4, 1, 3]} intensity={0.45} />
      <directionalLight position={[0, -4, 2]} intensity={0.12} />

      {/* Faux drop shadow beneath the card fan */}
      <mesh ref={shadowRef} position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 1.2]} />
        <meshBasicMaterial color="#000" transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Poker: fan of extruded cards with visible edges */}
      {/* rotation.x=-0.28 tilts the fan toward viewer so overlap + depth read clearly */}
      <group ref={pokerRef} rotation={[-0.28, 0, 0]}>
        {POKER_CARDS.map(({ x, y, z, rz }, i) => (
          <mesh key={i} position={[x, y, z]} rotation={[0, 0, rz]}>
            <boxGeometry args={[0.72, 1.06, 0.028]} />
            <meshStandardMaterial
              color="#1c1c1c"
              metalness={0.55}
              roughness={0.20}
              transparent
              opacity={1}
            />
          </mesh>
        ))}
      </group>

      {/* Code: stacked panels */}
      <group ref={codeRef} visible={false}>
        {CODE_LAYERS.map((l, i) => (
          <mesh key={i} position={[0, l.y, 0]}>
            <boxGeometry args={[l.w, 0.09, 0.05]} />
            <meshStandardMaterial
              color="#0d0d0d" wireframe={l.wire}
              transparent opacity={0} metalness={0.15} roughness={0.65}
            />
          </mesh>
        ))}
      </group>

      {/* Finance: bar chart */}
      <group ref={financeRef} visible={false}>
        {BAR_HEIGHTS.map((h, i) => (
          <mesh key={i} position={[(i - 3) * 0.46, -1 + h / 2, 0]}>
            <boxGeometry args={[0.28, h, 0.12]} />
            <meshStandardMaterial
              color="#0d0d0d" transparent opacity={0} metalness={0.3} roughness={0.45}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

export default function WorkingOn3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef  = useRef(0)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const descRef      = useRef<HTMLParagraphElement>(null)
  const pipsRef      = useRef<HTMLDivElement>(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.6,
        onUpdate: self => { progressRef.current = self.progress },
      })
    })

    return () => ctx.revert()
  }, [prefersReduced])

  if (prefersReduced) {
    return (
      <section className="w3d-static">
        <div className="w3d-static__inner">
          <span className="section-label">What I'm working on</span>
          <div className="w3d-static__grid">
            {STATES.map(s => (
              <div key={s.label} className="w3d-static__item">
                <strong>{s.label}</strong>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="w3d">
      <div className="w3d__sticky">

        <div className="w3d__overlay">
          <span className="w3d__pretitle">What I'm working on</span>
          <span className="w3d__label" ref={labelRef}>Poker</span>
          <p className="w3d__desc" ref={descRef}>Reading the table, not just the cards.</p>
          <div className="w3d__pips" ref={pipsRef}>
            <span data-pip="0" className="w3d__pip active" />
            <span data-pip="1" className="w3d__pip" />
            <span data-pip="2" className="w3d__pip" />
          </div>
        </div>

        {/* Camera raised slightly above center so fan's depth and overlap read in perspective */}
        <Canvas
          camera={{ position: [0, 0.8, 4.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <Scene
            progressRef={progressRef}
            labelRef={labelRef}
            descRef={descRef}
            pipsRef={pipsRef}
          />
        </Canvas>

      </div>
    </section>
  )
}
