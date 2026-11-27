"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { PriceTag } from "@/components/price-tag";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

// "On the rail": the pieces hang on gold hangers along a boutique rail in 3D. Drag,
// swipe or use the arrows to move along it; the piece in the middle turns to face you.
// Phones without WebGL, and anyone who asked for less motion, get a plain swipe row.

const CARD_W = 1;
const CARD_H = 1.25;
const CARD_TOP = -0.34; // where the card hangs from, below the rail (rail is at y = 0)

type Mode = "loading" | "3d" | "static";

// Decided once in the browser: 3D when WebGL works and the shopper hasn't asked for less motion.
let detected: Mode | null = null;
function detectMode(): Mode {
  if (detected) return detected;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const probe = document.createElement("canvas");
  const gl = probe.getContext("webgl2") || probe.getContext("webgl");
  detected = !reduced && gl ? "3d" : "static";
  return detected;
}
const noSubscribe = () => () => {};

export function HeeraRail({ products }: { products: Product[] }) {
  const mode = useSyncExternalStore(noSubscribe, detectMode, () => "loading" as Mode);
  const [active, setActive] = useState(() => Math.min(2, products.length - 1));
  const mountRef = useRef<HTMLDivElement>(null);
  const goRef = useRef<(i: number) => void>(() => {});
  const router = useRouter();
  const routerRef = useRef(router);
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    if (mode !== "3d" || !mountRef.current) return;
    const mount = mountRef.current;
    const count = products.length;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.className = "block size-full touch-pan-y outline-none";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("aria-label", "Heera Luxe pieces hanging on a gold rail");
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    // Light: warm key from above the front, cool fill, soft ambient.
    scene.add(new THREE.HemisphereLight(0xfff1e0, 0x3a2a20, 0.9));
    const key = new THREE.DirectionalLight(0xffe2bf, 2.2);
    key.position.set(1.5, 3, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9d8ff, 0.6);
    rim.position.set(-3, 1, -2);
    scene.add(rim);

    const gold = new THREE.MeshStandardMaterial({ color: 0xd9a96a, metalness: 1, roughness: 0.22 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xf3e6d6, roughness: 0.55, metalness: 0 });

    // The rail, with ceiling rods. It runs a little past both ends.
    const railLen = count * 0.6 + 6;
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, railLen, 32), gold);
    rail.rotation.z = Math.PI / 2;
    scene.add(rail);
    const rodGeo = new THREE.CylinderGeometry(0.015, 0.015, 3, 12);
    for (const x of [-railLen / 2 + 0.4, railLen / 2 - 0.4, 0]) {
      const rod = new THREE.Mesh(rodGeo, gold);
      rod.position.set(x, 1.5, 0);
      scene.add(rod);
    }

    // One hanger shape, shared: hook over the rail, stem, shoulders and a bottom bar.
    const hangerPath = new THREE.CurvePath<THREE.Vector3>();
    const v = (x: number, y: number) => new THREE.Vector3(x, y, 0);
    const shoulder = 0.42;
    const bar = CARD_TOP + 0.02;
    hangerPath.add(new THREE.LineCurve3(v(0, -0.06), v(0, -0.12)));
    hangerPath.add(new THREE.LineCurve3(v(0, -0.12), v(-shoulder, bar)));
    hangerPath.add(new THREE.LineCurve3(v(-shoulder, bar), v(shoulder, bar)));
    hangerPath.add(new THREE.LineCurve3(v(shoulder, bar), v(0, -0.12)));
    const hangerGeo = new THREE.TubeGeometry(hangerPath, 80, 0.009, 8, false);
    const hookGeo = new THREE.TorusGeometry(0.058, 0.009, 8, 32, Math.PI * 1.45);

    // Card: a cream frame with a little depth, the photo on the front.
    const roundRect = (w: number, h: number, r: number) => {
      const s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2);
      s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r);
      s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2);
      s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + r);
      s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      return s;
    };
    const frameGeo = new THREE.ExtrudeGeometry(roundRect(CARD_W + 0.08, CARD_H + 0.08, 0.03), {
      depth: 0.025,
      bevelEnabled: false,
    });
    frameGeo.translate(0, 0, -0.0125);
    const photoGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    const clipGeo = new THREE.BoxGeometry(0.06, 0.05, 0.04);

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const photoMats: THREE.MeshBasicMaterial[] = [];
    const items: { pivot: THREE.Group; card: THREE.Group; swing: number; swingVel: number }[] = [];
    const pickables: THREE.Object3D[] = [];

    products.forEach((p, i) => {
      const pivot = new THREE.Group(); // sits on the rail; turns to face you
      const card = new THREE.Group(); // swings from the hook
      pivot.add(card);

      const hook = new THREE.Mesh(hookGeo, gold);
      hook.rotation.z = -Math.PI * 0.22;
      hook.position.y = 0;
      card.add(hook, new THREE.Mesh(hangerGeo, gold));

      const holder = new THREE.Group();
      holder.position.y = CARD_TOP - CARD_H / 2 - 0.04;
      const frame = new THREE.Mesh(frameGeo, cream);
      const mat = new THREE.MeshBasicMaterial({ color: 0x777777, toneMapped: false });
      const photo = new THREE.Mesh(photoGeo, mat);
      photo.position.z = 0.014;
      holder.add(frame, photo);
      for (const x of [-0.3, 0.3]) {
        const clip = new THREE.Mesh(clipGeo, gold);
        clip.position.set(x, CARD_H / 2 + 0.04, 0);
        holder.add(clip);
      }
      card.add(holder);

      frame.userData.index = i;
      photo.userData.index = i;
      pickables.push(frame, photo);
      photoMats.push(mat);

      const src = p.images[0];
      if (src) {
        loader.load(src, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          // Cover-crop the photo into the 4:5 card, like the product grid does.
          const img = tex.image as HTMLImageElement;
          const imgAspect = img.width / img.height;
          const cardAspect = CARD_W / CARD_H;
          if (imgAspect > cardAspect) {
            tex.repeat.set(cardAspect / imgAspect, 1);
            tex.offset.set((1 - tex.repeat.x) / 2, 0);
          } else {
            tex.repeat.set(1, imgAspect / cardAspect);
            tex.offset.set(0, (1 - tex.repeat.y) / 2);
          }
          mat.map = tex;
          mat.needsUpdate = true;
          textures.push(tex);
        });
      }

      scene.add(pivot);
      items.push({ pivot, card, swing: (Math.random() - 0.5) * 0.06, swingVel: 0 });
    });

    // Sparkle: soft specks drifting through the light, each twinkling on its own.
    const sparkCount = 220;
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkSeed = new Float32Array(sparkCount);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 9;
      sparkPos[i * 3 + 1] = Math.random() * 3.2 - 2.4;
      sparkPos[i * 3 + 2] = Math.random() * 2.4 - 1.4;
      sparkSeed[i] = Math.random() * 100;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute("seed", new THREE.BufferAttribute(sparkSeed, 1));
    const sparkMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uScale: { value: 1 } },
      vertexShader: `
        attribute float seed;
        uniform float uTime;
        uniform float uScale;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += mod(uTime * 0.04 + seed, 3.2) - 1.6;
          p.x += sin(uTime * 0.3 + seed) * 0.08;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float tw = pow(0.5 + 0.5 * sin(uTime * (1.5 + fract(seed) * 2.5) + seed * 7.0), 6.0);
          vAlpha = 0.1 + tw * 0.7;
          gl_PointSize = (3.0 + tw * 9.0) * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float core = smoothstep(0.5, 0.0, d);
          float star = max(smoothstep(0.06, 0.0, abs(c.x)) , smoothstep(0.06, 0.0, abs(c.y))) * smoothstep(0.5, 0.1, d);
          float a = (core * core + star * 0.6) * vAlpha;
          gl_FragColor = vec4(1.0, 0.86, 0.62, a);
        }`,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    // Motion state. `focus` glides toward `target`; whole numbers are pieces.
    // Start a couple of pieces in, so there's something on both sides.
    const start = Math.min(2, count - 1);
    let focus = start;
    let target = start;
    let lastFocus = start;
    let shown = -1;
    const clampT = (x: number) => Math.min(count - 1, Math.max(0, x));
    goRef.current = (i: number) => {
      target = clampT(i);
    };

    const pointer = { x: 0, y: 0 };
    let drag: { x: number; start: number; t: number; vx: number; moved: boolean } | null = null;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const el = renderer.domElement;
    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, start: target, t: performance.now(), vx: 0, moved: false };
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.cursor = drag?.moved ? "grabbing" : hoverIndex(e) !== null ? "pointer" : "grab";
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) drag.moved = true;
      const now = performance.now();
      const perPiece = Math.min(r.width * 0.32, 260);
      const next = drag.start - dx / perPiece;
      drag.vx = (next - target) / Math.max(1, now - drag.t);
      drag.t = now;
      target = Math.min(count - 0.6, Math.max(-0.4, next));
    };
    const hoverIndex = (e: PointerEvent | MouseEvent) => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      return hit ? (hit.object.userData.index as number) : null;
    };
    const onUp = (e: PointerEvent) => {
      if (!drag) return;
      if (!drag.moved) {
        const i = hoverIndex(e);
        if (i !== null) {
          if (i === Math.round(focus)) routerRef.current.push(`/products/${products[i].slug}`);
          else target = i;
        }
      } else {
        target = clampT(Math.round(target + drag.vx * 220));
      }
      drag = null;
    };
    const onWheel = (e: WheelEvent) => {
      // Only sideways scrolling moves the rail, so the page still scrolls normally.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      target = clampT(target + e.deltaX / 220);
      clearTimeout(wheelSnap);
      wheelSnap = window.setTimeout(() => (target = clampT(Math.round(target))), 140);
    };
    let wheelSnap = 0;
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Phones: step back so the middle piece and a hint of its neighbours fit.
      const dist = camera.aspect < 0.75 ? 5.6 : camera.aspect < 1.2 ? 4.6 : 4.1;
      camera.position.set(0, -0.7, dist);
      camera.lookAt(0, -0.95, 0);
      camera.updateProjectionMatrix();
      // Point size in pixels at the rail's distance, kept the same across screen sizes.
      sparkMat.uniforms.uScale.value = renderer.getPixelRatio() * (h / 620) * 4;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) loop();
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const dim = new THREE.Color();
    const loop = () => {
      cancelAnimationFrame(raf);
      if (!visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      focus += (target - focus) * (1 - Math.exp(-dt * 7));
      const vel = (focus - lastFocus) / Math.max(dt, 1e-3);
      lastFocus = focus;

      const nearest = clampT(Math.round(focus));
      if (nearest !== shown) {
        shown = nearest;
        setActive(nearest);
      }

      items.forEach((it, i) => {
        const d = i - focus;
        const a = Math.abs(d);
        const s = Math.sign(d);
        // The middle piece gets room; the rest bunch up side-on, like a real rail.
        const x = s * (Math.min(a, 1) * 1.02 + Math.max(a - 1, 0) * 0.3);
        it.pivot.position.set(x, 0, -Math.min(a, 1) * 0.25);
        it.pivot.rotation.y = -Math.max(-1, Math.min(1, d)) * 1.3;

        // Hangers swing when the rail moves, then settle (a damped spring).
        const push = -vel * 0.012 * (1 / (1 + a * 0.6));
        it.swingVel += (-it.swing * 38 - it.swingVel * 4.2) * dt + push;
        it.swing += it.swingVel * dt;
        it.card.rotation.z = it.swing + Math.sin(t * 0.9 + i * 1.7) * 0.006;
        it.card.rotation.x = Math.sin(t * 0.7 + i) * 0.01;

        const light = 1 - Math.min(a, 2.5) * 0.22;
        photoMats[i].color.copy(dim.setScalar(light));
      });

      camera.position.x += (pointer.x * 0.18 - camera.position.x) * (1 - Math.exp(-dt * 3));
      sparkMat.uniforms.uTime.value = t;
      renderer.render(scene, camera);
    };
    const onVisibility = () => {
      if (!document.hidden) {
        clock.getDelta();
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(wheelSnap);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
      });
      [gold, cream, sparkMat, ...photoMats].forEach((m) => m.dispose());
      textures.forEach((tx) => tx.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      el.remove();
    };
  }, [mode, products]);

  const piece = products[active];

  if (mode === "static") {
    return (
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} className="w-[62%] shrink-0 snap-center sm:w-64" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="On the rail"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goRef.current(active - 1);
        if (e.key === "ArrowRight") goRef.current(active + 1);
      }}
    >
      <div ref={mountRef} className="h-[460px] w-full sm:h-[560px] lg:h-[620px]">
        {mode === "loading" && <div className="size-full animate-pulse bg-foreground/[0.03]" />}
      </div>

      <div className="relative z-10 mx-auto -mt-[84px] flex max-w-xl items-center justify-between gap-4 px-4 sm:-mt-20 sm:px-6 lg:-mt-24">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none border-foreground/30 bg-transparent"
          aria-label="Previous piece"
          disabled={active === 0}
          onClick={() => goRef.current(active - 1)}
        >
          <ArrowLeftIcon strokeWidth={1.4} />
        </Button>

        <div className="min-w-0 text-center" aria-live="polite">
          <p className="text-[10px] tracking-[0.24em] text-gold uppercase">
            {categories[piece.category].label} · {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </p>
          <p className="mt-1 truncate font-heading text-2xl tracking-[0.06em] sm:text-3xl">{piece.name}</p>
          <PriceTag product={piece} className="mt-1 justify-center text-sm" />
          <Link
            href={`/products/${piece.slug}`}
            className={cn(
              "mt-4 inline-flex h-10 items-center justify-center border border-current px-6 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background",
            )}
          >
            View piece
          </Link>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-none border-foreground/30 bg-transparent"
          aria-label="Next piece"
          disabled={active === products.length - 1}
          onClick={() => goRef.current(active + 1)}
        >
          <ArrowRightIcon strokeWidth={1.4} />
        </Button>
      </div>
    </div>
  );
}
