"use client";

import { motion } from "framer-motion";
import {
  Target,
  Award,
  Users,
  Gift,
  Box,
  Calendar,
  Trophy,
  Target as TargetIcon,
  Code,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const engagementFeatures = [
  { icon: Target, title: "Daily Missions", description: "Earn participation rewards." },
  { icon: Award, title: "Achievement Badges", description: "Celebrate milestones." },
  { icon: Users, title: "Referral Program", description: "Grow the community together." },
  { icon: Gift, title: "Luck Wheel", description: "Daily surprises." },
  { icon: Box, title: "Luck Chests", description: "Unlock exciting bonuses." },
  { icon: Calendar, title: "Seasonal Events", description: "Exclusive campaigns." },
  { icon: Trophy, title: "Leaderboards", description: "Recognize active participants." },
  { icon: TargetIcon, title: "Community Challenges", description: "Work together toward shared goals." },
  { icon: Code, title: "Developer Spotlights", description: "Highlight ecosystem builders." },
  { icon: GraduationCap, title: "Educational Campaigns", description: "Learn more about Pi while participating." },
];

export default function CommunityEngagement() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pi-purple-600/10 blur-[100px] rounded-full" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            More Than a <span className="text-gradient-purple">Lottery</span>
          </h2>
          <p className="text-lg text-white/70">
            PiLuck is building a complete community engagement ecosystem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {engagementFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card-hover p-6 relative"
            >
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 rounded-full bg-pi-gold-500/20 text-pi-gold-300 text-xs font-semibold">
                  Coming Soon
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pi-purple-500/20 to-pi-gold-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-pi-purple-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 glass-card p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-pi-gold-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            The Future of <span className="text-gradient-gold">Community Engagement</span>
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            These features are designed to reward participation, build community,
            and create a vibrant ecosystem around PiLuck. Stay tuned for updates!
          </p>
        </motion.div>
      </div>
    </section>
  );
}