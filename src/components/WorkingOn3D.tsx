import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Helpers ──────────────────────────────────────────────────

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

// ── Scene: all animation logic in one useFrame ───────────────

interface SceneProps {
  progressRef: React.RefObject<number>
  labelRef:    React.RefObject<HTMLSpanElement | null>
  descRef:     React.RefObject<HTMLParagraphElement | null>
  pipsRef:     React.RefObject<HTMLDivElement | null>
}

function Scene({ progressRef, labelRef, descRef, pipsRef }: SceneProps) {
  const pokerRef   = useRef<THREE.Group>(null!)
  const codeRef    = useRef<THREE.Group>(null!)
  const financeRef = useRef<THREE.Group>(null!)
  const lerpW      = useRef({ poker: 1, code: 0, finance: 0 })
  const lastState  = useRef(0)

  useFrame(({ clock }) => {
    const p = Math.max(0, Math.min(1, progressRef.current ?? 0))
    const t = clock.elapsedTime

    // Target weights — poker fades as user scrolls, finance fades in
    const tp = 1 - smoothstep(0.22, 0.42, p)
    const tc = smoothstep(0.28, 0.44, p) * (1 - smoothstep(0.58, 0.74, p))
    const tf = smoothstep(0.58, 0.76, p)

    // Smooth lerp toward targets (acts like spring easing)
    lerpW.current.poker   = lerp(lerpW.current.poker,   tp, 0.07)
    lerpW.current.code    = lerp(lerpW.current.code,    tc, 0.07)
    lerpW.current.finance = lerp(lerpW.current.finance, tf, 0.07)

    const { poker, code, finance } = lerpW.current

    // ── Poker: fan of 5 cards ─────────────────────────────
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

    // ── Code: stacked panels ──────────────────────────────
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

    // ── Finance: bar chart ────────────────────────────────
    if (financeRef.current) {
      financeRef.current.visible = finance > 0.01
      if (financeRef.current.visible) {
        financeRef.current.scale.setScalar(0.85 + finance * 0.15)
        financeRef.current.rotation.y = Math.sin(t * 0.28) * 0.1
        financeRef.current.children.forEach((c, i) => {
          const mesh = c as THREE.Mesh
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = finance
          // subtle pulse per bar
          mesh.scale.y = 1 + Math.sin(t * 0.5 + i * 0.9) * 0.04 * finance
        })
      }
    }

    // ── Label: direct DOM update, no re-render ────────────
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

  // Static geometry definitions
  const POKER_CARDS = Array.from({ length: 5 }, (_, i) => {
    const a = (i - 2) * 0.28
    return { x: Math.sin(a) * 1.8, y: Math.cos(a) * -0.18, z: i * 0.02, rz: a * 0.75 }
  })

  const CODE_LAYERS = [
    { w: 2.8, y:  0.9, wire: false },
    { w: 2.1, y:  0.45, wire: true  },
    { w: 2.8, y:  0.0, wire: false },
    { w: 1.4, y: -0.45, wire: true  },
    { w: 2.8, y: -0.9, wire: false },
  ]

  const BAR_HEIGHTS = [0.55, 1.05, 0.70, 1.65, 1.00, 1.35, 0.80]

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -4]} intensity={0.2} />

      {/* Poker */}
      <group ref={pokerRef}>
        {POKER_CARDS.map(({ x, y, z, rz }, i) => (
          <mesh key={i} position={[x, y, z]} rotation={[0.05, 0, rz]}>
            <planeGeometry args={[0.72, 1.06]} />
            <meshStandardMaterial
              color="#0d0d0d" metalness={0.45} roughness={0.35}
              transparent opacity={1} side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Code */}
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

      {/* Finance */}
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

// ── Public component ─────────────────────────────────────────

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

  // Reduced motion: simple text list
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

        {/* Text overlay */}
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

        {/* 3D */}
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 42 }}
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
