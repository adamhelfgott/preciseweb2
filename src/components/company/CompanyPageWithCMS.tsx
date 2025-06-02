"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function CompanyPageWithCMS() {
  const content = useQuery(api.cms.getCompanyContent);

  if (!content) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-soft-white">
        <div className="container section-padding">
          <div className="animate-pulse">
            <div className="h-12 w-3/4 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-40 h-40 bg-gray-200 rounded-lg mx-auto mb-4" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-2" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <img 
                  src={`https://precise.ai/static/img/photo/${member.image.split('/').pop()}`}
                  alt={member.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
                
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