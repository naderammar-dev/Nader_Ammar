/**
 * Nader Ammar - Darkmoon 3D Cosmic Canvas & Cybernetic Portfolio Engine
 * Pure TypeScript, Canvas2D 3D-projection mathematics, and native DOM APIs
 */

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  blinkSpeed: number;
  phase: number;
  color: string;
}

interface Node3D {
  id: number;
  name: string;
  subsystem: string;
  description: string;
  x: number; // 3D coordinates
  y: number;
  z: number;
  radius: number;
  color: string;
  screenX: number; // Projected 2D screen coordinates
  screenY: number;
  screenRadius: number;
  screenAlpha: number;
}

interface Connection3D {
  from: number;
  to: number;
  packets: { progress: number; speed: number }[];
}

interface StepData {
  step: string;
  nodeId: number;
  title: string;
  desc: string;
}

const STEPS: StepData[] = [
  {
    step: 'Step 1 / 4',
    nodeId: 0,
    title: 'Core Microcontroller Bus',
    desc: 'Central RTOS scheduler orchestrating real-time hardware interrupts, timer peripherals, and memory bus arbitration.',
  },
  {
    step: 'Step 2 / 4',
    nodeId: 1,
    title: 'Neural Edge Acceleration',
    desc: 'Lightweight quantized neural model execution running directly on embedded silicon without cloud dependency.',
  },
  {
    step: 'Step 3 / 4',
    nodeId: 2,
    title: 'Robotics Kinematics Control',
    desc: 'Closed-loop sensory feedback driving multi-axis motor actuators with high-frequency PWM control.',
  },
  {
    step: 'Step 4 / 4',
    nodeId: 3,
    title: 'Telemetry & Sensor Bus',
    desc: 'High-speed I2C/SPI bus acquiring environmental sensor telemetry and routing secure IoT packets.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  initSpaceCanvas();
  initInspectorStepper();
  initSubsystemMenu();
  initTechRadar();
  initCyberTerminal();
  initContactActions();
  initMobileNav();
  initHeaderScroll();
});

/**
 * 3D Space Canvas: Orbital Planet Horizon, Starfield & 3D Constellation Nodes
 */
