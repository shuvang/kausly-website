import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderBackground() {
  const containerRef = useRef(null)

  const isMobile =
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad/i.test(navigator.userAgent)

  useEffect(() => {
    if (isMobile) return
    if (!containerRef.current) return
    const container = containerRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0
          - resolution.xy)
          / min(resolution.x, resolution.y);

        float t = time * 0.05;
        float lineWidth = 0.002;

        float red = 0.0;
        float blue = 0.0;

        /* RED — runs at t */
        for(int i = 0; i < 5; i++){
          red += lineWidth * float(i*i)
            / abs(
              fract(
                t + float(i) * 0.01
              ) * 5.0
              - length(uv)
              + mod(uv.x + uv.y, 0.2)
            );
        }

        /* BLUE — same pattern
           offset by 0.12 so it
           trails just behind red */
        for(int i = 0; i < 5; i++){
          blue += lineWidth * float(i*i)
            / abs(
              fract(
                t - 0.12 + float(i) * 0.01
              ) * 5.0
              - length(uv)
              + mod(uv.x + uv.y, 0.2)
            );
        }

        /* Cap brightness —
           dark enough for text
           to stay readable */
        red  = min(red,  0.32);
        blue = min(blue, 0.32);

        /* Red and blue naturally
           mix to purple where
           they overlap */
        gl_FragColor = vec4(
          red,
          0.0,
          blue,
          1.0
        );
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 0.0 },
      resolution: {
        type: "v2",
        value: new THREE.Vector2(),
      },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.opacity = "0"
    renderer.domElement.style.transition = "opacity 2s ease 0.5s"
    container.appendChild(renderer.domElement)
    setTimeout(() => {
      renderer.domElement.style.opacity = "1"
    }, 100)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onResize()
    window.addEventListener("resize", onResize)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-20%",
          width: "70vw", height: "70vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,20,20,0.25) 0%, transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", right: "-20%",
          width: "70vw", height: "70vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,20,160,0.25) 0%, transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }} />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  )
}
