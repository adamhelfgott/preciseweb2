"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Jesse Redniss",
    role: "CEO",
    background: ["Qonsent", "WarnerMedia"],
    image: "/team/jesse.jpg",
    linkedin: "https://www.linkedin.com/in/jesse-redniss-8a49691/",
  },
  {
    name: "Adam Helfgott",
    role: "Co-Founder",
    background: ["MadHive"],
    image: "/team/adam-helfgott.jpg",
    linkedin: "https://www.linkedin.com/in/adamhelfgott",
  },
  {
    name: "Kevin O'Neill",
    role: "Chief Product Officer",
    background: ["DNAStack", "Splash"],
    image: "/team/kevin-oneill.jpg",
    linkedin: "https://www.linkedin.com/in/kevoneill",
  },
  {
    name: "Ed Laws",
    role: "Chief Operations Officer",
    background: ["InMobi", "Yahoo"],
    image: "/team/ed.jpg",
    linkedin: "https://www.linkedin.com/in/edwardlaws",
  },
  {
    name: "Justin Gutschmidt",
    role: "Chief Revenue Officer",
    background: ["Premion"],
    image: "/team/justin.jpg",
    linkedin: "https://www.linkedin.com/in/jgutschmidt",
  },
  {
    name: "Matt Barlin",
    role: "Chief Science Officer",
    background: ["Valence"],
    image: "/team/matt-barlin.jpg",
    linkedin: "https://www.linkedin.com/in/matthew-barlin",
  },
  {
    name: "Seth Redniss",
    role: "General Counsel",
    background: ["Redniss Law"],
    image: "/team/seth_redniss.jpg",
    linkedin: "https://www.linkedin.com/in/seth-redniss-005b7b14",
  },
  {
    name: "Greg Couture",
    role: "Technology",
    background: ["NBCU", "Qonsent"],
    image: "/team/greg-couture.jpg",
    linkedin: "https://www.linkedin.com/in/greg-couture-785551",
  },
  {
    name: "Greg Pier",
    role: "Implementation & Solutions Design",
    background: ["Qonsent"],
    image: "/team/greg-pier.jpg",
    linkedin: null,
  },
  {
    name: "Angelica Haase",
    role: "Client Operations",
    background: ["Qonsent"],
    image: "/team/angelica-haase.jpg",
    linkedin: "https://www.linkedin.com/in/angelica-haase-mba-815a93143/",
  },
  {
    name: "Mary Sculley",
    role: "Sales & Impact",
    background: ["NBCU", "WarnerMedia"],
    image: "/team/mary-sculley.jpg",
    linkedin: "https://www.linkedin.com/in/mary-sculley-48a18b17",
  },
];

export default function CompanyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-soft-white">
      <div className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-display-large font-bold text-dark-gray mb-4">
            Leadership Team
          </h1>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Building the infrastructure for the AI data economy with decades of experience 
            from the world's leading media and technology companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-center group"
            >
              {/* Image container with LinkedIn overlay */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                {/* Placeholder for actual image - using gradient background */}
                <div className="w-full h-full bg-gradient-to-br from-primary-orange to-vibrant-orange rounded-lg flex items-center justify-center overflow-hidden">
                  {/* When you have images, replace this with: */}
                  {/* <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> */}
                  <span className="text-white text-4xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* LinkedIn overlay */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/0 hover:bg-black/70 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <Linkedin className="w-5 h-5 text-[#0077B5]" fill="#0077B5" />
                    </div>
                  </a>
                )}
              </div>

              <h3 className="text-lg font-semibold text-dark-gray mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-primary-orange mb-2">
                {member.role}
              </p>
              <p className="text-sm text-medium-gray leading-relaxed">
                {member.background.map((company, i) => (
                  <span key={company}>
                    {company}
                    {i < member.background.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional team note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-16 border-t border-light-gray"
        >
          <p className="text-medium-gray mb-6">
            Backed by world-class investors and advisors
          </p>
        </motion.div>
      </div>
    </div>
  );
}