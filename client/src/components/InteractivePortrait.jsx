import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function InteractivePortrait() {
  const containerRef = useRef(null)
  
  // Mouse tracking
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5))

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight

    // 1. SETUP THREE.JS
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance",
      preserveDrawingBuffer: true 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. DOUBLE BUFFERING (The Logic for Persistence)
    const bufferParams = { 
      minFilter: THREE.LinearFilter, 
      magFilter: THREE.LinearFilter, 
      type: THREE.FloatType, 
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false
    }
    let readBuffer = new THREE.WebGLRenderTarget(width, height, bufferParams)
    let writeBuffer = new THREE.WebGLRenderTarget(width, height, bufferParams)

    // 3. ASSETS
    const loader = new THREE.TextureLoader()
    const faceTex = loader.load("/images/hero-off.png")
    const helmetTex = loader.load("/images/hero-on.png")
    
    // Disable auto-update to manually control aspect ratio if needed
    faceTex.matrixAutoUpdate = false
    helmetTex.matrixAutoUpdate = false

    // 4. BRUSH SHADER (Paints the Mask)
    const brushMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: null }, // Previous frame
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uAspect: { value: width / height },
        uBrushSize: { value: 0.15 }, // Size of the liquid trail
        uIntensity: { value: 0.1 }   // How fast opacity builds up
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform vec2 uMouse;
        uniform float uAspect;
        uniform float uBrushSize;
        uniform float uIntensity;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          // Correct UVs so the brush is circular regardless of screen size
          vec2 aspectUV = (uv - 0.5) * vec2(uAspect, 1.0) + 0.5;
          vec2 aspectMouse = (uMouse - 0.5) * vec2(uAspect, 1.0) + 0.5;

          float dist = distance(aspectUV, aspectMouse);
          float brush = smoothstep(uBrushSize, 0.0, dist);
          
          // Paint Logic: Take old color, add new brush stroke
          vec4 oldColor = texture2D(uMap, vUv);
          float newAlpha = min(oldColor.r + brush * uIntensity, 1.0);
          
          gl_FragColor = vec4(vec3(newAlpha), 1.0);
        }
      `
    })

    // 5. DISPLAY SHADER (Renders the Image + Mask)
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFace: { value: faceTex },
        uHelmet: { value: helmetTex },
        uMask: { value: null },
        uRatio: { value: new THREE.Vector2(1, 1) } // Aspect Correction
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform sampler2D uFace;
        uniform sampler2D uHelmet;
        uniform sampler2D uMask;
        uniform vec2 uRatio;
        varying vec2 vUv;

        void main() {
          // --- OBJECT-FIT: COVER LOGIC ---
          // This scales the texture coordinates to crop the image instead of stretching it
          vec2 uv = (vUv - 0.5) * uRatio + 0.5;
          
          vec4 face = texture2D(uFace, uv);
          vec4 helmet = texture2D(uHelmet, uv);
          float mask = texture2D(uMask, vUv).r; // Use screen UVs for mask

          // Mix logic
          gl_FragColor = mix(face, helmet, mask);
        }
      `
    })

    // 6. SCENE COMPOSITION
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), brushMaterial)
    const brushScene = new THREE.Scene()
    brushScene.add(quad)

    const displayQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial)
    const finalScene = new THREE.Scene()
    finalScene.add(displayQuad)

    // --- HANDLERS ---
    const handleMove = (e) => {
      const rect = container.getBoundingClientRect()
      targetMouse.current.x = (e.clientX - rect.left) / rect.width
      targetMouse.current.y = 1.0 - ((e.clientY - rect.top) / rect.height)
    }
    window.addEventListener("mousemove", handleMove)

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      renderer.setSize(width, height)
      readBuffer.setSize(width, height)
      writeBuffer.setSize(width, height)
      
      brushMaterial.uniforms.uAspect.value = width / height

      // *** THE NO-STRETCH MATH ***
      const imageAspect = 1000 / 1250 // <--- SET THIS TO YOUR IMAGE RATIO
      const screenAspect = width / height

      if (screenAspect > imageAspect) {
        // Screen is wider than image: Scale Y to fit width
        displayMaterial.uniforms.uRatio.value.set(1, screenAspect / imageAspect)
      } else {
        // Screen is taller than image: Scale X to fit height
        displayMaterial.uniforms.uRatio.value.set(imageAspect / screenAspect, 1)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    // --- RENDER LOOP ---
    const animate = () => {
      // Smooth mouse
      mouse.current.lerp(targetMouse.current, 0.1)
      brushMaterial.uniforms.uMouse.value = mouse.current

      // 1. Paint into Write Buffer
      renderer.setRenderTarget(writeBuffer)
      brushMaterial.uniforms.uMap.value = readBuffer.texture
      renderer.render(brushScene, camera)

      // 2. Render to Screen
      renderer.setRenderTarget(null)
      displayMaterial.uniforms.uMask.value = writeBuffer.texture
      renderer.render(finalScene, camera)

      // 3. Swap Buffers
      let temp = readBuffer
      readBuffer = writeBuffer
      writeBuffer = temp

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      readBuffer.dispose()
      writeBuffer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full cursor-crosshair z-0"
    />
  )
}