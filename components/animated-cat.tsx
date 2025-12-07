"use client"

import { motion } from "framer-motion"

interface AnimatedCatProps {
  variant?: "walking" | "sitting" | "yawning"
  className?: string
  color?: string
}

export function AnimatedCat({ variant = "walking", className = "", color = "#F4A460" }: AnimatedCatProps) {
  if (variant === "walking") {
    return (
      <motion.svg
        className={`${className}`}
        width="120"
        height="80"
        viewBox="0 0 120 80"
        initial={{ x: -150 }}
        animate={{ x: "calc(100vw + 150px)" }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {/* Cat body */}
        <motion.ellipse
          cx="60"
          cy="45"
          rx="35"
          ry="20"
          fill={color}
          animate={{ cy: [45, 43, 45] }}
          transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Cat head */}
        <motion.circle
          cx="90"
          cy="35"
          r="18"
          fill={color}
          animate={{ cy: [35, 33, 35] }}
          transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Ears */}
        <path d="M80 25 L75 8 L88 20 Z" fill={color} />
        <path d="M100 25 L105 8 L92 20 Z" fill={color} />
        <path d="M81 23 L78 12 L86 20 Z" fill="#FFB6C1" />
        <path d="M99 23 L102 12 L94 20 Z" fill="#FFB6C1" />
        {/* Eyes */}
        <motion.g
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 0.15, delay: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
        >
          <ellipse cx="85" cy="32" rx="3" ry="4" fill="#333" />
          <ellipse cx="95" cy="32" rx="3" ry="4" fill="#333" />
        </motion.g>
        {/* Nose */}
        <ellipse cx="98" cy="38" rx="2" ry="1.5" fill="#FFB6C1" />
        {/* Whiskers */}
        <g stroke="#333" strokeWidth="0.5">
          <line x1="100" y1="36" x2="115" y2="34" />
          <line x1="100" y1="38" x2="115" y2="38" />
          <line x1="100" y1="40" x2="115" y2="42" />
        </g>
        {/* Tail */}
        <motion.path
          d="M25 45 Q5 30 15 15"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          animate={{ d: ["M25 45 Q5 30 15 15", "M25 45 Q10 25 20 10", "M25 45 Q5 30 15 15"] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Legs - animated walking */}
        <motion.g>
          {/* Front left leg */}
          <motion.rect
            x="75"
            y="55"
            width="6"
            height="20"
            rx="3"
            fill={color}
            animate={{ rotate: [-15, 15, -15], y: [55, 53, 55] }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: "78px 55px" }}
          />
          {/* Front right leg */}
          <motion.rect
            x="82"
            y="55"
            width="6"
            height="20"
            rx="3"
            fill={color}
            animate={{ rotate: [15, -15, 15], y: [55, 53, 55] }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: "85px 55px" }}
          />
          {/* Back left leg */}
          <motion.rect
            x="35"
            y="55"
            width="6"
            height="18"
            rx="3"
            fill={color}
            animate={{ rotate: [15, -15, 15], y: [55, 53, 55] }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: "38px 55px" }}
          />
          {/* Back right leg */}
          <motion.rect
            x="42"
            y="55"
            width="6"
            height="18"
            rx="3"
            fill={color}
            animate={{ rotate: [-15, 15, -15], y: [55, 53, 55] }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: "45px 55px" }}
          />
        </motion.g>
        {/* Stripes */}
        <path d="M45 35 Q50 45 45 55" stroke="#D2691E" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M55 33 Q60 45 55 57" stroke="#D2691E" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M65 35 Q70 45 65 55" stroke="#D2691E" strokeWidth="3" fill="none" opacity="0.5" />
      </motion.svg>
    )
  }

  if (variant === "yawning") {
    return (
      <motion.svg className={className} width="100" height="120" viewBox="0 0 100 120">
        {/* Cat body - sitting */}
        <ellipse cx="50" cy="90" rx="30" ry="25" fill={color} />
        {/* Cat head */}
        <circle cx="50" cy="45" r="25" fill={color} />
        {/* Ears */}
        <path d="M30 30 L22 5 L42 25 Z" fill={color} />
        <path d="M70 30 L78 5 L58 25 Z" fill={color} />
        <path d="M32 28 L27 10 L40 25 Z" fill="#FFB6C1" />
        <path d="M68 28 L73 10 L60 25 Z" fill="#FFB6C1" />
        {/* Eyes - squinting during yawn */}
        <motion.g animate={{ scaleY: [0.3, 0.1, 0.3] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <path d="M38 40 Q43 35 48 40" stroke="#333" strokeWidth="2" fill="none" />
          <path d="M52 40 Q57 35 62 40" stroke="#333" strokeWidth="2" fill="none" />
        </motion.g>
        {/* Mouth - yawning */}
        <motion.ellipse
          cx="50"
          cy="55"
          rx="8"
          ry="6"
          fill="#FF6B6B"
          animate={{ ry: [3, 10, 3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.path
          d="M45 58 Q50 63 55 58"
          fill="#FF8888"
          animate={{ d: ["M45 55 Q50 58 55 55", "M45 58 Q50 68 55 58", "M45 55 Q50 58 55 55"] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Tongue */}
        <motion.ellipse
          cx="50"
          cy="58"
          rx="4"
          ry="3"
          fill="#FF8888"
          animate={{ ry: [2, 5, 2], cy: [56, 60, 56] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Whiskers */}
        <g stroke="#333" strokeWidth="0.5">
          <line x1="30" y1="48" x2="15" y2="45" />
          <line x1="30" y1="52" x2="15" y2="52" />
          <line x1="30" y1="56" x2="15" y2="59" />
          <line x1="70" y1="48" x2="85" y2="45" />
          <line x1="70" y1="52" x2="85" y2="52" />
          <line x1="70" y1="56" x2="85" y2="59" />
        </g>
        {/* Front paws */}
        <ellipse cx="35" cy="105" rx="8" ry="5" fill={color} />
        <ellipse cx="65" cy="105" rx="8" ry="5" fill={color} />
        {/* Tail */}
        <motion.path
          d="M80 90 Q100 85 95 70"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          animate={{ d: ["M80 90 Q100 85 95 70", "M80 90 Q95 80 90 65", "M80 90 Q100 85 95 70"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Stripes */}
        <path d="M35 80 Q40 90 35 100" stroke="#D2691E" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M50 78 Q55 90 50 102" stroke="#D2691E" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M65 80 Q70 90 65 100" stroke="#D2691E" strokeWidth="3" fill="none" opacity="0.5" />
      </motion.svg>
    )
  }

  // Sitting variant
  return (
    <motion.svg className={className} width="100" height="120" viewBox="0 0 100 120">
      {/* Cat body - sitting */}
      <ellipse cx="50" cy="90" rx="30" ry="25" fill={color} />
      {/* Cat head */}
      <circle cx="50" cy="45" r="25" fill={color} />
      {/* Ears */}
      <path d="M30 30 L22 5 L42 25 Z" fill={color} />
      <path d="M70 30 L78 5 L58 25 Z" fill={color} />
      <path d="M32 28 L27 10 L40 25 Z" fill="#FFB6C1" />
      <path d="M68 28 L73 10 L60 25 Z" fill="#FFB6C1" />
      {/* Eyes */}
      <motion.g
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 0.15, delay: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
      >
        <circle cx="40" cy="42" r="5" fill="#333" />
        <circle cx="60" cy="42" r="5" fill="#333" />
        <circle cx="41" cy="40" r="2" fill="#fff" />
        <circle cx="61" cy="40" r="2" fill="#fff" />
      </motion.g>
      {/* Nose */}
      <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFB6C1" />
      {/* Mouth */}
      <path d="M50 54 L45 58" stroke="#333" strokeWidth="1.5" fill="none" />
      <path d="M50 54 L55 58" stroke="#333" strokeWidth="1.5" fill="none" />
      {/* Whiskers */}
      <g stroke="#333" strokeWidth="0.5">
        <line x1="30" y1="50" x2="15" y2="48" />
        <line x1="30" y1="54" x2="15" y2="54" />
        <line x1="30" y1="58" x2="15" y2="60" />
        <line x1="70" y1="50" x2="85" y2="48" />
        <line x1="70" y1="54" x2="85" y2="54" />
        <line x1="70" y1="58" x2="85" y2="60" />
      </g>
      {/* Front paws */}
      <ellipse cx="35" cy="105" rx="8" ry="5" fill={color} />
      <ellipse cx="65" cy="105" rx="8" ry="5" fill={color} />
      {/* Tail */}
      <motion.path
        d="M80 90 Q100 85 95 70"
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        animate={{ d: ["M80 90 Q100 85 95 70", "M80 90 Q95 80 90 65", "M80 90 Q100 85 95 70"] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>
  )
}
