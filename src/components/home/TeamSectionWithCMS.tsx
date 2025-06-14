"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useSanityData } from "@/hooks/useSanityData";
import { teamSectionQuery } from "@/sanity/lib/queries";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  linkedin?: string;
};

type TeamData = TeamMember[];

const DEFAULT_TEAM_MEMBERS = [
  {
    name: "Jesse Redniss",
    role: "CEO",
    bio: "Qonsent, WarnerMedia",
    imageUrl: "/team/jesse.jpg",
    linkedin: "https://www.linkedin.com/in/jesse-redniss-8a49691/",
  },
  {
    name: "Adam Helfgott",
    role: "Co-Founder",
    bio: "MadHive",
    imageUrl: "/team/adam-helfgott.jpg",
    linkedin: "https://www.linkedin.com/in/adamhelfgott",
  },
  {
    name: "Kevin O'Neill",
    role: "Chief Product Officer",
    bio: "DNAStack, Splash",
    imageUrl: "/team/kevin-oneill.jpg",
    linkedin: "https://www.linkedin.com/in/kevoneill",
  },
  {
    name: "Ed Laws",
    role: "Chief Operations Officer",
    bio: "InMobi, Yahoo",
    imageUrl: "/team/ed.jpg",
    linkedin: "https://www.linkedin.com/in/edwardlaws",
  },
  {
    name: "Justin Gutschmidt",
    role: "Chief Revenue Officer",
    bio: "Premion",
    imageUrl: "/team/justin.jpg",
    linkedin: "https://www.linkedin.com/in/jgutschmidt",
  },
  {
    name: "Matt Barlin",
    role: "Chief Science Officer",
    bio: "Valence",
    imageUrl: "/team/matt-barlin.jpg",
    linkedin: "https://www.linkedin.com/in/matthew-barlin",
  },
  {
    name: "Seth Redniss",
    role: "General Counsel",
    bio: "Redniss Law",
    imageUrl: "/team/seth-redniss.jpg",
    linkedin: "https://www.linkedin.com/in/seth-redniss-005b7b14",
  },
  {
    name: "Greg Couture",
    role: "Technology",
    bio: "NBCU, Qonsent",
    imageUrl: "/team/greg-couture.jpg",
    linkedin: "https://www.linkedin.com/in/greg-couture-785551",
  },
  {
    name: "Angelica Haase",
    role: "Client Operations",
    bio: "Qonsent",
    imageUrl: "/team/angelica-haase.jpg",
    linkedin: "https://www.linkedin.com/in/angelica-haase-mba-815a93143/",
  },
  {
    name: "Mary Sculley",
    role: "Sales & Impact",
    bio: "NBCU, WarnerMedia",
    imageUrl: "/team/mary-sculley.jpg",
    linkedin: "https://www.linkedin.com/in/mary-sculley-48a18b17",
  },
];

export default function TeamSectionWithCMS() {
  // Fetch team data from Sanity
  const { data: teamMembers } = useSanityData<TeamData>(teamSectionQuery);

  // Debug logging
  if (teamMembers) {
    console.log('[TeamSection] Raw team data:', teamMembers);
  }

  // Use Sanity data if available AND has content, otherwise use hardcoded
  const rawMembers = teamMembers && teamMembers.length > 0 ? teamMembers : DEFAULT_TEAM_MEMBERS;
  
  // Filter and deduplicate
  const seenNames = new Set<string>();
  const members = rawMembers.filter(member => {
    const isValid = member && member.name && typeof member.name === 'string';
    if (!isValid && member) {
      console.warn('[TeamSection] Invalid member data:', member);
      return false;
    }
    
    // Check for duplicates
    if (seenNames.has(member.name)) {
      console.warn('[TeamSection] Duplicate member filtered out:', member.name);
      return false;
    }
    
    seenNames.add(member.name);
    return true;
  });
  
  const headline = "Leadership Team";
  const subheadline = "Building the infrastructure for the AI data economy with decades of experience from the world's leading media and technology companies.";

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-soft-white" id="team">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            {headline}
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.isArray(members) && members.length > 0 ? members.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-center group"
            >
              {/* Image container with social overlay */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                {member.imageUrl ? (
                  <img 
                    src={member.imageUrl}
                    alt={member.name || 'Team member'} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-light-gray rounded-lg flex items-center justify-center">
                    <span className="text-4xl text-medium-gray">
                      {member.name && typeof member.name === 'string' 
                        ? member.name.split(' ').filter(n => n).map(n => n[0]).join('') 
                        : '?'}
                    </span>
                  </div>
                )}
                
                {/* Social overlay */}
                {member.linkedin && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/70 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-2 rounded-full hover:scale-110 transition-transform"
                    >
                      <Linkedin className="w-5 h-5 text-[#0077B5]" fill="#0077B5" />
                    </a>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-dark-gray mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-primary-orange mb-2">
                {member.role}
              </p>
              <p className="text-sm text-medium-gray leading-relaxed">
                {member.bio && typeof member.bio === 'string' 
                  ? member.bio.split(', ').map((company, i, arr) => (
                      <span key={company}>
                        {company}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))
                  : member.bio || ''}
              </p>
            </motion.div>
          )) : null}
        </div>

      </div>
    </section>
  );
}