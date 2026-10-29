export interface ArchitecturalIllustration {
  id: string;
  title: string;
  category: 'fintech' | 'security' | 'infrastructure' | 'analytics' | 'workflow' | 'architecture';
  description: string;
  tags: string[];
  svg: string;
}

export const ARCHITECTURAL_ILLUSTRATIONS: ArchitecturalIllustration[] = [
  // 1. analytics-radar
  {
    id: 'analytics-radar',
    title: 'Analytics Radar Matrix',
    category: 'analytics',
    description: 'Scanning telemetry radar with target vectors and dynamic signal nodes',
    tags: ['radar', 'analytics', 'telemetry', 'data', 'metrics', 'monitoring'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <defs>
    <radialGradient id="radarGlow" cx="200" cy="150" r="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--primary, #2563eb)" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="var(--accent, #3b82f6)" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beamGrad" x1="200" y1="150" x2="310" y2="70" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--primary, #2563eb)" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="var(--accent, #3b82f6)" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <circle cx="200" cy="150" r="110" fill="url(#radarGlow)" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.4"/>
  <circle cx="200" cy="150" r="80" stroke-width="1.2" stroke-opacity="0.5"/>
  <circle cx="200" cy="150" r="50" stroke-width="1.2" stroke-dasharray="2 3" stroke-opacity="0.6"/>
  <circle cx="200" cy="150" r="20" stroke-width="1.5" stroke="var(--primary, #2563eb)"/>
  <line x1="90" y1="150" x2="310" y2="150" stroke-width="1" stroke-opacity="0.3"/>
  <line x1="200" y1="40" x2="200" y2="260" stroke-width="1" stroke-opacity="0.3"/>
  <path d="M200 150 L310 70 A120 120 0 0 0 250 45 Z" fill="url(#beamGrad)" stroke="none"/>
  <circle cx="245" cy="105" r="4" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="245" cy="105" r="8" stroke="var(--primary, #2563eb)" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="160" cy="180" r="3.5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="230" cy="195" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <path d="M120 80 L140 80 L140 100" stroke-width="1.5" stroke="var(--accent, #3b82f6)"/>
  <path d="M280 220 L260 220 L260 200" stroke-width="1.5" stroke="var(--accent, #3b82f6)"/>
</svg>`,
  },

  // 2. security-vault
  {
    id: 'security-vault',
    title: 'Cryptographic Security Vault',
    category: 'security',
    description: 'High-assurance titanium vault door with multi-point biometric locking mechanism',
    tags: ['vault', 'security', 'crypto', 'shield', 'defense', 'safe', 'protection'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <defs>
    <linearGradient id="vaultPlate" x1="120" y1="50" x2="280" y2="250" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--primary, #2563eb)" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="var(--accent, #3b82f6)" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect x="90" y="40" width="220" height="220" rx="20" fill="url(#vaultPlate)" stroke-width="1.5" stroke-opacity="0.5"/>
  <rect x="105" y="55" width="190" height="190" rx="14" stroke-width="1" stroke-dasharray="6 4" stroke-opacity="0.3"/>
  <circle cx="200" cy="150" r="65" stroke-width="2" stroke="var(--primary, #2563eb)"/>
  <circle cx="200" cy="150" r="45" stroke-width="1.5" stroke-opacity="0.6"/>
  <circle cx="200" cy="150" r="22" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--accent, #3b82f6)" stroke-width="2"/>
  <path d="M200 85 L200 100 M200 200 L200 215 M135 150 L150 150 M250 150 L265 150" stroke-width="2.5" stroke="var(--primary, #2563eb)" stroke-linecap="round"/>
  <path d="M154 104 L164 114 M236 186 L246 196 M154 196 L164 186 M236 114 L246 104" stroke-width="2" stroke="var(--accent, #3b82f6)" stroke-linecap="round"/>
  <path d="M195 145 L200 140 L205 145 L205 156 L195 156 Z" fill="var(--primary, #2563eb)" stroke="none"/>
  <rect x="120" y="70" width="12" height="6" rx="2" fill="var(--accent, #3b82f6)" stroke="none"/>
  <rect x="120" y="82" width="12" height="6" rx="2" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 3. global-settlement
  {
    id: 'global-settlement',
    title: 'Global Settlement Network',
    category: 'fintech',
    description: 'Cross-border liquidity corridors and high-velocity currency settlements',
    tags: ['settlement', 'global', 'crossborder', 'fx', 'payments', 'currency', 'network'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <circle cx="200" cy="150" r="95" stroke-width="1.2" stroke-opacity="0.4"/>
  <ellipse cx="200" cy="150" rx="95" ry="40" stroke-width="1" stroke-opacity="0.3"/>
  <ellipse cx="200" cy="150" rx="40" ry="95" stroke-width="1" stroke-opacity="0.3"/>
  <line x1="105" y1="150" x2="295" y2="150" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="0.4"/>
  <path d="M140 120 C 180 80, 240 85, 270 135" stroke="var(--primary, #2563eb)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M130 170 C 170 215, 230 210, 260 165" stroke="var(--accent, #3b82f6)" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="140" cy="120" r="5" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="270" cy="135" r="5" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="130" cy="170" r="5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="260" cy="165" r="5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="200" cy="150" r="7" fill="var(--primary, #2563eb)" fill-opacity="0.3" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
</svg>`,
  },

  // 4. speed-delivery
  {
    id: 'speed-delivery',
    title: 'High-Velocity Transit Stream',
    category: 'workflow',
    description: 'Sub-millisecond packet acceleration and prioritized route delivery',
    tags: ['speed', 'transit', 'delivery', 'acceleration', 'latency', 'flow'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <path d="M70 150 H290" stroke-width="1.5" stroke-opacity="0.3"/>
  <path d="M90 110 H310" stroke-width="1" stroke-dasharray="6 4" stroke-opacity="0.25"/>
  <path d="M90 190 H310" stroke-width="1" stroke-dasharray="6 4" stroke-opacity="0.25"/>
  <path d="M120 150 L260 150" stroke="var(--primary, #2563eb)" stroke-width="4" stroke-linecap="round"/>
  <polygon points="265,150 245,142 245,158" fill="var(--primary, #2563eb)" stroke="none"/>
  <path d="M160 125 L230 125" stroke="var(--accent, #3b82f6)" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="235,125 223,119 223,131" fill="var(--accent, #3b82f6)" stroke="none"/>
  <path d="M180 175 L280 175" stroke="var(--accent, #3b82f6)" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="285,175 273,169 273,181" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="100" cy="150" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="140" cy="110" r="2.5" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 5. cloud-infrastructure
  {
    id: 'cloud-infrastructure',
    title: 'Elastic Cloud Infrastructure',
    category: 'infrastructure',
    description: 'Tier-4 hyperscale server clusters with multi-zone elastic redundancy',
    tags: ['cloud', 'infrastructure', 'server', 'datacenter', 'hosting', 'clusters'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="130" y="70" width="140" height="34" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.08" stroke-width="1.5" stroke="var(--primary, #2563eb)"/>
  <rect x="130" y="118" width="140" height="34" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.08" stroke-width="1.5" stroke="var(--primary, #2563eb)"/>
  <rect x="130" y="166" width="140" height="34" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.08" stroke-width="1.5" stroke="var(--primary, #2563eb)"/>
  <rect x="130" y="214" width="140" height="34" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.08" stroke-width="1.5" stroke="var(--primary, #2563eb)"/>
  <circle cx="150" cy="87" r="3" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="162" cy="87" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="150" cy="135" r="3" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="162" cy="135" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="150" cy="183" r="3" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="162" cy="183" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="150" cy="231" r="3" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="162" cy="231" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <line x1="220" y1="87" x2="250" y2="87" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="220" y1="135" x2="250" y2="135" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="220" y1="183" x2="250" y2="183" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="220" y1="231" x2="250" y2="231" stroke-width="2" stroke-opacity="0.4"/>
  <path d="M290 87 H310 V231 H290" stroke="var(--accent, #3b82f6)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M110 87 H90 V231 H110" stroke="var(--accent, #3b82f6)" stroke-width="1.5" stroke-dasharray="3 3"/>
</svg>`,
  },

  // 6. team-sprint
  {
    id: 'team-sprint',
    title: 'Agile Velocity Sprint',
    category: 'workflow',
    description: 'High-throughput cross-functional product sprint velocity and milestones',
    tags: ['sprint', 'team', 'velocity', 'agile', 'kanban', 'milestone'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="90" y="80" width="60" height="150" rx="8" stroke-width="1.2" stroke-opacity="0.4"/>
  <rect x="170" y="80" width="60" height="150" rx="8" stroke-width="1.2" stroke="var(--primary, #2563eb)"/>
  <rect x="250" y="80" width="60" height="150" rx="8" stroke-width="1.2" stroke-opacity="0.4"/>
  <rect x="100" y="100" width="40" height="24" rx="4" fill="var(--primary, #2563eb)" fill-opacity="0.1" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="100" y="134" width="40" height="32" rx="4" fill="var(--primary, #2563eb)" fill-opacity="0.1" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="180" y="100" width="40" height="42" rx="4" fill="var(--primary, #2563eb)" fill-opacity="0.25" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
  <rect x="180" y="152" width="40" height="24" rx="4" fill="var(--accent, #3b82f6)" fill-opacity="0.2" stroke="var(--accent, #3b82f6)" stroke-width="1"/>
  <rect x="260" y="100" width="40" height="28" rx="4" fill="var(--accent, #3b82f6)" fill-opacity="0.15" stroke-width="1" stroke-opacity="0.3"/>
  <path d="M120 60 Q 200 30, 280 60" stroke="var(--accent, #3b82f6)" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4"/>
  <polygon points="285,62 273,56 277,68" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 7. fintech-ledger
  {
    id: 'fintech-ledger',
    title: 'Cryptographic Balance Ledger',
    category: 'fintech',
    description: 'Double-entry immutability ledger with cryptographic balance attestation',
    tags: ['ledger', 'fintech', 'accounting', 'double-entry', 'audit', 'balance'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="110" y="60" width="180" height="180" rx="10" stroke-width="1.5" stroke-opacity="0.5"/>
  <line x1="110" y1="105" x2="290" y2="105" stroke-width="1.5" stroke="var(--primary, #2563eb)"/>
  <line x1="200" y1="105" x2="200" y2="240" stroke-width="1" stroke-opacity="0.3"/>
  <circle cx="130" cy="82" r="4" fill="var(--primary, #2563eb)" stroke="none"/>
  <line x1="145" y1="82" x2="220" y2="82" stroke-width="2" stroke-linecap="round" stroke-opacity="0.6"/>
  <rect x="125" y="125" width="55" height="14" rx="3" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="none"/>
  <rect x="125" y="150" width="45" height="14" rx="3" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="none"/>
  <rect x="125" y="175" width="60" height="14" rx="3" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="none"/>
  <rect x="215" y="125" width="60" height="14" rx="3" fill="var(--accent, #3b82f6)" fill-opacity="0.2" stroke="none"/>
  <rect x="215" y="150" width="50" height="14" rx="3" fill="var(--accent, #3b82f6)" fill-opacity="0.2" stroke="none"/>
  <rect x="215" y="175" width="40" height="14" rx="3" fill="var(--accent, #3b82f6)" fill-opacity="0.2" stroke="none"/>
  <line x1="125" y1="210" x2="275" y2="210" stroke="var(--primary, #2563eb)" stroke-width="2"/>
</svg>`,
  },

  // 8. growth-trajectory
  {
    id: 'growth-trajectory',
    title: 'Hyper-Growth Vector Curve',
    category: 'analytics',
    description: 'Exponential business compound growth vector with confidence intervals',
    tags: ['growth', 'trajectory', 'metrics', 'scale', 'revenue', 'analytics', 'chart'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <defs>
    <linearGradient id="growthArea" x1="200" y1="60" x2="200" y2="230" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--primary, #2563eb)" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="var(--accent, #3b82f6)" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <line x1="80" y1="230" x2="330" y2="230" stroke-width="1.5" stroke-opacity="0.4"/>
  <line x1="80" y1="60" x2="80" y2="230" stroke-width="1.5" stroke-opacity="0.4"/>
  <line x1="80" y1="180" x2="330" y2="180" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.2"/>
  <line x1="80" y1="120" x2="330" y2="120" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.2"/>
  <path d="M80 215 Q 160 210, 210 160 T 320 70 L 320 230 L 80 230 Z" fill="url(#growthArea)" stroke="none"/>
  <path d="M80 215 Q 160 210, 210 160 T 320 70" stroke="var(--primary, #2563eb)" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="210" cy="160" r="5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="320" cy="70" r="6" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="320" cy="70" r="11" stroke="var(--primary, #2563eb)" stroke-width="1.5" stroke-opacity="0.4"/>
</svg>`,
  },

  // 9. mobile-payment
  {
    id: 'mobile-payment',
    title: 'Contactless Mobile Settlement',
    category: 'fintech',
    description: 'NFC device terminal pairing with instant tokenized biometrics',
    tags: ['mobile', 'nfc', 'contactless', 'payment', 'phone', 'wallet'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="145" y="50" width="110" height="200" rx="18" stroke-width="2" stroke="var(--primary, #2563eb)"/>
  <line x1="185" y1="65" x2="215" y2="65" stroke-width="2" stroke-linecap="round" stroke-opacity="0.5"/>
  <circle cx="200" cy="232" r="5" stroke-width="1.5" stroke-opacity="0.5"/>
  <rect x="160" y="85" width="80" height="50" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="var(--accent, #3b82f6)" stroke-width="1"/>
  <path d="M190 165 A 15 15 0 0 1 210 165" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-linecap="round"/>
  <path d="M182 155 A 26 26 0 0 1 218 155" stroke="var(--accent, #3b82f6)" stroke-width="2" stroke-linecap="round"/>
  <path d="M174 145 A 38 38 0 0 1 226 145" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  },

  // 10. data-encryption
  {
    id: 'data-encryption',
    title: 'Zero-Knowledge Cipher Shield',
    category: 'security',
    description: 'Elliptic curve cryptographic shielding protecting sensitive customer data',
    tags: ['encryption', 'security', 'shield', 'cipher', 'cryptography', 'privacy'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <path d="M200 50 L280 85 V155 C280 205, 200 245, 200 245 C200 245, 120 205, 120 155 V85 Z" fill="var(--primary, #2563eb)" fill-opacity="0.1" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="200" cy="140" r="22" stroke="var(--accent, #3b82f6)" stroke-width="2"/>
  <path d="M192 140 L200 132 L208 140 M200 132 V152" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="105" x2="175" y2="105" stroke-width="1.5" stroke-dasharray="2 2" stroke-opacity="0.5"/>
  <line x1="225" y1="105" x2="240" y2="105" stroke-width="1.5" stroke-dasharray="2 2" stroke-opacity="0.5"/>
</svg>`,
  },

  // 11. api-integration
  {
    id: 'api-integration',
    title: 'Unified API Gateway Fabric',
    category: 'architecture',
    description: 'Decoupled microservice mesh interconnecting REST, GraphQL, and gRPC endpoints',
    tags: ['api', 'integration', 'connectors', 'gateway', 'rest', 'sdk', 'developer'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <circle cx="200" cy="150" r="35" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <text x="200" y="155" text-anchor="middle" font-size="12" font-family="monospace" font-weight="700" fill="var(--primary, #2563eb)" stroke="none">API</text>
  <rect x="70" y="80" width="55" height="40" rx="6" stroke-width="1.5" stroke-opacity="0.5"/>
  <rect x="70" y="180" width="55" height="40" rx="6" stroke-width="1.5" stroke-opacity="0.5"/>
  <rect x="275" y="80" width="55" height="40" rx="6" stroke-width="1.5" stroke-opacity="0.5"/>
  <rect x="275" y="180" width="55" height="40" rx="6" stroke-width="1.5" stroke-opacity="0.5"/>
  <path d="M125 100 L168 135" stroke="var(--accent, #3b82f6)" stroke-width="1.8" stroke-dasharray="4 3"/>
  <path d="M125 200 L168 165" stroke="var(--accent, #3b82f6)" stroke-width="1.8" stroke-dasharray="4 3"/>
  <path d="M232 135 L275 100" stroke="var(--accent, #3b82f6)" stroke-width="1.8" stroke-dasharray="4 3"/>
  <path d="M232 165 L275 200" stroke="var(--accent, #3b82f6)" stroke-width="1.8" stroke-dasharray="4 3"/>
  <circle cx="147" cy="118" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="253" cy="182" r="3" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 12. blockchain-nodes
  {
    id: 'blockchain-nodes',
    title: 'Distributed Consensus Mesh',
    category: 'fintech',
    description: 'Peer-to-peer Byzantine fault-tolerant decentralized ledger consensus',
    tags: ['blockchain', 'nodes', 'p2p', 'consensus', 'decentralized', 'crypto'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <polygon points="200,60 290,115 290,205 200,260 110,205 110,115" stroke-width="1.2" stroke-opacity="0.3" stroke-dasharray="4 4"/>
  <line x1="200" y1="60" x2="200" y2="260" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="110" y1="115" x2="290" y2="205" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="290" y1="115" x2="110" y2="205" stroke-width="1" stroke-opacity="0.2"/>
  <circle cx="200" cy="60" r="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="290" cy="115" r="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="290" cy="205" r="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="200" cy="260" r="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="110" cy="205" r="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="110" cy="115" r="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="200" cy="150" r="18" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 13. compliance-shield
  {
    id: 'compliance-shield',
    title: 'Regulatory Compliance Seal',
    category: 'security',
    description: 'ISO-27001 & SOC 2 Type II audit verification badge with cryptographic stamp',
    tags: ['compliance', 'audit', 'shield', 'soc2', 'iso', 'legal', 'trust'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <polygon points="200,45 270,75 270,165 200,245 130,165 130,75" fill="var(--primary, #2563eb)" fill-opacity="0.12" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <polygon points="200,65 255,88 255,158 200,222 145,158 145,88" stroke="var(--accent, #3b82f6)" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="M175 140 L192 157 L230 115" stroke="var(--primary, #2563eb)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },

  // 14. smart-contract
  {
    id: 'smart-contract',
    title: 'Autonomous Smart Contract',
    category: 'fintech',
    description: 'Deterministic state machine executing algorithmic escrow disbursement',
    tags: ['contract', 'smart contract', 'escrow', 'code', 'agreement', 'automation'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="135" y="50" width="130" height="190" rx="10" stroke-width="1.8" stroke-opacity="0.5"/>
  <path d="M160 85 H240 M160 105 H220 M160 125 H240 M160 145 H200" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4"/>
  <rect x="155" y="170" width="90" height="45" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
  <circle cx="175" cy="192" r="8" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  <line x1="183" y1="192" x2="225" y2="192" stroke="var(--primary, #2563eb)" stroke-width="2"/>
</svg>`,
  },

  // 15. global-network
  {
    id: 'global-network',
    title: 'Intercontinental Fiber Mesh',
    category: 'infrastructure',
    description: 'Subsea fiber-optic point-of-presence network with anycast routing',
    tags: ['network', 'fiber', 'global', 'anycast', 'telecom', 'internet'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <circle cx="200" cy="150" r="100" stroke-width="1" stroke-opacity="0.3"/>
  <ellipse cx="200" cy="150" rx="100" ry="45" stroke-width="1" stroke-opacity="0.25"/>
  <ellipse cx="200" cy="150" rx="45" ry="100" stroke-width="1" stroke-opacity="0.25"/>
  <path d="M120 120 Q 200 80, 280 120 T 200 230 Z" stroke="var(--primary, #2563eb)" stroke-width="1.5" stroke-dasharray="4 2"/>
  <circle cx="120" cy="120" r="5" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="280" cy="120" r="5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="200" cy="230" r="5" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="160" cy="170" r="4" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="240" cy="160" r="4" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 16. microservices-mesh
  {
    id: 'microservices-mesh',
    title: 'Service Mesh Orchestrator',
    category: 'architecture',
    description: 'Decentralized container sidecars communicating via zero-trust mTLS',
    tags: ['microservices', 'containers', 'mesh', 'kubernetes', 'sidecar', 'docker'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="165" y="55" width="70" height="45" rx="8" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
  <rect x="95" y="175" width="70" height="45" rx="8" fill="var(--accent, #3b82f6)" fill-opacity="0.15" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  <rect x="235" y="175" width="70" height="45" rx="8" fill="var(--accent, #3b82f6)" fill-opacity="0.15" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  <path d="M175 100 L150 175 M225 100 L250 175 M165 197 H235" stroke="var(--primary, #2563eb)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <circle cx="200" cy="148" r="8" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 17. ai-neural-engine
  {
    id: 'ai-neural-engine',
    title: 'Neural Transformer Synapse',
    category: 'analytics',
    description: 'Multi-layer perceptron tensor operations and transformer attention layers',
    tags: ['ai', 'neural', 'transformer', 'deep learning', 'machine learning', 'tensor'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <g stroke-opacity="0.25" stroke-width="1">
    <line x1="110" y1="80" x2="200" y2="70"/><line x1="110" y1="80" x2="200" y2="150"/><line x1="110" y1="80" x2="200" y2="230"/>
    <line x1="110" y1="150" x2="200" y2="70"/><line x1="110" y1="150" x2="200" y2="150"/><line x1="110" y1="150" x2="200" y2="230"/>
    <line x1="110" y1="220" x2="200" y2="70"/><line x1="110" y1="220" x2="200" y2="150"/><line x1="110" y1="220" x2="200" y2="230"/>
    <line x1="200" y1="70" x2="290" y2="110"/><line x1="200" y1="70" x2="290" y2="190"/>
    <line x1="200" y1="150" x2="290" y2="110"/><line x1="200" y1="150" x2="290" y2="190"/>
    <line x1="200" y1="230" x2="290" y2="110"/><line x1="200" y1="230" x2="290" y2="190"/>
  </g>
  <circle cx="110" cy="80" r="10" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="110" cy="150" r="10" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="110" cy="220" r="10" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="200" cy="70" r="12" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="200" cy="150" r="14" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="200" cy="230" r="12" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="290" cy="110" r="11" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="290" cy="190" r="11" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 18. database-cluster
  {
    id: 'database-cluster',
    title: 'High-Availability Database Cluster',
    category: 'infrastructure',
    description: 'Active-active multi-region sharded PostgreSQL database cluster with zero replica lag',
    tags: ['database', 'cluster', 'postgres', 'sharding', 'sql', 'storage'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <!-- DB Cylinder 1 -->
  <g transform="translate(100, 90)">
    <ellipse cx="40" cy="15" rx="35" ry="12" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
    <path d="M5 15 V75 C 5 83, 75 83, 75 75 V15" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
    <ellipse cx="40" cy="45" rx="35" ry="10" stroke="var(--primary, #2563eb)" stroke-width="1" stroke-dasharray="3 3"/>
    <ellipse cx="40" cy="75" rx="35" ry="12" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
  </g>
  <!-- DB Cylinder 2 -->
  <g transform="translate(220, 90)">
    <ellipse cx="40" cy="15" rx="35" ry="12" fill="var(--accent, #3b82f6)" fill-opacity="0.2" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
    <path d="M5 15 V75 C 5 83, 75 83, 75 75 V15" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
    <ellipse cx="40" cy="45" rx="35" ry="10" stroke="var(--accent, #3b82f6)" stroke-width="1" stroke-dasharray="3 3"/>
    <ellipse cx="40" cy="75" rx="35" ry="12" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  </g>
  <path d="M180 135 H220" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="220,135 210,130 210,140" fill="var(--primary, #2563eb)" stroke="none"/>
  <polygon points="180,135 190,130 190,140" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 19. devops-pipeline
  {
    id: 'devops-pipeline',
    title: 'Automated CI/CD Pipeline',
    category: 'workflow',
    description: 'Continuous integration and blue/green deployment orchestration pipeline',
    tags: ['cicd', 'pipeline', 'devops', 'deploy', 'git', 'build', 'automation'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <path d="M140 150 C 140 110, 80 110, 80 150 C 80 190, 140 190, 200 150 C 260 110, 320 110, 320 150 C 320 190, 260 190, 200 150" stroke="var(--primary, #2563eb)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="110" cy="120" r="5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="200" cy="150" r="7" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="290" cy="180" r="5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <polygon points="112,118 100,114 106,126" fill="var(--accent, #3b82f6)" stroke="none"/>
  <polygon points="288,182 300,186 294,174" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 20. identity-verification
  {
    id: 'identity-verification',
    title: 'KYC & Biometric Identity Verification',
    category: 'security',
    description: 'Instant document fraud verification with neural face telemetry match',
    tags: ['kyc', 'identity', 'biometric', 'verification', 'security', 'compliance'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="110" y="65" width="180" height="170" rx="14" stroke-width="1.8" stroke-opacity="0.5"/>
  <circle cx="160" cy="125" r="22" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <path d="M145 160 C145 145, 175 145, 175 160" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <line x1="205" y1="110" x2="265" y2="110" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4"/>
  <line x1="205" y1="125" x2="255" y2="125" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4"/>
  <line x1="205" y1="140" x2="240" y2="140" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4"/>
  <rect x="130" y="185" width="140" height="30" rx="6" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="var(--accent, #3b82f6)" stroke-width="1.2"/>
  <path d="M185 200 L195 208 L215 192" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },

  // 21. zero-trust-firewall
  {
    id: 'zero-trust-firewall',
    title: 'Zero-Trust Adaptive Firewall',
    category: 'security',
    description: 'Layer-7 stateful firewall inspecting packet anomalies in real time',
    tags: ['firewall', 'security', 'zerotrust', 'network', 'waf', 'defense'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="185" y="50" width="30" height="200" rx="4" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <line x1="185" y1="90" x2="215" y2="90" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="185" y1="130" x2="215" y2="130" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="185" y1="170" x2="215" y2="170" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="185" y1="210" x2="215" y2="210" stroke-width="1" stroke-opacity="0.5"/>
  <path d="M100 110 H185" stroke="var(--accent, #3b82f6)" stroke-width="2" stroke-linecap="round"/>
  <path d="M100 150 H185" stroke="var(--accent, #3b82f6)" stroke-width="2" stroke-linecap="round"/>
  <path d="M215 150 H300" stroke="var(--primary, #2563eb)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="250" cy="150" r="4" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 22. automated-workflow
  {
    id: 'automated-workflow',
    title: 'Autonomous Logic Workflow',
    category: 'workflow',
    description: 'Event-driven webhooks triggering complex condition branch cascades',
    tags: ['workflow', 'automation', 'branching', 'events', 'logic', 'orchestration'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <circle cx="100" cy="150" r="20" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <polygon points="190,80 230,80 210,120" stroke="var(--accent, #3b82f6)" stroke-width="1.8"/>
  <rect x="180" y="180" width="60" height="40" rx="8" stroke="var(--accent, #3b82f6)" stroke-width="1.8"/>
  <circle cx="300" cy="100" r="18" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="300" cy="200" r="18" fill="var(--primary, #2563eb)" stroke="none"/>
  <path d="M120 150 L190 100" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M120 150 L180 200" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M230 100 H280" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <path d="M240 200 H280" stroke="var(--primary, #2563eb)" stroke-width="2"/>
</svg>`,
  },

  // 23. payment-gateway
  {
    id: 'payment-gateway',
    title: 'Omnichannel Payment Gateway',
    category: 'fintech',
    description: 'Unified smart routing gateway with dynamic acquirer failover',
    tags: ['payment', 'gateway', 'fintech', 'pos', 'acquirer', 'cards'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="120" y="70" width="160" height="100" rx="10" stroke-width="2" stroke="var(--primary, #2563eb)"/>
  <line x1="120" y1="100" x2="280" y2="100" stroke-width="12" stroke="var(--primary, #2563eb)" stroke-opacity="0.4"/>
  <rect x="140" y="130" width="30" height="20" rx="4" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="240" cy="140" r="10" stroke-width="1.5" stroke="var(--accent, #3b82f6)"/>
  <path d="M200 170 V230" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-dasharray="4 4"/>
  <ellipse cx="200" cy="235" rx="50" ry="15" stroke-width="1.5" stroke-opacity="0.4"/>
</svg>`,
  },

  // 24. serverless-compute
  {
    id: 'serverless-compute',
    title: 'Serverless Edge Functions',
    category: 'infrastructure',
    description: 'Zero cold-start edge execution deployed simultaneously to 300+ metro hubs',
    tags: ['serverless', 'edge', 'lambda', 'compute', 'functions', 'cloud'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <polygon points="200,60 270,120 250,180 150,180 130,120" stroke="var(--primary, #2563eb)" stroke-width="1.8" stroke-dasharray="4 3"/>
  <polygon points="200,100 235,130 225,160 175,160 165,130" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  <path d="M200 120 L190 145 H210 L200 170" stroke="var(--primary, #2563eb)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },

  // 25. quantum-encryption
  {
    id: 'quantum-encryption',
    title: 'Quantum Key Distribution Lattice',
    category: 'security',
    description: 'Post-quantum Kyber lattice cryptography resistant to quantum factorization',
    tags: ['quantum', 'encryption', 'cryptography', 'security', 'lattice'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <circle cx="200" cy="150" r="80" stroke="var(--primary, #2563eb)" stroke-width="1" stroke-dasharray="4 4"/>
  <polygon points="200,70 269,110 269,190 200,230 131,190 131,110" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  <polygon points="200,95 247,122 247,178 200,205 153,178 153,122" fill="var(--primary, #2563eb)" fill-opacity="0.15" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <circle cx="200" cy="150" r="12" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 26. multitenant-saas
  {
    id: 'multitenant-saas',
    title: 'Isolated Multi-Tenant Architecture',
    category: 'architecture',
    description: 'Logical isolation boundaries guaranteeing enterprise schema separation',
    tags: ['multitenant', 'saas', 'architecture', 'isolation', 'enterprise'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="80" y="60" width="240" height="180" rx="14" stroke-width="1.5" stroke-opacity="0.3"/>
  <rect x="100" y="85" width="55" height="130" rx="8" fill="var(--primary, #2563eb)" fill-opacity="0.1" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
  <rect x="172" y="85" width="55" height="130" rx="8" fill="var(--accent, #3b82f6)" fill-opacity="0.1" stroke="var(--accent, #3b82f6)" stroke-width="1.5"/>
  <rect x="245" y="85" width="55" height="130" rx="8" fill="var(--primary, #2563eb)" fill-opacity="0.1" stroke="var(--primary, #2563eb)" stroke-width="1.5"/>
  <circle cx="127" cy="115" r="8" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="200" cy="115" r="8" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="272" cy="115" r="8" fill="var(--primary, #2563eb)" stroke="none"/>
</svg>`,
  },

  // 27. high-availability
  {
    id: 'high-availability',
    title: 'Active-Active Fault Tolerance',
    category: 'infrastructure',
    description: '99.999% SLA continuous uptime pairing with automatic regional failover',
    tags: ['uptime', 'availability', 'redundancy', 'reliability', 'failover'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="90" y="100" width="85" height="100" rx="10" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <rect x="225" y="100" width="85" height="100" rx="10" stroke="var(--accent, #3b82f6)" stroke-width="2"/>
  <path d="M175 140 H225 M175 160 H225" stroke="var(--primary, #2563eb)" stroke-width="2" stroke-dasharray="3 3"/>
  <circle cx="132" cy="135" r="6" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="268" cy="135" r="6" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 28. metric-monitoring
  {
    id: 'metric-monitoring',
    title: 'Real-Time Observability Engine',
    category: 'analytics',
    description: 'High-cardinality OpenTelemetry metrics with anomaly threshold detection',
    tags: ['observability', 'monitoring', 'metrics', 'opentelemetry', 'grafana', 'dashboards'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <path d="M120 200 A 90 90 0 1 1 280 200" stroke-width="12" stroke-opacity="0.15" stroke-linecap="round"/>
  <path d="M120 200 A 90 90 0 0 1 250 85" stroke="var(--primary, #2563eb)" stroke-width="12" stroke-linecap="round"/>
  <circle cx="200" cy="170" r="14" fill="var(--primary, #2563eb)" stroke="none"/>
  <line x1="200" y1="170" x2="235" y2="105" stroke="var(--accent, #3b82f6)" stroke-width="3.5" stroke-linecap="round"/>
</svg>`,
  },

  // 29. audit-trail
  {
    id: 'audit-trail',
    title: 'Immutable Cryptographic Audit Trail',
    category: 'security',
    description: 'Cryptographically chained SHA-256 event log guaranteeing non-repudiation',
    tags: ['audit', 'trail', 'sha256', 'compliance', 'hash', 'security'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <g transform="translate(60, 120)">
    <rect x="0" y="0" width="55" height="55" rx="8" stroke="var(--primary, #2563eb)" stroke-width="2"/>
    <rect x="75" y="0" width="55" height="55" rx="8" stroke="var(--accent, #3b82f6)" stroke-width="2"/>
    <rect x="150" y="0" width="55" height="55" rx="8" stroke="var(--primary, #2563eb)" stroke-width="2"/>
    <rect x="225" y="0" width="55" height="55" rx="8" stroke="var(--accent, #3b82f6)" stroke-width="2"/>
    <line x1="55" y1="27" x2="75" y2="27" stroke="var(--primary, #2563eb)" stroke-width="2.5"/>
    <line x1="130" y1="27" x2="150" y2="27" stroke="var(--primary, #2563eb)" stroke-width="2.5"/>
    <line x1="205" y1="27" x2="225" y2="27" stroke="var(--primary, #2563eb)" stroke-width="2.5"/>
  </g>
</svg>`,
  },

  // 30. modern-ecommerce
  {
    id: 'modern-ecommerce',
    title: 'Headless Commerce Architecture',
    category: 'fintech',
    description: 'Dynamic composable shopping checkout engine with instant localization',
    tags: ['ecommerce', 'headless', 'cart', 'checkout', 'store', 'retail'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <path d="M110 90 H140 L165 190 H260 L280 110 H150" stroke="var(--primary, #2563eb)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="175" cy="215" r="10" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="250" cy="215" r="10" fill="var(--accent, #3b82f6)" stroke="none"/>
  <rect x="180" y="125" width="50" height="40" rx="4" fill="var(--primary, #2563eb)" fill-opacity="0.2" stroke="none"/>
</svg>`,
  },

  // 31. incident-response
  {
    id: 'incident-response',
    title: 'Automated Incident Response Matrix',
    category: 'security',
    description: 'Instant threat triage, automated isolation cordons, and mitigation runbooks',
    tags: ['incident', 'response', 'soc', 'alert', 'runbook', 'threat'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <polygon points="200,60 290,220 110,220" stroke="var(--primary, #2563eb)" stroke-width="2"/>
  <line x1="200" y1="110" x2="200" y2="165" stroke="var(--accent, #3b82f6)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="200" cy="188" r="3.5" fill="var(--accent, #3b82f6)" stroke="none"/>
</svg>`,
  },

  // 32. developer-hub
  {
    id: 'developer-hub',
    title: 'Developer SDK CLI Workstation',
    category: 'architecture',
    description: 'Type-safe SDK generation, interactive sandboxes, and webhooks inspector',
    tags: ['developer', 'cli', 'sdk', 'terminal', 'code', 'hub'],
    svg: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
  <rect x="100" y="65" width="200" height="170" rx="10" stroke-width="1.8" stroke-opacity="0.5"/>
  <line x1="100" y1="95" x2="300" y2="95" stroke-width="1" stroke-opacity="0.3"/>
  <circle cx="118" cy="80" r="3.5" fill="var(--primary, #2563eb)" stroke="none"/>
  <circle cx="132" cy="80" r="3.5" fill="var(--accent, #3b82f6)" stroke="none"/>
  <circle cx="146" cy="80" r="3.5" fill="currentColor" fill-opacity="0.3" stroke="none"/>
  <path d="M125 125 L140 138 L125 150" stroke="var(--primary, #2563eb)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="150" y1="150" x2="175" y2="150" stroke="var(--accent, #3b82f6)" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,
  },
];

export function getIllustrations(category?: string): ArchitecturalIllustration[] {
  if (!category || category === 'all') return ARCHITECTURAL_ILLUSTRATIONS;
  return ARCHITECTURAL_ILLUSTRATIONS.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );
}

export function searchIllustrations(query: string): ArchitecturalIllustration[] {
  const q = query.trim().toLowerCase();
  if (!q) return ARCHITECTURAL_ILLUSTRATIONS;

  return ARCHITECTURAL_ILLUSTRATIONS.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}
