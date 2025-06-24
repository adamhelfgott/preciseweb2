"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

// Hardcoded content for company page
const DEFAULT_CONTENT = {
  hero: {
    title: "Our Team",
    description: "Building the infrastructure for the AI data economy with decades of experience from the world's leading media and technology companies."
  },
  teamMembers: [
    {
      name: "Jesse Redniss",
      role: "CEO",
      bio: "Qonsent, WarnerMedia",
      linkedin: "https://www.linkedin.com/in/jesse-redniss-8a49691/",
      imageUrl: "/team/jesse.jpg"
    },
    {
      name: "Adam Helfgott",
      role: "Co-Founder",
      bio: "MadHive",
      linkedin: "https://www.linkedin.com/in/adamhelfgott",
      imageUrl: "/team/adam-helfgott.jpg"
    },
    {
      name: "Kevin O'Neill",
      role: "Chief Product Officer",
      bio: "DNAStack, Splash",
      linkedin: "https://www.linkedin.com/in/kevoneill",
      imageUrl: "/team/kevin-oneill.jpg"
    },
    {
      name: "Ed Laws",
      role: "Chief Operations Officer",
      bio: "InMobi, Yahoo",
      linkedin: "https://www.linkedin.com/in/edwardlaws",
      imageUrl: "/team/ed.jpg"
    },
    {
      name: "Justin Gutschmidt",
      role: "Chief Revenue Officer",
      bio: "Premion",
      linkedin: "https://www.linkedin.com/in/jgutschmidt",
      imageUrl: "/team/justin.jpg"
    },
    {
      name: "Matt Barlin",
      role: "Chief Science Officer",
      bio: "Valence",
      linkedin: "https://www.linkedin.com/in/matthew-barlin",
      imageUrl: "/team/matt-barlin.jpg"
    },
    {
      name: "Seth Redniss",
      role: "General Counsel",
      bio: "Redniss Law",
      linkedin: "https://www.linkedin.com/in/seth-redniss-005b7b14",
      imageUrl: "/team/seth-redniss.jpg"
    },
    {
      name: "Greg Couture",
      role: "Technology",
      bio: "NBCU, Qonsent",
      linkedin: "https://www.linkedin.com/in/greg-couture-785551",
      imageUrl: "/team/greg-couture.jpg"
    },
    {
      name: "Angelica Haase",
      role: "Client Operations",
      bio: "Qonsent",
      linkedin: "https://www.linkedin.com/in/angelica-haase-mba-815a93143/",
      imageUrl: "/team/angelica-haase.jpg"
    },
    {
      name: "Mary Sculley",
      role: "Sales & Impact",
      bio: "NBCU, WarnerMedia",
      linkedin: "https://www.linkedin.com/in/mary-sculley-48a18b17",
      imageUrl: "/team/mary-sculley.jpg"
    }
  ],
  culture: {
    title: "Our Culture",
    description: "We believe in building technology that empowers both data owners and advertisers to collaborate fairly and transparently.",
    values: [
      {
        title: "Privacy First",
        description: "Every product decision starts with privacy and user control at its core."
      },
      {
        title: "Fair Value Exchange",
        description: "Using mathematical models to ensure everyone gets their fair share."
      },
      {
        title: "Radical Transparency",
        description: "Open about our methods, metrics, and attribution models."
      },
      {
        title: "Continuous Innovation",
        description: "Pushing the boundaries of what's possible in privacy-preserving tech."
      }
    ]
  }
};

export default function CompanyPageWithCMS() {
  const content = DEFAULT_CONTENT;


  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-soft-white">
      <div className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-display-large font-bold text-dark-gray mb-4">
            {content.hero.title}
          </h1>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            {content.hero.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {content.teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-center group"
            >
              {/* Image container with LinkedIn overlay */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                <div className="w-full h-full bg-gradient-to-br from-primary-orange/10 to-primary-teal/10 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-dark-gray">
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
        {content.investorNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pt-16 border-t border-light-gray"
          >
            <p className="text-medium-gray mb-6">
              {content.investorNote}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}