function initSpaceCanvas(): void {
  const canvas = document.getElementById('space-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  // Generate Starfield
  let stars: Star[] = [];
  const starColors = ['#ffffff', '#e0f2fe', '#bae6fd', '#38bdf8', '#00f0ff'];

  function initStars(): void {
    stars = [];
    const count = Math.min(320, Math.floor((width * height) / 3500));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.85,
        size: Math.random() * 1.8 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        blinkSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }
  }
  initStars();

  // 3D Nodes Definition
  const rawNodes: Node3D[] = [
    {
      id: 0,
      name: 'Central MCU',
      subsystem: 'Core Controller',
      description: 'RTOS scheduler & firmware kernel',
      x: 0,
      y: 0,
      z: 0,
      radius: 18,
      color: '#00f0ff',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
    {
      id: 1,
      name: 'Neural Engine',
      subsystem: 'Embedded AI',
      description: 'Edge model quantization & inference',
      x: -160,
      y: -60,
      z: 80,
      radius: 14,
      color: '#38bdf8',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
    {
      id: 2,
      name: 'Robotic Kinematics',
      subsystem: 'Actuation & Control',
      description: 'Motor drivers & feedback loops',
      x: 170,
      y: -50,
      z: 70,
      radius: 14,
      color: '#0062ff',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
    {
      id: 3,
      name: 'Sensor Bus',
      subsystem: 'I2C / SPI Telemetry',
      description: 'Raw environmental data capture',
      x: -80,
      y: 110,
      z: -90,
      radius: 13,
      color: '#00f0ff',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
    {
      id: 4,
      name: 'IoT Telemetry',
      subsystem: 'Wireless Network',
      description: 'MQTT & secure gateway uplink',
      x: 130,
      y: 90,
      z: -80,
      radius: 13,
      color: '#38bdf8',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
    {
      id: 5,
      name: 'RTOS Scheduler',
      subsystem: 'Real-Time Kernel',
      description: 'Deterministic task preemption',
      x: 0,
      y: -140,
      z: -40,
      radius: 12,
      color: '#6366f1',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
    {
      id: 6,
      name: 'Root of Trust',
      subsystem: 'Hardware Security',
      description: 'Secure boot & cryptographic keys',
      x: 0,
      y: 130,
      z: 110,
      radius: 12,
      color: '#10b981',
      screenX: 0,
      screenY: 0,
      screenRadius: 0,
      screenAlpha: 1,
    },
  ];

  // Interconnected Vectors
  const connections: Connection3D[] = [
    { from: 0, to: 1, packets: [{ progress: 0.1, speed: 0.006 }, { progress: 0.6, speed: 0.006 }] },
    { from: 0, to: 2, packets: [{ progress: 0.3, speed: 0.007 }] },
    { from: 0, to: 3, packets: [{ progress: 0.5, speed: 0.008 }] },
    { from: 0, to: 4, packets: [{ progress: 0.2, speed: 0.005 }] },
    { from: 0, to: 5, packets: [{ progress: 0.7, speed: 0.007 }] },
    { from: 0, to: 6, packets: [{ progress: 0.4, speed: 0.005 }] },
    { from: 1, to: 2, packets: [{ progress: 0.1, speed: 0.004 }] },
    { from: 3, to: 1, packets: [{ progress: 0.8, speed: 0.006 }] },
    { from: 2, to: 4, packets: [{ progress: 0.3, speed: 0.005 }] },
  ];

  // 3D Rotation State
  let rotX = -0.15;
  let rotY = 0.3;
  let targetRotX = -0.15;
  let targetRotY = 0.3;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  // Active highlighted node (linked to Left HUD)
  let activeNodeId = 0;
  let hoveredNodeId: number | null = null;

  // Mouse interaction
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    } else {
      // Check node hover
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: number | null = null;
      for (const node of rawNodes) {
        const dist = Math.hypot(mouseX - node.screenX, mouseY - node.screenY);
        if (dist <= node.screenRadius + 8) {
          found = node.id;
          break;
        }
      }
      hoveredNodeId = found;
      canvas.style.cursor = found !== null ? 'pointer' : isDragging ? 'grabbing' : 'grab';
    }
  });

  // Click on node
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (const node of rawNodes) {
      const dist = Math.hypot(mouseX - node.screenX, mouseY - node.screenY);
      if (dist <= node.screenRadius + 8) {
        setActiveNode(node.id);
        break;
      }
    }
  });

  // Touch controls for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      targetRotY += deltaX * 0.01;
      targetRotX += deltaY * 0.01;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Global event bridge so stepper can rotate to target node
  window.addEventListener('target-node-selected', (e: Event) => {
    const customEvent = e as CustomEvent<{ nodeId: number }>;
    if (customEvent.detail && typeof customEvent.detail.nodeId === 'number') {
      setActiveNode(customEvent.detail.nodeId);
    }
  });

  function setActiveNode(id: number): void {
    activeNodeId = id;
    const target = rawNodes.find((n) => n.id === id);
    if (target) {
      // Smoothly rotate constellation toward node
      const angleY = Math.atan2(target.x, target.z);
      targetRotY = -angleY + 0.2;
      targetRotX = -0.15;
    }
  }

  // Animation Loop
  let frame = 0;
  function render(): void {
    frame++;

    // Smooth rotation damping
    if (!isDragging) {
      targetRotY += 0.0018; // gentle auto-rotation
    }
    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;

    // Clear Canvas
    ctx!.clearRect(0, 0, width, height);

    // 1. Draw Starfield
    for (const star of stars) {
      const alpha = star.baseAlpha + Math.sin(frame * star.blinkSpeed + star.phase) * 0.25;
      ctx!.fillStyle = star.color;
      ctx!.globalAlpha = Math.max(0.1, Math.min(1, alpha));
      ctx!.beginPath();
      ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;

    // 2. Draw Orbital Earth Limb & Atmospheric Horizon (Video 00:01 - 00:04)
    drawOrbitalHorizon(ctx!, width, height, frame);

    // 3. Project 3D Nodes to 2D Screen Coordinates
    // Adjust focal center: on desktop place it slightly towards the center-right to balance the left HUD
    const centerX = width > 1024 ? width * 0.58 : width * 0.5;
    const centerY = height * 0.44;
    const fov = 420;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    for (const node of rawNodes) {
      // Rotate around Y axis
      const x1 = node.x * cosY + node.z * sinY;
      const z1 = -node.x * sinY + node.z * cosY;

      // Rotate around X axis
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;

      const scale = fov / (fov + z2 + 180);
      node.screenX = centerX + x1 * scale;
      node.screenY = centerY + y2 * scale;
      node.screenRadius = Math.max(6, node.radius * scale);
      node.screenAlpha = Math.max(0.35, Math.min(1, (z2 + 200) / 400));
    }

    // Sort nodes by depth for correct overlapping
    const sortedNodes = [...rawNodes].sort((a, b) => b.screenAlpha - a.screenAlpha);

    // 4. Draw Connecting Laser Traces & Data Packets
    for (const conn of connections) {
      const nodeA = rawNodes[conn.from];
      const nodeB = rawNodes[conn.to];
      if (!nodeA || !nodeB) continue;

      const alpha = Math.min(nodeA.screenAlpha, nodeB.screenAlpha) * 0.6;

      // Trace line
      ctx!.beginPath();
      ctx!.moveTo(nodeA.screenX, nodeA.screenY);
      ctx!.lineTo(nodeB.screenX, nodeB.screenY);
      ctx!.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.45})`;
      ctx!.lineWidth = (conn.from === 0 || conn.to === 0 ? 1.8 : 1) * alpha;
      ctx!.stroke();

      // Traveling data packets
      for (const pkt of conn.packets) {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const px = nodeA.screenX + (nodeB.screenX - nodeA.screenX) * pkt.progress;
        const py = nodeA.screenY + (nodeB.screenY - nodeA.screenY) * pkt.progress;

        ctx!.beginPath();
        ctx!.arc(px, py, 2.5 * alpha, 0, Math.PI * 2);
        ctx!.fillStyle = '#00f0ff';
        ctx!.shadowColor = '#00f0ff';
        ctx!.shadowBlur = 8;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    // 5. Draw 3D Nodes
    for (const node of sortedNodes) {
      const isActive = node.id === activeNodeId;
      const isHovered = node.id === hoveredNodeId;

      ctx!.save();
      ctx!.globalAlpha = node.screenAlpha;

      // Active pulsing orbital ring
      if (isActive || isHovered) {
        const ringPulse = Math.sin(frame * 0.08) * 4;
        ctx!.beginPath();
        ctx!.arc(node.screenX, node.screenY, node.screenRadius + 10 + ringPulse, 0, Math.PI * 2);
        ctx!.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.arc(node.screenX, node.screenY, node.screenRadius + 18 + ringPulse, 0, Math.PI * 2);
        ctx!.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Outer glow
      ctx!.beginPath();
      ctx!.arc(node.screenX, node.screenY, node.screenRadius, 0, Math.PI * 2);
      ctx!.fillStyle = isActive ? '#00f0ff' : isHovered ? '#38bdf8' : 'rgba(8, 16, 36, 0.9)';
      ctx!.shadowColor = node.color;
      ctx!.shadowBlur = isActive ? 24 : 12;
      ctx!.fill();
      ctx!.shadowBlur = 0;

      // Inner stroke
      ctx!.strokeStyle = node.color;
      ctx!.lineWidth = isActive ? 2.5 : 1.5;
      ctx!.stroke();

      // Center core dot
      ctx!.beginPath();
      ctx!.arc(node.screenX, node.screenY, Math.max(3, node.screenRadius * 0.35), 0, Math.PI * 2);
      ctx!.fillStyle = isActive ? '#02040a' : '#ffffff';
      ctx!.fill();

      // Node Monospace Label
      ctx!.font = `600 ${Math.max(10, Math.round(11 * node.screenAlpha))}px ui-monospace, monospace`;
      ctx!.fillStyle = isActive ? '#00f0ff' : '#f8fafc';
      ctx!.textAlign = 'center';
      ctx!.fillText(node.name, node.screenX, node.screenY + node.screenRadius + 16);

      ctx!.font = `400 ${Math.max(8, Math.round(9 * node.screenAlpha))}px ui-monospace, monospace`;
      ctx!.fillStyle = '#94a3b8';
      ctx!.fillText(node.subsystem, node.screenX, node.screenY + node.screenRadius + 28);

      ctx!.restore();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/**
 * Photorealistic Orbital Earth Horizon Curve with Atmospheric Rayleigh Glow
 */
function drawOrbitalHorizon(ctx: CanvasRenderingContext2D, width: number, height: number, frame: number): void {
  ctx.save();

  // The massive orbital planet sphere center is far below screen
  const planetCenterX = width * 0.5;
  const planetRadius = Math.max(width, height) * 1.55;
  const planetCenterY = height + planetRadius - Math.min(260, height * 0.3);

  // 1. Radiant Atmospheric Glow Haze (Rayleigh Scattering, Cyan & Electric Blue)
  const glowGradient = ctx.createRadialGradient(
    planetCenterX,
    planetCenterY,
    planetRadius - 80,
    planetCenterX,
    planetCenterY,
    planetRadius + 120
  );
  glowGradient.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
  glowGradient.addColorStop(0.3, 'rgba(0, 102, 255, 0.32)');
  glowGradient.addColorStop(0.65, 'rgba(56, 189, 248, 0.12)');
  glowGradient.addColorStop(1, 'transparent');

  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(planetCenterX, planetCenterY, planetRadius + 120, 0, Math.PI * 2);
  ctx.fill();

  // 2. Planet Dark Body
  ctx.fillStyle = '#010308';
  ctx.beginPath();
  ctx.arc(planetCenterX, planetCenterY, planetRadius, 0, Math.PI * 2);
  ctx.fill();

  // 3. Sharp Glowing Horizon Rim (Atmosphere Edge in Video)
  ctx.beginPath();
  ctx.arc(planetCenterX, planetCenterY, planetRadius, Math.PI * 1.15, Math.PI * 1.85);
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 2.2;
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 4. Subtle Surface Cybernetic Lat/Long Grid & Night Lights
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let r = planetRadius - 30; r > planetRadius - 140; r -= 35) {
    ctx.beginPath();
    ctx.arc(planetCenterX, planetCenterY, r, Math.PI * 1.18, Math.PI * 1.82);
    ctx.stroke();
  }

  // Faint night city light clusters on dark planet
  const lightOffsets = [
    { a: -0.3, r: -40 },
    { a: -0.15, r: -70 },
    { a: 0.05, r: -50 },
    { a: 0.22, r: -85 },
    { a: 0.35, r: -60 },
  ];
  for (let i = 0; i < lightOffsets.length; i++) {
    const lo = lightOffsets[i];
    const angle = -Math.PI / 2 + lo.a;
    const lx = planetCenterX + Math.cos(angle) * (planetRadius + lo.r);
    const ly = planetCenterY + Math.sin(angle) * (planetRadius + lo.r);

    const flicker = Math.sin(frame * 0.05 + i) * 0.2 + 0.6;
    ctx.fillStyle = `rgba(255, 220, 150, ${0.4 * flicker})`;
    ctx.beginPath();
    ctx.arc(lx, ly, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Interactive Step-by-Step Inspector (Left HUD)
 */
function initInspectorStepper(): void {
  const nextBtn = document.getElementById('btn-inspector-next') as HTMLButtonElement | null;
  const stepLabel = document.getElementById('inspector-step');
  const titleLabel = document.getElementById('inspector-title');
  const descLabel = document.getElementById('inspector-desc');

  if (!nextBtn || !stepLabel || !titleLabel || !descLabel) return;

  let currentStepIndex = 0;

  const updateStep = (index: number): void => {
    currentStepIndex = index;
    const data = STEPS[currentStepIndex];

    stepLabel.textContent = data.step;
    titleLabel.textContent = data.title;
    descLabel.textContent = data.desc;

    // Trigger custom event so the 3D space canvas rotates to this node
    window.dispatchEvent(
      new CustomEvent('target-node-selected', {
        detail: { nodeId: data.nodeId },
      })
    );

    // Sync subsystem menu buttons
    const menuButtons = document.querySelectorAll<HTMLButtonElement>('.hud-menu-item');
    menuButtons.forEach((btn, idx) => {
      if (idx === currentStepIndex) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  };

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentStepIndex + 1) % STEPS.length;
    updateStep(nextIndex);
  });
}

/**
 * Subsystem Menu selection handler
 */
function initSubsystemMenu(): void {
  const menuButtons = document.querySelectorAll<HTMLButtonElement>('.hud-menu-item');
  menuButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      menuButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update inspector
      const data = STEPS[index];
      if (data) {
        const stepLabel = document.getElementById('inspector-step');
        const titleLabel = document.getElementById('inspector-title');
        const descLabel = document.getElementById('inspector-desc');
        if (stepLabel) stepLabel.textContent = data.step;
        if (titleLabel) titleLabel.textContent = data.title;
        if (descLabel) descLabel.textContent = data.desc;

        window.dispatchEvent(
          new CustomEvent('target-node-selected', {
            detail: { nodeId: data.nodeId },
          })
        );
      }
    });
  });
}

/**
 * Orbital Tech Radar Hover Interactions
 */
function initTechRadar(): void {
  const badgeNodes = document.querySelectorAll<HTMLElement>('.radar-badge-node');
  const toast = document.getElementById('cyber-toast');
  const toastText = document.getElementById('toast-text');

  badgeNodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      const info = node.getAttribute('data-info');
      if (info && toast && toastText) {
        toastText.innerHTML = info;
        toast.classList.add('show');
      }
    });

    node.addEventListener('mouseleave', () => {
      if (toast) {
        toast.classList.remove('show');
      }
    });
  });
}

/**
 * Interactive Cyber Terminal (Bash simulation)
 */
function initCyberTerminal(): void {
  const input = document.getElementById('term-input') as HTMLInputElement | null;
  const terminalBody = document.getElementById('terminal-body');

  if (!input || !terminalBody) return;

  const commands: Record<string, string> = {
    help: `Available commands:
  • <span style="color:#00f0ff">about</span>      - Academic bio & EPI details
  • <span style="color:#00f0ff">skills</span>     - Technical interest matrix
  • <span style="color:#00f0ff">contact</span>    - Email and repository links
  • <span style="color:#00f0ff">epi</span>        - Institution credentials
  • <span style="color:#00f0ff">clear</span>      - Clear terminal screen`,
    about: `Nader Ammar - Aspiring Engineer at EPI.
Specializing in hardware-software co-design, real-time embedded systems, and robotics.
"I enjoy exploring how hardware and software work together to create intelligent systems."`,
    skills: `Core Domains:
  1. Embedded Systems (C/C++, STM32, FreeRTOS, I2C/SPI/UART)
  2. Artificial Intelligence (Edge ML, TensorFlow Lite, Quantization)
  3. Robotics (Kinematics, Feedback Loops, Motor Actuation)
  4. Systems Programming & Hardware Security`,
    contact: `Primary Email: <a href="mailto:naderammar777@gmail.com" style="color:#00f0ff; text-decoration:underline;">naderammar777@gmail.com</a>
GitHub: <a href="https://github.com/naderammar" target="_blank" style="color:#00f0ff; text-decoration:underline;">github.com/naderammar</a>`,
    email: `Direct email address: naderammar777@gmail.com (click to compose mail)`,
    epi: `EPI School of Engineering: Advanced engineering curriculum focused on embedded electronics, computing algorithms, and intelligent automated systems.`,
  };

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim().toLowerCase();
      input.value = '';

      if (!rawCmd) return;

      if (rawCmd === 'clear') {
        const lines = terminalBody.querySelectorAll('.terminal-line, .term-output');
        lines.forEach((l) => l.remove());
        return;
      }

      // Append user command echo
      const cmdRow = document.createElement('div');
      cmdRow.className = 'terminal-line';
      cmdRow.innerHTML = `<span class="term-user">nader@epi</span>:<span class="term-dir">~</span>$ ${escapeHtml(rawCmd)}`;
      terminalBody.insertBefore(cmdRow, input.parentElement);

      // Append command response
      const outRow = document.createElement('div');
      outRow.className = 'term-output';
      if (commands[rawCmd]) {
        outRow.innerHTML = commands[rawCmd];
      } else {
        outRow.innerHTML = `command not found: ${escapeHtml(rawCmd)}. Type <span style="color:var(--accent-cyan)">help</span> for available commands.`;
      }
      terminalBody.insertBefore(outRow, input.parentElement);

      // Scroll to bottom of terminal
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Clicking anywhere in terminal focuses the input
  terminalBody.addEventListener('click', () => {
    input.focus();
  });
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

/**
 * Contact Actions: Copy Email & Toast
 */
function initContactActions(): void {
  const copyBtn = document.getElementById('btn-copy-email') as HTMLButtonElement | null;
  const emailVal = document.getElementById('email-address')?.textContent?.trim() || 'naderammar777@gmail.com';
  const toast = document.getElementById('cyber-toast');
  const toastText = document.getElementById('toast-text');

  let toastTimer: number | undefined;

  const showToast = (msg: string): void => {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailVal);
        } else {
          const ta = document.createElement('textarea');
          ta.value = emailVal;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast(`Copied to clipboard: ${emailVal}`);
      } catch {
        showToast('Please copy manually: naderammar777@gmail.com');
      }
    });
  }
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNav(): void {
  const toggleBtn = document.getElementById('mobile-toggle-btn') as HTMLButtonElement | null;
  const drawer = document.getElementById('mobile-nav-drawer') as HTMLElement | null;
  const links = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const toggle = (force?: boolean): void => {
    const isOpen = toggleBtn.classList.contains('open');
    const newState = force !== undefined ? force : !isOpen;

    if (newState) {
      toggleBtn.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  toggleBtn.addEventListener('click', () => toggle());

  links.forEach((l) => {
    l.addEventListener('click', () => toggle(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggle(false);
    }
  });
}

/**
 * Header Scroll Shadow & Active Section Tracking
 */
function initHeaderScroll(): void {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    let activeId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        activeId = sec.getAttribute('id') || '';
      }
    });

    if (activeId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}
