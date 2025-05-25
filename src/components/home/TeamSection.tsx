"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Adam Helfgott",
    title: "CEO & Founder",
    bio: "Founder of MadHive, pioneering privacy-preserving advertising infrastructure. Serial entrepreneur with deep expertise in data technology and digital advertising.",
    image: "/team/adam-helfgott.jpg"
  },
  {
    name: "Jesse Redniss",
    title: "Chief Strategy Officer",
    bio: "Media industry veteran with extensive experience in data strategy and digital transformation. Former executive at major media and technology companies.",
    image: "/team/jesse-redniss.jpg"
  }
];

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24 bg-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-4">
            Led by Industry Veterans
          </h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Our team brings decades of experience building privacy-first advertising infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-light-gray rounded-full flex-shrink-0 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-medium-gray">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-green font-medium mb-3">
                    {member.title}
                  </p>
                  <p className="text-medium-gray text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}